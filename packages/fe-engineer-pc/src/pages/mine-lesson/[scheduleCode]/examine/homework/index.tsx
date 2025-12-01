import { Avatar, Table } from 'antd'
import styles from './index.module.less'
import { homeworkTableColumns } from './const'
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
    useSaasTitle('考核-课后作业')
    const isTeacher = useJudgeTeacher()
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const store = useLocalObservable(() => new Store())
    const { query } = useLocation<{
        query: {
            userCode: string
        }
    }>()
    const { userCode } = query || {}
    const { studentHomework, getStudentHomework, studentName, studentAvatar } = store
    const crumbData = useMemo(
        () => [
            {
                name: '考核',
                link: isTeacher
                    ? `/mine-lesson/${scheduleCode}/examine/rating/performance`
                    : `/mine-lesson/${scheduleCode}/examine/student`,
            },
            {
                name: '课后作业',
                link: `/mine-lesson/${scheduleCode}/examine/homework`,
            },
        ],
        [scheduleCode],
    )

    useEffect(() => {
        getStudentHomework(scheduleCode, userCode || getCookie('USER_CODE'))
    }, [scheduleCode, userCode])

    return (
        <div className={styles.homework}>
            <Breadcrumbs crumbData={crumbData} />

            {isTeacher && (
                <div className={styles.student_content}>
                    <Avatar src={studentAvatar} className={styles.avatar} />
                    <span className={styles.name}>
                        {getDecodeInfo(studentName, '1')}的课后作业得分
                    </span>
                </div>
            )}

            <div className={styles.homework_content}>
                {studentHomework.map(item => {
                    const { items = [] } = item || {}
                    return (
                        <div key={item.taskCode} className={styles.homework_content_item}>
                            <div className={styles.homework_content_item_title}>
                                <span>学习任务：</span>
                                <span>{item.taskName}</span>
                            </div>
                            <Table
                                className={styles.homework_content_item_table}
                                columns={homeworkTableColumns}
                                dataSource={items}
                                pagination={false}
                                bordered
                            />
                        </div>
                    )
                })}
                {studentHomework.length === 0 ? <Empty type="component" text="暂无数据" /> : null}
            </div>
        </div>
    )
})

export default Index
