import type { CurrentEvaluationDto, ProjectLearningOutcomeDto } from '../../interface'
import { EXAMINE_COMMENT_TYPE } from '../../../student/const'

export interface CommentItemProps {
    /** 成果列表 */
    outcomeList: Partial<ProjectLearningOutcomeDto>[]
    /** 当前评价任务 */
    currentEvaluation: Partial<CurrentEvaluationDto>
    /** 是否正在提交评价 */
    isPendingSubmitEvaluation: boolean
    /** 提交评价 */
    submitEvaluation: (
        scheduleCode: string,
        type: keyof typeof EXAMINE_COMMENT_TYPE,
        currentEvaluation: Partial<CurrentEvaluationDto>,
    ) => void
    /** 更新评价内容 */
    updateComment: (evaluationTask: string, value: string) => void
    /** 更新评价标准 */
    updateCriteria: (evaluationTask: string, code: string, value: number | undefined) => void
}
