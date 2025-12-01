import { getStudentSituationAnalysisColumns } from './const'
import ClickEditMultiInputH3Card from '../../components/ClickEditMultiInputH3Card'
import ClickEditTableH3Card from '../../components/ClickEditTableH3Card'
import styles from './index.module.less'
import TeachingActivityDesign from './TeachingActivityDesign'
import classnames from 'classnames'
import { useCourseStore } from '../../context'
import { useEffect, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Button } from 'antd'
// import { SyncOutlined } from '@ant-design/icons'
import { history, useParams } from 'umi'

const Stylistic12: React.FC = observer(() => {
    const courseStore = useCourseStore()
    const { id } = useParams<{ id: string }>()
    const activeListItem = useMemo(() => courseStore.activeListItem, [courseStore.activeListItem])

    useEffect(() => {
        if (!activeListItem?.code) return
        courseStore.loadStylistic12(activeListItem.code)
    }, [courseStore, activeListItem?.code])

    const stylistic12 = courseStore.stylistic12

    return (
        <div className={styles.stylistic}>
            <div className={classnames(styles.stylistic_h2)}>
                <div className={styles.stylistic_item_header}>
                    <div className={styles.stylistic_item_title}>一、学习任务教学分析</div>

                    {/* <Button
                        onClick={() => {
                            history.push(`/assistant/course/${id}/design/teaching`)
                            courseStore.callParentSetActiveKey(null)
                        }}
                    >
                        去编辑
                    </Button> */}
                </div>
                <div className={styles.stylistic_item_content}>
                    <ClickEditMultiInputH3Card
                        title="1. 学习任务描述"
                        dataTitle="一、学习任务教学分析"
                        items={[
                            {
                                name: '（1）任务情景',
                                key: 'scenario',
                            },
                            {
                                name: '（2）任务资料',
                                key: 'materials',
                            },
                            {
                                name: '（3）任务要求',
                                key: 'requirements',
                            },
                        ]}
                        defaultValue={{
                            scenario: stylistic12.scenario,
                            materials: stylistic12.materials,
                            requirements: stylistic12.requirements,
                        }}
                        onChangeBlur={value => {
                            return courseStore.saveStylistic12(value)
                        }}
                    />

                    <ClickEditTableH3Card
                        title="2.学生情况分析"
                        dataTitle="一、学习任务教学分析"
                        items={[
                            {
                                name: '学生情况分析',
                                key: 'academicSituationAnalysisList',
                            },
                        ]}
                        getColumns={getStudentSituationAnalysisColumns}
                        defaultValue={stylistic12.academicSituationAnalysisList}
                        onChangeBlur={value => {
                            return courseStore.saveStylistic12({
                                academicSituationAnalysisList: value,
                            })
                        }}
                        rowKey={record => `row-${record.refinementModules}`}
                    />
                </div>
            </div>

            <TeachingActivityDesign
                title="二、学习环节教学活动设计"
                onChangeBlur={value => {
                    return courseStore.saveStylistic12({
                        stageMastermindList: value,
                    })
                }}
                defaultValue={stylistic12.stageMastermindList}
                activeTitleRightRender={
                    <div>
                        <Button
                            onClick={() => {
                                history.push(`/assistant/course/${id}/design/teaching`)
                                courseStore.callParentSetActiveKey(null)
                            }}
                        >
                            去编辑
                        </Button>
                        {/* <Button
                            icon={<SyncOutlined />}
                            type="primary"
                            ghost
                            style={{ marginLeft: 16 }}
                        >
                            从关键信息同步
                        </Button> */}
                    </div>
                }
            />
        </div>
    )
})

export default Stylistic12
