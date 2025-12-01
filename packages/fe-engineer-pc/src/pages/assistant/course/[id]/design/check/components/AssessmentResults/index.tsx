import ClickEditTableH2Card from '@/modules/course/components/ClickEditTableH2Card'
import { cloneDeep } from 'lodash'
import { getAssessmentResultsColumns } from '../../const'
import type { AssessmentResultComposition } from '@/modules/course/types/check'
import { Table } from 'antd'
import { useState } from 'react'
// import { SyncOutlined } from '@ant-design/icons'

const AssessmentResults = ({
    assessmentResultCompositionList,
    onChangeBlur,
    title,
    dataTitle = '',
    isStylistic,
}: {
    assessmentResultCompositionList: AssessmentResultComposition[]
    onChangeBlur: (value: AssessmentResultComposition[]) => void
    title: string
    dataTitle?: string
    isStylistic?: boolean
}) => {
    const arr = [
        {
            name: '过程性考核',
            component: assessmentResultCompositionList?.filter(ele =>
                [1, 2, 3].includes(+ele.type),
            ),
        },
        {
            name: '终结性考核',
            component: assessmentResultCompositionList?.filter(ele => [4].includes(+ele.type)),
        },
    ]

    const [useWeightTotal, setUseWeightTotal] = useState(0)

    return (
        <ClickEditTableH2Card
            title={title}
            dataTitle={dataTitle}
            getColumns={(active, setActive, onDataChange, rowHeights) => {
                return getAssessmentResultsColumns(
                    active,
                    setActive,
                    useWeightTotal,
                    onDataChange,
                    rowHeights,
                )
            }}
            items={[
                {
                    name: '课程考核成绩构成',
                    key: 'assessmentResultCompositionList',
                },
            ]}
            transformValue={(value, setValue) => {
                const list = value?.assessmentResultCompositionList
                setValue?.([
                    {
                        name: '课程考核成绩构成',
                        key: 'assessmentResultCompositionList',
                        value: [
                            {
                                name: '过程性考核',
                                component: list?.filter(ele => [1, 2, 3].includes(+ele.type)),
                            },
                            {
                                name: '终结性考核',
                                component: list?.filter(ele => [4].includes(+ele.type)),
                            },
                        ],
                    },
                ])
            }}
            defaultValue={cloneDeep(arr)}
            onChangeBlur={e => {
                return onChangeBlur?.([...(e?.[0]?.component || []), ...(e?.[1]?.component || [])])
            }}
            rowKey={record => `row-${record.name}`}
            hideAI={isStylistic}
            // activeTitleRightRender={
            //     isStylistic ? (
            //         <>
            //             <Button
            //                 icon={<SyncOutlined />}
            //                 type="primary"
            //                 ghost
            //                 style={{ marginLeft: 16 }}
            //             >
            //                 从关键信息同步
            //             </Button>
            //         </>
            //     ) : null
            // }
            summary={(pageData: any) => {
                let weightTotal = 0

                pageData.forEach((item: any) => {
                    item.component?.forEach((ele: any) => {
                        weightTotal += ele.weight || 0
                    })
                })

                setUseWeightTotal(weightTotal)

                return (
                    <Table.Summary fixed>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={1} align="center">
                                合计
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={2}>-</Table.Summary.Cell>
                            <Table.Summary.Cell index={3} align="center">
                                {weightTotal}
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={4}>-</Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )
            }}
        />
    )
}

export default AssessmentResults
