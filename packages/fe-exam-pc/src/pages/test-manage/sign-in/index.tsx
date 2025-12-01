// 考生签到页面

import { useEffect, useRef, useState } from 'react'
import { SignInStatus, SignInStatusText } from './contant'
import CountDown from '../components/CountDown'

import styles from './index.module.less'
import { ClockCircleOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import classNames from 'classnames'
import TestStore from '../store'
import { observer, useLocalObservable } from 'mobx-react'
import { SignState } from '../constant'
import Logout from '../components/Logout'
import { ReactSVG } from 'react-svg'
import useMasterHistory from '@/hooks/userMasterHistory'

type Timeout = ReturnType<typeof setInterval>

const SignIn = () => {
    const masterHistory = useMasterHistory()

    const store = useLocalObservable(() => TestStore)
    const { examData, candidateData } = store
    const {
        title,
        distanceSignStartTimeSec,
        distanceSignEndTimeSec,
        distanceStartTimeSec = 0,
        distanceEndTimeSec = 0,
        answerTime = 0,
    } = examData
    const { wangGeYuanStudentStatus } = candidateData

    // 签到状态，总前提是没有签到的状态
    const [status, setStatus] = useState<number>(SignInStatus.NOT_START)

    let timeRef = useRef<Timeout | number>()

    useEffect(() => {
        store.getExamData()
        store.getCandidateData()

        // 轮询签到状态
        timeRef.current = window.setInterval(() => {
            // 是否已经结束
            const isFinished = distanceSignEndTimeSec === 0
            // 已经签到或者签到失效停止轮询
            const isSigned = store.candidateData.signState === SignState.YES
            if (isSigned || isFinished) {
                window.clearInterval(timeRef.current)
                setStatus(SignInStatus.FINISHED)
                isSigned && masterHistory.push('/exam-center/test-manage/exam/briefing')
                return
            }

            store.getCandidateData()
        }, 1000)

        return () => {
            window.clearInterval(timeRef.current)
        }
    }, [])

    // 修改签到状态
    const changeSignState = async () => {
        // 是否已经开始
        const isStart = distanceSignStartTimeSec === 0
        // 是否已经结束
        const isFinished = distanceSignEndTimeSec === 0

        setStatus(
            isFinished
                ? SignInStatus.FINISHED
                : isStart
                ? SignInStatus.ONGOING
                : SignInStatus.NOT_START,
        )
    }

    useEffect(() => {
        changeSignState()
    }, [store.examData])

    // 签到倒计时
    const diffTime = () => {
        if (status === SignInStatus.NOT_START) {
            return distanceSignStartTimeSec * 1000
        }

        if (status === SignInStatus.ONGOING) {
            return distanceSignEndTimeSec * 1000
        }

        return 0
    }

    // 签到倒计时（根据当前状态计算）
    // 如果已经完成签到，直接跳转至答题页面的考前须知
    // 没有签到，判断签到时间是否已经开始（当前时间 < 签到开始时间，没有开始，等待）
    // 已经开始，判断是否超过签到结束时间 （当前时间 > 签到结束时间，超过则缺考）
    // 没有超过签到结束时间，正常签到，页面轮询签到结果

    return (
        <div className={styles.sign_in_page}>
            {/* wangGeYuanStudentStatus 为-1，则该考生为学员，显示退出登录  */}
            <Logout showLogout={wangGeYuanStudentStatus === -1} />
            <div className={styles.sign_in_content}>
                <div className={styles.header_wrapper}>{title}</div>
                <div className={styles.content_wrapper}>
                    <div className={styles.exam_time}>
                        <Space>
                            <ClockCircleOutlined />
                            <>答题时间：{answerTime}分钟</>
                        </Space>
                    </div>

                    {status !== SignInStatus.FINISHED && (
                        <div className={styles.count_down_wrapper}>
                            <div className={styles.text}>
                                距离签到{status === SignInStatus.NOT_START ? '开始' : '结束'}
                                还有
                            </div>
                            {/* 倒计时结束之后修改状态 */}
                            <CountDown
                                diffTime={diffTime()}
                                callback={async () => {
                                    await store.getExamData()
                                    changeSignState()
                                }}
                            />
                        </div>
                    )}

                    <div className={classNames(styles.sign_in_text)}>
                        {status === SignInStatus.FINISHED && (
                            <ReactSVG
                                src={
                                    'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-exam-pc/Icon%EF%BC%8FFill%EF%BC%8FCheck-Circle-Fill-Waring.svg'
                                }
                                style={{ width: 84, height: 84 }}
                            />
                        )}
                        {status === SignInStatus.NOT_START && (
                            <ReactSVG
                                src={
                                    'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-exam-pc/Icon%EF%BC%8Ficon_weikaishi.svg'
                                }
                                style={{ width: 84, height: 84 }}
                            />
                        )}
                        {status === SignInStatus.ONGOING && (
                            <ReactSVG
                                src={
                                    'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-exam-pc/Icon%EF%BC%8FFill%EF%BC%8FCheck-Circle-Fill.svg'
                                }
                                style={{ width: 84, height: 84 }}
                            />
                        )}
                    </div>

                    <div className={styles.tips_text}>{SignInStatusText[status]}</div>
                </div>
            </div>
        </div>
    )
}

export default observer(SignIn)
