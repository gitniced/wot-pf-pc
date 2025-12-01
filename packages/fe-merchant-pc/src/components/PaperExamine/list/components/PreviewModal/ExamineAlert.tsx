/**
 * 标识
 * @returns
 */
import type { QuestionDetailType } from '../../interface'
import styles from '../../index.module.less'
import { questionTypeEnum } from '../../enums'

const ExamineAlert = ({ data }: { data: QuestionDetailType }) => {
    return (
        <div className={styles.examine_alert}>
            <div className={styles.examine_alert_serial}>{data.logicSort}、</div>
            <div className={styles.examine_alert_type}>
                {(questionTypeEnum as any)[data.questionType]}（{data.totalScore}分）
            </div>
            <div className={styles.examine_alert_description}>
                共 {data.questionList.length} 题
                {Boolean(data.unificationScore) && <span>，每题 {data.unificationScore} 分</span>}
            </div>
        </div>
    )
}
export default ExamineAlert
