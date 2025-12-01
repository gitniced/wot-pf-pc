import CircleProgress from '@/components/CircleProgress'
import styles from './index.module.less'
import type { LearningProgressDto } from '../../interface'

/**
 * 学习进度
 */
const LearningProgress: React.FC<{ data: LearningProgressDto }> = ({ data }) => {
    const {
        completedTests = 0,
        totalTests = 0,
        completedOutcome = 0,
        totalOutcome = 0,
        completedHomework = 0,
        totalHomework = 0,
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
        <div className={styles.learning_progress}>
            <div className={styles.learning_progress_title}>学习进度</div>
            <div className={styles.learning_progress_content}>
                {totalTests ? (
                    <div className={styles.learning_progress_content_item}>
                        <div className={styles.learning_progress_content_item_value}>
                            <CircleProgress
                                strokeWidth={5}
                                current={Math.floor((completedTests / totalTests) * 100)}
                                total={100}
                                centerRender={centerRender(completedTests, totalTests)}
                            />
                        </div>
                        <div className={styles.learning_progress_content_item_label}>课堂测验</div>
                    </div>
                ) : null}
                {totalOutcome ? (
                    <div className={styles.learning_progress_content_item}>
                        <div className={styles.learning_progress_content_item_value}>
                            <CircleProgress
                                strokeWidth={5}
                                current={Math.floor((completedOutcome / totalOutcome) * 100)}
                                total={100}
                                centerRender={centerRender(completedOutcome, totalOutcome)}
                            />
                        </div>
                        <div className={styles.learning_progress_content_item_label}>学习成果</div>
                    </div>
                ) : null}
                {totalHomework ? (
                    <div className={styles.learning_progress_content_item}>
                        <div className={styles.learning_progress_content_item_value}>
                            <CircleProgress
                                strokeWidth={5}
                                current={Math.floor((completedHomework / totalHomework) * 100)}
                                total={100}
                                centerRender={centerRender(completedHomework, totalHomework)}
                            />
                        </div>
                        <div className={styles.learning_progress_content_item_label}>课后作业</div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default LearningProgress
