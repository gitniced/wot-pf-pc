import { makeAutoObservable } from 'mobx'
import type { TABLE_ITEM } from './columns'
import type { HEADER_ITEM } from './interface'
import { INVOICE_HEADER, INVOICE_KIND, STEP_ENUM } from './interface'
import { history } from 'umi'
import { message } from 'antd'
import http from '@/servers/http'
import { getCookie } from '@/storage'
import { filterNum } from '@/utils/numberTransform'
import { calculateTotalInvoiceAmount } from './components/OrderStep/utils'
export default class {
    public stepList = [
        { title: '关联订单', description: '选择需要开票的订单', key: STEP_ENUM.FIRST_STEP },
        { title: '确认抬头', description: '选择抬头信息', key: STEP_ENUM.SECOND_STEP },
    ]
    public currentStep: STEP_ENUM[keyof STEP_ENUM] = STEP_ENUM.FIRST_STEP
    public currentInvoiceKind: number = INVOICE_KIND.NORMAL_INVOICE
    public currentInvoiceHeaderType: number = INVOICE_HEADER.COMPANY
    public invoiceHeaderList: HEADER_ITEM[] = []
    public currentInvoiceHeader: HEADER_ITEM | undefined = undefined

    public showMessage: boolean = false
    public modalVisible: boolean = false

    public selectedRows: TABLE_ITEM[] = []
    public selectRowsMoney: string = '0'

    /**是否是新增抬头 */
    public isInvoiceCreate: boolean = true

    /**创建的发票code */
    public invoiceCode: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    /** 新增关联订单 */
    addSelectRow = (rows: any) => {
        this.selectedRows = this.selectedRows.concat(rows)
        this.updateSelectionMoney(this.selectedRows)
    }

    /** 清空selectedRows */
    resetSelectedRows = () => {
        this.selectedRows = []
        this.updateSelectionMoney([])
    }

    /** 要删除的keys */
    delSelectRow = (rowkey: string) => {
        const delKey = this.selectedRows.findIndex(item => item.code === rowkey)
        this.selectedRows.splice(delKey, 1)
        this.updateSelectionMoney(this.selectedRows)
    }

    /** 更新是否新增抬头 */
    updateIsInvoiceCreate = (bool: boolean) => {
        this.isInvoiceCreate = bool
    }

    /**
     *  获取我的可开票订单
     *  并且筛选出 code 想符合的
     * @param code
     */
    getOrderDetail = (code: string) => {
        this.currentStep = STEP_ENUM.SECOND_STEP
        http(
            '/order/front/detail_buyer',
            'POST',
            {
                code,
                organizationCode: getCookie('SELECT_ORG_CODE'),
                identity: getCookie('SELECT_IDENTITY_CODE'),
                orgUser: getCookie('SELECT_USER_TYPE') === 'org',
            },
            {},
        ).then(res => {
            //@ts-ignore
            this.selectedRows = [res]
            //@ts-ignore
            // 使用新的计算逻辑
            const totalAmount = calculateTotalInvoiceAmount([res])
            this.selectRowsMoney = filterNum(totalAmount)
        })
    }

    updateSelectionMoney = (rows: TABLE_ITEM[]) => {
        // 使用新的计算逻辑，根据订单状态计算可开票金额
        const totalAmount = calculateTotalInvoiceAmount(rows)
        this.selectRowsMoney = filterNum(totalAmount)
    }

    backToMyOrder = () => {
        if (this.currentStep === STEP_ENUM.FIRST_STEP) {
            history.replace('/invoice')
        } else {
            this.changeStep(STEP_ENUM.FIRST_STEP)
        }
    }

    changeStep = (index: STEP_ENUM[keyof STEP_ENUM]) => {
        this.currentStep = index
    }

    doNext = () => {
        if (this.selectedRows.length > 0) {
            this.changeStep(STEP_ENUM.SECOND_STEP)
        } else {
            message.warning('请先选择需要开票的订单', 2)
        }
    }

    updateCurrentInvoiceHeaderType = (type: number) => {
        this.currentInvoiceHeader = undefined
        this.currentInvoiceHeaderType = type
    }

    getInvoiceHeader = async () => {
        const list = (await http('/invoice/front/title/list', 'POST', {
            type: this.currentInvoiceHeaderType,
            organizationCode: getCookie('SELECT_ORG_CODE'),
            orgUser: getCookie('SELECT_USER_TYPE') === 'org',
        })) as unknown as HEADER_ITEM[]
        if (!this.currentInvoiceHeader) {
            let currentActiveHeader = list?.[0] || undefined
            this.currentInvoiceHeader = currentActiveHeader
        }
        this.invoiceHeaderList = list || []
    }

    addInvoiceHeader = async (values: any, callback: () => void) => {
        const { code, type } = values
        const userType = getCookie('SELECT_USER_TYPE')
        let url = '/invoice/front/title/insert'
        if (code) {
            url = '/invoice/front/title/update'
        }
        switch (Number(type || 0)) {
            case 1:
                delete values.userCode
                delete values.idCard
                delete values.name
                break
            case 2:
                delete values.userCode
                delete values.bankAccount
                delete values.openningBank
                delete values.taxNum
                delete values.titleName
                break
        }
        values.userCode = getCookie('USER_CODE')
        values.orgUser = userType === 'org'
        if (values.orgUser) {
            values.organizationCode = getCookie('SELECT_ORG_CODE')
        }

        http(url, 'POST', { ...values }).then(() => {
            if (code) {
                message.success('修改抬头成功', 2)
            } else {
                message.success('新增抬头成功', 2)
            }
            this.toggleModalVisible()
            this.getInvoiceHeader()
            callback()
        })
    }

    delInvoiceHeader = async (data: HEADER_ITEM) => {
        http('/invoice/front/title/v2/delete', 'POST', {
            code: data.code,
            organizationCode: getCookie('SELECT_ORG_CODE'),
            orgUser: getCookie('SELECT_USER_TYPE') === 'org',
        }).then(() => {
            if (this.currentInvoiceHeader?.code === data.code) {
                this.updateInvoiceHeader(undefined)
            }
            this.getInvoiceHeader()
        })
    }

    updateInvoiceHeader = (data: HEADER_ITEM | undefined) => {
        this.currentInvoiceHeader = data
    }

    toggleModalVisible = () => {
        this.modalVisible = !this.modalVisible
    }

    doSubmit = (values: any) => {
        let orderCodeList = this.selectedRows.map((item: TABLE_ITEM) => item.code)
        let requestParams = {
            ...values,
            titleCode: this.currentInvoiceHeader?.code,
            orderCodeList,
            orgUser: getCookie('SELECT_USER_TYPE') === 'org',
            organizationCode: getCookie('SELECT_ORG_CODE'),
            identity: getCookie('SELECT_IDENTITY_CODE'),
            userCode: getCookie('USER_CODE'),
        }
        requestParams.mergeInvoice = requestParams.mergeInvoice === 1
        return http('/invoice/front/v2/apply_blue', 'POST', {
            ...requestParams,
            orgUser: getCookie('SELECT_USER_TYPE') === 'org',
            organizationCode: getCookie('SELECT_ORG_CODE'),
            identity: getCookie('SELECT_IDENTITY_CODE'),
        }).then(res => {
            this.showMessage = true
            this.invoiceCode = (res as unknown as string) ?? ''
        })
    }
}
