import { makeAutoObservable } from 'mobx'
import API from './api'
import Http from '@/servers/http'
import type { Data, paramsType } from './interface'
import { message } from 'antd'
import { getCookie } from '@/storage'
import { parseType } from '@/utils/parseValue'

export default class {
    // 分页数据
    public dataSource: Data[] = []
    // 页码
    public pageNo: number = 1
    // 单页显示数量
    public pageSize: number = 10
    //总数
    public totalCount = 0
    //获取organizationCode
    public orgCode = getCookie('SELECT_ORG_CODE')
    //页面名称
    public name = ''
    /**  状态 0草稿1发布 */
    public status: string | number = ''

    public rowCode: string = ' '
    /**
     * 微页面的类型
     *
     */
    public type
    constructor(type: 'pc' | 'mobile' = 'mobile') {
        this.type = type
        makeAutoObservable(this)
    }

    //搜索
    searchData = (val: paramsType) => {
        this.name = val.name
        this.status = val.status
        this.getMicroData()
    }
    // 重置
    resetData = () => {
        this.pageNo = 1
        this.pageSize = 10
        this.name = ''
        this.status = ''
        this.getMicroData()
    }

    //页码查询
    pageHandelr = (pageNo?: number, pageSize?: number) => {
        this.pageNo = pageNo ?? this.pageNo
        this.pageSize = pageSize ?? this.pageSize
        this.getMicroData()
    }
    //获取数据
    getMicroData = async () => {
        console.log('getData')
        console.trace('page')
        const res: any =
            (await Http(
                API.getMicroData,
                'POST',
                {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    organizationCode: this.orgCode,
                    name: this.name,
                    status: this.status,
                    type: parseType(this.type),
                },
                { repeatFilter: false },
            )) || {}

        const { currentPage, pageSize, pages, totalCount, data } = res || {}
        this.totalCount = totalCount
        this.dataSource = data
        // 判断删除第二页的最后一个的时候, 去请求第一页的数据
        if (pages && pages < currentPage) {
            this.pageHandelr(pages, pageSize)
        }
    }

    // 发布微页面接口
    publishMicro = async (code: string) => {
        await Http(`${API.publishMicro}/${code}`, 'POST', {}, { repeatFilter: false })
        message.success('发布成功')
        // 发布成功之后更新数据
        this.getMicroData()
    }
    // 删除微页面
    deleteMicro = async (code: string) => {
        await Http(`${API.deleteMicro}/${code}`, 'POST', {}, { repeatFilter: false })
        message.success('删除成功')
        this.getMicroData()
    }
    // 编辑微页面
    editText = async (values: any) => {
        const res: any = await Http(API.editText, 'POST', values, {
            repeatFilter: false,
        })
        return res
    }
    // 新增微页面
    addText = async (values: any) => {
        const res: any = await Http(API.addText, 'POST', values, {
            repeatFilter: false,
        })
        return res
    }
}
