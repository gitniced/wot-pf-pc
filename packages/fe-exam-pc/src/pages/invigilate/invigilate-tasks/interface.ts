export interface InvigilationTasksParams {
    examStartTime: number
    examEndTime: number,
    examState: number,
    examTitle: string,
    signType: number,
    organizationCode: string,
    pageNo: number,
    pageSize: number,
    projectTitle: string,
    projectType: number,
    examTime: string[]
}


export interface InvigilationItem {
    examCode: string,
    examStartTime: number
    examEndTime: number,
    examState: number,
    examTitle: string,
    signType: number,
    finishState: number,
    projectTitle: string,
    projectType: number,
    signEndMins: number,
    signStartMins: number,
    signState: number,
    stuCount: number,
    signTaskCode: string
}