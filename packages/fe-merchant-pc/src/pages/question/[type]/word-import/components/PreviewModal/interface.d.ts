export interface DataSourceProps {
    appraisalPointName: string
    code: string
    level: string
    oneAppraisalRangeName: string
    oneAppraisalRangeCodeMark: string
    oneAppraisalRangeRate: number
    threeAppraisalRangeName: string
    threeAppraisalRangeCodeMark: string
    threeAppraisalRangeRate: number
    twoAppraisalRangeName: string
    twoAppraisalRangeCodeMark: string
    twoAppraisalRangeRate: number
}
export interface PreviewModalProps {
    visible: boolean
    closeDialog?: () => void
    authenticate?: string
    selectElementTable: any
}
