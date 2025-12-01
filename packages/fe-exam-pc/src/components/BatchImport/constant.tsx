import { SUBJECT_TYPE_ENUM } from '@/pages/question/[type]/constants'
import { Typography } from 'antd'
import type { ReactNode } from 'react'

// 导入状态
export enum IMPORT_STATUS_ENUM {
    NONE = 0, // 初始化
    BEFORE = 1, // 导入前
    LOADING = 5, // 导入中
    RESOLVED = 20, // 导入成功
    REJECTED = 10, // 导入失败
}

export enum IMPORT_TYPE_ENUM {
    QUESTION_EXCEL = 1, // 试题excel导入
    QUESTION_WORD, // 试题word导入
    PRACTICE_USER, // 刷题用户
}

// 上传文件限制
export const ACCEPT_MAP: Record<string, string> = {
    excel: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    word: '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

// 上传大小限制
export const MAX_SIZE = 5 * 1024 * 1024

export const IMPORT_DESCRIPTION: Record<number, ReactNode> = {
    [SUBJECT_TYPE_ENUM.SIMULATION]: (
        <>
            <Typography>
                Excel导入试题功能支持“单选题、多选题、判断题、组合题”四类题型的导入
            </Typography>
            <Typography>1.请按照模板文件内的相关说明，进行内容填写；</Typography>
            <Typography>
                2.将填写好的导入文件上传，系统会校验导入内容是否符合规定的数据格式。校验通过，会入库保存。如未通过，则会反馈提示。
            </Typography>
        </>
    ),
    [SUBJECT_TYPE_ENUM.TRAIN]: (
        <>
            <Typography>
                Excel导入试题功能（系统标准模板）支持“单选题、多选题、判断题、填空题、简答题、组合题、计算题、论述题、案例分析题”九类题型的导入
            </Typography>
            <Typography>1.请按照模板文件内的相关说明，进行内容填写；</Typography>
            <Typography>
                2.将填写好的导入文件上传，系统会校验导入内容是否符合规定的数据格式。校验通过，会入库保存。如未通过，则会反馈提示。
            </Typography>
        </>
    ),
}

export const IMPORT_TEMPLATE: Record<number, string> = {
    [SUBJECT_TYPE_ENUM.SIMULATION]:
        'https://static.zpimg.cn/public/fe-exam-pc/import_template/%E8%AF%95%E9%A2%98%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5%EF%BC%88%E6%A8%A1%E6%8B%9F%E9%A2%98%E5%BA%93%EF%BC%89.xlsx',
    // TODO 后端给模板
    [SUBJECT_TYPE_ENUM.TRAIN]:
        'https://static.zpimg.cn/public/fe-exam-pc/import_template/%E8%AF%95%E9%A2%98%E5%AF%BC%E5%85%A5%EF%BC%88%E7%B3%BB%E7%BB%9F%E6%A0%87%E5%87%86%E6%A8%A1%E6%9D%BF%EF%BC%89.xlsx',
}
