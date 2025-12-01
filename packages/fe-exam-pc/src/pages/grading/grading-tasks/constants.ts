// 阅卷任务状态
export enum GRADING_TASK_ENUM {
    WAITING = 10, // 待阅卷
    SUBMITTING = 20, // 待提交成绩
}

export const GRADING_TASK_OPTIONS = [
    {
        label: '待阅卷',
        value: GRADING_TASK_ENUM.WAITING
    },
    {
        label: '待提交成绩',
        value: GRADING_TASK_ENUM.SUBMITTING
    }
]