import { makeAutoObservable } from "mobx";
import { getKnowledgeListApi } from "./api";
import type { CreateKnowledge, KnowledgeItem, KnowledgeOption, KnowledgeParams } from "./interface";


const generateKnowledgeList = (knowledgeList: KnowledgeItem[]): KnowledgeOption[] | undefined => {
    if (!knowledgeList || !knowledgeList.length) return undefined

    return knowledgeList.map((knowledge: KnowledgeItem) => ({
        label: knowledge.title,
        value: knowledge.code,
        levelCode: knowledge.levelCode,
        children: generateKnowledgeList(knowledge.childList),
    }))
}

class QuestionTypesStore {
    constructor() {
        makeAutoObservable(this)
    }

    // 试题分类列表
    public knowledgeList: KnowledgeOption[] = []

    // 已经选择的试题分类
    public selectKnowledge: Partial<CreateKnowledge> = {}

    // 获取试题分类下拉列表
    getKnowledgeList = (params: KnowledgeParams) => {
        return getKnowledgeListApi(params).then((res: any) => {
            this.knowledgeList = generateKnowledgeList(res) || []

            const initialKnowledge = this.knowledgeList[0]

            this.selectKnowledge = {
                code: initialKnowledge?.value,
                levelCode: initialKnowledge?.levelCode,
                codeList: [initialKnowledge?.value]
            }
        })
    }

    setSelectKnowledge = (_selectKnowledge: Partial<CreateKnowledge>) => {
        this.selectKnowledge = _selectKnowledge
    }
}

export default new QuestionTypesStore()