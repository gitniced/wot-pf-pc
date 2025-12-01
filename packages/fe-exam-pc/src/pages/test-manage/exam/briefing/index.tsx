// 考前须知

import styles from './index.module.less'
import { Alert, Button, Checkbox, Divider, Space } from 'antd'
import CountDown from '../../components/CountDown'
import { useEffect, useState } from 'react'
import { ClockCircleOutlined } from '@ant-design/icons'
import { observer, useLocalObservable } from 'mobx-react'

import TestStore from '@/pages/test-manage/store'
import Logout from '../../components/Logout'

const Briefing = () => {
    const store = useLocalObservable(() => TestStore)
    const { candidateData, examData } = store
    const { title, precautions, answerTime = 0, distanceStartTimeSec = 0 } = examData ?? {}
    // 考生的考试开始时间
    const { wangGeYuanStudentStatus } = candidateData ?? {}
    // 距离考试时间
    const [checked, setChecked] = useState<boolean>(false)

    const [diffTime, setDiffTime] = useState<number>(0)

    useEffect(() => {
        document.title = '考前须知确认'

        store.getCandidateData()
        store.getExamData()
    }, [])

    useEffect(() => {
        // 浏览器tab从隐藏到显示之后，需要重新计算当前的distanceStartTimeSec
        // 问题原因：https://www.cnblogs.com/bingchenzhilu/p/17457031.html
        document.addEventListener('visibilitychange', async () => {
            if (!document.hidden) {
                // 重新请求distanceStartTimeSec
                await store.getExamData()
            }
        })
    }, [])

    useEffect(() => {
        setDiffTime(distanceStartTimeSec * 1000)
    }, [distanceStartTimeSec])

    const onConfirm = () => {
        store.confirmPrecautions()
    }

    return (
        <div className={styles.briefing_page}>
            {/* wangGeYuanStudentStatus 为-1，则该考生为学员，显示退出登录  */}
            <Logout showLogout={wangGeYuanStudentStatus === -1} />
            <div className={styles.header_wrapper}>
                <div className={styles.exam_name}>{title}</div>
                <div className={styles.exam_time}>
                    <Space>
                        <ClockCircleOutlined />
                        答题时间：{answerTime}分钟
                    </Space>
                </div>
            </div>

            <div className={styles.briefing_wrapper}>
                <div className={styles.title}>考前须知</div>

                <Divider dashed />
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: precautions! }}
                />
                <Divider dashed />

                <div className={styles.checkbox_wrapper}>
                    <Checkbox
                        checked={checked}
                        onChange={e => {
                            setChecked(e.target.checked)
                        }}
                    >
                        我已完整阅读考前须知，并同意遵守考试规则
                    </Checkbox>
                </div>

                <div className={styles.confirm_btn_wrapper}>
                    {diffTime > 0 ? (
                        <Button type="primary" size="large" disabled={!checked || diffTime > 0}>
                            距离考试开始还有
                            {<CountDown diffTime={diffTime} callback={time => setDiffTime(time)} />}
                        </Button>
                    ) : (
                        <Button type="primary" size="large" disabled={!checked} onClick={onConfirm}>
                            开始考试
                        </Button>
                    )}
                </div>
            </div>

            <div className={styles.tips_wrapper}>
                <Alert
                    message="考试过程中，请不要退出、切换考试页面，请认真作答！"
                    type="warning"
                    showIcon
                />
            </div>
        </div>
    )
}

export default observer(Briefing)
