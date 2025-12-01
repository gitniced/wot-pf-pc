// 答题状态

export enum ANSWER_STATE_ENUM {
    RIGHT = 10, // 正确
    WRONG = 20, // 错误
    GRADING = 30, // 阅卷中
    PARTIAL = 40, // 部分作答
    EMPTY = 50, // 未作答
}
export const ANSWER_STATE_OPTIONS = [
    {
        label: '正确',
        className: 'right',
        span: 9,
        value: ANSWER_STATE_ENUM.RIGHT,
    },
    {
        label: '错误',
        className: 'wrong',
        span: 7,
        value: ANSWER_STATE_ENUM.WRONG,
    },
    {
        label: '阅卷中',
        className: 'grading',
        span: 8,
        value: ANSWER_STATE_ENUM.GRADING,
    },
    {
        label: '部分正确',
        className: 'partial',
        span: 9,
        value: ANSWER_STATE_ENUM.PARTIAL,
    },
]
