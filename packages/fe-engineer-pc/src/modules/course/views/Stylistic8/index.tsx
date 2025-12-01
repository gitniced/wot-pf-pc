import ClickEditTableH2Card from '@/modules/course/components/ClickEditTableH2Card'
import {
    getDescriptionAssessmentItemsTableColumns,
    getAssessmentScoreCompositionTableColumns,
} from './const'
import styles from './index.module.less'
import AssessmentItemScoringSheet from './AssessmentItemScoringSheet'
import { useEffect, useMemo } from 'react'
import { useCourseStore } from '../../context'
import { observer } from 'mobx-react'
import { cloneDeep } from 'lodash'
import { Table } from 'antd'
// import { Button } from 'antd'
// import { SyncOutlined } from '@ant-design/icons'

const Stylistic8: React.FC = observer(() => {
    const courseStore = useCourseStore()
    const activeListItem = useMemo(() => courseStore.activeListItem, [courseStore.activeListItem])

    useEffect(() => {
        if (!activeListItem?.code) return
        courseStore.loadStylistic8(activeListItem.code)
    }, [courseStore, activeListItem?.code])

    const stylistic8 = courseStore.stylistic8

    return (
        <div className={styles.stylistic}>
            <ClickEditTableH2Card
                title="一、学习任务考核项目说明"
                dataTitle={''}
                items={[]}
                getColumns={getDescriptionAssessmentItemsTableColumns}
                defaultValue={cloneDeep(stylistic8.studyTaskAssessmentPlanStageList)}
                onChangeBlur={value => {
                    return courseStore.saveStylistic8({
                        studyTaskAssessmentPlanStageList: value,
                    })
                }}
                className={styles.no_padding_table}
                hideAI
                rowKey={record => record.code || record.name}
                // activeTitleRightRender={
                //     <Button icon={<SyncOutlined />} type="primary" ghost style={{ marginLeft: 16 }}>
                //         从关键信息同步
                //     </Button>
                // }
            />

            <AssessmentItemScoringSheet
                title="二、学习任务考核项目评分表"
                onChangeBlur={value => {
                    return courseStore.saveStylistic8({
                        studyTaskAssessmentPlanCriteriaList: value,
                    })
                }}
                defaultValue={stylistic8.studyTaskAssessmentPlanCriteriaList}
            />

            <ClickEditTableH2Card
                title="三、学习任务考核成绩组成"
                dataTitle={''}
                items={[]}
                getColumns={getAssessmentScoreCompositionTableColumns.bind(null, activeListItem)}
                defaultValue={stylistic8.studyTaskAssessmentPlanGradeComposeList}
                onChangeBlur={value => {
                    return courseStore.saveStylistic8({
                        studyTaskAssessmentPlanGradeComposeList: value,
                    })
                }}
                hideAI
                rowKey={record => record.code || record.name}
                // activeTitleRightRender={
                //     <Button icon={<SyncOutlined />} type="primary" ghost style={{ marginLeft: 16 }}>
                //         从关键信息同步
                //     </Button>
                // }
                summary={(pageData: any) => {
                    let weightTotal = 0
                    // let selfWeightTotal = 0
                    // let peerWeightTotal = 0
                    // let teacherWeightTotal = 0

                    pageData.forEach(({ weight }: any) => {
                        weightTotal += weight
                        // selfWeightTotal += selfWeight
                        // peerWeightTotal += peerWeight
                        // teacherWeightTotal += teacherWeight
                    })

                    return (
                        <Table.Summary fixed>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={1} align="center">
                                    合计
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={2} align="center">
                                    {weightTotal}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={3} align="center">
                                    /
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={4} align="center">
                                    /
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={5} align="center">
                                    /
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={6} align="center">
                                    /
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        </Table.Summary>
                    )
                }}
            />
        </div>
    )
})

export default Stylistic8
