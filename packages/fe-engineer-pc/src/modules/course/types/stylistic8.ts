export interface ICourseStylistic8 {
    taskCode?: string
    studyTaskAssessmentPlanStageList: StudyTaskAssessmentPlanStage[]
    studyTaskAssessmentPlanCriteriaList: StudyTaskAssessmentPlanCriteria[]
    studyTaskAssessmentPlanGradeComposeList: StudyTaskAssessmentPlanGradeCompose[]
}

export interface StudyTaskAssessmentPlanStage {
    code: string
    name: string
    learningGoal: string
    assessmentPoints: string
    studyTaskAssmentPlanProjectList: StudyTaskAssmentPlanProject[]
}

export interface StudyTaskAssmentPlanProject {
    code: string
    assessmentProject: string
    assessmentProjectDesc: string
    weight: number
}

export interface StudyTaskAssessmentPlanCriteria {
    code: string
    name: string
    assessmentProject: string
    assessmentOrg: string
    outcomeForm: string
    evaluationMode: string
    criteria: string
}

export interface StudyTaskAssessmentPlanGradeCompose {
    code: string
    name: string
    weight: number
    selfWeight: number
    peerWeight: number
    teacherWeight: number
}
