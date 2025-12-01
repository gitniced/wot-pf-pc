import styles from './index.module.less'
import type { ClassProgressInfoDto } from '../../interface'
import { Progress } from 'antd'

/**
 * 班级进度
 */
const ClassProgress: React.FC<{ classProgress: ClassProgressInfoDto }> = ({ classProgress }) => {
    const {
        classPerformanceWeight = 0,
        quizProgressPercent = 0,
        quizGradedPercent = 0,
        outcomeProgressPercent = 0,
        homeworkGradedPercent = 0,
        homeworkSubmittedPercent = 0,
        classPerformancePercent = 0,
        taskAssessmentCompletedPercent = 0,
    } = classProgress || {}

    return (
        <div className={styles.learning_progress}>
            <div className={styles.learning_progress_title}>班级进度</div>
            <div className={styles.learning_progress_content}>
                {/* 课堂测验 */}
                <div className={styles.learning_progress_content_item}>
                    <div className={styles.learning_progress_content_item_label}>课堂测验</div>

                    <div className={styles.learning_progress_content_item_value}>
                        <div className={styles.learning_progress_content_item_value_name}>
                            <div>已提交</div>
                            <span>{quizProgressPercent}%</span>
                        </div>
                        <Progress percent={quizProgressPercent} showInfo={false} size="small" />
                        <div className={styles.learning_progress_content_item_value_name}>
                            <div>已批改</div>
                            <span>{quizGradedPercent}%</span>
                        </div>
                        <Progress percent={quizGradedPercent} showInfo={false} size="small" />
                    </div>
                </div>
                {/* 学习成果 */}
                <div className={styles.learning_progress_content_item}>
                    <div className={styles.learning_progress_content_item_label}>学习成果</div>
                    <div className={styles.learning_progress_content_item_value}>
                        <div className={styles.learning_progress_content_item_value_name}>
                            <div>已提交</div>
                            <span>{outcomeProgressPercent}%</span>
                        </div>
                        <Progress percent={outcomeProgressPercent} showInfo={false} size="small" />
                    </div>
                </div>
                {/* 课后作业 */}
                <div className={styles.learning_progress_content_item}>
                    <div className={styles.learning_progress_content_item_label}>课后作业</div>
                    <div className={styles.learning_progress_content_item_value}>
                        <div className={styles.learning_progress_content_item_value_name}>
                            <div>已提交</div>
                            <span>{homeworkSubmittedPercent}%</span>
                        </div>
                        <Progress
                            percent={homeworkSubmittedPercent}
                            showInfo={false}
                            size="small"
                        />
                        <div className={styles.learning_progress_content_item_value_name}>
                            <div>已批改</div>
                            <span>{homeworkGradedPercent}%</span>
                        </div>
                        <Progress percent={homeworkGradedPercent} showInfo={false} size="small" />
                    </div>
                </div>
                {/* 课堂表现评分 */}
                {classPerformanceWeight > 0 && (
                    <div className={styles.learning_progress_content_item}>
                        <div className={styles.learning_progress_content_item_label}>
                            课堂表现评分
                        </div>
                        <div className={styles.learning_progress_content_item_value}>
                            <div className={styles.learning_progress_content_item_value_name}>
                                <div>已完成</div>
                                <span>{classPerformancePercent}%</span>
                            </div>
                            <Progress
                                percent={classPerformancePercent}
                                showInfo={false}
                                size="small"
                            />
                        </div>
                    </div>
                )}
                {/* 学习任务考核 */}
                <div className={styles.learning_progress_content_item}>
                    <div className={styles.learning_progress_content_item_label}>学习任务考核</div>
                    <div className={styles.learning_progress_content_item_value}>
                        <div className={styles.learning_progress_content_item_value_name}>
                            <div>已完成</div>
                            <span>{taskAssessmentCompletedPercent}%</span>
                        </div>
                        <Progress
                            percent={taskAssessmentCompletedPercent}
                            showInfo={false}
                            size="small"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassProgress
