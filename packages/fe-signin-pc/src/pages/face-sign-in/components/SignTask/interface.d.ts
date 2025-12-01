import type { SIGN_TYPE } from '../../const'
import type { TaskRule } from '../../interface'
export interface SignTaskProps {
    /** 是否展示打卡类型切换 */
    showSignTypeToggle: boolean
    /** 任务信息 */
    taskRule: TaskRule
    /**签到类型 */
    signType: SIGN_TYPE
    /** 搜索DOM */
    SearchDom?: JSX.Element
}
