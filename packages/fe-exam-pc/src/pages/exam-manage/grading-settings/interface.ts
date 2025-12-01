import type { ModalProps } from 'antd'
import type { MULTIPLE_TYPE_ENUM } from '../grading-manage/constants'

export interface TeacherItem {
    name: string
    phone: string
    questionTypes: number[]
    questionCodes: string[]
    selectState: number
    userCode: string
    isHideMsg?: boolean // 是否隐藏阅卷老师的手机号和姓名
    isHideBtn?: boolean // 是否隐藏脱敏按钮
}

export interface GradingDetail {
    startTime: number // 考试开始时间
    endTime: number // 考试结束时间
    examCode: string // 考试code
    taskCode: string // 阅卷任务code
    examTitle: string // 考试名称
    gradingType: string // 阅卷方式
    paperCount: number // 试卷数
    projectTitle: string // 关联项目名称
    projectType: number // 项目类型
    questionTypes: number[] // 主观题类型
    randomPaperNumber: number // 试卷随机数
    stuCount: number // 考生数
    teacherDetails: TeacherItem[]
    multipleState: MULTIPLE_TYPE_ENUM // 多人阅卷状态
}

export interface IRouteParams {
    taskCode: string
}

export interface Item {
    title: string
    logicSort: string
    questionCode: string
}

export interface QuestionItem {
    logicSort: string // 题目序号
    title: string // 题目类型名称
    questionList: Item[]
    questionType: number
    totalQuestion: number
}
export interface PaperItem {
    paperTitle: string
    paperCode: string
    paperQuestionList: QuestionItem[]
}

export interface SelectedItem {
    teacherId: number
    questionCode: string
}

export interface MarkSettingModalProps extends Omit<ModalProps, 'onCancel'> {
    onCancel: () => void
}
