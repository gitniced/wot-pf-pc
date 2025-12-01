import styles from './index.module.less'
import { useCallback, useState, useEffect } from 'react'
import classNames from 'classnames'
import React from 'react'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import useComponentValue from '@/hooks/useComponentValue'
import type { ICourseDataItem } from '../../types'
import type { ICourseStylistic9StageLearningStep } from '../../types/stylistic9'
import type { ICourseStylistic10StageLearningStep } from '../../types/stylistic10'
import ClickEditInput from '@/components/ClickEditInput'
import ClickEditInputNumber from '@/components/ClickEditInputNumber'
import { Table } from 'antd'
import StageActivityList from './components/StageActivityList'
import Empty from '@/components/Empty'
import { getRequestListColumns } from './const'
import type { COURSE_DESIGN_STYLISTIC } from '../../const'
import ClickEditActiveContainer from '@/components/ClickEditActiveContainer'

interface IClickEditLearningStageDetailH2CardProps
    extends IUseComponentValueProps<
        (ICourseStylistic9StageLearningStep | ICourseStylistic10StageLearningStep)[]
    > {
    title: string
    dataTitle: string
    className?: string
    style?: React.CSSProperties
    items: Omit<
        ICourseDataItem<
            (ICourseStylistic9StageLearningStep | ICourseStylistic10StageLearningStep)[]
        >,
        'value'
    >[]
    getActive?: (active: boolean) => void
    stylistic?: COURSE_DESIGN_STYLISTIC.stylistic9 | COURSE_DESIGN_STYLISTIC.stylistic10
    activeTitleRightRender?: React.ReactNode
}

const ClickEditLearningStageDetailH2Card: React.FC<
    IClickEditLearningStageDetailH2CardProps
> = props => {
    const [active, setActive] = useState(false)
    // const [innerItems, setInnerItems] = useState<
    //     ICourseDataItem<ICourseStylistic9StageLearningStep[]>[]
    // >(
    //     props.items.map(item => ({
    //         ...item,
    //         value: props.value as any,
    //     })),
    // )

    const {
        value: values,
        onChange,
        onChangeBlur,
    } = useComponentValue({
        value: props.value,
        defaultValue: props.defaultValue,
        onChange: props.onChange,
        onChangeBlur: props.onChangeBlur,
    })

    const handleBlur = useCallback(() => {
        if (!active) return
        setActive(false)
        onChangeBlur()
    }, [active, onChangeBlur])

    const handleRequestListDataChange = useCallback(
        (stageCode: string, index: number, field: string, value: any) => {
            if (!values) return

            const newValues = values.map(stage => {
                if (stage.code === stageCode && stage.requestList) {
                    const newRequestList = [...stage.requestList]
                    if (newRequestList[index]) {
                        newRequestList[index] = { ...newRequestList[index], [field]: value }
                    }
                    return { ...stage, requestList: newRequestList }
                }
                return stage
            })

            onChange(newValues)
        },
        [values, onChange],
    )

    const handleStageFieldChange = useCallback(
        (stageCode: string, field: string, value: any) => {
            if (!values) return

            const newValues = values.map(stage => {
                if (stage.code === stageCode) {
                    return { ...stage, [field]: value }
                }
                return stage
            })

            onChange(newValues)
        },
        [values, onChange],
    )

    const handleActivityDataChange = useCallback(
        (
            stageMainCode: string,
            stageCode: string,
            activityCode: string,
            field: string,
            value: any,
        ) => {
            if (!values) return

            const newValues = values.map(stage => {
                // 支持两种字段：stageLearningStepActivityList 和 learningStepList
                const activityListField =
                    'stageLearningStepActivityList' in stage && stage.stageLearningStepActivityList
                        ? 'stageLearningStepActivityList'
                        : 'learningStepList'
                const activityList = stage[activityListField as keyof typeof stage] as any[]

                if (stage.code === stageMainCode && activityList) {
                    const newActivityList = activityList.map((activityStage: any) => {
                        if (
                            activityStage.code === stageCode &&
                            activityStage.learningStepActivityList
                        ) {
                            const newLearningStepActivityList =
                                activityStage.learningStepActivityList.map((activity: any) => {
                                    if (activity.code === activityCode) {
                                        return { ...activity, [field]: value }
                                    }
                                    return activity
                                })
                            return {
                                ...activityStage,
                                learningStepActivityList: newLearningStepActivityList,
                            }
                        }
                        return activityStage
                    })
                    return { ...stage, [activityListField]: newActivityList }
                }
                return stage
            })

            onChange(newValues)
        },
        [values, onChange],
    )

    const handleStageDataChange = useCallback(
        (stageCode: string, field: string, value: any) => {
            if (!values) return

            const newValues = values.map(stage => {
                // 支持两种字段：stageLearningStepActivityList 和 learningStepList
                const activityListField =
                    'stageLearningStepActivityList' in stage && stage.stageLearningStepActivityList
                        ? 'stageLearningStepActivityList'
                        : 'learningStepList'
                const activityList = stage[activityListField as keyof typeof stage] as any[]

                if (activityList) {
                    const newActivityList = activityList.map((activityStage: any) => {
                        if (activityStage.code === stageCode) {
                            return { ...activityStage, [field]: value }
                        }
                        return activityStage
                    })
                    return { ...stage, [activityListField]: newActivityList }
                }
                return stage
            })

            onChange(newValues)
        },
        [values, onChange],
    )

    useEffect(() => {
        props?.getActive?.(active)
    }, [active])

    return (
        <ClickEditActiveContainer
            active={active}
            setActive={setActive}
            onBlur={handleBlur}
            className={classNames(styles.click_edit_learning_stage_detail_h2_card, {
                [styles.active]: active && !props.getActive,
                [props.className as string]: props.className,
            })}
            style={props.style}
        >
            <div className={styles.learning_stage_detail_header}>
                <div className={styles.learning_stage_detail_header_title}>
                    <span>{props.title}</span>
                </div>
                {props.activeTitleRightRender && (
                    <div
                        style={{
                            overflow: active ? 'visible' : 'hidden',
                            opacity: active ? 1 : 0,
                            pointerEvents: active ? 'auto' : 'none',
                        }}
                    >
                        {props.activeTitleRightRender}
                    </div>
                )}
            </div>

            <div className={styles.learning_stage_detail_list}>
                {values?.length ? (
                    values?.map((item, taskIndex) => {
                        return (
                            <div key={item.code} className={styles.learning_stage_detail_item}>
                                <div className={styles.learning_stage_detail_item_header}>
                                    <div className={styles.learning_stage_detail_item_title}>
                                        <span>
                                            {taskIndex + 1}. {item.name}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.learning_stage_detail_item_content}>
                                    <div className={styles.learning_stage_detail_item_content_item}>
                                        <div
                                            className={
                                                styles.learning_stage_detail_item_content_item_title
                                            }
                                        >
                                            <span>(1) 学习目标</span>
                                        </div>
                                        <ClickEditInput
                                            className={
                                                styles.learning_stage_detail_item_content_item_input
                                            }
                                            active={active}
                                            setActive={setActive}
                                            defaultValue={item.learningGoal}
                                            onChange={value => {
                                                handleStageFieldChange(
                                                    item.code,
                                                    'learningGoal',
                                                    value,
                                                )
                                            }}
                                            onChangeBlur={value => {
                                                handleStageFieldChange(
                                                    item.code,
                                                    'learningGoal',
                                                    value,
                                                )
                                            }}
                                            disabled={true}
                                        />
                                    </div>

                                    <div className={styles.learning_stage_detail_item_content_item}>
                                        <div
                                            className={
                                                styles.learning_stage_detail_item_content_item_title
                                            }
                                        >
                                            <span>(2) 建议学时</span>
                                        </div>
                                        <ClickEditInputNumber
                                            className={
                                                styles.learning_stage_detail_item_content_item_input
                                            }
                                            active={active}
                                            setActive={setActive}
                                            defaultValue={item.period}
                                            onChange={value => {
                                                handleStageFieldChange(item.code, 'period', value)
                                            }}
                                            onChangeBlur={value => {
                                                handleStageFieldChange(item.code, 'period', value)
                                            }}
                                            disabled={true}
                                        />
                                    </div>

                                    <div className={styles.learning_stage_detail_item_content_item}>
                                        <div
                                            className={
                                                styles.learning_stage_detail_item_content_item_title
                                            }
                                        >
                                            <span>(3) 学习要求</span>
                                        </div>

                                        <div
                                            className={
                                                styles.learning_stage_detail_item_content_item_input
                                            }
                                        >
                                            <Table
                                                bordered
                                                pagination={false}
                                                columns={getRequestListColumns(
                                                    active,
                                                    setActive,
                                                    (index, field, value) => {
                                                        handleRequestListDataChange(
                                                            item.code,
                                                            index,
                                                            field,
                                                            value,
                                                        )
                                                    },
                                                )}
                                                dataSource={item.requestList}
                                                rowKey={record => record.code}
                                            />

                                            <StageActivityList
                                                taskIndex={taskIndex}
                                                stylistic={props.stylistic}
                                                stageLearningStepActivityList={
                                                    ('stageLearningStepActivityList' in item &&
                                                        item.stageLearningStepActivityList) ||
                                                    ('learningStepList' in item &&
                                                        (item.learningStepList as any)) ||
                                                    undefined
                                                }
                                                active={active}
                                                setActive={setActive}
                                                onActivityDataChange={(
                                                    stageCode,
                                                    activityCode,
                                                    field,
                                                    value,
                                                ) => {
                                                    handleActivityDataChange(
                                                        item.code,
                                                        stageCode,
                                                        activityCode,
                                                        field,
                                                        value,
                                                    )
                                                }}
                                                onStageDataChange={(stageCode, field, value) => {
                                                    handleStageDataChange(stageCode, field, value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <Empty />
                )}
            </div>
        </ClickEditActiveContainer>
    )
}

export default React.memo(ClickEditLearningStageDetailH2Card)
