/**
 * 题型分布详情
 */
import { memo } from 'react'
import QuestionList from './QuestionList'
import QuestionDetail from './QuestionDetail'
import styles from '../../index.modules.less'

const QuestionTabpane = () => {
    return (
        <div className={styles.question_tab_pane}>
            <QuestionList />
            <QuestionDetail />
        </div>
    )
}

export default memo(QuestionTabpane)
