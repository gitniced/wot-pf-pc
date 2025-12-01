import { makeAutoObservable } from 'mobx'
import API from './api'
import Http from '@/servers/http'
import type { ItemType, EditType, paramsType } from './interface'
import { message } from 'antd'
import { getCookie } from '@/storage'

export default class {
    // 分页数据
    public dataSource: ItemType[] = []
    // 页码
    public pageNo: number = 1
    // 单页显示数量
    public pageSize: number = 10
    //总数
    public totalCount = 0
    // 图文标题
    public title: string = ''
    // 分类
    public categoryCodes: string[] = []
    //获取organizationCode
    public orgCode = getCookie('SELECT_ORG_CODE')

    public classificData: any[] = []

    constructor() {
        makeAutoObservable(this)
    }

    //搜索
    searchData = (val: paramsType) => {
        this.title = val?.title
        if (val?.categoryCodes) {
            this.categoryCodes.push(val?.categoryCodes)
        } else {
            this.categoryCodes = []
        }
        this.getGraphicData()
        this.categoryCodes = []
    }
    // 重置
    resetData = () => {
        this.pageNo = 1
        this.pageSize = 10
        this.title = ''
        this.categoryCodes = []
        this.getGraphicData()
    }

    //页码查询
    pageHandelr = (pageNo?: number, pageSize?: number) => {
        this.pageNo = pageNo ?? this.pageNo
        this.pageSize = pageSize ?? this.pageSize
        this.getGraphicData()
    }

    //获取数据
    getGraphicData = async () => {
        const res: any =
            (await Http(API.getGraphicData, 'POST', {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                organizationCode: this.orgCode,
                title: this.title,
                categoryCodes: this.categoryCodes,
            })) || {}

        const { currentPage, pageSize, pages, totalCount, data } = res || {}
        this.totalCount = totalCount
        this.dataSource = data
        // 判断删除第二页的最后一个的时候, 去请求第一页的数据
        if (pages && pages < currentPage) {
            this.pageHandelr(pages, pageSize)
        }
    }

    // 删除图文接口
    deleteText = async (code: string) => {
        const res = (await Http(`${API.deleteText}/${code}`, 'POST', {}, {})) || {}
        if (res) {
            message.success(`删除成功`)
            this.getGraphicData()
        }
    }
    //编辑图文
    editText = async (values: EditType) => {
        const res =
            (await Http(API.editText, 'POST', values, {
                repeatFilter: false,
            })) || {}
        return res
    }
    // 从草稿到发布
    publishText = async (code: string) => {
        const res = (await Http(`${API.publishText}/${code}`, 'POST', {}, {})) || {}
        if (res) {
            message.success(`发布成功`)
            this.getGraphicData()
        }
    }
}
