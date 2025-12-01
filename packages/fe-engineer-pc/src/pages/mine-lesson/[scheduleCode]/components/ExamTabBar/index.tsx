import classNames from 'classnames'
import styles from './index.module.less'
import { history, useParams } from 'umi'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import { useEffect } from 'react'
import useJudgeTeacher from '@/components/useJudgeTeacher'
const Index: React.FC = observer(() => {
    const isTeacher = useJudgeTeacher()
    const store = useLocalObservable(() => new Store())
    const { getCourseEvaluations, firstEvaluationUrl } = store
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const ratingBasePath = `/mine-lesson/${scheduleCode}/examine/rating`
    const gradeBasePath = `/mine-lesson/${scheduleCode}/examine/grade`

    const gradePath = `/mine-lesson/${scheduleCode}/examine/grade`

    const isActive = (path: string) => {
        return location.pathname.includes(path)
    }

    useEffect(() => {
        if (isTeacher && scheduleCode) getCourseEvaluations(scheduleCode)
    }, [isTeacher, scheduleCode])

    return (
        <div className={styles.tab}>
            <div
                className={classNames(
                    styles.tab_item,
                    isActive(ratingBasePath) ? styles.active : '',
                )}
                onClick={() => {
                    history.push(firstEvaluationUrl)
                }}
            >
                考核评分
            </div>
            <div
                className={classNames(
                    styles.tab_item,
                    isActive(gradeBasePath) ? styles.active : '',
                )}
                onClick={() => {
                    history.push(`${gradePath}`)
                }}
            >
                查看成绩
            </div>
        </div>
    )
})

export default Index
