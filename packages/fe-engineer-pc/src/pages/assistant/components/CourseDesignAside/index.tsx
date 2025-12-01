import styles from './index.module.less'
import { CheckCircleFilled } from '@ant-design/icons'
import { Tooltip, Progress, message } from 'antd'
import {
    COURSE_DESIGN_LEARNING_TASK_TYPE,
    COURSE_DESIGN_STEP_LABEL,
    COURSE_DESIGN_STYLISTIC,
} from '@/modules/course/const'
import { COURSE_DESIGN_STEP } from '@/modules/course/const'
import type { ICourseDesignStylistic } from '@/modules/course/types'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useCourseStore } from '@/modules/course/context'
import { observer } from 'mobx-react'
import aiStore from '@/modules/ai/store'
import { BIT_TYPE } from '@/modules/ai/const'
import classNames from 'classnames'
import HrefContainer from '@/components/HrefContainer'
import { downloadWay } from '@/modules/course/service'
import { downloadFileByUrl } from '@/utils/file'
import dayjs from 'dayjs'

interface ICourseDesignAsideProps {
    step: COURSE_DESIGN_STEP
    stylisticList: ICourseDesignStylistic[]
    activeKey: number | null
    onActive: (key: number | null) => void
    rightRender?: React.ReactNode
    style?: React.CSSProperties
}

const CourseDesignAside: React.FC<ICourseDesignAsideProps> = observer(props => {
    const courseStore = useCourseStore()

    const designOverview = useMemo(() => {
        return courseStore.designOverview
    }, [courseStore.designOverview])

    const progressPercent = useMemo(() => {
        return designOverview.total ? Math.floor((designOverview.total / 12) * 100) : 0
    }, [designOverview.total])

    const activeListItem = useMemo(() => {
        return courseStore.activeListItem
    }, [courseStore.activeListItem])

    const getStylisticStatus = useCallback(
        (key: COURSE_DESIGN_STYLISTIC) => {
            switch (key) {
                case COURSE_DESIGN_STYLISTIC.stylistic1:
                    return designOverview.waysOne
                case COURSE_DESIGN_STYLISTIC.stylistic2:
                    return designOverview.waysTwo
                case COURSE_DESIGN_STYLISTIC.stylistic3:
                    return designOverview.waysThree
                case COURSE_DESIGN_STYLISTIC.stylistic4:
                    return designOverview.waysFour
                case COURSE_DESIGN_STYLISTIC.stylistic5:
                    return designOverview.waysFive
                case COURSE_DESIGN_STYLISTIC.stylistic6:
                    return designOverview.waysSix
                case COURSE_DESIGN_STYLISTIC.stylistic7:
                    return designOverview.waysSeven
                case COURSE_DESIGN_STYLISTIC.stylistic8:
                    return designOverview.waysEight
                case COURSE_DESIGN_STYLISTIC.stylistic9:
                    return designOverview.waysNine
                case COURSE_DESIGN_STYLISTIC.stylistic10:
                    return designOverview.waysTen
                case COURSE_DESIGN_STYLISTIC.stylistic11:
                    return designOverview.waysEleven
                case COURSE_DESIGN_STYLISTIC.stylistic12:
                    return designOverview.waysTwelve
                default:
                    return 0
            }
        },
        [designOverview],
    )

    useEffect(() => {
        const exchangeData = {
            bizType:
                props.activeKey === 1
                    ? BIT_TYPE.wayOne
                    : props.activeKey === 2
                    ? BIT_TYPE.wayTwo
                    : props.activeKey === 3
                    ? BIT_TYPE.wayThree
                    : props.activeKey === 4
                    ? BIT_TYPE.wayFour
                    : props.activeKey === 5
                    ? BIT_TYPE.wayFive
                    : props.activeKey === 6
                    ? BIT_TYPE.waySix
                    : props.activeKey === 7
                    ? BIT_TYPE.waySeven
                    : props.activeKey === 8
                    ? BIT_TYPE.wayEight
                    : props.activeKey === 9
                    ? BIT_TYPE.wayNine
                    : props.activeKey === 10
                    ? BIT_TYPE.wayTen
                    : props.activeKey === 11
                    ? BIT_TYPE.wayEleven
                    : props.activeKey === 12
                    ? BIT_TYPE.wayTwelve
                    : props.step === COURSE_DESIGN_STEP.learning
                    ? activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.task
                        ? BIT_TYPE.courseTaskKeyInfo
                        : activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.stage
                        ? BIT_TYPE.learningStageKeyInfo
                        : BIT_TYPE.learningActivityKeyInfo
                    : props.step === COURSE_DESIGN_STEP.teaching
                    ? BIT_TYPE.teachingPlan
                    : props.step === COURSE_DESIGN_STEP.check
                    ? BIT_TYPE.assessmentPlan
                    : BIT_TYPE.keyInformation,
            taskCode: undefined,
            stageCode:
                props.step === COURSE_DESIGN_STEP.learning &&
                activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.stage
                    ? activeListItem?.code
                    : undefined,
            activityCode:
                props.step === COURSE_DESIGN_STEP.learning &&
                activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.activity
                    ? activeListItem?.code
                    : undefined,
            courseCode: courseStore.courseCode,
            courseDesignStep: props.step,
        }

        if (activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.task) {
            if (props.step === COURSE_DESIGN_STEP.learning && props.activeKey !== 3) {
                exchangeData.taskCode = activeListItem.code
            } else if ([7, 12, 5, 8].includes(props.activeKey)) {
                exchangeData.taskCode = activeListItem.code
            }
        }

        aiStore.setExchangeData(exchangeData)
    }, [props.step, courseStore.courseCode, props.activeKey, activeListItem])

    const keyInformation = useMemo(() => {
        return props.step === COURSE_DESIGN_STEP.conversion
            ? designOverview.conversionKeyInformation
            : props.step === COURSE_DESIGN_STEP.learning
            ? designOverview.learningKeyInformation
            : props.step === COURSE_DESIGN_STEP.teaching
            ? designOverview.teachingKeyInformation
            : designOverview.checkKeyInformation
    }, [designOverview, props.step])

    const downloadAllWayHandler = useCallback(async () => {
        const hide = message.loading('下载中...')
        try {
            const url = await downloadWay({
                courseCode: courseStore.courseCode,
                type: 0,
            })
            message.success('下载成功')
            if (url) {
                downloadFileByUrl(
                    url,
                    `${courseStore.course?.name}-${dayjs().format('YYYYMMDDHHmmss')}`,
                )
            }
        } finally {
            hide()
        }
    }, [courseStore.courseCode, courseStore.course?.name])

    return (
        <div className={styles.course_design_aside} style={props.style}>
            <div className={styles.course_design_aside_main}>
                <div className={styles.course_design_aside_warp}>
                    <div className={styles.title}>
                        <div>第1步 关键信息设计</div>
                        <img src="https://static.zpimg.cn/public/fe-engineer-pc/images/button_ai_small.png" />
                    </div>

                    <div className={styles.list}>
                        <HrefContainer
                            url={`/assistant/course/${courseStore.courseCode}/design/${props.step}`}
                            className={classNames(
                                styles.list_item,
                                props.activeKey === null && styles.active,
                            )}
                            disableJump
                            onClick={() => props.onActive(null)}
                        >
                            {keyInformation === 1 ? (
                                <CheckCircleFilled
                                    style={{
                                        color: '#52C41A',
                                        fontSize: '1em',
                                    }}
                                />
                            ) : (
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={`#weiwancheng`} />
                                </svg>
                            )}

                            <div className={styles.text}>
                                {COURSE_DESIGN_STEP_LABEL[props.step]}
                            </div>
                        </HrefContainer>
                    </div>

                    <div className={styles.title}>
                        <div>第2步 生成体例</div>
                        <img src="https://static.zpimg.cn/public/fe-engineer-pc/images/button_ai_small.png" />
                    </div>

                    <div className={styles.list}>
                        {props.stylisticList.map(item => (
                            <HrefContainer
                                key={item.key}
                                url={`/assistant/course/${courseStore.courseCode}/design/${props.step}?stylistic=${item.key}`}
                                className={classNames(
                                    styles.list_item,
                                    item.key === props.activeKey && styles.active,
                                )}
                                disableJump
                                onClick={() => {
                                    props.onActive(item.key)
                                }}
                            >
                                {getStylisticStatus(item.key) === 1 ? (
                                    <CheckCircleFilled
                                        style={{
                                            color: '#52C41A',
                                            fontSize: '1em',
                                        }}
                                    />
                                ) : (
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref={`#weiwancheng`} />
                                    </svg>
                                )}

                                <Tooltip title={item.name} placement="right">
                                    <div className={styles.text}>{item.name}</div>
                                </Tooltip>
                            </HrefContainer>
                        ))}
                    </div>
                </div>

                <div className={styles.progress}>
                    <div className={styles.progress_content}>
                        <div className={styles.progress_content_left}>
                            <div className={styles.progress_content_title}>
                                <div>体例完成度</div>
                                <span>（总12份）</span>
                            </div>
                            <a onClick={downloadAllWayHandler}>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={`#download`} />
                                </svg>
                                下载
                            </a>
                        </div>

                        <div className={styles.progress_content_right}>
                            <Progress
                                type="circle"
                                percent={progressPercent}
                                width={64}
                                strokeColor={{
                                    '0%': '#1678FF',
                                    '100%': '#ABCFFF',
                                }}
                                trailColor={'transparent'}
                                className={styles.circle}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {props.rightRender}
        </div>
    )
})

export default CourseDesignAside
