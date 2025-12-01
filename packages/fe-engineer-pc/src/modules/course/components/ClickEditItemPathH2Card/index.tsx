import styles from './index.module.less'
import { useCallback, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import React from 'react'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import useComponentValue from '@/hooks/useComponentValue'
import { createFullScreenContentRender } from '../FullScreenContentHOC'
import FullScreenEditBtn from '../FullScreenEditBtn'
import type { ICourseDataItem } from '../../types'
import { Button } from 'antd'
import ClickEditInput from '@/components/ClickEditInput'
import ClickEditInputNumber from '@/components/ClickEditInputNumber'
import type { ILearningStep } from '../../types/learning'
import type { IListBaseItem } from '../../types/learning'
import ClickEditActiveContainer from '@/components/ClickEditActiveContainer'

interface IClickEditItemPathH2CardProps extends IUseComponentValueProps<ILearningStep[]> {
    title: string
    dataTitle: string
    className?: string
    style?: React.CSSProperties
    items: Omit<ICourseDataItem<ILearningStep[]>, 'value'>[]
}

const DEFAULT_VALUE: ILearningStep[] = [
    {
        code: '',
        name: '',
        period: 0,
        theoreticalKnowledge: '',
        practicalKnowledge: '',
        professionalism: '',
        learningActivities: [],
        sort: 1,
    },
]

/**
 * 学习路径
 */
const ClickEditItemPathH2Card: React.FC<IClickEditItemPathH2CardProps> = props => {
    const [active, setActive] = useState(false)
    const [innerItems, setInnerItems] = useState<ICourseDataItem<ILearningStep[]>[]>(
        props.items.map(item => ({
            ...item,
            value: props.value,
        })),
    )

    const defaultValueRef = useRef(JSON.parse(JSON.stringify(DEFAULT_VALUE)))

    const {
        value: values,
        onChange,
        onChangeBlur,
    } = useComponentValue({
        value: props.value,
        defaultValue: props.defaultValue?.length ? props.defaultValue : defaultValueRef.current,
        onChange: props.onChange,
        onChangeBlur: props.onChangeBlur,
    })

    const activityNameMap = useMemo(() => {
        const map: Record<string, string> = {}
        let activityIndex = 1

        values?.forEach((step, stepIndex) => {
            step.learningActivities?.forEach((activity, actIndex) => {
                // 为每个活动生成唯一的key：如果有code则使用code，否则使用步骤索引+活动索引
                const uniqueKey = activity.code || `step_${stepIndex}_activity_${actIndex}`

                // 只有当key不存在时才设置名称，避免重复
                if (!map[uniqueKey]) {
                    map[uniqueKey] = `活动${activityIndex++}`
                }
            })
        })

        return map
    }, [values])

    const renderLearningStep = useCallback(
        (
            stepData: ILearningStep,
            stepIndex: number,
            customOnChange?: (value: ILearningStep[]) => void,
            customValues?: ILearningStep[],
            customActivityNameMap?: Record<string, string>,
            isFullScreen?: boolean,
        ) => {
            const currentOnChange = customOnChange || onChange
            const currentValues = customValues || values
            const currentActivityNameMap = customActivityNameMap || activityNameMap

            const reorderActivitySort = (stepList: ILearningStep[]) => {
                let globalSort = 1
                return stepList.map(step => ({
                    ...step,
                    learningActivities:
                        step.learningActivities?.map(activity => ({
                            ...activity,
                            sort: globalSort++,
                        })) || [],
                }))
            }

            const localHandleStepChange = (field: keyof ILearningStep, fieldValue: any) => {
                const newValues = [...(currentValues || [])]
                newValues[stepIndex] = {
                    ...newValues[stepIndex],
                    [field]: fieldValue,
                }
                currentOnChange(newValues)
            }

            const localHandleActivityChange = (activityIndex: number, value: string) => {
                const newValues = [...(currentValues || [])]
                const newActivities = [...(newValues[stepIndex].learningActivities || [])]
                newActivities[activityIndex] = {
                    ...newActivities[activityIndex],
                    name: value,
                }
                newValues[stepIndex] = {
                    ...newValues[stepIndex],
                    learningActivities: newActivities,
                }
                currentOnChange(newValues)
            }

            const localHandleDeleteActivity = (activityIndex: number) => {
                const newValues = [...(currentValues || [])]
                const newActivities = [...(newValues[stepIndex].learningActivities || [])]
                newActivities.splice(activityIndex, 1)
                newValues[stepIndex] = {
                    ...newValues[stepIndex],
                    learningActivities: newActivities,
                }

                const reorderedValues = reorderActivitySort(newValues)
                currentOnChange(reorderedValues)
                if (!customOnChange) {
                    onChangeBlur()
                }
            }

            const localHandleAddActivity = () => {
                const newValues = [...(currentValues || [])]
                const newActivities = [
                    ...(newValues[stepIndex].learningActivities || []),
                    {
                        code: '',
                        name: '',
                        sort: 1,
                    },
                ]
                newValues[stepIndex] = {
                    ...newValues[stepIndex],
                    learningActivities: newActivities,
                }

                const reorderedValues = reorderActivitySort(newValues)
                currentOnChange(reorderedValues)
                if (!isFullScreen) {
                    setActive(true)
                }
            }

            const localHandleDeleteStep = () => {
                const newValues = [...(currentValues || [])]
                newValues.splice(stepIndex, 1)

                const reorderedValues = reorderActivitySort(newValues)
                currentOnChange(reorderedValues)
                if (!customOnChange) {
                    onChangeBlur()
                }
            }

            const localRenderActivity = (activityIndex: number, activity: IListBaseItem) => {
                const uniqueKey = activity.code || `step_${stepIndex}_activity_${activityIndex}`

                return (
                    <div key={activityIndex} className={styles.activity_item}>
                        <div className={styles.activity_content}>
                            <span className={styles.activity_label}>
                                {currentActivityNameMap?.[uniqueKey]}:
                            </span>
                            <div className={styles.activity_input}>
                                <ClickEditInput
                                    active={isFullScreen ? true : active}
                                    setActive={isFullScreen ? () => {} : setActive}
                                    placeholder="请输入"
                                    value={activity.name}
                                    rows={1}
                                    lineHeight={24}
                                    padding={{ vertical: 4, horizontal: 12 }}
                                    backgroundColor="#fff"
                                    onChange={value =>
                                        localHandleActivityChange(activityIndex, value)
                                    }
                                    onChangeBlur={value =>
                                        localHandleActivityChange(activityIndex, value)
                                    }
                                    plainTextMode
                                />
                            </div>
                        </div>
                        <div
                            className={styles.delete_btn}
                            onClick={e => {
                                e.stopPropagation()
                                e.preventDefault()
                                localHandleDeleteActivity(activityIndex)
                            }}
                        >
                            <svg
                                className="icon"
                                aria-hidden="true"
                                style={{ width: 16, height: 16 }}
                            >
                                <use xlinkHref={`#delete`} />
                            </svg>
                        </div>
                    </div>
                )
            }

            return (
                <div key={stepIndex} className={styles.learning_step}>
                    <div className={styles.step_index}>学习步骤{stepIndex + 1}：</div>
                    <div className={styles.learning_step_wrapper}>
                        <div className={styles.step_header}>
                            <div className={styles.step_title_wrapper}>
                                <ClickEditInput
                                    active={isFullScreen ? true : active}
                                    setActive={isFullScreen ? () => {} : setActive}
                                    placeholder="请输入"
                                    value={stepData.name}
                                    rows={1}
                                    lineHeight={24}
                                    padding={{ vertical: 4, horizontal: 12 }}
                                    style={{ borderRadius: 0 }}
                                    backgroundColor="transparent"
                                    onChange={value => localHandleStepChange('name', value)}
                                    onChangeBlur={value => localHandleStepChange('name', value)}
                                    plainTextMode
                                />
                            </div>
                        </div>

                        <div className={styles.step_content}>
                            <div className={styles.step_info}>
                                <div className={styles.info_row}>
                                    <span className={styles.info_label}>学时:</span>
                                    <div className={styles.info_input}>
                                        <ClickEditInputNumber
                                            active={isFullScreen ? true : active}
                                            setActive={isFullScreen ? () => {} : setActive}
                                            placeholder="0"
                                            value={stepData.period}
                                            onChange={value =>
                                                localHandleStepChange('period', value || 0)
                                            }
                                            onChangeBlur={value =>
                                                localHandleStepChange('period', value || 0)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className={styles.info_row}>
                                    <span className={styles.info_label}>理论知识:</span>
                                    <div className={styles.info_input}>
                                        <ClickEditInput
                                            active={isFullScreen ? true : active}
                                            setActive={isFullScreen ? () => {} : setActive}
                                            placeholder="请输入"
                                            value={stepData.theoreticalKnowledge}
                                            rows={1}
                                            lineHeight={24}
                                            padding={{ vertical: 4, horizontal: 12 }}
                                            backgroundColor="rgba(0,0,0,3%)"
                                            onChange={value =>
                                                localHandleStepChange('theoreticalKnowledge', value)
                                            }
                                            onChangeBlur={value =>
                                                localHandleStepChange('theoreticalKnowledge', value)
                                            }
                                            plainTextMode
                                        />
                                    </div>
                                </div>

                                <div className={styles.info_row}>
                                    <span className={styles.info_label}>实践知识:</span>
                                    <div className={styles.info_input}>
                                        <ClickEditInput
                                            active={isFullScreen ? true : active}
                                            setActive={isFullScreen ? () => {} : setActive}
                                            placeholder="请输入"
                                            value={stepData.practicalKnowledge}
                                            rows={1}
                                            lineHeight={24}
                                            padding={{ vertical: 4, horizontal: 12 }}
                                            backgroundColor="rgba(0,0,0,3%)"
                                            onChange={value =>
                                                localHandleStepChange('practicalKnowledge', value)
                                            }
                                            onChangeBlur={value =>
                                                localHandleStepChange('practicalKnowledge', value)
                                            }
                                            plainTextMode
                                        />
                                    </div>
                                </div>

                                <div className={styles.info_row}>
                                    <span className={styles.info_label}>职业素养:</span>
                                    <div className={styles.info_input}>
                                        <ClickEditInput
                                            active={isFullScreen ? true : active}
                                            setActive={isFullScreen ? () => {} : setActive}
                                            placeholder="请输入"
                                            value={stepData.professionalism}
                                            rows={1}
                                            lineHeight={24}
                                            padding={{ vertical: 4, horizontal: 12 }}
                                            backgroundColor="rgba(0,0,0,3%)"
                                            onChange={value =>
                                                localHandleStepChange('professionalism', value)
                                            }
                                            onChangeBlur={value =>
                                                localHandleStepChange('professionalism', value)
                                            }
                                            plainTextMode
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.step_activities}>
                                <div className={styles.activities_label}>学习活动:</div>
                                <div className={styles.activities_list}>
                                    {(stepData.learningActivities || []).map(
                                        (activity, activityIndex) =>
                                            localRenderActivity(activityIndex, activity),
                                    )}

                                    <div className={styles.add_activity_btn}>
                                        <Button type="ghost" onClick={localHandleAddActivity}>
                                            添加活动
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={styles.delete_btn}
                        onClick={e => {
                            e.stopPropagation()
                            e.preventDefault()
                            localHandleDeleteStep()
                        }}
                        style={{
                            marginLeft: 16,
                            opacity: values?.length <= 1 ? 0 : 1,
                            pointerEvents: values?.length <= 1 ? 'none' : 'auto',
                        }}
                    >
                        <svg className="icon" aria-hidden="true" style={{ width: 16, height: 16 }}>
                            <use xlinkHref={`#delete`} />
                        </svg>
                    </div>
                </div>
            )
        },
        [active, setActive, values, onChange, onChangeBlur, activityNameMap],
    )

    const ContentRender = useMemo(
        () =>
            createFullScreenContentRender(
                _p => {
                    // 创建适配器函数来处理类型差异
                    const adaptedOnChange = (newValue: ILearningStep[]) => {
                        _p.onChange?.(newValue)
                    }

                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const fullScreenActivityNameMap = useMemo(() => {
                        const map: Record<string, string> = {}
                        let activityIndex = 1

                        _p.value?.forEach((step, stepIndex) => {
                            step.learningActivities?.forEach((activity, actIndex) => {
                                // 为每个活动生成唯一的key：如果有code则使用code，否则使用步骤索引+活动索引
                                const uniqueKey =
                                    activity.code || `step_${stepIndex}_activity_${actIndex}`

                                // 只有当key不存在时才设置名称，避免重复
                                if (!map[uniqueKey]) {
                                    map[uniqueKey] = `活动${activityIndex++}`
                                }
                            })
                        })

                        return map
                    }, [_p.value])

                    // 全屏模式下的添加学习步骤函数
                    const handleFullScreenAddStep = () => {
                        const newStep: ILearningStep = JSON.parse(JSON.stringify(DEFAULT_VALUE[0]))
                        const newValues = [...(_p.value || []), newStep]

                        // 重新序列化所有活动的 sort 值
                        let globalSort = 1
                        const reorderedValues = newValues.map(step => ({
                            ...step,
                            learningActivities:
                                step.learningActivities?.map(activity => ({
                                    ...activity,
                                    sort: globalSort++,
                                })) || [],
                        }))

                        adaptedOnChange(reorderedValues)
                    }

                    return (
                        <div className={styles.fullscreen_content}>
                            <div className={styles.steps_list}>
                                {(_p.value || []).map((step, stepIndex) =>
                                    renderLearningStep(
                                        step,
                                        stepIndex,
                                        adaptedOnChange,
                                        _p.value,
                                        fullScreenActivityNameMap,
                                        true,
                                    ),
                                )}
                            </div>
                            <div className={styles.card_footer}>
                                <Button type="ghost" onClick={handleFullScreenAddStep}>
                                    添加学习步骤
                                </Button>
                            </div>
                        </div>
                    )
                },
                {
                    save: async (value: ILearningStep[]) => {
                        const res = await props.onChangeBlur?.(value)
                        onChange(value)
                        return res || false
                    },
                    items: props.items,
                    isMulti: false,
                    onUpdateItems: items => {
                        setInnerItems(items)
                    },
                },
                values || [],
            ),
        [props.items, props.onChangeBlur, onChange, values, renderLearningStep],
    )

    const handleBlur = useCallback(() => {
        if (!active) return
        setActive(false)
        onChange(v => {
            const newV =
                v
                    ?.map(item => ({
                        ...item,
                        learningActivities:
                            item.learningActivities?.filter(
                                activity => activity.code || activity.name,
                            ) || [],
                    }))
                    .filter(
                        item =>
                            item.code ||
                            item.name ||
                            item.period ||
                            item.theoreticalKnowledge?.length ||
                            item.practicalKnowledge?.length ||
                            item.professionalism?.length ||
                            item.learningActivities?.length,
                    ) || []

            return newV.length > 0 ? newV : JSON.parse(JSON.stringify(DEFAULT_VALUE))
        })
        onChangeBlur()
    }, [active, onChangeBlur, onChange])

    const handleAddStep = useCallback(() => {
        onChange(oldValues => {
            const newStep: ILearningStep = JSON.parse(JSON.stringify(DEFAULT_VALUE[0]))
            const newValues = [...(oldValues || []), newStep]

            let globalSort = 1
            const reorderedValues = newValues.map(step => ({
                ...step,
                learningActivities:
                    step.learningActivities?.map(activity => ({
                        ...activity,
                        sort: globalSort++,
                    })) || [],
            }))

            return reorderedValues
        })
        setActive(true)
    }, [onChange])

    const learningRender = useMemo(() => {
        return (
            <div className={styles.steps_list}>
                {(values || []).map((step, stepIndex) => renderLearningStep(step, stepIndex))}
            </div>
        )
    }, [values, renderLearningStep])

    return (
        <ClickEditActiveContainer
            active={active}
            setActive={setActive}
            onBlur={handleBlur}
            className={classNames(styles.item_path, {
                [styles.active]: active,
                [props.className as string]: props.className,
            })}
            style={props.style}
        >
            <div className={styles.card_header}>
                <div className={styles.card_title}>{props.title}</div>
                {active && (
                    <FullScreenEditBtn
                        ContentRender={ContentRender}
                        title={props.dataTitle}
                        subTitle={props.title}
                        items={innerItems}
                    />
                )}
            </div>

            <div className={styles.card_content}>{learningRender}</div>

            <div className={styles.card_footer}>
                <Button type="ghost" onClick={handleAddStep}>
                    添加学习步骤
                </Button>
            </div>
        </ClickEditActiveContainer>
    )
}

export default React.memo(ClickEditItemPathH2Card)
