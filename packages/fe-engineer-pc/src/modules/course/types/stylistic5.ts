export interface FinalAssessmentStageQuestion {
    question: string
    answer: string
    scoringRules: string
}

export interface FinalAssessmentScoringCriterian {
    code: string
    name: string
    finalAssessmentStageQuestionList: FinalAssessmentStageQuestion[]
}

export interface FinalAssessmentQuestionStage {
    code: string
    name: string
    workRequirements: string
    workContent: string
}

export interface FinalAssessmentQuestion {
    code: string
    name: string
    question: string
}

export interface ICourseStylistic5 {
    taskCode?: string
    finalAssessmentName: string
    finalAssessmentDesc: string
    finalAssessmentQuestionsStageList: FinalAssessmentQuestionStage[]
    finalAssessmentQuestionList: FinalAssessmentQuestion[]
    finalAssessmentScoringCriterianList: FinalAssessmentScoringCriterian[]
}
