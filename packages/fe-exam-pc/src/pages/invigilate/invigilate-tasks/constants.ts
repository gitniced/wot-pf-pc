export const ALL_STATE = { label: '全部', value: ''}
// 考试状态
export enum EXAM_STATE_ENUM {
    ALL = 0,
    NOT_START = 10, // 未开始
    ONGOING = 20, // 进行中
    FINISHED = 30, // 已结束
}
export const EXAM_STATE_OPTIONS = [
    {
        label: '全部',
        value: EXAM_STATE_ENUM.ALL,
    },
    {
        label: '未开始',
        value: EXAM_STATE_ENUM.NOT_START,
        style:{
            background:'#D9D9D9'
        }
    },
    {
        label: '进行中',
        value: EXAM_STATE_ENUM.ONGOING,
        style:{
            background: 'var(--primary-color)',
            border: '2px solid rgba(0,103,255,0.2)'
        }
    },
    {
        label: '已结束',
        value: EXAM_STATE_ENUM.FINISHED,
        style: {
            background: '#52C41A'
        }
    },
]


// 项目类型
export enum PROJECT_TYPE_ENUM {
    ALL = '', // 全部
    EVALUATION = 1, // 评价计划
    COMPETITION = 2, // 技能竞赛
    CULTIVATE = 3, // 培训计划
    CLASS = 4, // 班级
    COURSE = 5, //课程
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


//签到方式
export enum SIGN_TYPE_ENUM {
    TEACHER_FACE_RECOGNITION = 1, // 监考老师端人脸识别
}

//签到枚举
export enum SIGN_STATE_ENUM {
    NOT_SIGN = 10, // 无需签到
    SIGNING = 20, // 签到中
    ENDING = 30, // 已结束
    NOT_START = 40, // 未开始
}
export const SIGN_STATE_OPTIONS = [
    {
        label: '无需签到',
        value: SIGN_STATE_ENUM.NOT_SIGN,
        style:{
            background: '#D9D9D9',
        }
       
    },
    {
        label: '签到中',
        value: SIGN_STATE_ENUM.SIGNING,
        style:{
            background: 'var(--primary-color)',
            border: '2px solid rgba(0,103,255,0.2)'
        }
    },
    {
        label: '已结束',
        value: SIGN_STATE_ENUM.ENDING,
        style:{
            background: '#D9D9D9',
        }
    },
    {
        label: '未开始',
        value: SIGN_STATE_ENUM.NOT_START,
        style:{
            background: '#D9D9D9',
        }
    },
]


//签到方式枚举
export enum SIGN_TYPE_STATE_ENUM {
    NEED_SIGN = 1, // 集中签到
    NO_SIGN = 0, // 无需签到
    CENTER_SIGN = 2,//分散签到
}
export const SIGN_TYPE_STATE_OPTIONS = [
    {
        label: '全部',
        value: -1,
    },
    {
        label: '集中签到',
        value: SIGN_TYPE_STATE_ENUM.NEED_SIGN,
    },
    {
        label: '分散签到',
        value: SIGN_TYPE_STATE_ENUM.CENTER_SIGN,
    },
    {
        label: '无需签到',
        value: SIGN_TYPE_STATE_ENUM.NO_SIGN,
    },
]
