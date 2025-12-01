// 右侧 保存

import { Button, Typography } from 'antd'
import styles from './index.module.less'
import { observer, useLocalObservable } from 'mobx-react'
import GradingDetailStore from '../store'
// @ts-ignore
import { history } from 'umi'
import type { IQuery } from '../interface'

const Operate = () => {
    const store = useLocalObservable(() => GradingDetailStore)
    const { gradingDetail, allQuestions, readQuestions } = store

    const { stuCode } = history.location.query as IQuery

    // 保存阅卷
    const handleSubmit = () => {
        const needLoadNext = !stuCode
        store.saveGrades(needLoadNext)
    }

    return (
        <div className={styles.component_operate}>
            <div className={styles.top_content}>
                <div className={styles.stu_name}>
                    <div className={styles.label}>考生姓名</div>
                    <div className={styles.value}>{gradingDetail.stuName}</div>
                </div>

                <div className={styles.read_count}>
                    <div className={styles.label}>已阅题数 / 待阅题数</div>
                    <div className={styles.value}>
                        <Typography.Link>{readQuestions}</Typography.Link>
                        <Typography.Text> / </Typography.Text>
                        <Typography.Text>{allQuestions - readQuestions}</Typography.Text>
                    </div>
                </div>

                <div className={styles.subject_score}>
                    <div className={styles.label}>主观题已阅得分</div>
                    <div className={styles.value}>{store.subjectiveScore.toFixed(2)}</div>
                </div>
            </div>
            <Button
                type="primary"
                size="large"
                disabled={readQuestions < allQuestions}
                onClick={handleSubmit}
            >
                保存{!stuCode ? '，批阅下一个' : ''}
            </Button>
        </div>
    )
}

export default observer(Operate)
