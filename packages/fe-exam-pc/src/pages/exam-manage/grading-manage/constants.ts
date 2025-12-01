// 考试状态
export enum EXAM_STATE_ENUM {
    NOT_START = 10, // 未开始
    ONGOING = 20, // 进行中
    FINISHED = 30, // 已结束
}
export const EXAM_STATE_OPTIONS = [
    {
        label: '未开始',
        value: EXAM_STATE_ENUM.NOT_START,
    },
    {
        label: '进行中',
        value: EXAM_STATE_ENUM.ONGOING,
    },
    {
        label: '已结束',
        value: EXAM_STATE_ENUM.FINISHED,
    },
]

// 阅卷方式
export enum GRADING_TYPE_ENUM {
    ALL = 'all', // 整卷阅卷
    TYPE = 'questionType', // 指定题型
    QUESTION = 'question', // 指定题目
    ALLOBJECTIVE= 'allObjective', // 纯客观题
}
export const GRADING_TYPE_TEXT: Record<string, string> = {
    [GRADING_TYPE_ENUM.ALL]: '整卷阅卷',
    [GRADING_TYPE_ENUM.TYPE]: '指定题型',
    [GRADING_TYPE_ENUM.QUESTION]: '指定题目',
}
export const GRADING_TYPE_OPTIONS = [
    {
        label: '整卷阅卷',
        value: GRADING_TYPE_ENUM.ALL,
        color: '#1678FF',
        bgColor: '#EDF5FF'
    },
    {
        label: '指定题型',
        value: GRADING_TYPE_ENUM.TYPE,
        color: '#FF4D4F',
        bgColor: '#FFF1F0',
    },
    {
        label: '指定题目',
        value: GRADING_TYPE_ENUM.QUESTION,
        color: '#FAAD14',
        bgColor: '#FFFBE6',
    },
]

// 多人阅卷
export enum MULTIPLE_TYPE_ENUM {
    TRUE = 1, // 是
    FALSE = 0, // 否
}

export const MULTIPLE_TYPE_TEXT: Record<string, string> = {
    [MULTIPLE_TYPE_ENUM.TRUE]: '是',
    [MULTIPLE_TYPE_ENUM.FALSE]: '否',
}

export const MULTIPLE_TYPE_OPTIONS = [
    {
        label: '是',
        value: MULTIPLE_TYPE_ENUM.TRUE,
    },
    {
        label: '否',
        value: MULTIPLE_TYPE_ENUM.FALSE,
    },
    
]

// 项目类型
export enum PROJECT_TYPE_ENUM {
    ALL = '', // 全部
    EVALUATION = '1', // 评价计划
    COMPETITION = '2', // 技能竞赛
    CULTIVATE = '3', // 培训计划
    CLASS = '4', // 班级
    COURSE = '5', //课程
}
export const PROJECT_TYPE_TEXT: Record<string, string> = {
    [PROJECT_TYPE_ENUM.ALL]: '全部',
    [PROJECT_TYPE_ENUM.EVALUATION]: '评价计划',
    [PROJECT_TYPE_ENUM.COMPETITION]: '技能竞赛'
}
export const PROJECT_TYPE_OPTIONS = [
    {
        label: '全部',
        value: PROJECT_TYPE_ENUM.ALL,
    },
    {
        label: '评价计划',
        value: PROJECT_TYPE_ENUM.EVALUATION,
        color: '#1678FF',
        bgColor: '#EDF5FF',
    },
    {
        label: '技能竞赛',
        value: PROJECT_TYPE_ENUM.COMPETITION,
        color: '#FF4D4F',
        bgColor: '#FFF1F0',
    },
]
