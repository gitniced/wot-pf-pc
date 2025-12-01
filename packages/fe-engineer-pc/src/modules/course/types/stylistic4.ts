export interface ICourseStylistic4 {
    courseCode?: string
    stageList: Stage[]
    literacyAssessmentList: LiteracyAssessment[]
    assessmentResultCompositionList: AssessmentResultComposition[]
}

export interface Stage {
    code: string
    name: string
    courseObjectives: string
    tasks: Task[]
    finalityEssentials: string
}

export interface Task {
    code: string
    name: string
    content: string
}

export interface LiteracyAssessment {
    code: string
    name: string
    objectives: string
    observationPoints: string
}

export interface AssessmentResultComposition {
    code: string
    name: string
    type: number
    weight: number
    evaluatedRubric: string
}
