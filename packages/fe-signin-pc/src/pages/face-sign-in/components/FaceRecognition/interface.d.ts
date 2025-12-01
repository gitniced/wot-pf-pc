import type { SIGN_TIME_TYPE, SIGN_TYPE } from '../../const'
import type { TaskRule } from '../../interface'

export interface FaceRecognitionProps {
    /** 签到/退 时间状态 */
    signTimeType: SIGN_TIME_TYPE
    /**签到类型 */
    signType: SIGN_TYPE
    /** 任务信息 */
    taskRule: TaskRule
    /** 签到store */
    signStore: any
}
