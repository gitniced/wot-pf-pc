// 试卷顶部（考试名称、剩余时间、考生信息、交卷操作

import type { Timeout } from './types'
import styles from './index.module.less'
import CountDown from '@/pages/test-manage/components/CountDown'
import { Badge, Modal, Space, Tooltip, Typography } from 'antd'
import { ClockIcon, ArrowDownIcon } from '@/pages/test-manage/exam/constant'
import { observer, useLocalObservable } from 'mobx-react'

import TestStore from '@/pages/test-manage/store'
import PaperStore from '@/pages/test-manage/exam/paper/store'
import { useEffect, useRef } from 'react'
import { modalConfirm } from './modalConfirm'
import { ReactSVG } from 'react-svg'
import useMasterHistory from '@/hooks/userMasterHistory'
import { getDesenstitizedCertNum } from '@/utils/tool'
interface HeaderProps {
    setVisible: (e: boolean) => void
    handleSubmit: () => void
}

const Header: React.FC<HeaderProps> = ({ setVisible, handleSubmit }) => {
    const masterHistory = useMasterHistory()

    const store = useLocalObservable(() => TestStore)
    const paperStore = useLocalObservable(() => PaperStore)

    const {
        name,
        systemImg,
        signImg,
        seatNumber,
        admissionTicketNumber,
        certnumber,
        address,
        distanceAnswerEndTimeSec,
        distanceDeliveryTimeSec = 0,
    } = store.candidateData
    const { title, jobStr } = store.examData

    const autoSubmitTimer = useRef<Timeout | number>()

    const autoSubmit = () => {
        paperStore
            .submitExam()
            .then(() => {
                handleSubmit()
                masterHistory.push('/exam-center/test-manage/exam/result')
            })
            .catch(() => {
                window.clearInterval(autoSubmitTimer.current)
            })
    }

    useEffect(() => {
        // 浏览器tab从隐藏到显示之后，需要重新计算当前的distanceAnswerEndTimeSec
        // 问题原因：https://www.cnblogs.com/bingchenzhilu/p/17457031.html
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                // 重新请求answerTime
                store.getCandidateData()
            }
        })
    }, [])

    useEffect(() => {
        if (distanceAnswerEndTimeSec) {
            // 5秒轮询一次，判断是否已经到了答题时间
            autoSubmitTimer.current = window.setInterval(() => {
                store.getCandidateData()
                // 答题时间截止的时候，自动交卷
                if (distanceAnswerEndTimeSec! * 1000 === 0) {
                    autoSubmit()
                }
            }, 1000)
        }

        if (distanceAnswerEndTimeSec === 0) {
            autoSubmit()
        }

        return () => {
            window.clearInterval(autoSubmitTimer.current)
        }
    }, [distanceAnswerEndTimeSec])

    // 交卷
    const onSubmit = async () => {
        await store.getCandidateData()

        const diffTime = distanceDeliveryTimeSec * 1000
        // 判断是否到了最早交卷时间
        if (diffTime > 0) {
            Modal.warning({
                centered: true,
                okText: '我知道了',
                className: styles.modal_confirm,
                title: (
                    <Space>
                        还有
                        <CountDown diffTime={diffTime} />
                        可交卷，请耐心检查
                    </Space>
                ),
            })
            return
        }

        // 已经到了交卷时间，二次确认
        modalConfirm({
            title: (
                <Space>
                    距离考试结束还有
                    <CountDown diffTime={distanceAnswerEndTimeSec! * 1000} />
                </Space>
            ),
            onOk: () =>
                modalConfirm({
                    title: '请确认你的答案，交卷后无法重新进入答题、无法修改答案',
                    onOk: () => {
                        paperStore.submitExam().then(() => {
                            masterHistory.push('/exam-center/test-manage/exam/result')
                        })
                    },
                }),
        })
    }

    const renderStudent = () => {
        const items = [
            {
                key: 'name',
                label: '考生姓名',
                value: name,
                hidden: !name,
            },
            {
                key: 'admissionTicketNumber',
                label: '准考证号',
                value: admissionTicketNumber,
                hidden: !admissionTicketNumber,
            },
            {
                key: 'certnumber',
                label: '证件号码',
                value: getDesenstitizedCertNum(certnumber),
                hidden: !certnumber,
            },
            {
                key: 'address',
                label: '考试地点',
                value: address,
                hidden: !address,
            },
            {
                key: 'seatNumber',
                label: '座位号',
                value: seatNumber,
                hidden: !seatNumber,
            },
            {
                key: 'jobStr',
                label: '职业/工种/等级',
                value: jobStr,
                hidden: !jobStr,
            },
            {
                key: 'systemImg',
                label: '考生照片',
                value: (
                    <Space size={16}>
                        <Space direction="vertical" size={4} align="center">
                            {systemImg ? (
                                <img src={systemImg} width={80} height={112} />
                            ) : (
                                <div className="no_img">暂无照片</div>
                            )}
                            <Typography>系统照片</Typography>
                        </Space>
                        <Space direction="vertical" size={4} align="center">
                            {signImg ? (
                                <img src={signImg} width={80} height={112} />
                            ) : (
                                <div className="no_img">暂无照片</div>
                            )}
                            <Typography>签到照片</Typography>
                        </Space>
                    </Space>
                ),
                hidden: !systemImg && !signImg,
            },
        ]

        return (
            <div className={styles.candidate_info}>
                {items
                    .filter(item => !item.hidden)
                    .map(item => (
                        <div className="candidate_info_item" key={item.key}>
                            <span className="label">{item.label}</span>
                            <span className="value">{item.value}</span>
                        </div>
                    ))}
            </div>
        )
    }

    return (
        <div className={styles.components_header}>
            <div className={styles.name}>{title}</div>
            <div className={styles.count_down_wrapper}>
                <img src={ClockIcon} />
                <div className={styles.count_down_inner}>
                    剩余时间
                    <CountDown diffTime={distanceAnswerEndTimeSec! * 1000} />
                </div>
            </div>
            <div className={styles.right_wrapper}>
                <Tooltip
                    title={renderStudent}
                    color="#fff"
                    overlayClassName={styles.tooltip_wrapper}
                    placement="bottomRight"
                >
                    <div className={styles.content}>
                        <Space size={4}>
                            <span>{name} </span>
                            <img src={ArrowDownIcon} />
                        </Space>
                        <div className={styles.cert_number}>
                            {getDesenstitizedCertNum(certnumber)}
                        </div>
                    </div>
                </Tooltip>
                <div className={styles.message} onClick={() => setVisible(true)}>
                    <Badge count={store.msgList.length}>
                        <ReactSVG
                            src={
                                'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-exam-pc/icon_news_n.svg'
                            }
                            style={{ width: 24, height: 24 }}
                        />
                    </Badge>
                </div>
                <div className={styles.submit_btn} onClick={onSubmit}>
                    我要交卷
                </div>
            </div>
        </div>
    )
}

export default observer(Header)
