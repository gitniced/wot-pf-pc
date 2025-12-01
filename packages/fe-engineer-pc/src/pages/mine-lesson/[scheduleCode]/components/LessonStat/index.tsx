import type { CourseStatisticsDto } from '../../interface'
import styles from './index.module.less'

/**
 * 课程统计
 */
const LessonStat: React.FC<{ data: CourseStatisticsDto }> = ({ data = {} }) => {
    return (
        <div className={styles.lesson_stat}>
            <div className={styles.lesson_stat_title}>课程统计</div>
            <div className={styles.lesson_stat_content}>
                <div className={styles.lesson_stat_content_item}>
                    <div className={styles.lesson_stat_content_item_value}>
                        {data.learningTaskCount || 0}
                    </div>
                    <div className={styles.lesson_stat_content_item_label}>学习任务</div>
                </div>
                <div className={styles.lesson_stat_content_item}>
                    <div className={styles.lesson_stat_content_item_value}>
                        {data.learningStageCount || 0}
                    </div>
                    <div className={styles.lesson_stat_content_item_label}>学习环节</div>
                </div>
                <div className={styles.lesson_stat_content_item}>
                    <div className={styles.lesson_stat_content_item_value}>
                        {data.learningStepCount || 0}
                    </div>
                    <div className={styles.lesson_stat_content_item_label}>学习步骤</div>
                </div>
                <div className={styles.lesson_stat_content_item}>
                    <div className={styles.lesson_stat_content_item_value}>
                        {data.learningActivityCount || 0}
                    </div>
                    <div className={styles.lesson_stat_content_item_label}>学习活动</div>
                </div>
                <div className={styles.lesson_stat_content_item}>
                    <div className={styles.lesson_stat_content_item_value}>
                        {data.knowledgePointCount || 0}
                    </div>
                    <div className={styles.lesson_stat_content_item_label}>知识点</div>
                </div>
            </div>
        </div>
    )
}

export default LessonStat
