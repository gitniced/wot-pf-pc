import { EXAMINE_COMMENT_TYPE } from '../../examine/student/const'
import type { EvaluationStatisticsDto } from '../../interface'
import styles from './index.module.less'
import { history, useParams } from 'umi'

const TodoList: React.FC<{
    isTeamLeader: boolean
    studentEvaluationStatistics: EvaluationStatisticsDto
}> = ({ isTeamLeader, studentEvaluationStatistics }) => {
    const { scheduleCode } = useParams<{ scheduleCode: string }>()

    const {
        selfEvaluationCount = 0,
        intraGroupPeerCount = 0,
        interGroupPeerCount = 0,
    } = studentEvaluationStatistics || {}

    // 队长时，三种统计都为0时不展示
    if (isTeamLeader && !selfEvaluationCount && !intraGroupPeerCount && !interGroupPeerCount)
        return null

    // 非队长时，两种统计都为0时不展示
    if (!isTeamLeader && !selfEvaluationCount && !intraGroupPeerCount) return null

    return (
        <div className={styles.todo_list}>
            <div className={styles.todo_list_title}>待办事项</div>
            <div className={styles.todo_list_content}>
                {String(selfEvaluationCount) !== '0' ? (
                    <div
                        className={styles.todo_list_content_item}
                        onClick={() => {
                            history.push(
                                `/mine-lesson/${scheduleCode}/examine/comment?type=${EXAMINE_COMMENT_TYPE.selfEvaluationCount}`,
                            )
                        }}
                    >
                        <span>学习任务考核·自评</span>
                        <span>
                            <span>{selfEvaluationCount}项</span>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={`#right`} />
                            </svg>
                        </span>
                    </div>
                ) : null}

                {String(intraGroupPeerCount) !== '0' ? (
                    <div
                        className={styles.todo_list_content_item}
                        onClick={() => {
                            history.push(
                                `/mine-lesson/${scheduleCode}/examine/comment?type=${EXAMINE_COMMENT_TYPE.intraGroupPeerCount}`,
                            )
                        }}
                    >
                        <span>学习任务考核·组内互评</span>
                        <span>
                            <span>{intraGroupPeerCount}项</span>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={`#right`} />
                            </svg>
                        </span>
                    </div>
                ) : null}
                {isTeamLeader && String(interGroupPeerCount) !== '0' ? (
                    <div
                        className={styles.todo_list_content_item}
                        onClick={() => {
                            history.push(
                                `/mine-lesson/${scheduleCode}/examine/comment?type=${EXAMINE_COMMENT_TYPE.interGroupPeerCount}`,
                            )
                        }}
                    >
                        <span>学习任务考核·组间互评</span>
                        <span>
                            <span>{interGroupPeerCount}项</span>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={`#right`} />
                            </svg>
                        </span>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default TodoList
