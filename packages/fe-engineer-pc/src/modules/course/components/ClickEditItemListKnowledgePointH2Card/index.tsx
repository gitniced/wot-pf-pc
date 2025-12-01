import styles from './index.module.less'
import { useCallback, useMemo, useState } from 'react'
import classNames from 'classnames'
import React from 'react'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import useComponentValue from '@/hooks/useComponentValue'
import { createFullScreenContentRender } from '../FullScreenContentHOC'
import FullScreenEditBtn from '../FullScreenEditBtn'
import type { ICourseDataItem } from '../../types'
import { Button } from 'antd'
import ClickEditInput from '@/components/ClickEditInput'
import type { SortableItemData } from '@/components/SortableList'
import SortableList from '@/components/SortableList'
import type { IKnowledgePoint } from '../../types/learning'
import ClickEditActiveContainer from '@/components/ClickEditActiveContainer'

interface IClickEditItemListKnowledgePointH2CardProps
    extends IUseComponentValueProps<IKnowledgePoint[]> {
    title: string
    dataTitle: string
    className?: string
    style?: React.CSSProperties
    items: Omit<ICourseDataItem<IKnowledgePoint[]>, 'value'>[]
}

interface EditableItem extends SortableItemData {
    id: string
    data: IKnowledgePoint
    originalIndex: number
}

const updateItemSort = (items: IKnowledgePoint[]) => {
    return items.map((item, index) => ({
        ...item,
        serialNumber: index + 1,
    }))
}

const ClickEditItemListKnowledgePointH2Card: React.FC<
    IClickEditItemListKnowledgePointH2CardProps
> = props => {
    const [active, setActive] = useState(false)
    const [innerItems, setInnerItems] = useState<ICourseDataItem<IKnowledgePoint[]>[]>(
        props.items.map(item => ({
            ...item,
            value: props.value,
        })),
    )

    const {
        value: values,
        onChange,
        onChangeBlur,
    } = useComponentValue({
        value: props.value,
        defaultValue: props.defaultValue,
        refreshKey: props.refreshKey,
        onChange: props.onChange,
        onChangeBlur: props.onChangeBlur,
    })

    const sortableItems = useMemo((): EditableItem[] => {
        return (values || []).map((item, index) => ({
            id: `item-${index}-${item?.code || 'empty'}`,
            data: item,
            originalIndex: index,
        }))
    }, [values])

    const handleFieldChange = useCallback(
        (index: number, field: keyof IKnowledgePoint, fieldValue: string | number) => {
            onChange(oldValues => {
                const newValues = [...(oldValues || [])]
                newValues[index] = {
                    ...newValues[index],
                    [field]: fieldValue,
                }
                return updateItemSort(newValues)
            })
        },
        [onChange],
    )

    const handleFieldBlur = useCallback(
        (index: number, field: keyof IKnowledgePoint, fieldValue: string | number) => {
            onChange(oldValues => {
                const newValues = [...(oldValues || [])]
                newValues[index] = {
                    ...newValues[index],
                    [field]: fieldValue,
                }
                return updateItemSort(newValues)
            })
        },
        [onChange],
    )

    const handleDeleteItem = useCallback(
        (index: number) => {
            onChange(oldValues => {
                const newValues = [...(oldValues || [])]
                newValues.splice(index, 1)
                return updateItemSort(newValues)
            })
            if (!active) onChangeBlur()
        },
        [active, onChange, onChangeBlur],
    )

    const handleReorder = useCallback(
        (newItems: EditableItem[]) => {
            const newValues = newItems.map(item => item.data)
            const updatedValues = updateItemSort(newValues)
            onChange(updatedValues)
            onChangeBlur()
        },
        [onChange, onChangeBlur],
    )

    const renderEditableItem = useCallback(
        (item: EditableItem, dragHandleProps: any) => {
            const currentIndex = sortableItems.findIndex(
                sortableItem => sortableItem.id === item.id,
            )

            return (
                <div className={styles.sortable_item}>
                    <div className={styles.draggable_item}>
                        <div className={styles.drag_content}>
                            <div {...dragHandleProps} className={styles.drag_handle} tabIndex={-1}>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={`#tuodong`} />
                                </svg>
                            </div>
                            <div>{item.data.serialNumber}. </div>
                            <div className={styles.input_wrapper}>
                                <ClickEditInput
                                    active={active}
                                    setActive={setActive}
                                    autoFocus={!item.data.code && !item.data.name}
                                    placeholder="请输入"
                                    value={item.data.name}
                                    rows={1}
                                    lineHeight={24}
                                    padding={{ vertical: 4, horizontal: 12 }}
                                    backgroundColor="transparent"
                                    onChange={value =>
                                        handleFieldChange(currentIndex, 'name', value)
                                    }
                                    onChangeBlur={value =>
                                        handleFieldBlur(currentIndex, 'name', value)
                                    }
                                    plainTextMode
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={styles.delete_btn}
                        onClick={() => handleDeleteItem(currentIndex)}
                    >
                        <svg className="icon" aria-hidden="true" style={{ width: 16, height: 16 }}>
                            <use xlinkHref={`#delete`} />
                        </svg>
                    </div>
                </div>
            )
        },
        [active, setActive, handleFieldChange, handleFieldBlur, handleDeleteItem, sortableItems],
    )

    const ContentRender = useMemo(
        () =>
            createFullScreenContentRender(
                _p => {
                    const fullscreenSortableItems: EditableItem[] = (_p.value || []).map(
                        (item, index) => ({
                            id: `item-${index}-${item?.code || 'empty'}`,
                            data: item,
                            originalIndex: index,
                        }),
                    )

                    const handleFullscreenReorder = (newItems: EditableItem[]) => {
                        const newValues = newItems.map(item => item.data)
                        _p.onChange?.(updateItemSort(newValues))
                    }

                    const handleFullscreenDeleteItem = (currentIndex: number) => {
                        const newValues = [...(_p.value || [])]
                        newValues.splice(currentIndex, 1)
                        _p.onChange?.(updateItemSort(newValues))
                    }

                    const renderFullscreenItem = (item: EditableItem, dragHandleProps: any) => {
                        const currentIndex = fullscreenSortableItems.findIndex(
                            sortableItem => sortableItem.id === item.id,
                        )

                        return (
                            <div className={styles.sortable_item}>
                                <div className={styles.draggable_item}>
                                    <div className={styles.drag_content}>
                                        <div
                                            {...dragHandleProps}
                                            className={styles.drag_handle}
                                            tabIndex={-1}
                                        >
                                            <svg className="icon" aria-hidden="true">
                                                <use xlinkHref={`#tuodong`} />
                                            </svg>
                                        </div>
                                        <div className={styles.input_wrapper}>
                                            <ClickEditInput
                                                active={true}
                                                setActive={() => {}}
                                                placeholder="请输入"
                                                value={item.data.name}
                                                rows={1}
                                                lineHeight={24}
                                                padding={{ vertical: 4, horizontal: 12 }}
                                                backgroundColor="transparent"
                                                onChange={value => {
                                                    const newValues = [...(_p.value || [])]
                                                    newValues[currentIndex] = {
                                                        ...newValues[currentIndex],
                                                        name: value,
                                                    }
                                                    _p.onChange?.(newValues)
                                                }}
                                                onChangeBlur={value => {
                                                    const newValues = [...(_p.value || [])]
                                                    newValues[currentIndex] = {
                                                        ...newValues[currentIndex],
                                                        name: value,
                                                    }
                                                    _p.onChange?.(newValues)
                                                }}
                                                plainTextMode
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={styles.delete_btn}
                                    onClick={e => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                        handleFullscreenDeleteItem(currentIndex)
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

                    const handleFullscreenAddItem = () => {
                        const newItem: IKnowledgePoint = {
                            code: '',
                            name: '',
                            serialNumber: (_p.value?.length || 0) + 1,
                        }
                        const newValues = [...(_p.value || []), newItem]
                        _p.onChange?.(updateItemSort(newValues))
                    }

                    return (
                        <div
                            className={styles.knowledge_point_content}
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <SortableList
                                items={fullscreenSortableItems}
                                onReorder={handleFullscreenReorder}
                                renderItem={renderFullscreenItem}
                                className={styles.droppable_list}
                            />
                            <div>
                                <Button type="ghost" onClick={handleFullscreenAddItem}>
                                    添加
                                </Button>
                            </div>
                        </div>
                    )
                },
                {
                    save: async (value: IKnowledgePoint[]) => {
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
        [props.items, props.onChangeBlur, onChange, values],
    )

    const handleBlur = useCallback(() => {
        if (!active) return
        setActive(false)
        onChange(v => v?.filter(item => item.code || item.name) || [])
        onChangeBlur()
    }, [active, onChangeBlur, onChange])

    const handleAddItem = useCallback(() => {
        const newItem: IKnowledgePoint = {
            code: '',
            name: '',
            serialNumber: (values?.length || 0) + 1,
        }
        const newValues = [...(values || []), newItem]
        onChange(updateItemSort(newValues))
        setActive(true)
    }, [values, onChange, setActive])

    return (
        <ClickEditActiveContainer
            active={active}
            setActive={setActive}
            onBlur={handleBlur}
            className={classNames(styles.knowledge_point, {
                [styles.active]: active,
                [props.className as string]: props.className,
            })}
            style={props.style}
        >
            <div className={styles.knowledge_point_header}>
                <div className={styles.knowledge_point_header_title}>{props.title}</div>
                {active && (
                    <FullScreenEditBtn
                        ContentRender={ContentRender}
                        title={props.dataTitle}
                        subTitle={props.title}
                        items={innerItems}
                    />
                )}
            </div>

            <div className={styles.knowledge_point_content}>
                <SortableList
                    items={sortableItems}
                    onReorder={handleReorder}
                    renderItem={renderEditableItem}
                    className={styles.droppable_list}
                />
            </div>

            <div
                className={styles.knowledge_point_footer}
                style={{ marginTop: values && values.length > 0 ? 12 : 0 }}
            >
                <Button type="ghost" onClick={handleAddItem}>
                    添加
                </Button>
            </div>
        </ClickEditActiveContainer>
    )
}

export default React.memo(ClickEditItemListKnowledgePointH2Card)
