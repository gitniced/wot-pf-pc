// 阅卷页面
import PaperDetail from '@/pages/exam-manage/components/PaperDetail'
import styles from './index.module.less'
import { Alert, Button, Space, Spin } from 'antd'
import TopicList from './components/TopicList'
import Operate from './components/Operate'
import { observer, useLocalObservable } from 'mobx-react'
import GradingDetailStore from './store'
import { useEffect, useRef, useState } from 'react'
import { history, useParams } from 'umi'
import type { IRouteProps } from 'umi'
import type { GradingDetailReq, IQuery } from './interface'
import Empty from '@/components/Empty'
import { getLocalStorage, setLocalStorage } from '@/storage'

const GradingDetail = () => {
    const store = useLocalObservable(() => GradingDetailStore)
    const { taskCode } = useParams() as IRouteProps
    const { stuCode } = history.location.query as IQuery

    const [showAlert, setShowAlert] = useState<boolean>(!getLocalStorage('HIDE_GRADING_ALERT'))

    useEffect(() => {
        document.title = '阅卷'
        getGradingDetail()
    }, [stuCode, taskCode])

    const getGradingDetail = () => {
        const params: GradingDetailReq = { taskCode }
        if (stuCode) params.stuCode = stuCode
        store.getGradingDetail(params)
    }

    // 刷新
    const handleRefresh = () => {
        getGradingDetail()
    }

    // 返回阅卷任务列表
    const handleGoBack = () => {
        window.open('/exam-center/grading/grading-tasks?save_listTab=10', '_self')
    }

    const handleCloseAlert = () => {
        setLocalStorage('HIDE_GRADING_ALERT', true)
        setShowAlert(false)
    }

    return (
        <Spin spinning={store.loading}>
            <div className={styles.page_grading_detail}>
                {/* 试卷的基础信息 */}
                <PaperDetail source="teacher" {...store.gradingDetail} />
                {!store.gradingDetail.isFinish ? (
                    <div className={styles.content_wrapper}>
                        {showAlert && (
                            <Alert
                                showIcon
                                closable
                                type="info"
                                message="若考试设置了随机试卷，不同考生对应的试卷可能不同；若试卷本身设置了随机考卷或题目乱序，不同考生考卷对应的题目和题目顺序可能不同"
                                onClose={handleCloseAlert}
                            />
                        )}

                        <div className={styles.grading_wrapper}>
                            <TopicList />
                            <Operate />
                        </div>
                    </div>
                ) : (
                    <Empty
                        imageUrl="https://static.zpimg.cn/public/fe-exam-pc/no_grade.png"
                        content={
                            <>
                                <div className={styles.empty_text}>暂无可阅考卷</div>
                                <Space size={16}>
                                    <Button onClick={handleRefresh}>刷新</Button>
                                    <Button type="primary" onClick={handleGoBack}>
                                        返回阅卷任务列表
                                    </Button>
                                </Space>
                            </>
                        }
                        width={320}
                        height={320}
                    />
                )}
            </div>
        </Spin>
    )
}

export default observer(GradingDetail)
