/* eslint-disable react/no-array-index-key */
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import ClickEditInput from '@/components/ClickEditInput'
import ClickEditInputNumber from '@/components/ClickEditInputNumber'
import styles from './index.module.less'
import type { TableColumnsType } from 'antd'
import { sumBy } from 'lodash'

export const RowRender = (props: any) => {
    const { data = [], index, recordIndex, rowHeights, render } = props
    return (
        <>
            {data?.map((item: any, dataIndex: number) => {
                const subRowKey = `i_${index || ''}${recordIndex}${dataIndex}`
                const minH = rowHeights?.[subRowKey]
                return (
                    <div
                        key={subRowKey}
                        data-subrow={subRowKey}
                        style={{
                            minHeight: minH ? `${minH}px` : undefined,
                            borderBottom:
                                data?.length - 1 === dataIndex
                                    ? 'none'
                                    : '1px solid rgba(0, 0, 0, 0.06)',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            justifyContent: 'center',
                        }}
                        className={styles.row_render}
                    >
                        {render?.(item, dataIndex)}
                    </div>
                )
            })}
        </>
    )
}

export const getRuleColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    itemIndex: number,
    setRowObj: (val: Record<string, any>) => void,
    setLearningOutcomesModalOpen: (val: boolean) => void,
    setEvaluateModalOpen: (val: boolean) => void,
    weightTotal: number,
    taskCode: string,
    onDataChange?: (index: number, field: string, value: any, isOnChangeBlur?: boolean) => void,
    rowHeights?: Record<string, number>,
): TableColumnsType<any> => [
    {
        title: '学习环节',
        dataIndex: 'name',
        width: '10%',
        align: 'center',
        render: text => {
            return <>{text}</>
        },
    },
    {
        title: '考核项目',
        dataIndex: 'evaluatedRubricProjectList',
        width: '10%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <RowRender
                    data={record?.evaluatedRubricProjectList}
                    index={itemIndex}
                    recordIndex={index}
                    rowHeights={rowHeights}
                    render={(item: Record<string, any>, dataIndex: number) => {
                        return (
                            <div style={{ padding: '16px' }}>
                                <ClickEditInput
                                    key={index + record?.evaluatedRubricProjectList?.length}
                                    defaultValue={item?.name}
                                    active={active}
                                    setActive={setActive}
                                    placeholder="请输入"
                                    onChange={val => {
                                        item.name = val
                                        onDataChange?.(
                                            index,
                                            'evaluatedRubricProjectList',
                                            record?.evaluatedRubricProjectList,
                                        )
                                    }}
                                    onChangeBlur={val => {
                                        item.name = val
                                        onDataChange?.(
                                            index,
                                            'evaluatedRubricProjectList',
                                            record?.evaluatedRubricProjectList,
                                        )
                                    }}
                                />

                                {record?.evaluatedRubricProjectList?.length > 1 && (
                                    <div
                                        className={styles.del}
                                        onClick={() => {
                                            record.evaluatedRubricProjectList.splice(dataIndex, 1)
                                            onDataChange?.(
                                                index,
                                                'evaluatedRubricProjectList',
                                                record?.evaluatedRubricProjectList,
                                                true,
                                            )
                                        }}
                                    >
                                        <DeleteOutlined />
                                        <div className={styles.del_text}>删除此项</div>
                                    </div>
                                )}

                                <div
                                    className={styles.add}
                                    onClick={() => {
                                        record?.evaluatedRubricProjectList?.splice(
                                            dataIndex + 1,
                                            0,
                                            {
                                                code: '',
                                                name: '',
                                                weight: 0,
                                                learningOutcomeList: [],
                                                evaluationRuleList: [
                                                    {
                                                        scoringRules: '',
                                                        evaluationCriteria: '',
                                                        weight: 0,
                                                    },
                                                ],
                                            },
                                        )
                                        onDataChange?.(
                                            index,
                                            'evaluatedRubricProjectList',
                                            record?.evaluatedRubricProjectList,
                                            true,
                                        )
                                    }}
                                >
                                    <PlusOutlined />
                                </div>
                            </div>
                        )
                    }}
                />
            )
        },
    },
    {
        title: '配分(%)',
        dataIndex: 'weight',
        width: '5%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <RowRender
                    data={record?.evaluatedRubricProjectList}
                    index={itemIndex}
                    recordIndex={index}
                    rowHeights={rowHeights}
                    render={(item: Record<string, any>) => {
                        return (
                            <ClickEditInputNumber
                                defaultValue={Number(item?.weight)}
                                active={active}
                                setActive={setActive}
                                placeholder="请输入"
                                onChange={val => {
                                    item.weight = val
                                    onDataChange?.(
                                        index,
                                        'evaluatedRubricProjectList',
                                        record?.evaluatedRubricProjectList,
                                    )
                                }}
                                onChangeBlur={val => {
                                    item.weight = val
                                    onDataChange?.(
                                        index,
                                        'evaluatedRubricProjectList',
                                        record?.evaluatedRubricProjectList,
                                    )
                                }}
                                max={100 - (weightTotal - item?.weight)}
                            />
                        )
                    }}
                />
            )
        },
    },
    {
        title: '学习成果',
        dataIndex: 'learningOutcomeList',
        width: '10%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <RowRender
                    data={record?.evaluatedRubricProjectList}
                    index={itemIndex}
                    recordIndex={index}
                    rowHeights={rowHeights}
                    render={(item: Record<string, any>, dataIndex: number) => {
                        return (
                            <div className={styles.results_box}>
                                {item.learningOutcomeList?.map((rItem: any, rIndex: number) => (
                                    <div key={`i_${index}__r_${rIndex}`} className={styles.results}>
                                        <div className={styles.results_text}>
                                            {rIndex + 1}.{rItem?.name}
                                        </div>
                                        <DeleteOutlined
                                            onClick={() => {
                                                record?.evaluatedRubricProjectList[
                                                    dataIndex
                                                ].learningOutcomeList.splice(rIndex, 1)
                                                onDataChange?.(
                                                    index,
                                                    'evaluatedRubricProjectList',
                                                    record?.evaluatedRubricProjectList,
                                                    true,
                                                )
                                            }}
                                        />
                                    </div>
                                ))}

                                <div
                                    className={styles.add}
                                    style={{ position: 'static', margin: '0' }}
                                    onClick={() => {
                                        const add = (value: any) => {
                                            record.evaluatedRubricProjectList[
                                                dataIndex
                                            ].learningOutcomeList = value
                                            onDataChange?.(
                                                index,
                                                'evaluatedRubricProjectList',
                                                record?.evaluatedRubricProjectList,
                                                true,
                                            )
                                        }

                                        setRowObj({
                                            index,
                                            add,
                                            taskCode,
                                        })
                                        setLearningOutcomesModalOpen(true)
                                    }}
                                >
                                    <PlusOutlined />
                                </div>
                            </div>
                        )
                    }}
                />
            )
        },
    },
    {
        title: '评分细则',
        dataIndex: 'evaluationRuleList.scoringRules',
        width: '10%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <>
                    <RowRender
                        data={record?.evaluatedRubricProjectList}
                        index={itemIndex}
                        recordIndex={index}
                        rowHeights={rowHeights}
                        render={(item: Record<string, any>, dataIndex: number) => {
                            return (
                                <>
                                    {item?.evaluationRuleList?.map(
                                        (cellItem: any, cellIndex: number) => (
                                            <div
                                                key={`i_${index}_e_${cellIndex}`}
                                                className={styles.cell}
                                                style={{
                                                    borderBottom:
                                                        item?.evaluationRuleList?.length - 1 ===
                                                        cellIndex
                                                            ? 'none'
                                                            : '1px solid rgba(0, 0, 0, 0.06)',
                                                }}
                                            >
                                                <>
                                                    <ClickEditInput
                                                        key={
                                                            index +
                                                            cellIndex +
                                                            item?.evaluationRuleList?.length
                                                        }
                                                        defaultValue={cellItem?.scoringRules}
                                                        active={active}
                                                        setActive={setActive}
                                                        placeholder="请输入"
                                                        onChange={val => {
                                                            cellItem.scoringRules = val
                                                            onDataChange?.(
                                                                index,
                                                                'evaluatedRubricProjectList',
                                                                record?.evaluatedRubricProjectList,
                                                            )
                                                        }}
                                                        onChangeBlur={val => {
                                                            cellItem.scoringRules = val
                                                            onDataChange?.(
                                                                index,
                                                                'evaluatedRubricProjectList',
                                                                record?.evaluatedRubricProjectList,
                                                            )
                                                        }}
                                                    />

                                                    {item?.evaluationRuleList?.length > 1 && (
                                                        <div
                                                            className={styles.del}
                                                            onClick={() => {
                                                                record?.evaluatedRubricProjectList[
                                                                    dataIndex
                                                                ].evaluationRuleList.splice(
                                                                    cellIndex,
                                                                    1,
                                                                )
                                                                onDataChange?.(
                                                                    index,
                                                                    'evaluatedRubricProjectList',
                                                                    record?.evaluatedRubricProjectList,
                                                                    true,
                                                                )
                                                            }}
                                                        >
                                                            <DeleteOutlined />
                                                            <div className={styles.del_text}>
                                                                删除此项
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div
                                                        className={styles.add}
                                                        onClick={() => {
                                                            record?.evaluatedRubricProjectList[
                                                                dataIndex
                                                            ].evaluationRuleList.splice(
                                                                cellIndex + 1,
                                                                0,
                                                                {
                                                                    scoringRules: '',
                                                                    evaluationCriteria: '',
                                                                    weight: 0,
                                                                },
                                                            )
                                                            onDataChange?.(
                                                                index,
                                                                'evaluatedRubricProjectList',
                                                                record?.evaluatedRubricProjectList,
                                                                true,
                                                            )
                                                        }}
                                                    >
                                                        <PlusOutlined />
                                                    </div>
                                                </>
                                            </div>
                                        ),
                                    )}
                                </>
                            )
                        }}
                    />
                </>
            )
        },
    },
    {
        title: '评价标准',
        dataIndex: 'evaluationRuleList.evaluationCriteria',
        width: '10%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <>
                    <RowRender
                        data={record?.evaluatedRubricProjectList}
                        index={itemIndex}
                        recordIndex={index}
                        rowHeights={rowHeights}
                        render={(item: Record<string, any>) => {
                            return (
                                <>
                                    {item?.evaluationRuleList?.map(
                                        (cellItem: any, cellIndex: number) => (
                                            <div
                                                key={`i_${index}_e_${cellIndex}`}
                                                className={styles.cell}
                                                style={{
                                                    borderBottom:
                                                        item?.evaluationRuleList?.length - 1 ===
                                                        cellIndex
                                                            ? 'none'
                                                            : '1px solid rgba(0, 0, 0, 0.06)',
                                                }}
                                            >
                                                <ClickEditInput
                                                    key={
                                                        index +
                                                        cellIndex +
                                                        item?.evaluationRuleList?.length
                                                    }
                                                    defaultValue={cellItem?.evaluationCriteria}
                                                    active={active}
                                                    setActive={setActive}
                                                    placeholder="请输入"
                                                    onChange={val => {
                                                        cellItem.evaluationCriteria = val
                                                        onDataChange?.(
                                                            index,
                                                            'evaluatedRubricProjectList',
                                                            record?.evaluatedRubricProjectList,
                                                        )
                                                    }}
                                                    onChangeBlur={val => {
                                                        cellItem.evaluationCriteria = val
                                                        onDataChange?.(
                                                            index,
                                                            'evaluatedRubricProjectList',
                                                            record?.evaluatedRubricProjectList,
                                                        )
                                                    }}
                                                />
                                            </div>
                                        ),
                                    )}
                                </>
                            )
                        }}
                    />
                </>
            )
        },
    },
    {
        title: '权重(%)',
        dataIndex: 'weight',
        width: '2%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <>
                    <RowRender
                        data={record?.evaluatedRubricProjectList}
                        index={itemIndex}
                        recordIndex={index}
                        rowHeights={rowHeights}
                        render={(item: Record<string, any>) => {
                            return (
                                <>
                                    {item?.evaluationRuleList?.map(
                                        (cellItem: any, cellIndex: number) => (
                                            <div
                                                key={`i_${index}_e_${cellIndex}`}
                                                className={styles.cell}
                                                style={{
                                                    borderBottom:
                                                        item?.evaluationRuleList?.length - 1 ===
                                                        cellIndex
                                                            ? 'none'
                                                            : '1px solid rgba(0, 0, 0, 0.06)',
                                                }}
                                            >
                                                <ClickEditInputNumber
                                                    key={
                                                        index +
                                                        cellIndex +
                                                        item?.evaluationRuleList?.length
                                                    }
                                                    defaultValue={Number(cellItem?.weight)}
                                                    active={active}
                                                    setActive={setActive}
                                                    placeholder="请输入"
                                                    onChange={val => {
                                                        cellItem.weight = val
                                                        onDataChange?.(
                                                            index,
                                                            'evaluatedRubricProjectList',
                                                            record?.evaluatedRubricProjectList,
                                                        )
                                                    }}
                                                    onChangeBlur={val => {
                                                        cellItem.weight = val
                                                        onDataChange?.(
                                                            index,
                                                            'evaluatedRubricProjectList',
                                                            record?.evaluatedRubricProjectList,
                                                        )
                                                    }}
                                                    max={
                                                        item.weight -
                                                        ((sumBy(
                                                            item?.evaluationRuleList,
                                                            'weight',
                                                        ) || 0) -
                                                            cellItem?.weight)
                                                    }
                                                />
                                            </div>
                                        ),
                                    )}
                                </>
                            )
                        }}
                    />
                </>
            )
        },
    },
    {
        title: '评价方式(权重%)',
        width: '8%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <RowRender
                    data={record?.evaluatedRubricProjectList}
                    index={itemIndex}
                    recordIndex={index}
                    rowHeights={rowHeights}
                    render={(item: Record<string, any>, dataIndex: number) => {
                        return (
                            <div className={styles.evaluate}>
                                <div>
                                    自评：
                                    {item?.selfWeight || 0}
                                </div>
                                <div>
                                    互评：
                                    {item?.peerWeight || 0}
                                </div>
                                <div>
                                    师评：
                                    {item?.teacherWeight || 0}
                                </div>
                                <div
                                    onClick={() => {
                                        const add = (value: any) => {
                                            record.evaluatedRubricProjectList[
                                                dataIndex
                                            ].selfWeight = value.selfWeight

                                            record.evaluatedRubricProjectList[
                                                dataIndex
                                            ].peerWeight = value.peerWeight

                                            record.evaluatedRubricProjectList[
                                                dataIndex
                                            ].teacherWeight = value.teacherWeight

                                            record.evaluatedRubricProjectList[dataIndex].peerType =
                                                value.peerType
                                            onDataChange?.(
                                                index,
                                                'evaluatedRubricProjectList',
                                                record?.evaluatedRubricProjectList,
                                                true,
                                            )
                                        }

                                        setRowObj({
                                            index,
                                            add,
                                            data: {
                                                selfWeight: item?.selfWeight || 0,
                                                peerWeight: item?.peerWeight || 0,
                                                teacherWeight: item?.teacherWeight || 0,
                                                peerType: item?.peerType,
                                            },
                                        })
                                        setEvaluateModalOpen(true)
                                    }}
                                >
                                    设置
                                </div>
                            </div>
                        )
                    }}
                />
            )
        },
    },
]

export const getAssessmentResultsColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    weightTotal: number,
    onDataChange?: (index: number, field: string, value: any) => void,
    rowHeights?: any,
): TableColumnsType<any> => [
    {
        title: '考核类型',
        dataIndex: 'name',
        width: '10%',
        align: 'center',
        render: (_, record) => {
            return <div style={{ padding: '16px' }}>{record.name}</div>
        },
    },
    {
        title: '考核组成',
        dataIndex: 'component',
        width: '45%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <RowRender
                    data={record?.component}
                    index={'component'}
                    recordIndex={index}
                    rowHeights={rowHeights}
                    render={(item: Record<string, any>) => {
                        return (
                            <ClickEditInput
                                style={{ padding: '16px' }}
                                defaultValue={item?.name}
                                active={active}
                                setActive={setActive}
                                placeholder="请输入"
                                onChange={val => {
                                    item.name = val
                                    onDataChange?.(index, 'component', record.component)
                                }}
                                onChangeBlur={val => {
                                    item.name = val
                                    onDataChange?.(index, 'component', record.component)
                                }}
                                rows={2}
                            />
                        )
                    }}
                />
            )
        },
    },
    {
        title: '权重（%）',
        dataIndex: 'weight',
        width: '20%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <RowRender
                    data={record?.component}
                    index={'component'}
                    recordIndex={index}
                    rowHeights={rowHeights}
                    render={(item: Record<string, any>) => {
                        return (
                            <ClickEditInputNumber
                                style={{ padding: '16px' }}
                                key={index + item?.evaluationRuleList?.length}
                                defaultValue={Number(item?.weight)}
                                active={active}
                                setActive={setActive}
                                placeholder="请输入"
                                onChange={val => {
                                    item.weight = val
                                    onDataChange?.(index, 'component', record.component)
                                }}
                                onChangeBlur={val => {
                                    item.weight = val
                                    onDataChange?.(index, 'component', record.component)
                                }}
                                max={100 - (weightTotal - item?.weight)}
                            />
                        )
                    }}
                />
            )
        },
    },
    {
        title: '考核细则',
        dataIndex: 'evaluatedRubric',
        width: '20%',
        align: 'center',
        render: (_, record, index) => {
            return (
                <RowRender
                    data={record?.component}
                    index={'component'}
                    recordIndex={index}
                    rowHeights={rowHeights}
                    render={(item: Record<string, any>) => {
                        return (
                            <ClickEditInput
                                style={{ padding: '16px' }}
                                defaultValue={item?.evaluatedRubric}
                                active={active}
                                setActive={setActive}
                                placeholder="请输入"
                                onChange={val => {
                                    item.evaluatedRubric = val
                                    onDataChange?.(index, 'component', record.component)
                                }}
                                onChangeBlur={val => {
                                    item.evaluatedRubric = val
                                    onDataChange?.(index, 'component', record.component)
                                }}
                                rows={2}
                            />
                        )
                    }}
                />
            )
        },
    },
]
