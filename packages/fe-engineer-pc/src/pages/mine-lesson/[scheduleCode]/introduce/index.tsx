import Breadcrumbs from '@/components/Breadcrumbs'
import { useEffect, useMemo } from 'react'
import styles from './index.module.less'
import { useLocation, useParams } from 'umi'
import { inject, observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import { COURSE_POSITION_LIST, WORK_CONTENT_LIST } from './const'
import { useSaasTitle } from '@wotu/wotu-components'
import useJudgeTeacher from '@/components/useJudgeTeacher'

const Introduce = () => {
    useSaasTitle(`课程介绍`)
    const isTeacher = useJudgeTeacher()
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const { query } = useLocation()
    const { courseCode } = query || {}
    const store = useLocalObservable(() => new Store())
    const {
        currentStep,
        currentStepName,
        stepList,
        updateCurrentStep,
        introduction,
        getIntroduction,
    } = store

    const crumbData = useMemo(
        () => [
            { name: '课程', link: `/mine-lesson/${scheduleCode}` },
            {
                name: '课程介绍',
                link: `/mine-lesson/${scheduleCode}/introduce${location.search}`,
            },
        ],
        [scheduleCode, courseCode],
    )

    const trackDotPosition = useMemo(() => {
        const activeIndex = stepList.findIndex((item: any) => item.key === currentStep)
        const topPosition = 12 + activeIndex * 36
        return topPosition
    }, [currentStep])

    useEffect(() => {
        if (courseCode) {
            getIntroduction(courseCode)
        }
    }, [courseCode])

    const isList = ['coursePositioning', 'workContent'].includes(currentStep)

    const ListInfo = useMemo(() => {
        const currentStepInfo = introduction[currentStep] || {}
        if (currentStep === 'coursePositioning') {
            return COURSE_POSITION_LIST.map((item: any) => (
                <div key={item.key}>
                    <p>{item.label}</p>
                    <p dangerouslySetInnerHTML={{ __html: currentStepInfo[item.key] }} />
                </div>
            ))
        }
        if (currentStep === 'workContent') {
            return WORK_CONTENT_LIST.map((item: any) => (
                <div key={item.key}>
                    <p>{item.label}</p>
                    <p dangerouslySetInnerHTML={{ __html: currentStepInfo[item.key] }} />
                </div>
            ))
        }
    }, [currentStep])

    return (
        <div className={styles.introduce}>
            <Breadcrumbs crumbData={crumbData} />

            <div
                className={[
                    styles.introduce_content,
                    isTeacher ? styles.teacher : styles.student,
                ].join(' ')}
            >
                <div className={styles.introduce_content_menu}>
                    <div className={styles.introduce_content_menu_track}>
                        <div
                            className={styles.introduce_content_menu_track_dot}
                            style={{ top: `${trackDotPosition}px` }}
                        />
                    </div>
                    <div className={styles.introduce_content_menu_list}>
                        {stepList.map((item: any) => (
                            <div
                                key={item.key}
                                className={`${styles.menu_item} ${
                                    currentStep === item.key ? styles.active : ''
                                }`}
                                onClick={() => {
                                    updateCurrentStep(item)
                                }}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.introduce_content_view}>
                    <div className={styles.introduce_content_view_title}>{currentStepName}</div>
                    <div className={styles.introduce_content_view_article}>
                        {isList ? (
                            ListInfo
                        ) : (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: introduction[currentStep] || '',
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject('userStore')(observer(Introduce))
