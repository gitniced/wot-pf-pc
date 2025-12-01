import http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import type { SearchParams, TableData, RecordStatusCount } from './interface'
import { initSearchParams, STATUSENUM } from './const'
// import dayjs from 'dayjs'
import API from './api'
import { getCookie } from '@/storage'
import { message } from 'antd'

class useHook {
    /** 请求参数 */
    public searchParams = initSearchParams as unknown as SearchParams
    /** 试题数据 */
    public tableData = {} as TableData
    /**  机构code  */
    public organizationCode = ''
    /** 报名tab数量 */
    public recordStatusCount: RecordStatusCount[] = []
    /**  报名活动的code  */
    public actCode = ''

    /**  当前的页码数量  */
    public currentPageSize = 10

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * 获取entityCode
     */
    getEntityCode = async (code: string) => {
        this.organizationCode = code
    }

    /**
     * 获取报名活动code
     */
    getActCode = async (code: string) => {
        this.actCode = code
    }

    /**
     * 获取表格数据
     * @param params 请求参数
     */
    getTableData = async (params: any) => {
        const { pageSize } = params || {}
        this.currentPageSize = pageSize
        //处理tabs 为全部状态
        if (params.status === STATUSENUM.ALL_STATUS) {
            delete params.status
        }

        if (!this.organizationCode) {
            // 没有机构不查询
            return
        }

        this.getRecordStatusCount(params)
        const res = (await http(
            API.pageApi,
            'post',
            {
                ...params,
                organizationCode: this.organizationCode,
            },
            {
                repeatFilter: false,
            },
        )) as unknown as TableData
        return res
    }

    /**
     * 获取报名状态数量
     */
    getRecordStatusCount = async (params: any = {}) => {
        const organizationCode: string = getCookie('SELECT_ORG_CODE') || ''
        const res = (await http(
            API.recordStatusCount,
            'get',
            { organizationCode, ...params },
            {
                repeatFilter: false,
            },
        )) as any
        this.recordStatusCount = res
    }

    /**  导出  */
    exportEnrollExcel = async (params: any) => {
        const res = await http(API.getImportTask, 'post', {
            param: JSON.stringify({
                ...params,
                organizationCode: getCookie('SELECT_ORG_CODE'),
            }),
            organizationCode: getCookie('SELECT_ORG_CODE'),
            type: 9,
            fileName: '报名管理导出.xlsx',
        })
        return res
    }

    /**  取消报名  */
    cancelRegistration = async (e: string, actionRef: any) => {
        await http(`${API.cancle}?code=${e}`, 'get', {})
        actionRef?.current?.reload()
        message.success('取消成功')
    }
    saveFollow = async (params: any) => {
        const res = await http(API.saveFollow, 'post', params)
        return res
    }
}

export default useHook
