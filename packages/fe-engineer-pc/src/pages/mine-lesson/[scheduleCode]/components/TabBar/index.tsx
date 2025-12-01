import classNames from 'classnames'
import styles from './index.module.less'
import { useEffect, useState } from 'react'
import { history, useParams } from 'umi'
import useJudgeTeacher from '@/components/useJudgeTeacher'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'
const Index: React.FC = observer(() => {
    const isTeacher = useJudgeTeacher()
    const store = useLocalObservable(() => new Store())
    const { getCourseEvaluations, firstEvaluationUrl } = store
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const [index, setIndex] = useState<number>(1)

    const tabCourse = `/mine-lesson/${scheduleCode}`
    const tabStudy = `/mine-lesson/${scheduleCode}/study`
    const tabExam = isTeacher ? firstEvaluationUrl : `/mine-lesson/${scheduleCode}/examine/student`
    /**全部考核路由 */
    const tabExamBasePath = `/mine-lesson/${scheduleCode}/examine`

    useEffect(() => {
        if (isTeacher && scheduleCode) getCourseEvaluations(scheduleCode)
    }, [isTeacher, scheduleCode])

    useEffect(() => {
        if (location.href.includes(tabExamBasePath)) {
            setIndex(3)
        } else if (location.href.includes(tabStudy)) {
            setIndex(2)
        } else {
            setIndex(1)
        }
    }, [location.pathname])

    useEffect(() => {
        if (location.href.includes(tabExamBasePath)) {
            setIndex(3)
        } else if (location.pathname.includes(tabStudy)) {
            setIndex(2)
        } else {
            setIndex(1)
        }
    }, [])

    return (
        <div className={styles.tab}>
            <div
                className={classNames(styles.tab_item, index === 1 ? styles.active : '')}
                onClick={() => {
                    history.push(`${tabCourse}`)
                }}
            >
                课程
            </div>
            <div
                className={classNames(styles.tab_item, index === 2 ? styles.active : '')}
                onClick={() => {
                    history.push(`${tabStudy}/roadmap`)
                }}
            >
                {isTeacher ? '教学' : '学习'}
            </div>
            <div
                className={classNames(styles.tab_item, index === 3 ? styles.active : '')}
                onClick={() => {
                    history.push(`${tabExam}`)
                }}
            >
                考核
            </div>
            <div className={styles.tab_bottom_line} />
        </div>
    )
})

export default Index
