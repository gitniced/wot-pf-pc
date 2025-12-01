import type { COURSE_DESIGN_STEP } from '../course/const'
import type { BIT_TYPE } from './const'

export interface IAIExchangeData {
    bizType?: BIT_TYPE
    courseCode: string
    courseDesignStep?: COURSE_DESIGN_STEP
    taskCode?: string
    stageCode?: string
    activityCode?: string
}
