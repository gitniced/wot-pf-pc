// 考生信息确认

import { Button, Checkbox, Form, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import type { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { observer, useLocalObservable } from 'mobx-react'

import TestStore from '../store'
import styles from './index.module.less'
import dayjs from 'dayjs'
import Logout from '../components/Logout'
import Empty from '@/components/Empty'

const { Item } = Form

const CandidateInformation = () => {
    const store = useLocalObservable(() => TestStore)
    const { candidateData } = store
    const { wangGeYuanStudentStatus } = candidateData

    const [isConfirm, setIsConfirm] = useState<boolean>(false)

    useEffect(() => {
        document.title = '考生信息确认'

        if (store.hasLoaded) return
        // 考生信息
        store.getCandidateData()
        // 考试信息
        store.getExamData()
    }, [])

    const handleConfirm = (e: CheckboxChangeEvent) => {
        setIsConfirm(e.target.checked)
    }

    // 确认之后跳转至签到页面
    const handleLinkToSignInPage = () => {
        store.confirmCandidateInformation()
    }

    const formatTime = () => {
        const { startTime, endTime } = candidateData
        const _startTime = dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
        const _endTime = dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
        return `${_startTime} —— ${_endTime}`
    }

    const renderInformation = () => {
        const {
            name,
            certType,
            certnumber,
            admissionTicketNumber,
            seatNumber,
            examTitle,
            address,
        } = candidateData

        const items = [
            { label: '考生姓名', value: name },
            { label: '证件类型', value: certType },
            { label: '证件号码', value: certnumber },
            { label: '准考证号', value: admissionTicketNumber, hidden: !admissionTicketNumber },
            { label: '座位号', value: `${seatNumber}号`, hidden: !seatNumber },
            { label: '考试名称', value: examTitle },
            { label: '考试时间', value: formatTime() },
            { label: '考试地点', value: address, hidden: !address },
        ]

        return (
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} colon={false}>
                {items
                    .filter(item => !item.hidden)
                    .map(item => (
                        <Item label={item.label} key={item.value}>
                            {item?.value}
                        </Item>
                    ))}
            </Form>
        )
    }

    return (
        <Spin spinning={!store.hasLoaded}>
            <div className={styles.candidate_information_page}>
                {store.hasEnroll ? (
                    <div className={styles.candidate_information_inner}>
                        {/* wangGeYuanStudentStatus 为-1，则该考生为学员，显示退出登录  */}
                        <Logout showBg={false} showLogout={wangGeYuanStudentStatus === -1} />
                        <div className={styles.wrapper}>
                            <div className={styles.header_wrapper}>请确认考生考试信息</div>
                            <div className={styles.content_wrapper}>{renderInformation()}</div>
                            <div className={styles.footer_wrapper}>
                                <Checkbox onChange={handleConfirm}>
                                    我已认真核对我的考生信息准确无误，并确保本人参加考试
                                </Checkbox>
                                <Button
                                    type="primary"
                                    disabled={!isConfirm}
                                    onClick={handleLinkToSignInPage}
                                >
                                    确认
                                </Button>
                            </div>
                            {!isConfirm && (
                                <div className={styles.tips}>请校对您的考生信息并勾选确认</div>
                            )}
                        </div>
                    </div>
                ) : (
                    !candidateData.name && (
                        <div className={styles.empty_wrapper}>
                            <Empty
                                content="暂无考试信息"
                                imageUrl="https://static.zpimg.cn/public/fe_user_pc/images/not_found.png"
                                width={328}
                                height={328}
                            />
                        </div>
                    )
                )}
            </div>
        </Spin>
    )
}

export default observer(CandidateInformation)
