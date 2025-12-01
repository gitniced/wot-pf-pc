import { useEffect, useMemo } from 'react'
import { useLocation, useParams } from 'umi'
import styles from './index.module.less'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Avatar, Table } from 'antd'
import { getScoreTableColumns } from './const'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import useJudgeTeacher from '@/components/useJudgeTeacher'
import { getDecodeInfo, useSaasTitle } from '@wotu/wotu-components'

const Index = observer(() => {
    useSaasTitle('考核-考核项目得分')
    const isTeacher = useJudgeTeacher()
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const { query } = useLocation<{
        query: { userCode: string; taskCode: string; projectCode: string }
    }>()
    const { userCode, taskCode, projectCode } = query || {}

    const store = useLocalObservable(() => new Store())
    const { matrixByStudent, matrixByComments, getMatrixByStudent, getMatrixByComments } = store
    const {
        studentName,
        studentAvatar,
        items = [],
        projectName,
        taskName,
        selfWeight,
        intraGroupWeight,
        interGroupWeight,
        teacherWeight,
        // 合计
        totalWeight,
        selfTotal,
        intraGroupTotal,
        interGroupTotal,
        teacherTotal,
        total,
    } = matrixByStudent || {}

    const crumbData = useMemo(
        () => [
            {
                name: '考核',
                link: isTeacher
                    ? `/mine-lesson/${scheduleCode}/examine/rating/performance`
                    : `/mine-lesson/${scheduleCode}/examine/student`,
            },
            {
                name: '学习任务考核',
                link: `/mine-lesson/${scheduleCode}/examine/grade/info?taskCode=${taskCode}&userCode=${userCode}`,
            },
            {
                name: '查看得分',
                link: `/mine-lesson/${scheduleCode}/examine/grade/info/score?taskCode=${taskCode}&projectCode=${projectCode}&userCode=${userCode}`,
            },
        ],
        [scheduleCode],
    )

    useEffect(() => {
        if (scheduleCode && userCode && projectCode) {
            getMatrixByStudent(scheduleCode, projectCode, userCode)
            getMatrixByComments(scheduleCode, projectCode, userCode)
        }
    }, [scheduleCode, projectCode, userCode])

    const matrixTableColumns = useMemo(() => {
        if (
            selfWeight !== undefined &&
            intraGroupWeight !== undefined &&
            interGroupWeight !== undefined &&
            teacherWeight !== undefined
        ) {
            return getScoreTableColumns(
                selfWeight,
                intraGroupWeight,
                interGroupWeight,
                teacherWeight,
                userCode,
                projectCode,
            )
        }
        return []
    }, [selfWeight, intraGroupWeight, interGroupWeight, teacherWeight])

    return (
        <div className={styles.score}>
            <Breadcrumbs crumbData={crumbData} />

            {isTeacher && (
                <div className={styles.student_content}>
                    <Avatar src={studentAvatar} className={styles.avatar} />
                    <span className={styles.name}>
                        {getDecodeInfo(studentName, '1')}的考核项目得分
                    </span>
                </div>
            )}

            <div className={styles.score_wrapper}>
                <div className={styles.score_content}>
                    <div className={styles.score_content_title}>
                        <div className={styles.score_content_title_item}>
                            <span>学习任务：</span>
                            <span>{taskName}</span>
                        </div>
                        <div className={styles.score_content_title_item} style={{ marginTop: 24 }}>
                            <span>考核项目：</span>
                            <span>{projectName}</span>
                        </div>
                    </div>

                    <Table
                        className={styles.score_content_table}
                        columns={matrixTableColumns}
                        dataSource={items}
                        pagination={false}
                        bordered
                        summary={pageData => {
                            if (pageData.length > 0) {
                                return (
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={0} align="center" colSpan={2}>
                                            合计
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={1} align="center">
                                            {totalWeight}
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={2} align="center">
                                            {String(selfWeight) === '0'
                                                ? '-'
                                                : String(selfTotal?.status) === '0'
                                                ? '未出分'
                                                : selfTotal?.score}
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={2} align="center">
                                            {String(intraGroupWeight) === '0'
                                                ? '-'
                                                : String(intraGroupTotal?.status) === '0'
                                                ? '未出分'
                                                : intraGroupTotal?.score}
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={2} align="center">
                                            {String(interGroupWeight) === '0'
                                                ? '-'
                                                : String(interGroupTotal?.status) === '0'
                                                ? '未出分'
                                                : interGroupTotal?.score}
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={2} align="center">
                                            {String(teacherWeight) === '0'
                                                ? '-'
                                                : String(teacherTotal?.status) === '0'
                                                ? '未出分'
                                                : teacherTotal?.score}
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={2} align="center">
                                            {String(total?.status) === '0'
                                                ? '未出分'
                                                : total?.score}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                )
                            } else {
                                return null
                            }
                        }}
                    />
                </div>

                <div className={styles.score_commit}>
                    <div className={styles.score_commit_title}>改进意见：</div>
                    <div className={styles.score_commit_content}>
                        {matrixByComments.map(item => (
                            <div
                                key={item.evaluatorCode}
                                className={styles.score_commit_content_item}
                            >
                                <div className={styles.score_commit_content_item_top}>
                                    <Avatar
                                        src={item.evaluatorAvatar || defaultAvatar}
                                        className={styles.avatar}
                                    />
                                    <div className={styles.name}>{item.evaluatorName}</div>
                                </div>
                                <div className={styles.score_commit_content_item_bottom}>
                                    {item.comment}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Index
