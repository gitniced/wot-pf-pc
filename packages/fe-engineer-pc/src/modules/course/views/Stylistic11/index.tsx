import ClickEditTableH2Card from '../../components/ClickEditTableH2Card'
import { getAssessmentColumns } from './const'
import styles from './index.module.less'
import Schedule from './Schedule'
import { useCourseStore } from '../../context'
import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { COURSE_DESIGN_STYLISTIC_MAP, COURSE_DESIGN_STYLISTIC } from '@/modules/course/const'
import StudyTaskList from '@/pages/assistant/course/[id]/design/teaching/components/StudyTaskList/index'
import { Button } from 'antd'
// import { SyncOutlined } from '@ant-design/icons'
import { history, useParams } from 'umi'

const Stylistic11: React.FC = observer(() => {
    const courseStore = useCourseStore()
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        courseStore.loadStylistic11()
    }, [courseStore])

    const stylistic11 = courseStore.stylistic11

    return (
        <div className={styles.stylistic}>
            <StudyTaskList
                title="一、学习任务列表"
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic11].name}
                taskList={stylistic11.taskList}
                finalityTask={stylistic11.finalityTask}
                onChangeBlur={value => {
                    return courseStore.saveStylistic11(value)
                }}
                isStylistic
            />

            <Schedule
                title="二、教学进度计划表"
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic11].name}
                defaultValue={stylistic11.taskTeachingScheduleList}
                onChangeBlur={value => {
                    return courseStore.saveStylistic11({
                        taskTeachingScheduleList: value as any,
                    })
                }}
                activeTitleRightRender={
                    <>
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
                    </>
                }
            />

            <ClickEditTableH2Card
                title="三、终结性考核安排"
                className={styles.stylistic_h2}
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic11].name}
                items={[
                    {
                        name: '三、终结性考核安排',
                        key: 'finalityWeekly',
                    },
                    {
                        name: '三、终结性考核安排',
                        key: 'finalityPeriod',
                    },
                    {
                        name: '三、终结性考核安排',
                        key: 'finalityAssessContent',
                    },
                ]}
                getColumns={getAssessmentColumns}
                transformValue={(value, setValue) => {
                    setValue?.([
                        {
                            name: '三、终结性考核安排',
                            key: 'finalityPeriod',
                            value: [
                                {
                                    finalityPeriod: value.finalityPeriod,
                                    finalityWeekly: value.finalityWeekly,
                                    finalityAssessContent: value.finalityAssessContent,
                                },
                            ],
                        },
                    ])
                }}
                defaultValue={[
                    {
                        finalityWeekly: stylistic11.finalityWeekly,
                        finalityPeriod: stylistic11.finalityPeriod,
                        finalityAssessContent: stylistic11.finalityAssessContent,
                    },
                ]}
                onChangeBlur={value => {
                    return courseStore.saveStylistic11(value?.[0])
                }}
                rowKey={record => `${record.finalityWeekly}-${record.finalityPeriod}`}
            />
        </div>
    )
})

export default Stylistic11
