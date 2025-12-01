import { makeAutoObservable } from "mobx";
import type { KnowledgeCountData, KnowledgeCountItem, PracticeQueryParams, StatisticsData } from "./interface";
import { getKnowledgeDataApi, getPracticeListApi, getStatisticsDataApi } from "./api";


class Store {
    constructor() {
        makeAutoObservable(this)
    }

    public loading: boolean = false

    // 练习详情
    public statisticsData: Partial<StatisticsData> = {}

    // 模拟题数据
    public knowledgePointCount: KnowledgeCountItem[] = []

    // 错误率
    public wrongKnowledgePointCount: KnowledgeCountItem[] = []

    // 获取练习详情
    getStatisticsData = (practiceCode: string) => {
        this.loading = true
        getStatisticsDataApi(practiceCode).then((res: any) => {
            this.statisticsData = res as StatisticsData
        }).finally(() => this.loading = false )
    }

    // 练习情况列表数据
    getPracticeList = async (params: PracticeQueryParams) => {
        const res: any = await getPracticeListApi(params)
        const { data = [], totalCount } = res
        return { data, totalCount, success: true }
    }

    // 练习统计数据
    getKnowledgeData = (practiceCode: string) => {
        getKnowledgeDataApi(practiceCode).then((res: any) => {
            const { knowledgePointCount = [], wrongKnowledgePointCount = [] } = res as KnowledgeCountData


            this.knowledgePointCount = knowledgePointCount

            this.wrongKnowledgePointCount = wrongKnowledgePointCount
        })
    }
}

export default new Store()