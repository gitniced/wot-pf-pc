import { useEffect, useMemo } from 'react'
import { useLocation, useParams } from 'umi'
import styles from './index.module.less'
import type { BreadcrumbsProps } from '@/components/Breadcrumbs'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Avatar, Table } from 'antd'
import { getInfoTableColumns } from './const'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import useJudgeTeacher from '@/components/useJudgeTeacher'
import { getDecodeInfo, useSaasTitle } from '@wotu/wotu-components'

const Index = observer(() => {
    useSaasTitle('考核-学习任务考核')
    const isTeacher = useJudgeTeacher()
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const { query } = useLocation<{
        query: { taskCode: string; userCode: string }
    }>()
    const { taskCode, userCode } = query || {}

    const store = useLocalObservable(() => new Store())
    const { studentTaskAssessment, getStudentTaskAssessment } = store
    const { taskName, studentName, studentAvatar, items = [] } = studentTaskAssessment || {}

    const crumbData = useMemo<BreadcrumbsProps['crumbData']>(
        () => [
            {
                name: '考核',
                link: isTeacher
                    ? `/mine-lesson/${scheduleCode}/examine/rating/performance`
                    : `/mine-lesson/${scheduleCode}/examine/student`,
            },
            {
                name: taskName!,
                link: `/mine-lesson/${scheduleCode}/examine/grade/info?taskCode=${taskCode}&userCode=${userCode}`,
            },
        ],
        [scheduleCode, userCode, taskName],
    )
    const infoTableColumns = useMemo(
        () => getInfoTableColumns(scheduleCode, userCode),
        [scheduleCode, userCode],
    )

    useEffect(() => {
        if (scheduleCode && taskCode) {
            getStudentTaskAssessment(scheduleCode, taskCode, userCode)
        }
    }, [scheduleCode, taskCode, userCode])

    return (
        <div className={styles.info}>
            <Breadcrumbs crumbData={crumbData} />

            {isTeacher && (
                <div className={styles.student_content}>
                    <Avatar src={studentAvatar} className={styles.avatar} />
                    <span className={styles.name}>
                        {getDecodeInfo(studentName, '1')}的学习任务考核得分
                    </span>
                </div>
            )}

            <div className={styles.info_content}>
                <div className={styles.info_content_item}>
                    <div className={styles.info_content_item_title}>
                        <span>学习任务：</span>
                        <span>{taskName}</span>
                    </div>
                    <Table
                        className={styles.info_content_item_table}
                        columns={infoTableColumns}
                        dataSource={items}
                        pagination={false}
                        bordered
                        rowKey={'projectCode'}
                        summary={pageData => {
                            let totalWeight = 0
                            let totalScore = 0

                            pageData.forEach(({ weight, score }) => {
                                totalWeight += weight
                                totalScore += score
                            })

                            const isPending = pageData.some(item => String(item.status) === '0')

                            if (pageData.length > 0) {
                                return (
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={0} align="center">
                                            合计
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={1} align="center">
                                            {totalWeight}
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={2} align="center">
                                            {isPending ? '未出分' : totalScore}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                )
                            } else {
                                return null
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
})

export default Index
