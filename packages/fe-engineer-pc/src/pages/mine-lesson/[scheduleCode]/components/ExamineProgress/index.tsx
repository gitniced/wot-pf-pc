import CircleProgress from '@/components/CircleProgress'
import styles from './index.module.less'
import type { AssessmentProgressDto } from '../../interface'

const ExamineProgress: React.FC<{ data: AssessmentProgressDto }> = ({ data }) => {
    const {
        /**
         * 课堂表现已得分数量
         */
        classPerformanceScored = 0,
        /**
         * 课堂表现总数量
         */
        classPerformanceTotal = 0,
        /**
         * 终结性考核得分
         */
        finalAssessmentScore = 0,
        /**
         * 终结性考核状态
         */
        finalAssessmentStatus = 0,
        /**
         * 最终得分
         */
        finalScore = 0,
        /**
         * 最终得分状态：0-未出分，1-已出分
         */
        finalScoreStatus = 0,
        /**
         * 课后作业已得分数量
         */
        homeworkScored = 0,
        /**
         * 课后作业总数量
         */
        homeworkTotal = 0,
        /**
         * 任务考核已得分数量
         */
        taskAssessmentScored = 0,
        /**
         * 任务考核总数量
         */
        taskAssessmentTotal = 0,
    } = data || {}
    const centerRender = (count: number, total: number) => (
        <div
            style={{
                userSelect: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <span style={{ fontWeight: 500, fontSize: 18, lineHeight: 24 }}>{count}</span>
            <span
                style={{
                    fontWeight: 400,
                    fontSize: 18,
                    color: 'rgba(0,0,0,0.65)',
                    lineHeight: 24,
                }}
            >
                /{total}
            </span>
        </div>
    )

    return (
        <div className={styles.examine_progress}>
            <div className={styles.examine_progress_title}>考核进度</div>
            <div className={styles.examine_progress_content}>
                <div className={styles.examine_progress_content_item}>
                    <div className={styles.examine_progress_content_item_value}>
                        <CircleProgress
                            strokeWidth={5}
                            current={Math.floor(
                                (classPerformanceScored / classPerformanceTotal) * 100,
                            )}
                            total={100}
                            centerRender={centerRender(
                                classPerformanceScored,
                                classPerformanceTotal,
                            )}
                        />
                    </div>
                    <div className={styles.examine_progress_content_item_label}>课堂表现</div>
                </div>
                <div className={styles.examine_progress_content_item}>
                    <div className={styles.examine_progress_content_item_value}>
                        <CircleProgress
                            strokeWidth={5}
                            current={Math.floor((homeworkScored / homeworkTotal) * 100)}
                            total={100}
                            centerRender={centerRender(homeworkScored, homeworkTotal)}
                        />
                    </div>
                    <div className={styles.examine_progress_content_item_label}>课后作业</div>
                </div>
                <div className={styles.examine_progress_content_item}>
                    <div className={styles.examine_progress_content_item_value}>
                        <CircleProgress
                            strokeWidth={5}
                            current={Math.floor((taskAssessmentScored / taskAssessmentTotal) * 100)}
                            total={100}
                            centerRender={centerRender(taskAssessmentScored, taskAssessmentTotal)}
                        />
                    </div>
                    <div className={styles.examine_progress_content_item_label}>任务考核</div>
                </div>
                <div className={styles.examine_progress_content_item}>
                    <div className={styles.examine_progress_content_item_value}>
                        {finalAssessmentStatus === 1 ? (
                            <div className={styles.examine_progress_text_number}>
                                {finalAssessmentScore}
                            </div>
                        ) : (
                            <div className={styles.examine_progress_text_null}>未出分</div>
                        )}
                    </div>
                    <div className={styles.examine_progress_content_item_label}>终结性考核</div>
                </div>
                <div className={styles.examine_progress_content_item}>
                    <div className={styles.examine_progress_content_item_value}>
                        {finalScoreStatus === 1 ? (
                            <div className={styles.examine_progress_text_number}>{finalScore}</div>
                        ) : (
                            <div className={styles.examine_progress_text_null}>未出分</div>
                        )}
                    </div>
                    <div className={styles.examine_progress_content_item_label}>最终得分</div>
                </div>
            </div>
        </div>
    )
}

export default ExamineProgress
