// 题型标题

import { Space } from 'antd'
import styles from './index.module.less'
import type { QuestionItem } from '../../interface'


const TypeTitle = (item: QuestionItem) => {
    const renderUnitScore = () => {
        if (item.unificationScore) {
            return `共${item.totalQuestion}题，每题${item.unificationScore}分`
        }
        return `共${item.totalQuestion}题`
    }

    return (
        <div className={styles.component_type_title}>
            <Space size={0}>
                <div className={styles.type}>{item.logicSort}、{item.title}</div>
                <div className={styles.total_score}>（{item.totalScore}分）</div>
                <div className={styles.total_question}>{renderUnitScore()}</div>
            </Space>
        </div>
    )
}

export default TypeTitle