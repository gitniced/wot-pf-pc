import { makeAutoObservable } from 'mobx'
import http from '@/servers/http'
import { getCookie } from '@/storage'
import apis from '@/servers/apis'
import type { KnowledgeOption, KnowledgeParams, KnowledgePoint } from './interface'
import { getKnowledgeListApi } from '../api'
import { generateKnowledgeList } from '../utils'
import { BELONG_TYPE_ENUM } from '../constants'

class WordImportStore {
    constructor() {
        makeAutoObservable(this)
    }

    public textValue: string | undefined
    public elementTable: any[] = []
    // 试题分类列表
    public knowledgeList: KnowledgeOption[] = []
    // 已经选择的试题分类
    public selectKnowledge: KnowledgePoint = {}

    updateTextValue(value: string) {
        this.textValue = value
    }

    getElementTableData = async (levelCode: string | number, commonParams?: any) => {
        let res = {}
        const orgCode = getCookie('SELECT_ORG_CODE')

        if (!orgCode) return

        res = await http(apis.authenticatePage, 'post', {
            ...(commonParams||{}),
            orgCode,
            levelCode,
            belongType: BELONG_TYPE_ENUM.ORGANIZE,
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
