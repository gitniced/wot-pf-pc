// 阅卷记录详情

import AnswerCard from './components/AnswerCard'
import PaperDetail from '../components/PaperDetail'
import TopicList from './components/TopicList'
import styles from './index.module.less'
import { useParams } from 'umi'
import type { IRouteParams } from './interface'
import { useEffect } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import RecordDetailStore from './store'
import { Spin } from 'antd'
import Empty from '@/components/Empty'

const RecordDetail = () => {
    const { stuExamCode } = useParams() as IRouteParams

    const store = useLocalObservable(() => RecordDetailStore)

    useEffect(() => {
        document.title = '阅卷记录详情'
        store.getRecordDetail(stuExamCode)
    }, [])

    return (
        <Spin spinning={store.loading}>
            {store.errMsg ? (
                <div className={styles.err_wrapper}>
                    <Empty content='暂无考卷信息' />
                </div>
            ) : (
                store.recordDetail?.questionList && (
                    <div className={styles.page_record_detail}>
                        {/* 试卷的基础信息 */}
                        <PaperDetail source="organization" {...store.recordDetail} />

                        <div className={styles.content_wrapper}>
                            {/* 答题卡 */}
                            <AnswerCard />
                            {/* 试卷下面的题目列表 */}
                            <TopicList />
                        </div>
                    </div>
                )
            )}
        </Spin>
    )
}

export default observer(RecordDetail)
