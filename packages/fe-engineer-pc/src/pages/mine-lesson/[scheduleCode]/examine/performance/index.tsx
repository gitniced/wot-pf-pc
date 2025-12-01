import { Avatar, Table } from 'antd'
import styles from './index.module.less'
import { performanceTableColumns } from './const'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useEffect, useMemo } from 'react'
import { useLocation, useParams } from 'umi'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import { getCookie } from '@/storage'
import useJudgeTeacher from '@/components/useJudgeTeacher'
import { getDecodeInfo, useSaasTitle } from '@wotu/wotu-components'
import Empty from '@/components/Empty'

const Index = observer(() => {
    useSaasTitle('考核-课堂表现')
    const isTeacher = useJudgeTeacher()
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const store = useLocalObservable(() => new Store())
    const { query } = useLocation<{
        query: {
            userCode: string
        }
    }>()
    const { userCode } = query || {}
    const { studentPerformance, getStudentPerformance, studentName, studentAvatar } = store

    const crumbData = useMemo(
        () => [
            {
                name: '考核',
                link: isTeacher
                    ? `/mine-lesson/${scheduleCode}/examine/rating/performance`
                    : `/mine-lesson/${scheduleCode}/examine/student`,
            },
            {
                name: '课堂表现',
                link: `/mine-lesson/${scheduleCode}/examine/performance`,
            },
        ],
        [scheduleCode],
    )

    useEffect(() => {
        getStudentPerformance(scheduleCode, userCode || getCookie('USER_CODE'))
    }, [scheduleCode, userCode])

    return (
        <div className={styles.performance}>
            <Breadcrumbs crumbData={crumbData} />

            {isTeacher && (
                <div className={styles.student_content}>
                    <Avatar src={studentAvatar} className={styles.avatar} />
                    <span className={styles.name}>
                        {getDecodeInfo(studentName, '1')}的课堂表现得分
                    </span>
                </div>
            )}

            <div className={styles.performance_content}>
                {studentPerformance.map(item => {
                    const { items = [] } = item || {}
                    return (
                        <div key={item.taskCode} className={styles.performance_content_item}>
                            <div className={styles.performance_content_item_title}>
                                <span>学习任务：</span>
                                <span>{item.taskName}</span>
                            </div>
                            <Table
                                className={styles.performance_content_item_table}
                                columns={performanceTableColumns}
                                dataSource={items}
                                pagination={false}
                                bordered
                            />
                        </div>
                    )
                })}
                {studentPerformance.length === 0 ? (
                    <Empty type="component" text="暂无数据" />
                ) : null}
            </div>
        </div>
    )
})

export default Index
