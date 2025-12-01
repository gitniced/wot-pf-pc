export interface AssessmentResultComposition {
    code: string
    name: string
    type: number
    weight: number
    evaluatedRubric: string
}

export interface EvaluatedRubricProject {
    code: string
    name: string
    weight: number
    learningOutcomeList: string[]
    evaluationRuleList: EvaluationRule[]
    selfWeight: number
    peerWeight: number
    teacherWeight: number
}

export interface evaluatedRubricProjectList {
    code: string
    name: string
    evaluatedRubricProjectList: EvaluatedRubricProject[]
}

export interface EvaluationRule {
    scoringRules: string
    evaluationCriteria: string
    weight: number
}

export interface EvaluatedRubric {
    code: string
    name: string
    evaluatedRubricProjectList: evaluatedRubricProjectList[]
}

export interface ICourseCheckInformation {
    courseCode?: string
    assessmentResultCompositionList: AssessmentResultComposition[]
    evaluatedRubricList: EvaluatedRubric[]
}
