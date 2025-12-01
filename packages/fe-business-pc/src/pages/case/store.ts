import http from '@/servers/http'
// import * as Storage from '@/storage'
import { makeAutoObservable } from 'mobx'
// import { history } from 'umi'
import api from './api'
import { getLocalStorage } from '@/storage'

export default class CaseStore {
    constructor() {
        makeAutoObservable(this)
    }
    // 推荐位中对应的标杆案例的内容管理分页
    recommendPage: any[] = []

    // 标杆案例中选中的图文
    imageTextSelected: string[] = []
    // 标杆案例数据
    caseList: any[] = []

    // 图文详情
    imageTextDetail: any = {}

    // 用户身份列表
    selectedIdentity: string = ''

    // 设置用户身份
    setSelectedIdentity = (value: string) => {
        this.selectedIdentity = value || ''
    }

    public pageParma = {
        pageNo: 1,
        pageSize: 10,
        pages: 1,
        totalCount: 3,
    }

    pageHandel = (pageNo: number, pageSize: number) => {
        this.pageParma = {
            ...this.pageParma,
            pageNo,
            pageSize,
        }
        this.getRecommendPage()
    }

    // 模块分页
    getRecommendPage = async () => {
        const res: any = (await http(
            api.recommendPage,
            'POST',
            {
                // 标杆案例的别名 特殊约定
                formAlias: 'SaaSWoktableBenchmarkingCases',
                identitys: [this.selectedIdentity],
                status: 0,
                pageNo: this.pageParma.pageNo,
                pageSize: this.pageParma.pageSize,
                order: '',
                orderBy: '',
                sid: getLocalStorage('SID'),
            },
            { repeatFilter: false },
        )) as unknown as any[]
        this.recommendPage = res.data

        this.recommendPage.map((item: any) => {
            let { imageText, identity } = item.customContent || {}
            imageText ??= ''
            identity ??= []
            // 有选中图文 图文对应身份又默认的 内容打开
            console.log(imageText, identity, identity?.includes?.(String(this.selectedIdentity)))
            this.imageTextSelected.push(imageText)
        })
        await this.getImageTextAll()
    }

    // 获取选中的图文数据
    getImageTextAll = async () => {
        this.caseList = (await http(
            api.imageTextAll,
            'post',

            this.imageTextSelected,

            { repeatFilter: false },
        )) as unknown as any[]
    }

    // 获取图文详情
    getImageTextDetail = async (code: string) => {
        if (!code) return
        this.imageTextDetail = (await http(
            api.imageTextDetail + code,
            'get',
            {},
            { repeatFilter: false },
        )) as unknown as any[]
    }
}
