/**
 * 教学方案设计
 */
export interface ICourseTeachingPlanInformation {
    /**
     * 课程编号
     */
    courseCode?: string
    /**
     * 学习任务列表
     */
    taskList: Task[]
    /**
     * 终结性任务
     */
    finalityTask: PeriodInfo

    /**
     * 学习任务活动设计列表
     */
    taskActivityDesignList: TaskActivityDesign[]
}

/**
 * 学习任务
 */
export interface Task extends PeriodInfo {
    /**
     * 任务编号
     */
    code: string
    /**
     * 任务名称
     */
    name: string
}

/**
 * 学时相关信息
 */
export interface PeriodInfo {
    /**
     * 基础学时
     */
    basePeriod: number
    /**
     * 预计学时
     */
    estimatePeriod: number
    /**
     * 机动学时
     */
    motorizedPeriod: number
}

/**
 * 任务活动设计
 */
export interface TaskActivityDesign {
    /**
     * 任务编号
     */
    code: string
    /**
     * 任务名称
     */
    name: string
    /**
     * 活动设计列表
     */
    activityDesignList: ActivityDesign[]
}

/**
 * 活动设计
 */
export interface ActivityDesign {
    teachingProcess: string
    learningContent: string
    studentActivity: string
    teacherActivity: string
    teachingMeans: string
    teachingMethods: string
    learningResult: string
}
