export interface AcademicSituationAnalysis {
    refinementModules: string
    studentBase: string
    studentInsufficient: string
    improvementMethod: string
}

export interface LearningStep {
    code: string
    name: string
    period: number
    learningContent: string
    studentActivity: string
    teacherActivity: string
    learningResult: string
    learningResource: string
}

export interface StageMastermind {
    code: string
    name: string
    period: number
    units: string
    time: string
    address: string
    learningGoal: string
    learningContent: string
    learningnNdusFocusAnalysis: string
    learningResourcePreparation: string
    reflection: string
    learningStepList: LearningStep[]
}

export interface ICourseStylistic7 {
    taskCode?: string
    period: number
    valueAnalysis: string
    academicSituationAnalysisList: AcademicSituationAnalysis[]
    focus: string
    nodus: string
    stageMastermindList: StageMastermind[]
}

export type IICourseStylistic7Analyze = AcademicSituationAnalysis
