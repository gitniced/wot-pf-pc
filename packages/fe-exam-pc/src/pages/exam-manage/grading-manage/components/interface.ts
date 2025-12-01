
import type { ConfigType } from "dayjs"

export interface FormValues {
    name?: string // 考试名称
    examTime?: ConfigType[] // 考试时间
    relatedProject: string // 关联项目
    projectType: number // 项目类型
}
