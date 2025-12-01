// 试题查重

import Breadcrumbs from '@/components/Breadcrumbs'
import { Card, Space, Spin, Tooltip, Typography } from 'antd'
import { observer, useLocalObservable } from 'mobx-react'
import type { IRoute } from 'umi'
import { history } from 'umi'

import QuestionCheckStore from './store'

import styles from './index.module.less'
import { useEffect } from 'react'
import { POLLING_STATUS } from '@/pages/question/[type]/check/constants'
import { InfoCircleOutlined } from '@ant-design/icons'
import Result from './Result'
import useCommonParams from '@/hooks/useCommonParams'
import { getTitleByType } from '../utils'
// 重复的题目列表

const Check = () => {
    const store = useLocalObservable(() => QuestionCheckStore)
    const commonParams = useCommonParams()

    const { repeatedPaperDetail, paperTitle } = store

    const pageTitle = getTitleByType(commonParams)

    //  根据code获取试卷题数和重复试题数
    const { code, is_detail } = history.location.query as unknown as {
        code: string
        is_detail: string
    }

    // 判断是编辑页面还是预览页面
    const isDetail = is_detail === 'true'

    useEffect(() => {
        document.title = '试题查重'
        // 获取重复试卷详情
        store.getRepeatedPapaerDetail({ sourceFunction: 'exam', sourceCode: code }, commonParams)
        // 获取试卷详情(主要是为了拿到试卷title，后端说题库服务调考试服务很麻烦，OK Fine 那只能靠强大的前端啦)
        store.getPaperTitle(code, commonParams)
    }, [code])

    return (
        <Spin spinning={false}>
            <div className={styles.page_question_check}>
                <Breadcrumbs
                    crumbData={[
                        { name: pageTitle!, link: './list' },
                        {
                            name: isDetail ? '查看试卷结构' : '编辑',
                            link: isDetail
                                ? `./examine/detail?code=${code}`
                                : `./examine/edit?code=${code}`,
                        },
                        { name: '重复试题详情' },
                    ]}
                />

                <Card>
                    <Space size={16} direction="vertical">
                        <Typography.Title level={5}>{paperTitle}</Typography.Title>
                        <div className={styles.repeat_count_wrapper}>
                            <div className={styles.paper_question_count}>
                                <Typography.Text>试题题数：</Typography.Text>
                                <Typography.Text type="secondary">
                                    {repeatedPaperDetail.totalQuestion}题
                                </Typography.Text>
                            </div>
                            <div className={styles.paper_repeat_count}>
                                <Typography.Text>重复试题数</Typography.Text>
                                <Tooltip title="题目/题干内容完全一致视的若干试题视为1组">
                                    <InfoCircleOutlined />：
                                </Tooltip>
                                <Typography.Text type="secondary">
                                    {repeatedPaperDetail.totalGroup}组
                                </Typography.Text>
                            </div>
                        </div>
                    </Space>
                </Card>

                <div className={styles.container}>
                    {/* 查询结果 */}
                    <Result
                        pollingStatus={POLLING_STATUS.SUCCESS}
                        repeatedList={repeatedPaperDetail.questions ?? []}
                        showDelete={!isDetail}
                    />
                </div>
            </div>
        </Spin>
    )
}

const ObversePage: IRoute = observer(Check)
ObversePage.title = '试题查重'

export default ObversePage
