import { Form, Space, Tooltip, Typography } from 'antd'
import TitleAdvance from '../edit/components/TitleAdvance'
import styles from './index.module.less'
import { useParams } from 'umi'
import { observer, useLocalObservable } from 'mobx-react'
import Breadcrumbs from '@/components/Breadcrumbs'

import PracticeStore from '../store'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import { PRACTICE_SOURCE } from '../constants'
import UserSelect from '../edit/components/UserSelect'
import type { CustomContent, RouteQuery } from '../interface'
import { InfoCircleOutlined } from '@ant-design/icons'
import { JOIN_USER_ENUM, QUESTION_COUNT_LIST, QUESTION_SELECT_TYPE } from '../edit/constants'

const PracticeDetail = () => {
    const [form] = Form.useForm()
    const { code } = useParams() as RouteQuery

    const store = useLocalObservable(() => PracticeStore)
    const { practiceDetail } = store
    const { title, startTime, endTime, selectQuestionDto, joinStatus, sourceType } = practiceDetail

    useEffect(() => {
        document.title = '详情'
        store.getPracticeDetail(code!)

        return () => {
            // 清空数据
            store.practiceDetail = {
                joinStatus: JOIN_USER_ENUM.NOT_LIMIT,
                questionType: QUESTION_SELECT_TYPE.WORK,
            }
        }
    }, [code])

    const renderSelectedCommonJob = () => {
        const { commonJobCustomDtoList = [] } = selectQuestionDto ?? {}
        if (!commonJobCustomDtoList.length) return null

        // 职业工种的等级存在的情况下才显示
        const commonJob: string[] = []
        commonJobCustomDtoList.forEach((item: CustomContent) => {
            const { jobName, jobType, jobLevel } = item
            commonJob.push(`${jobName}/${jobType}/${jobLevel}`)
        })

        return commonJob.join('、')
    }

    return (
        <div className={styles.page_practice_detail}>
            <Breadcrumbs crumbData={[{ link: '/practice/list', name: '练习' }, { name: '详情' }]} />
            <div className={styles.content_wrapper}>
                <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
                    <TitleAdvance title="基本信息">
                        <Form.Item
                            label={
                                sourceType === PRACTICE_SOURCE.SELF_BUILT
                                    ? '练习标题'
                                    : '资源库练习'
                            }
                        >
                            {title}
                        </Form.Item>
                        <Form.Item label="开始时间">
                            {startTime ? dayjs(startTime).format('YYYY-MM-DD') : '未设置'}
                        </Form.Item>
                        <Form.Item label="结束时间">
                            {endTime ? dayjs(endTime).format('YYYY-MM-DD') : '未设置'}
                        </Form.Item>
                    </TitleAdvance>

                    <TitleAdvance title="模拟题">
                        <Form.Item label="模拟题">
                            <div className={styles.selected_common_job}>
                                {renderSelectedCommonJob()}
                            </div>
                            <div className={styles.selected_wrapper}>
                                <div
                                    className={`${styles.question_count_item} ${styles.total_count}`}
                                >
                                    <span className={styles.label}>已选择模拟题总数：</span>
                                    <span className={styles.value}>
                                        {selectQuestionDto?.totalCount}题
                                    </span>
                                </div>
                                <Space align="center" size={32}>
                                    {QUESTION_COUNT_LIST.map(item => (
                                        <div className={styles.question_count_item} key={item.key}>
                                            <span className={styles.label}>{item.label}</span>
                                            <span className={styles.value}>
                                                {/* @ts-ignore */}
                                                {selectQuestionDto?.[item.key]}题
                                            </span>
                                        </div>
                                    ))}
                                </Space>
                            </div>
                        </Form.Item>
                    </TitleAdvance>

                    <TitleAdvance title="参与用户">
                        <Form.Item label="参与用户">
                            <Typography>
                                {joinStatus === JOIN_USER_ENUM.NOT_LIMIT ? (
                                    <Tooltip
                                        title="获得练习链接的登录用户均可进行练习"
                                        overlayClassName={styles.join_user_tooltip}
                                    >
                                        不限 <InfoCircleOutlined />
                                    </Tooltip>
                                ) : (
                                    '指定用户'
                                )}
                            </Typography>
                            {joinStatus === JOIN_USER_ENUM.PART && <UserSelect type="detail" />}
                        </Form.Item>
                    </TitleAdvance>
                </Form>
            </div>
        </div>
    )
}

export default observer(PracticeDetail)
