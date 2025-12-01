import { Form, Space } from 'antd'
import TitleAdvance from '../edit/components/TitleAdvance'
import styles from './index.module.less'
import { useParams } from 'umi'
import { observer, useLocalObservable } from 'mobx-react'
import Breadcrumbs from '@/components/Breadcrumbs'

import PracticeStore from '../store'
import { useEffect } from 'react'
import type { CustomContent, RouteQuery } from '../interface'
import {
    QUESTION_COUNT_LIST,
    QUESTION_SELECT_TYPE,
    QUESTION_SELECT_TYPE_TEXT,
} from '../edit/constants'

const PracticeDetail = () => {
    const [form] = Form.useForm()
    const { code } = useParams() as RouteQuery

    const store = useLocalObservable(() => PracticeStore)
    const { practiceDetail } = store
    const { title, selectQuestionDto, questionType } = practiceDetail

    useEffect(() => {
        document.title = '详情'
        store.getPracticeDetail(code!)

        return () => {
            // 清空数据
            store.practiceDetail = { questionType: QUESTION_SELECT_TYPE.WORK }
        }
    }, [code])

    const renderSelectedCommonJob = () => {

        if (questionType === QUESTION_SELECT_TYPE.KNOWLEDGE) return null
        const { commonJobCustomDtoList = [] } = selectQuestionDto ?? {}
        const commonJob: string[] = []
        commonJobCustomDtoList.forEach((item: CustomContent) => {
            const { jobName, jobType, jobLevel } = item

            commonJob.push(`${jobName}/${jobType}/${jobLevel}`)
        })
        

        if (commonJob.length) {
            return `按职业目录选题：${commonJob.join('、')}`
        }

        return null
        
    }

    return (
        <div className={styles.page_practice_detail}>
            <Breadcrumbs
                crumbData={[
                    { link: '/practice/list', name: '练习' },
                    { link: '', name: '详情' },
                ]}
            />
            <div className={styles.content_wrapper}>
                <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
                    <TitleAdvance title="基本信息">
                        <Form.Item label="练习标题">{title}</Form.Item>
                    </TitleAdvance>

                    <TitleAdvance title="模拟题">
                        <Form.Item label="抽题方式">
                            <div className={styles.selected_type}>
                                {
                                    QUESTION_SELECT_TYPE_TEXT[questionType!]
                                }
                            </div>
                           
                            <div className={styles.selected_wrapper}>
                                {renderSelectedCommonJob()}

                                <div
                                    className={styles.total_count}
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
                </Form>
            </div>
        </div>
    )
}

export default observer(PracticeDetail)
