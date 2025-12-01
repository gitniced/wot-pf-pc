import { useLocation, useParams } from 'umi'
import styles from './index.module.less'
import { useEffect, useMemo } from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Table } from 'antd'
import { descriptionTableColumns } from './const'
import useJudgeTeacher from '@/components/useJudgeTeacher'
import { useSaasTitle } from '@wotu/wotu-components'
import Store from './store'
import { observer, useLocalObservable } from 'mobx-react'
const Index = observer(() => {
    useSaasTitle('考核项目说明')
    const isTeacher = useJudgeTeacher()
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const { query } = useLocation<{
        query: { userCode: string; taskCode: string; projectCode: string }
    }>()
    const { userCode, taskCode, projectCode } = query || {}
    const store = useLocalObservable(() => new Store())
    const { description, getDescription } = store

    const {
        projectName,
        assessmentOrg,
        outcomeForm,
        selfWeight,
        interGroupPeerWeight,
        intraGroupPeerWeight,
        teacherWeight,
        criteriaList = [],
    } = description || {}

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
                name: '考核项目说明',
                link: `/mine-lesson/${scheduleCode}/examine/description?taskCode=${taskCode}&projectCode=${projectCode}&userCode=${userCode}`,
            },
        ],
        [scheduleCode],
    )

    useEffect(() => {
        getDescription(projectCode)
    }, [projectCode])

    return (
        <div className={styles.description}>
            <Breadcrumbs crumbData={crumbData} />

            <div className={styles.description_content}>
                <div className={styles.description_content_title}>考核项目说明</div>
                <div className={styles.description_content_item}>
                    <span>考核项目：</span>
                    <span>{projectName}</span>
                </div>
                <div className={styles.description_content_item}>
                    <span>考核组织：</span>
                    <span>{assessmentOrg}</span>
                </div>
                <div className={styles.description_content_item}>
                    <span>成果形式：</span>
                    <span>{outcomeForm}</span>
                </div>
                <div className={styles.description_content_item}>
                    <span>评价方式：</span>
                    <div className={styles.description_content_item_commit}>
                        <div>
                            <p>自评（{selfWeight}%）</p>
                            <p>-主要评价报告的完整性和自己对装配任务的理解程度。</p>
                            <p>-学生根据自己的理解和完成情况，对报告内容进行自评我评价。</p>
                        </div>
                        <div>
                            <p>组内互评（{intraGroupPeerWeight}%）</p>
                            <p>
                                -学生之间相互评价报告，主要从报告的逻辑性、图文并茂程度和创新能力方面进行评价。
                            </p>
                            <p>-互评过程中需给出具体建议和改进意见。</p>
                        </div>
                        <div>
                            <p>组间互评（{interGroupPeerWeight}%）</p>
                            <p>-这里是一些说明</p>
                        </div>
                        <div>
                            <p>师评（{teacherWeight}%）</p>
                            <p>-教师根据学生的报告内容、完成质量以及考核过程中的表现进行评价。</p>
                            <p>-主要评价报告的整体质量、学生的理解深度和专业能力。</p>
                        </div>
                    </div>
                </div>
                <div className={styles.description_content_item}>
                    <span>评分细则：</span>
                    <Table
                        className={styles.description_content_table}
                        columns={descriptionTableColumns}
                        dataSource={criteriaList}
                        pagination={false}
                        bordered
                        summary={pageData => {
                            let totalWeight = 0

                            pageData.forEach(({ weight }) => {
                                totalWeight += weight
                            })

                            if (pageData.length > 0) {
                                return (
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={0} align="center" colSpan={2}>
                                            合计
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={1} align="center">
                                            {totalWeight}
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
