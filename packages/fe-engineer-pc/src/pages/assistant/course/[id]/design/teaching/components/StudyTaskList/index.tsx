import ClickEditTableH2Card from '@/modules/course/components/ClickEditTableH2Card'
import { getStudyTaskListColumns } from '@/modules/course/views/Stylistic11/const'
import { Table, Button } from 'antd'
import type { Task, PeriodInfo } from '@/modules/course/types/teaching'
import { useMemo } from 'react'
// import { SyncOutlined } from '@ant-design/icons'
import { useCourseStore } from '@/modules/course/context'
import { history, useParams } from 'umi'

const StudyTaskList = ({
    taskList,
    finalityTask,
    onChangeBlur,
    title,
    dataTitle = '',
    isStylistic,
}: {
    taskList: Task[]
    finalityTask: PeriodInfo
    onChangeBlur: (value: any) => void
    title: string
    dataTitle?: string
    isStylistic?: boolean
}) => {
    const tasks = [...taskList, { name: '终结性考核', ...finalityTask }]
    const courseStore = useCourseStore()
    const { id } = useParams<{ id: string }>()

    const activeTitleRightRender = useMemo(() => {
        return (
            <>
                {isStylistic && (
                    <Button
                        onClick={() => {
                            history.push(`/assistant/course/${id}/design/teaching`)
                            courseStore.callParentSetActiveKey(null)
                        }}
                    >
                        去编辑
                    </Button>
                )}
                {/* <Button icon={<SyncOutlined />} type="primary" ghost style={{ marginLeft: 16 }}>
                    从关键信息同步
                </Button> */}
            </>
        )
    }, [])

    return (
        <ClickEditTableH2Card
            title={title}
            dataTitle={dataTitle}
            items={[
                {
                    name: '学习任务列表',
                    key: 'tasks',
                },
            ]}
            getColumns={(active, setActive, handleDataChange) => {
                return getStudyTaskListColumns(active, setActive, tasks?.length, handleDataChange)
            }}
            defaultValue={tasks}
            onChangeBlur={value => {
                const obj = {
                    taskList: value.slice(0, taskList?.length),
                    finalityTask: value.slice(taskList?.length)?.[0],
                }
                // delete obj.finalityTask.name
                onChangeBlur(obj)
            }}
            activeTitleRightRender={activeTitleRightRender}
            hideAI
            rowKey={record => record.code || record.name}
            summary={(pageData: any) => {
                let basePeriodTotal = 0
                let estimatePeriodTotal = 0
                let motorizedPeriodTotal = 0

                pageData.forEach(
                    ({ basePeriod = 0, estimatePeriod = 0, motorizedPeriod = 0 }: any) => {
                        basePeriodTotal += basePeriod
                        estimatePeriodTotal += estimatePeriod
                        motorizedPeriodTotal += motorizedPeriod
                    },
                )

                return (
                    <Table.Summary fixed>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={1} colSpan={2} align="center">
                                总学时
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={2} align="center">
                                {basePeriodTotal}
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={3} align="center">
                                {estimatePeriodTotal}
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={4} align="center">
                                {motorizedPeriodTotal}
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )
            }}
        />
    )
}

export default StudyTaskList
