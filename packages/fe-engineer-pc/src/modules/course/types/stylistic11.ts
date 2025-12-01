export interface Task {
    code: string
    name: string
    basePeriod: number
    estimatePeriod: number
    motorizedPeriod: number
}

export interface FinalityTask {
    basePeriod: number
    estimatePeriod: number
    motorizedPeriod: number
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

export interface StageTeachingSchedule {
    code: string
    name: string
    period: number
    learningGoal: string
    learningContent: string
    weekly: number
    learningStepList: LearningStep[]
}

export interface TaskTeachingSchedule {
    code: string
    name: string
    stageTeachingScheduleList: StageTeachingSchedule[]
}

export interface ICourseStylistic11 {
    courseCode?: string
    taskList: Task[]
    finalityTask: FinalityTask
    taskTeachingScheduleList: TaskTeachingSchedule[]
    finalityWeekly: number
    finalityPeriod: number
    finalityAssessContent: string
}
