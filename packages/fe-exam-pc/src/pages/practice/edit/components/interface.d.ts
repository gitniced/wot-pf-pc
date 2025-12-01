import type { ModalProps, TreeDataNode } from "antd";
import type { IRoute } from "umi";
import type { CustomContent, KnowledgePointInfoItem, SelectQuestionDto } from "../../interface";
import type { QUESTION_SELECT_TYPE } from "../constants";
export interface TitleAdvanceProps extends IRoute {
    title: string
}

export interface SelectQuestionProps {
    loading: boolean
    hasSelectQuestion?: boolean
    questionType?: QUESTION_SELECT_TYPE  // 抽题方式
    selectQuestionDto?: SelectQuestionDto // 选择的题目
    onChange: (type: QUESTION_SELECT_TYPE) => void
    onSelect: (selectQuestionDto: SelectQuestionDto) => void
}
export interface SelectByWorkModal extends Omit<ModalProps, 'onCancel' | 'onOk'> {
    onOk: (selectQuestionDto: SelectQuestionDto) => void
    onCancel: () => void
    commonJobList?: CustomContent[]
}

export interface SelectByKnowledgeModal extends Omit<ModalProps, 'onCancel' | 'onOk'> {
    onOk: (selectQuestionDto: SelectQuestionDto) => void
    onCancel: () => void
    knowledgePointInfoList?: KnowledgePointInfoItem[]
}
export interface PublishModalProps extends Omit<ModalProps, 'onCancel'> {
    onCancel: () => void
    practiceCode?: string
}

export interface AddPersonModalProps extends Omit<ModalProps, 'onCancel'> {
    onCancel: () => void
}

export interface UserSelectProps {
    type: 'edit' | 'detail'
}


export interface KnowledgeListParams {
    belongType: number // 来源 机构/资源方/站点
    skill: number
    subject: number
    sid?: number
    organizationCode?: string
    title?: string
}

export type CustomDataNode = TreeDataNode & {
    totalQuestion?: number
    level?: number
    levelCode: string
    parentChain?: CustomDataNode[]
    children?: CustomDataNode[]
    title: string
    selectAll?: boolean
}


export interface KnowledgeItem {
    belongType: number // 来源 机构/资源方/站点
    skill: number
    subject: number
    code: string
    level?: number
    levelCode: string
    organizationCode: string
    sid: number
    sort: number
    title: string
    totalQuestion: number
    childList: KnowledgeItem[]
}