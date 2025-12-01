// 阅卷状态
export enum GRADING_STATE_ENUM {
    FINISHED = 10, // 已阅卷
    ONGOING = 20, // 阅卷中
    WAITING = 30, // 待阅卷
    NO_NEED = 40, // 无需阅卷
    NOT_SUBMIT = 50, // 未交卷
}

export const MARK_STATE_ENUM_OPTIONS = [
    {
        label: '已阅卷',
        value: GRADING_STATE_ENUM.FINISHED
    },
    {
        label: '阅卷中',
        value: GRADING_STATE_ENUM.ONGOING
    },
    {
        label: '待阅卷',
        value: GRADING_STATE_ENUM.WAITING
    },
    {
        label: '无需阅卷',
        value: GRADING_STATE_ENUM.NO_NEED
    },
    {
        label: '未交卷',
        value: GRADING_STATE_ENUM.NOT_SUBMIT
    }
] 
