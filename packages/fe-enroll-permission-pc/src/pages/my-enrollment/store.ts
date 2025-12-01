/* eslint-disable no-case-declarations */
import http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import type { SearchParams, TableData } from './interface'
import { initSearchParams, STATUSENUM_MY_ENROLLMENT } from './const'
import API from './api'
import { getCookie, getLocalStorage, getSessionStorage } from '@/storage'
// @ts-ignore
import { findSiteData, getPortalCodeFromUrl } from '@wotu/wotu-components'
import { Modal, message } from 'antd'
import getBaseDomain from '@/utils/getBaseDomain'

class useHook {
    /** 请求参数 */
    public searchParams = initSearchParams as unknown as SearchParams
    /** 报名数据 */
    public tableData = {} as TableData

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * 更新请求参数
     * @param searchParams
     */
    updateSearchParams = (searchParams: SearchParams) => {
        this.searchParams = {
            ...this.searchParams,
            ...searchParams,
        }
    }

    /**
     * 分页器改变
     * @param page 页码
     * @param pageSize 页数
     */
    changePagination = (page: number, pageSize?: number) => {
        this.updateSearchParams({
            pageNo: page,
            pageSize,
        } as SearchParams)
        this.getTableData()
    }

    /**
     * 获取表格数据
     * @param params 请求参数
     */

    getTableData = async () => {
        const platform = getSessionStorage('PLATFORM')

        const searchParams = {
            ...this.searchParams,
        }

        // queryScope 查询范围
        // 1:排除站点活动类型的数据，2:只查询站点活动，为空查询所有数据
        // Saas门户不显示站点活动，需要过滤
        if (platform === 'portal') {
            searchParams.queryScope = 1
        }

        /**  去除全部  */
        if (searchParams.status === STATUSENUM_MY_ENROLLMENT.ALL_STATUS) {
            Reflect.deleteProperty(searchParams, 'status')
        }

        const res = (await http(API.pageApi, 'POST', searchParams)) as unknown as TableData
        if (res?.pages && res?.currentPage > res?.pages) {
            this.updateSearchParams({ pageNo: this.searchParams.pageNo - 1 } as SearchParams)
            this.getTableData()
        }
        this.tableData = res
    }

    /**
     * 取消报名
     * @param data 报名记录
     */
    cancelEnroll = async (data: any) => {
        const { code } = data || {}
        http(API.cancelEnrol, 'get', { code }).then(() => {
            this.getTableData()
        })
    }

    /**  去支付  */
    goToPay = async (code: string) => {
        const siteStore = getLocalStorage('SITE_STORE') || {}
        // const { siteData } = siteStore || {}
        // const midDomain =
        //     RUN_ENV === 'local'
        //         ? 'http://localhost:8071'
        //         : findSiteData(siteData, 'midDomain', { findKey: 'baseInfo' }) || ''
        const orgDomain = findSiteData(siteStore.siteData, 'orgDomain', { findKey: 'baseInfo' })
        const burl = findSiteData(siteStore.siteData, 'burl', { findKey: 'baseInfo' })
        let params = {
            code,
            identity: getCookie('SELECT_IDENTITY_CODE'),
        }

        const { orderCode, identity: firstIdentity } = ((await http(
            `${API.createOrder}`,
            'get',
            params,
            {},
        )) || {}) as any

        if (orderCode && firstIdentity) {
            let path = ''
            if (getPortalCodeFromUrl()) {
                const customDomain = getPortalCodeFromUrl({ isGetDomain: true })
                path = `${burl}/${customDomain}/mine/transaction/order/conduct?orderId=${orderCode}&identity=${firstIdentity}`
            } else {
                path = `${orgDomain}/trading-center/order/conduct?orderId=${orderCode}&identity=${firstIdentity}`
            }
            //  else if (midDomain) {
            //     path = `${midDomain}/transaction/order/conduct?orderId=${orderCode}&identity=${firstIdentity}`
            // }
            window.open(path, '_blank')
        } else {
            message.error('订单号不存在')
        }
    }

    /**  再次报名  */
    goToAgain = async (data: any) => {
        const { code, type, organizationCode, activityCode, customDomain } = data || {}
        let urlQuery = `?activityCode=${activityCode}&record=${code}`
        if (`${type}` === '1') {
            urlQuery = `?organizationCode=${organizationCode}&record=${code}`
        }
        if (`${type}` === '5') {
            urlQuery = `?organizationCode=${organizationCode}&careerCode=${activityCode}&record=${code}`
        }
        // 根据当前登录域名跳转 站点的跳转站点，门户跳转到创建门户报名
        const orgCode = getPortalCodeFromUrl()
        let baseDomain = getBaseDomain(orgCode ? customDomain : null)
        location.href = `${baseDomain}/enroll-gateway/enroll-information${urlQuery}`
    }

    /**  取消报名  */
    goToCancel = async (data: any) => {
        const { status, price } = data || {}
        let modalProps = {
            title: '取消报名',
            content: '确定取消报名？',
            centered: true,
            cancelText: '取消',
            okText: '确定',
            onOk: () => {
                this.cancelEnroll(data)
            },
        }
        // 当缴费金额不为空 且已经成功报名时，修改提示文案
        if (status.toString() === STATUSENUM_MY_ENROLLMENT.SUCCESS && price) {
            modalProps.content = '取消报名后，报名费用将原路返回，确定取消吗？'
        }
        Modal.confirm({ ...modalProps })
    }
}

export default useHook
