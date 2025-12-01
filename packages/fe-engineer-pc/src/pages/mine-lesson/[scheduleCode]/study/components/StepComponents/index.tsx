import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import type { LearningStepDto } from '../../task/interface'
import { observer, useLocalObservable } from 'mobx-react'
import { history, useLocation, useParams } from 'umi'
import Store from './store'
import type { TabsProps } from 'antd'
import { Badge } from 'antd'
import { Button, Tabs } from 'antd'
import StepTitle from '../StepTitle'
import StepGain from '../StepGain'
import StepHomework from '../StepHomework'
import StepResourceTitle from '../StepResourceTitle'
import StepResource from '../StepResource'
import { PersonCollaboration, TeamCollaboration } from './const'
import type { CollaborationType } from './interface'
import StepTest from '../StepTest'
import SwitchQuesRender from '../../../../../../modules/question/render/SwitchQuesRender'

const Index = observer((props: { isTeacher: boolean } & LearningStepDto) => {
    const { name, period, isTeacher = false } = props || {}
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const routeQuery = useLocation()
    const {
        //@ts-ignore
        query: { stepCode = '' },
    } = routeQuery || {}

    const contentRef = useRef(null)
    const contentTopRef = useRef(null)

    const store = useLocalObservable(() => new Store())
    const {
        hidePerformanceBtn,
        hasFinishPerformance,
        activityList,
        resourceList,
        currentResource,
        activityCode,
        studyGain,
        studyHomework,
        submissionStatus,
        classStatusStatistics,
        questionList,
        answerList,
        commentList,
        questionInfo,
        getQuestionList,
        updateGainItem,
        updateCurrentResource,
        getActivityList,
        getStudyResources,
        updateCurrentActivityCodeAndQuery,
        getStudyGain,
        getStudyHomework,
        getSubmissionStatus,
        getClassStatusStatistics,
        getPerformanceHideByCourseEvaluations,
    } = store

    const {
        isTeamLeader,
        outcomeSubmitted,
        // quizSubmitted,
        // homeworkSubmissionStatus = {},
    } = submissionStatus || {}

    const [domTopSticky, setDomTopSticky] = useState<boolean>(false)
    const [domLeftNum, setDomLeftNum] = useState<number>(0)

    const resizeHandler = () => {
        //@ts-ignore
        const domLeft = contentRef?.current?.offsetLeft || 0
        setDomLeftNum(domLeft)
    }

    const scrollHandler = () => {
        const currentScrollTop = document.querySelector('.right_content').scrollTop || 0
        const contentTopY = contentTopRef?.current?.offsetTop + contentTopRef?.current?.offsetHeight
        //@ts-ignore
        const domLeft = contentRef?.current?.offsetLeft - document.documentElement.scrollLeft || 0
        setDomLeftNum(domLeft)
        if (currentScrollTop > contentTopY) {
            setDomTopSticky(true)
        } else {
            setDomTopSticky(false)
        }
    }

    useEffect(() => {
        if (contentTopRef.current) {
            window.removeEventListener('resize', resizeHandler)
            window.removeEventListener('scroll', scrollHandler)
            document.querySelector('.right_content').removeEventListener('scroll', scrollHandler)
            //@ts-ignore
            const domLeft = contentTopRef?.current?.offsetLeft || 0
            setDomLeftNum(domLeft)
            window.addEventListener('resize', resizeHandler)
            window.addEventListener('scroll', scrollHandler)
            document.querySelector('.right_content').addEventListener('scroll', scrollHandler)
        }
        return () => {
            window.removeEventListener('resize', resizeHandler)
            window.removeEventListener('scroll', scrollHandler)
            document.querySelector('.right_content').removeEventListener('scroll', scrollHandler)
        }
    }, [])

    // /** 页面参数变化时更新页面参数 */
    // useEffect(() => {
    //     classCode && scheduleCode && stepCode && updatePageParams(classCode, scheduleCode, stepCode)
    // }, [classCode, scheduleCode, stepCode])

    /** 步骤变化时重新获取活动列表 */
    useEffect(() => {
        stepCode && getActivityList(stepCode)
    }, [stepCode])

    /** 活动编码变化时，更新学习相关内容 */
    useEffect(() => {
        scheduleCode && activityCode && getStudyGain(isTeacher, scheduleCode, activityCode)
        scheduleCode && activityCode && getStudyHomework(activityCode)
        scheduleCode && activityCode && getStudyResources(activityCode)
        scheduleCode && activityCode && getQuestionList(activityCode, isTeacher, scheduleCode)
    }, [scheduleCode, activityCode])

    const currentActivityDetail = activityList.find(item => item.code === activityCode) || {}
    const {
        code: currentActivityCode,
        // teacherContent,
        // studentContent,
        knowledgePoints = [],
        type: collaborationType,
    } = currentActivityDetail || {}

    const {
        outcomePendingCount = 0,
        outcomeSubmittedCount = 0,
        homeworkStats = [],
    } = classStatusStatistics || {}

    useEffect(() => {
        if (!isTeacher && currentActivityCode && collaborationType && scheduleCode) {
            getSubmissionStatus(scheduleCode, currentActivityCode, collaborationType)
        }
    }, [currentActivityCode, collaborationType, scheduleCode])

    useEffect(() => {
        if (isTeacher && currentActivityCode && scheduleCode) {
            getClassStatusStatistics(scheduleCode, currentActivityCode)
        }
    }, [currentActivityCode, scheduleCode])

    useEffect(() => {
        if (scheduleCode) {
            getPerformanceHideByCourseEvaluations(scheduleCode)
        }
    }, [scheduleCode])

    return (
        <div ref={contentRef} className={styles.content}>
            <div
                ref={contentTopRef}
                className={[styles.content_top, domTopSticky ? styles.content_top_fixed : ''].join(
                    ' ',
                )}
                style={{ left: `${domLeftNum}px` }}
            >
                <div className={styles.title_content}>
                    <div className={styles.title_content_name}>
                        <div>{name}</div>
                        <span>{period}学时</span>
                    </div>
                    {isTeacher && !hidePerformanceBtn ? (
                        <Button
                            type={'primary'}
                            className={styles.title_content_btn}
                            href={
                                hasFinishPerformance
                                    ? `/engineer-center/performance/info?scheduleCode=${scheduleCode}&stepCode=${stepCode}&mode=view`
                                    : `/engineer-center/performance/info?scheduleCode=${scheduleCode}&stepCode=${stepCode}&mode=grade`
                            }
                        >
                            {hasFinishPerformance ? '查看课堂表现评分' : '课堂表现评分'}
                        </Button>
                    ) : null}
                </div>
                <Tabs
                    activeKey={activityCode}
                    items={activityList as unknown as Required<TabsProps>['items']}
                    onTabClick={key => {
                        updateCurrentActivityCodeAndQuery(key)
                    }}
                />
            </div>
            <div className={styles.content_bottom}>
                {!isTeacher && knowledgePoints.length > 0 && (
                    <>
                        {/* <div className={styles.activity_content}>{studentContent}</div> */}
                        <div className={styles.knowledge_content}>
                            <div className={styles.label}>知识点：</div>
                            <div className={styles.value}>
                                {knowledgePoints.map(i => i.knowledgePointName).join(' | ')}
                            </div>
                        </div>
                    </>
                )}

                {isTeacher && knowledgePoints.length > 0 && (
                    <>
                        <StepTitle label="活动详情" />
                        {/* <div className={styles.knowledge_content}>
                            <div className={styles.label}>学生活动：</div>
                            <div className={styles.value}>{studentContent}</div>
                        </div>
                        <div className={styles.knowledge_content}>
                            <div className={styles.label}>教师活动：</div>
                            <div className={styles.value}>{teacherContent}</div>
                        </div> */}
                        <div className={styles.knowledge_content}>
                            <div className={styles.label}>知识点：</div>
                            <div className={styles.value}>
                                {knowledgePoints.map(i => i.knowledgePointName).join(' | ')}
                            </div>
                        </div>
                    </>
                )}

                {knowledgePoints.length > 0 && <div className={styles.split_line} />}

                <StepTitle
                    label="学习资源"
                    right={
                        <StepResourceTitle
                            list={resourceList}
                            current={currentResource}
                            onChange={updateCurrentResource}
                        />
                    }
                />

                <div className={styles.step_part_item}>
                    <StepResource list={resourceList} current={currentResource} />
                </div>

                {questionList?.length > 0 ? (
                    <>
                        <StepTitle
                            label="课堂测验"
                            right={
                                <div className={styles.gain_status_content}>
                                    {isTeacher ? (
                                        <>
                                            <div className={styles.result_info}>
                                                <span>{questionInfo.toSubmitCount}</span>
                                                待提交/
                                                {questionInfo.needCorrect ? (
                                                    <>
                                                        <span>{questionInfo.toCorrectCount}</span>
                                                        待批改/
                                                    </>
                                                ) : null}
                                                <span>{questionInfo.alreadyCorrectCount}</span>
                                                {questionInfo.needCorrect ? '已批改' : '已提交'}
                                            </div>
                                            <Button
                                                type={'link'}
                                                onClick={() => {
                                                    history.push(
                                                        `/quiz/${activityCode}?scheduleCode=${scheduleCode}`,
                                                    )
                                                }}
                                            >
                                                查看
                                            </Button>
                                        </>
                                    ) : answerList?.length > 0 ? (
                                        <Badge color="green" text="已提交" />
                                    ) : null}
                                </div>
                            }
                        />
                        {isTeacher ? (
                            questionList?.map(item => (
                                <div className={styles.ques_container} key={item.code}>
                                    <SwitchQuesRender
                                        key={item.code}
                                        data={item}
                                        showType
                                        showAnalysis
                                    />
                                </div>
                            ))
                        ) : (
                            <StepTest
                                questionList={questionList}
                                answerList={answerList}
                                commentList={commentList}
                                onSubmit={valus =>
                                    store.submitQuestion(valus, activityCode, scheduleCode)
                                }
                            />
                        )}
                    </>
                ) : null}

                <div className={styles.step_part_item} />

                <StepTitle
                    label="学习成果"
                    right={
                        isTeacher ? (
                            <div className={styles.gain_status_content}>
                                <div className={styles.submit_btn}>
                                    <div>
                                        {collaborationType === PersonCollaboration
                                            ? '个人提交'
                                            : '团队提交'}
                                    </div>
                                </div>

                                <div className={styles.result_info}>
                                    <span>{outcomePendingCount}</span>
                                    待提交/
                                    <span>{outcomeSubmittedCount}</span>
                                    已提交
                                </div>
                            </div>
                        ) : (
                            <div className={styles.gain_student_title}>
                                {collaborationType === TeamCollaboration ? (
                                    <div className={styles.gain_rule}>
                                        {' '}
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref={`#Warning-Circle-Fill`} />
                                        </svg>
                                        <span>学习成果由组长统一提交</span>
                                    </div>
                                ) : (
                                    <div />
                                )}
                                {outcomeSubmitted ? (
                                    <div className={styles.gain_status}>
                                        <div
                                            className={[styles.gain_status_sign, styles.green].join(
                                                ' ',
                                            )}
                                        />
                                        <div className={styles.gain_status_name}>已提交</div>
                                    </div>
                                ) : null}
                            </div>
                        )
                    }
                />

                <div className={styles.step_part_item}>
                    <StepGain
                        gainList={studyGain}
                        isTeacher={isTeacher}
                        collaborationType={collaborationType as CollaborationType}
                        isLeader={isTeamLeader || false}
                        outcomeSubmitted={outcomeSubmitted || false}
                        updateGainItem={updateGainItem}
                    />
                </div>

                <StepTitle label="课后作业" />

                <div className={styles.step_part_item}>
                    <StepHomework
                        homeworkList={studyHomework}
                        isTeacher={isTeacher}
                        homeworkStats={homeworkStats}
                    />
                </div>
            </div>
        </div>
    )
})

export default Index
