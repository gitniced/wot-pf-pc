export interface JobData {
    currentPage: number
    data: {
        id: number
        name: string
        workList: {
            id: number
            jobId: number
            levelList: {
                id: number
                name: string
            }[]
            name: string
        }[]
    }[]
    pageSize: number
    pages: number
    totalCount: number
}
export interface CopyTemplateProps {
    visible: boolean
    recordData?: {
        canEditState: number
        code: string
        composition: string
        createBy: string
        createdAt: number
        customContent: {
            commonJob: {
                jobName: string
                jobType: string
                jobLevel: string
            }
        }
        title: string
        usedState: number
    }
    userCode?: string
    handleOk: () => void
    handleCancel: () => void
}
