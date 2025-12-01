export interface AcademicSituationAnalysis {
    refinementModules: string
    studentBase: string
    studentInsufficient: string
    improvementMethod: string
}

export interface LearningActivity {
    teachingProcess: string
    learningContent: string
    studentActivity: string
    teacherActivity: string
    teachingMeans: string
    teachingMethods: string
    learningResult: string
}

export interface LearningStep {
    stageCode: string
    stageName: string
    stageSort: number
    stagePeriod: number
    units: string
    time: string
    address: string
    learningGoal: string
    learningContent: string
    learningnNdusFocusAnalysis: string
    learningResourcePreparation: string
    reflection: string
    learningActivityList: LearningActivity[]
}

export interface StageMastermind {
    code: string
    name: string
    sort: number
    period: number
    learningStepList: LearningStep[]
}

export interface ICourseStylistic12 {
    taskCode?: string
    scenario: string
    materials: string
    requirements: string
    academicSituationAnalysisList: AcademicSituationAnalysis[]
    stageMastermindList: StageMastermind[]
}
