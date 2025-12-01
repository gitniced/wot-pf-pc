// import http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import type { JobData, Datum } from '@/components/ProfessionCascade/interface'
import { handlerData, jobChildrenName } from '@/components/ProfessionCascade/const'
import http from '@/servers/http'
import { getCookie, getLocalStorage } from '@/storage'
import apis from '@/servers/apis'
import type { DefaultOptionType } from 'antd/lib/select'
import type { KnowledgeOption, KnowledgeParams, KnowledgePoint } from './interface'
import { getKnowledgeListApi } from '../components/QuestionTypes/api'
import { generateKnowledgeList } from '@/components/QuestionCheck/utils'

class WordImportStore {
    constructor() {
        this.textValue = ''
        this.jobs = [] // 职业工种等级列表
        this.jobValue = undefined // 选中的职业工种等级的值
        this.lastSelectJob = []
        this.elementTable = []
        makeAutoObservable(this)
    }
    public textValue: string
    public jobs: Datum[] | never[]
    public jobValue: DefaultOptionType[] | undefined
    public elementTable: any[]
    public lastSelectJob: Datum[]
    // 试题分类列表
    public knowledgeList: KnowledgeOption[] = []

    // 已经选择的试题分类
    public selectKnowledge: KnowledgePoint = {}

    updateTextValue(value: string) {
        this.textValue = value
    }
    updateJobs(jobs: Datum[]) {
        this.jobs = jobs
    }
    updateJobValue(value: DefaultOptionType[]) {
        this.jobValue = value
    }
    getJobData = async (params = {}) => {
        const res = (await http(apis.jobPage, 'post', { ...params })) as unknown as JobData
        const data = handlerData(res.data, 0, jobChildrenName, 'id') as unknown as Datum[]
        this.updateJobs(data)
        return data
    }
    getElementTableData = async (levelCode: string | number) => {
        let res = {}
        const orgCode = getCookie('SELECT_ORG_CODE')

        if (!orgCode) return

        res = await http(apis.authenticatePage, 'post', {
            orgCode,
            levelCode,
        })
        // @ts-ignore
        this.elementTable = res.data
    }

    // 获取试题分类下拉列表
    getKnowledgeList = (params: KnowledgeParams) => {
        return getKnowledgeListApi(params).then((res: any) => {
            this.knowledgeList = generateKnowledgeList(res) || []

            const initialKnowledge = this.knowledgeList[0]

            this.selectKnowledge = {
                knowledgePointCode: initialKnowledge?.value,
                knowledgePointLevelCode: initialKnowledge?.levelCode,
                knowledgePointName: initialKnowledge.label,
            }
        })
    }

    setSelectKnowledge = (_selectKnowledge: KnowledgePoint) => {
        this.selectKnowledge = _selectKnowledge
    }
}

export default new WordImportStore()
