import { makeAutoObservable, runInAction } from 'mobx'
import { getLocalStorage, setLocalStorage } from '@/storage/localStorage'
import http from '@/servers/http'
import { STATUSENUM } from './interface.d'
import { getCookie, getSessionStorage } from '@/storage'
// import { history } from 'umi'
import { message } from 'antd'
import { getPortalCodeFromUrl } from '@wotu/wotu-components'
export const API = {
    /** 订单分页 */
    orderAPI: '/search/front/order/page_user_order',

    /** 关闭订单 */
    closeOrderURL: '/order/front/cancel',

    /** 订单状态数量 */
    getOrderStatusNum: '/search/front/order/buyer_status_count',

    /** 获取订单详情 */
    getOrderDetail: '/order/front/detail_buyer',
    /** 合并支付 */
    mergePayment: '/pay/front/merge_order_qrcode_apply',
}

export default class {
    public orderList: any[] = []
    public checkedList: any[] = []
    public params: any = {
        pageNo: 1,
        pageSize: +(getLocalStorage('PAGE_SIZE') || 10),
        status: Number(STATUSENUM.ALL_STATUS),
    }
    /**未付款数量 */
    public unpaidNum = 0
    /**逾期数量 */
    public overdueNum = 0
    /**已支付数量params */
    public successNum = 0
    /** 已完成的数量 */
    public doneNum = 0
    /** 已关闭数量 */
    public closeNum = 0
    /** 支付待确认数量 */
    public confirmNum = 0
    /** 总数 */
    public totalCount = 0
    /** 查询按钮loading状态 */
    public btnLoading: boolean = false
    /** 订单状态 */
    public statusMap: Record<string, number> = {}
    /** 是否逾期的勾选 */
    public checked: boolean = false
    /** 合并支付按钮状态 */
    public payBool: boolean = false
    /** 需要展示逾期筛选的tab */
    public showAlterKey = [STATUSENUM.ALL_STATUS, STATUSENUM.UNPAID_STATUS, STATUSENUM.PART_STATUS]

    constructor() {
        makeAutoObservable(this)
    }
    /**
     *  处理 tab的key 只要是有已逾期的订单就直接 展示
     * @param lastParams
     * @returns
     */
    private filterKey(lastParams: any) {
        if (!this.showAlterKey.includes(lastParams.status)) {
            Reflect.deleteProperty(lastParams, 'queryDelayed')
        }
        if (Number(lastParams.status) === Number(STATUSENUM.ALL_STATUS))
            Reflect.deleteProperty(lastParams, 'status')
    }
    /**
     *  选中订单
     * @param obj
     */
    checkItem = (obj: any) => {
        const cloneOrderList = JSON.parse(JSON.stringify(this.orderList))
        cloneOrderList.map((i: any) => {
            if (i.code === obj.code) {
                i.active = !i.active
                if (i.active) {
                    this.checkedList.push(i)
                } else {
                    this.checkedList = this.checkedList.filter(t => t.code !== i.code)
                }
            }
        })
        this.orderList = cloneOrderList
    }
    /**
     *  清除选中订单
     * @param obj
     */
    clearItem = () => {
        this.checkedList = []
    }
    /**
     *  选中当页订单
     */
    checkAll = () => {
        let tempCheckedList = JSON.parse(JSON.stringify(this.checkedList))
        let tempOrderList = JSON.parse(JSON.stringify(this.orderList))
        let pageCheckedList = tempOrderList
        let unPageChecked = tempOrderList.some(i => i.active === false)
        if (unPageChecked) {
            tempOrderList.map(i => (i.active = true))
            tempCheckedList = tempCheckedList.concat(pageCheckedList)
        } else {
            tempOrderList.map(i => (i.active = false))
            tempCheckedList = tempCheckedList.filter(
                i => !pageCheckedList.some(t => t.code === i.code),
            )
        }
        tempCheckedList = Array.from(new Set(tempCheckedList.map(t => JSON.stringify(t)))).map(t =>
            JSON.parse(t),
        )
        this.orderList = tempOrderList
        this.checkedList = tempCheckedList

        console.log(tempOrderList)
        console.log(tempCheckedList)
    }
    /**
     *  删除元素
     * @param obj
     * @param key
     * @param value
     */
    moveItem(obj: Record<string, any>, key: string, value: any) {
        if (obj[key] && obj[key] === value) Reflect.deleteProperty(obj, key)
    }
    /**
     * 获取订单状态数量
     */
    getOrderStatusNum() {
        return http<any, any>(API.getOrderStatusNum, 'POST', {
            organizationCode: getCookie('SELECT_ORG_CODE'),
            identity: getCookie('SELECT_IDENTITY_CODE'),
            orgUser: getCookie('SELECT_USER_TYPE') === 'org',
        }).then(res => {
            /* 
                {
                    1:1,
                    2:1
                }
                key 是订单状态的枚举
             */
            this.statusMap = res
        })
    }

    /** 测试当前订单是否处于未支付状态 */
    testOrderIsUnPlay(code: string) {
        return http(API.getOrderDetail, 'POST', {
            code,
            organizationCode: getCookie('SELECT_ORG_CODE'),
            identity: getCookie('SELECT_IDENTITY_CODE'),
            orgUser: getCookie('SELECT_USER_TYPE') === 'org',
        }).then((res: any) => {
            return (
                String(res.status) === STATUSENUM.UNPAID_STATUS ||
                String(res.status) === STATUSENUM.PART_STATUS
            )
        })
    }

    /**
     * 获取列表数据
     * @param params
     */
    getOrderList(params = this.params) {
        let lastParams = {
            ...this.params,
            ...params,
            organizationCode: getCookie('SELECT_ORG_CODE'),
            identity: getCookie('SELECT_IDENTITY_CODE'),
            orgUser: getCookie('SELECT_USER_TYPE') === 'org',
        }
        this.filterKey(lastParams)
        this.moveItem(lastParams, 'goodsCode', '全部')
        this.btnLoading = true
        http(API.orderAPI, 'POST', lastParams)
            .then((res: any) => {
                if (Array.isArray(res?.data)) {
                    runInAction(() => {
                        const tempOrderList = res.data.map((i: any) => {
                            return { ...i, active: this.checkedList.some(t => t.code === i.code) }
                        })
                        this.orderList = tempOrderList
                        this.params = { ...this.params, ...params }
                        this.totalCount = res.totalCount
                        window?.update_page_size?.(res.pageSize)
                    })
                }
            })
            .finally(() => {
                this.btnLoading = false
                if (this.showAlterKey.includes(this.params.status)) {
                    this.getOverNum()
                }
            })
    }

    /**
     * tabs的切换
     * @param key
     */
    setCheckTab(key: string) {
        this.params.status = key
        this.params.pageNo = 1
        this.getOrderList()
    }

    /**
     *  切换是否逾期
     * @param flag
     */
    setCheckTabOver(flag: boolean) {
        this.params.queryDelayed = flag
        this.checked = flag
    }

    setChecked(flag: boolean) {
        this.checked = flag
    }

    /**
     * 获取逾期的数量
     */
    getOverNum() {
        http(API.orderAPI, 'POST', {
            // ...this.params,
            pageSize: 10,
            pageNo: 1,
            queryDelayed: true,
            orgUser: getCookie('SELECT_USER_TYPE') === 'org',
            organizationCode: getCookie('SELECT_ORG_CODE'),
            identity: getCookie('SELECT_IDENTITY_CODE'),
            status: this.params.status === STATUSENUM.ALL_STATUS ? undefined : this.params.status,
        }).then((res: any) => {
            if (res) {
                this.overdueNum = res.totalCount
            }
        })
    }

    /**
     *  页码大小改变
     * @param page
     * @param size
     */
    pageChange(page: number, size: number) {
        runInAction(() => {
            this.pageSizeChangeEffect(size)
            this.params.pageNo = page
            this.params.pageSize = size
        })
        this.getOrderList()
    }
    onReset() {
        this.params = {
            pageNo: 1,
            pageSize: +(getLocalStorage('PAGE_SIZE') || 10),
            status: this.params.status,
        }
    }
    /**
     * 搜索
     * @param params
     */
    searchOrder(params: any) {
        runInAction(() => {
            if (params.time) {
                params.payTimeStart = +params.time[0].startOf('day').format('x')
                params.payTimeEnd = +params.time[1].endOf('day').format('x')
                Reflect.deleteProperty(params, 'time')
            } else {
                if (this.params.payTimeStart || this.params.payTimeEnd) {
                    this.params.payTimeStart = undefined
                    this.params.payTimeEnd = undefined
                }
            }
            this.params = { ...this.params, ...params }
            this.getOrderList()
        })
    }
    /**
     *  获取状态总数
     * @param codeList
     * @param key
     */
    getStateNum(status: number, key: any) {
        http(API.orderAPI, 'POST', {
            pageSize: 10,
            pageNo: 1,
            status,
            orgUser: getCookie('SELECT_USER_TYPE') === 'org',
            organizationCode: getCookie('SELECT_ORG_CODE'),
            identity: getCookie('SELECT_IDENTITY_CODE'),
        }).then((res: any) => {
            if (res) {
                this[key as keyof typeof this] = res.totalCount
            }
        })
    }
    /**
     *  页码大小改变副作用
     * @param newSize
     */
    pageSizeChangeEffect(newSize: number) {
        if (this.params.pageSize !== newSize) {
            setLocalStorage('PAGE_SIZE', newSize)
        }
    }
    /**
     * 取消订单
     * @param code
     * @returns
     */
    closeOrder(code: string) {
        return this.testOrderIsUnPlay(code).then(res => {
            if (res) {
                return http(API.closeOrderURL, 'POST', {
                    code,
                    organizationCode: getCookie('SELECT_ORG_CODE'),
                }).then(() => {
                    message.success('取消成功')
                    this.getOrderList()
                    this.getOrderStatusNum()
                })
            }
            message.info('支付处理中，请勿操作')
            return
        })
    }

    /** 去支付 */
    palyOrder(path: string, code: string) {
        this.testOrderIsUnPlay(code).then(res => {
            if (res) {
                window.open(path)
            } else {
                message.info('支付处理中，请勿操作')
            }
        })
    }
    /** 去支付 */
    mergePayment = () => {
        if (this.checkedList.length === 0) {
            message.warning('请先选择订单')
            return
        }
        this.payBool = true
        const orderCodes = this.checkedList.map(i => i.code)
        http(API.mergePayment, 'POST', { orderCodes })
            .then((res: any) => {
                const { paymentCode } = res || {}
                const platform = getSessionStorage('PLATFORM')
                const currentAlias = getPortalCodeFromUrl({ isGetDomain: true })
                const identity = getCookie('SELECT_IDENTITY_CODE')
                let jumpUrl = ''
                switch (platform) {
                    case 'portal':
                        jumpUrl = `/${currentAlias}/transaction/order/payment?paymentCode=${paymentCode}&identity=${identity}`
                        break
                    case 'workbench':
                        jumpUrl = `/trading-center/order/payment?paymentCode=${paymentCode}&identity=${identity}`
                        break
                    case 'middle':
                        jumpUrl = `/transaction/order/payment?paymentCode=${paymentCode}&identity=${identity}`
                        break
                    default:
                        jumpUrl = `/order/payment?paymentCode=${paymentCode}&identity=${identity}`
                        break
                }
                window.open(jumpUrl)
            })
            .finally(() => {
                this.payBool = false
            })
    }

    /**
     * 获取计数
     */
    getInitData() {
        this.getOrderList()
        // this.getOverNum()
    }
}
