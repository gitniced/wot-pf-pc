import type { COURSE_DESIGN_STEP } from '@/modules/course/const'
import { COURSE_DESIGN_STEP_MAP_STYLISTIC, courseDesignStepItems } from '@/modules/course/const'
import { history, useParams, useLocation } from 'umi'
import styles from './index.module.less'
import { Button, Tooltip } from 'antd'
import { LeftOutlined, CheckCircleFilled } from '@ant-design/icons'
import { CourseStoreProvider, useCourseStore } from '@/modules/course/context'
import { useMemo } from 'react'
import { observer } from 'mobx-react'
import React from 'react'
import { useSaasTitle } from '@wotu/wotu-components'

const useCurrentLastPathname = <T extends string>(): T => {
    const { pathname } = useLocation()
    const pathSegments = pathname.split('/')
    return pathSegments[pathSegments.length - 1] || ''
}

const CourseDesignLayoutContent: React.FC = observer(props => {
    useSaasTitle(`课程设计`)
    const { id } = useParams<{ id: string }>()
    const currentStep = useCurrentLastPathname<COURSE_DESIGN_STEP>()

    const courseStore = useCourseStore()

    const courseName = useMemo(() => courseStore.course?.name || ' ', [courseStore.course])

    const stepReadyStatusMap = useMemo(
        () => courseStore.stepReadyStatusMap,
        [courseStore.stepReadyStatusMap],
    )

    return (
        <div className={styles.course_design_layout}>
            <div className={styles.header}>
                <div className={styles.header_left}>
                    <Tooltip title={courseName}>
                        <div className={styles.title}>{courseName}</div>
                    </Tooltip>

                    <Button
                        icon={<LeftOutlined />}
                        onClick={() => {
                            history.push('/assistant/home')
                        }}
                    >
                        返回
                    </Button>
                </div>
                <div className={styles.header_right}>
                    {courseDesignStepItems.map((item, index) => {
                        const isActive = currentStep === item.key

                        return (
                            <div key={item.key} className={styles.steps}>
                                <div
                                    className={[styles.steps_box, isActive && styles.active].join(
                                        ' ',
                                    )}
                                    onClick={() => {
                                        history.push(`/assistant/course/${id}/design/${item.key}`)
                                    }}
                                >
                                    <div
                                        className={styles.steps_content}
                                        style={{
                                            marginLeft: index === 0 ? '' : '48px',
                                        }}
                                    >
                                        <div className={styles.steps_box_header}>
                                            <div className={styles.title}>
                                                <div>{index + 1}</div>
                                                <div>{item.label}</div>
                                            </div>
                                            <div className={styles.progress}>
                                                {stepReadyStatusMap[item.key] ? (
                                                    <CheckCircleFilled
                                                        style={{
                                                            color: '#52C41A',
                                                            fontSize: '17.5px',
                                                        }}
                                                    />
                                                ) : (
                                                    <svg className="icon" aria-hidden="true">
                                                        <use xlinkHref={`#weiwancheng`} />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                        <div className={styles.text}>
                                            体例{' '}
                                            {COURSE_DESIGN_STEP_MAP_STYLISTIC[item.key]
                                                .map(i => i.key)
                                                .join('、')}
                                        </div>

                                        {isActive && <div className={styles.arrow} />}
                                    </div>

                                    {index + 1 !== courseDesignStepItems?.length && (
                                        <img src="https://static.zpimg.cn/public/fe-engineer-pc/images/icon_jiantou.png" />
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {props.children}
        </div>
    )
})

const CourseDesignLayout: React.FC = props => {
    const { id } = useParams<{ id: string }>()

    return (
        <CourseStoreProvider courseId={id}>
            <CourseDesignLayoutContent>{props.children}</CourseDesignLayoutContent>
        </CourseStoreProvider>
    )
}

export default React.memo(CourseDesignLayout)
