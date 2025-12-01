import { makeAutoObservable, toJS } from 'mobx'
import API from './api'
import Http from '@/servers/http'
import type { ItemType, paramsType } from './interface'
import { getCookie } from '@/storage'
import { cloneDeep } from 'lodash'
// import { cloneDeep } from 'lodash'

export default class {
    // 分页数据
    public dataSource: ItemType[] = []
    // 旧选择数据
    public oldSource: ItemType[] = []

    // 页码
    public pageNo: number = 1
    // 单页显示数量
    public pageSize: number = 5
    //总数
    public totalCount = 0
    // 图文标题
    public title: string = ''
    // 分类
    public categoryCodes: string[] = []
    //获取organizationCode
    public orgCode = getCookie('SELECT_ORG_CODE')
    //选中的长度不能超过10
    public choiceLength = 0

    public release = 1 //发布状态

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
        this.getGraphicData(true)
        this.categoryCodes = []
    }
    // 重置
    resetData = () => {
        this.pageNo = 1
        this.pageSize = 5
        this.title = ''
        this.categoryCodes = []
        // this.dataSource = []
        this.getGraphicData(true)
    }

    //页码查询
    pageHandelr = (pageNo?: number, pageSize?: number) => {
        this.pageNo = pageNo ?? this.pageNo
        this.pageSize = pageSize ?? this.pageSize
        this.getGraphicData()
    }

    // //获取默认图片数据
    // getDefaultGraphicData = async (codes: string[]) => {
    //     // TODO codes可能跨机构
    //     const res: any =
    //         (await Http(API.getGraphicDataByCodes, 'POST', {
    //             codes,
    //         })) || {}

    //     const matchResList = res.map((resItem: any) => {
    //         let { categoryList } = resItem || {}
    //         categoryList = categoryList || []
    //         const categoryCodeList: string[] = []
    //         const categoryNameList: string[] = []
    //         categoryList.map((cateItem: any) => {
    //             categoryCodeList.push(cateItem?.code)
    //             categoryNameList.push(cateItem?.name)
    //         })
    //         return {
    //             ...resItem,
    //             categoryCodeList,
    //             categoryNameList,
    //         }
    //     })

    //     this.oldSource = matchResList
    // }

    //获取数据
    getGraphicData = async (flag?: boolean) => {
        // console.count("")
        const res: any =
            (await Http(API.getGraphicData, 'POST', {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                organizationCode: this.orgCode,
                title: this.title,
                categoryCodes: this.categoryCodes,
                status: this.release,
            })) || {}

        const { currentPage, pageSize, pages, totalCount, data } = res || {}
        this.totalCount = totalCount
        const oldData = cloneDeep(toJS(this.dataSource || []))
        if (flag) {
            this.dataSource = data
        } else {
            if (!data.length) {
                this.dataSource = []
                return
            }

            const templateOldData = cloneDeep(toJS(this.dataSource || []))

            const currentNum = pageSize * (currentPage - 1)
            // for(let i = 0;i<data.length;i++)
            oldData[currentNum] = true as any
            oldData.fill({})
            templateOldData.forEach((item, index) => {
                oldData[index] = item
            })
            data?.forEach((item: any, index: number) => {
                oldData[currentNum + index] = item
            })

            this.dataSource = oldData
        }

        // 判断删除第二页的最后一个的时候, 去请求第一页的数据
        if (pages && pages < currentPage) {
            this.pageHandelr(pages, pageSize)
        }
    }
}
