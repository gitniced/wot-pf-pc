import { makeAutoObservable } from 'mobx'
import API from './api'
import Http from '@/servers/http'
import type { ItemType, paramsType } from './interface'
import { getCookie } from '@/storage'
import { parseType } from '@/utils/parseValue'

export default class {
    // 分页数据
    public dataSource: ItemType[] = []

    // 页码
    public pageNo: number = 1
    // 单页显示数量
    public pageSize: number = 5
    //总数
    public totalCount = 0
    // 页面名称
    public name: string = ''
    //获取organizationCode
    public orgCode = getCookie('SELECT_ORG_CODE')
    public status = 1
    public rowKeys: any = []
    public type
    constructor(type: 'pc' | 'mobile') {
        this.type = type
        makeAutoObservable(this)
    }

    //搜索
    searchData = (val: paramsType) => {
        this.name = val?.name
        this.getWeicData()
    }
    // 重置
    resetData = () => {
        this.pageNo = 1
        this.pageSize = 5
        this.name = ''
        // this.dataSource = []
        this.getWeicData()
    }

    //页码查询
    pageHandelr = (pageNo?: number, pageSize?: number) => {
        this.pageNo = pageNo ?? this.pageNo
        this.pageSize = pageSize ?? this.pageSize
        this.getWeicData()
    }

    //获取数据
    getWeicData = async () => {
        const res: any =
            (await Http(API.getMicroData, 'POST', {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                organizationCode: this.orgCode,
                name: this.name,
                status: this.status,
                type: parseType(this.type),
            })) || {}

        const { currentPage, pageSize, pages, totalCount, data } = res || {}

        this.totalCount = totalCount
        this.dataSource = data
        // 判断删除第二页的最后一个的时候, 去请求第一页的数据
        if (pages && pages < currentPage) {
            this.pageHandelr(pages, pageSize)
        }
    }
}
