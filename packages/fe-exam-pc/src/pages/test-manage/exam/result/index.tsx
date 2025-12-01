// 交卷结果

import styles from './index.module.less'
import { ClockCircleOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { FORCED_WINDING_STATE, SuccessIcon } from '../constant'
import { observer, useLocalObservable } from 'mobx-react'
import TestStore from '@/pages/test-manage/store'
import PaperStore from '@/pages/test-manage/exam/paper/store'
import { ObjectiveScoreState } from '../../constant'
import Logout from '../../components/Logout'
import { useEffect, useRef, useState } from 'react'
import { backUserQuickLogin } from '@/utils/urlUtils'
import useSiteStore from '@/hooks/useSiteStore'
import { findSiteData } from '@wotu/wotu-components'

// 等待时间60s
const WaitTime = 60
type Timeout = ReturnType<typeof setInterval>

const Result = () => {
    const siteStore = useSiteStore()

    const store = useLocalObservable(() => TestStore)
    const paperStore = useLocalObservable(() => PaperStore)

    const {
        title,
        objectiveScoreShowState,
        endJumpLink,
        cutAutoWindingNum,
        endPrompt = '交卷成功，请安静离开考场',
    } = store.examData
    const { forcedWindingState, wangGeYuanStudentStatus } = store.candidateData
    const { scoreResult } = paperStore
    const { score = 0, answeredTime, generateState } = scoreResult
    const showScore = objectiveScoreShowState === ObjectiveScoreState.ENABLE
    const isWangGeYuan = wangGeYuanStudentStatus !== -1

    const [count, setCount] = useState<number>(WaitTime)
    // 自动退出登录定时器
    const timeRef = useRef<Timeout | number>()
    const timeCountRef = useRef<number>(WaitTime)

    // 分数轮询定时器
    const scoreTimeRef = useRef<Timeout | number>()

    useEffect(() => {
        document.title = '交卷结果'

        if (!store.hasLoaded) {
            store.getExamData()
        }
        // 重新请求
        store.getCandidateData()
    }, [])

    useEffect(() => {
        paperStore.getScore()
        // generateState 为 true 表示分数已经算出来，关闭定时器
        if (generateState) {
            window.clearInterval(scoreTimeRef.current)
            return
        }

        scoreTimeRef.current = window.setInterval(() => {
            paperStore.getScore()
        }, 2000)

        return () => {
            window.clearInterval(scoreTimeRef.current)
        }
    }, [generateState])

    useEffect(() => {
        timeRef.current = window.setInterval(() => {
            // 倒计时结束后不再轮询
            if (timeCountRef.current <= 1) {
                window.clearInterval(timeRef.current)
                window.clearInterval(scoreTimeRef.current)

                // 如果是网格员自动跳转到技能考试
                if (isWangGeYuan) {
                    const personalDomain = findSiteData(siteStore.siteData, 'personalDomain', {
                        findKey: 'baseInfo',
                    })
                    window.location.replace(`${personalDomain}/question/card `)
                } else {
                    // 如果配置了跳转链接，跳转至配置的链接
                    if (endJumpLink) {
                        window.location.replace(endJumpLink!)
                    } else {
                        backUserQuickLogin(siteStore?.siteData)
                    }
                }

                return
            }

            timeCountRef.current = timeCountRef.current - 1
            setCount(_time => _time - 1)
        }, 1000)

        return () => {
            window.clearInterval(timeRef.current)
        }
    }, [store.examData])

    const handleLinkToPersonDomain = () => {
        const personalDomain = findSiteData(siteStore.siteData, 'personalDomain', {
            findKey: 'baseInfo',
        })

        window.location.replace(`${personalDomain}/question/card `)
    }

    return (
        <div className={styles.result_page}>
            {/* wangGeYuanStudentStatus 为-1，则该考生为学员，显示退出登录  */}
            <Logout showLogout={!isWangGeYuan} />
            <div className={styles.result_content_wrapper}>
                <div className={styles.result_content}>
                    <div className={styles.header_wrapper}>{title}</div>
                    <div className={styles.content_wrapper}>
                        <div className={styles.exam_time}>
                            <Space>
                                <ClockCircleOutlined size={20} />
                                <>答题时间：{answeredTime}分钟</>
                            </Space>
                        </div>
                        <div className={styles.text_wrapper}>
                            {forcedWindingState === FORCED_WINDING_STATE.SELF && (
                                <img src={SuccessIcon} alt="smile" />
                            )}
                            <div className={styles.text_inner}>
                                {forcedWindingState === FORCED_WINDING_STATE.SELF && (
                                    <span className={`${styles.text} ${styles.green}`}>
                                        {!isWangGeYuan ? endPrompt : '交卷成功'}
                                    </span>
                                )}
                                {forcedWindingState === FORCED_WINDING_STATE.TEEACHER && (
                                    <div className={styles.text}>
                                        巡考人员已操作强制收卷，请安静离开考场
                                    </div>
                                )}
                                {forcedWindingState === FORCED_WINDING_STATE.CUT_SCREEN && (
                                    <>
                                        <div className={`${styles.text} ${styles.red}`}>
                                            你已离开考试界面{cutAutoWindingNum}次
                                        </div>
                                        <div className={styles.text}>
                                            根据考试规则系统已强制收卷，请安静离开考场
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {showScore && (
                            <div className={styles.score_wrapper}>
                                {generateState ? (
                                    <>
                                        <div className={styles.text}>客观题成绩</div>
                                        <div className={styles.score}>{score}分</div>
                                    </>
                                ) : (
                                    '系统判分中，请稍候'
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {!isWangGeYuan && (
                    <div className={styles.wait_time}>
                        等待<span className={styles.count}> {count} </span>
                        秒后，自动退出系统。
                    </div>
                )}
                {isWangGeYuan && (
                    <div className={styles.special_jump_btn} onClick={handleLinkToPersonDomain}>
                        前往实训考试平台
                    </div>
                )}
            </div>
        </div>
    )
}

export default observer(Result)
