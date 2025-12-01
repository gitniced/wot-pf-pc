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
import type { SortableItemData } from '@/components/SortableList'
import SortableList from '@/components/SortableList'
import type { IListBaseItem } from '../../types/learning'
import ClickEditActiveContainer from '@/components/ClickEditActiveContainer'
import ContentInput from '@/components/ContentInput'

interface IClickEditItemListH2CardProps extends IUseComponentValueProps<IListBaseItem[]> {
    title: string
    dataTitle: string
    className?: string
    style?: React.CSSProperties
    items: Omit<ICourseDataItem<IListBaseItem[]>, 'value'>[]
    hideAI?: boolean
    onDeleteConfirm?: (index: number, item: IListBaseItem) => Promise<boolean>
}

interface EditableItem extends SortableItemData {
    id: string
    data: IListBaseItem
    originalIndex: number
}

const ClickEditItemListH2Card: React.FC<IClickEditItemListH2CardProps> = props => {
    const [active, setActive] = useState(false)
    const [innerItems, setInnerItems] = useState<ICourseDataItem<IListBaseItem[]>[]>(
        props.items.map(item => ({
            ...item,
            value: props.value,
        })),
    )
    const disableBlurRef = useRef<boolean>(false)

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

    // 生成稳定的items列表用于拖拽
    const sortableItems = useMemo((): EditableItem[] => {
        return (values || []).map((item, index) => ({
            id: `item-${index}-${item.code || 'empty'}`,
            data: item,
            originalIndex: index,
        }))
    }, [values])

    const updateItemSort = useCallback((items: IListBaseItem[]) => {
        return items.map((item, index) => ({
            ...item,
            sort: index + 1,
        }))
    }, [])

    const handleFieldChange = useCallback(
        (index: number, field: keyof IListBaseItem, fieldValue: string | number) => {
            const newValues = [...(values || [])]
            newValues[index] = {
                ...newValues[index],
                [field]: fieldValue,
            }
            onChange(updateItemSort(newValues))
        },
        [values, onChange, updateItemSort],
    )

    const handleFieldBlur = useCallback(
        (index: number, field: keyof IListBaseItem, fieldValue: string | number) => {
            const newValues = [...(values || [])]
            newValues[index] = {
                ...newValues[index],
                [field]: fieldValue,
            }
            onChange(updateItemSort(newValues))
        },
        [values, onChange, updateItemSort],
    )

    // 处理删除项目
    const handleDeleteItem = useCallback(
        async (index: number) => {
            const item = values?.[index]
            if (!item) return

            disableBlurRef.current = true

            // 如果有删除确认回调，先执行确认
            if (props.onDeleteConfirm) {
                const confirmed = await props.onDeleteConfirm(index, item)
                if (!confirmed) return
            }

            disableBlurRef.current = false

            const newValues = [...(values || [])]
            newValues.splice(index, 1)
            const updatedValues = updateItemSort(newValues)
            onChange(updatedValues)
            if (!active) onChangeBlur()
        },
        [active, values, onChange, onChangeBlur, updateItemSort, props.onDeleteConfirm],
    )

    // 处理拖拽重新排序
    const handleReorder = useCallback(
        (newItems: EditableItem[]) => {
            const newValues = newItems.map(item => item.data)
            const updatedValues = updateItemSort(newValues)
            onChange(updatedValues)
            onChangeBlur()
        },
        [onChange, onChangeBlur, updateItemSort],
    )

    // 渲染单个可编辑项目
    const renderEditableItem = useCallback(
        (item: EditableItem, dragHandleProps: any) => {
            // 获取当前项目在 sortableItems 中的实际位置
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
                            <div className={styles.input_wrapper}>
                                <ClickEditInput
                                    active={active}
                                    setActive={setActive}
                                    autoFocus={!item.data.code && !item.data.name}
                                    placeholder="请输入名称"
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
                // eslint-disable-next-line @typescript-eslint/no-shadow
                _p => {
                    // 全屏模式的稳定项目列表
                    const fullscreenSortableItems: EditableItem[] = (_p.value || []).map(
                        (item, index) => ({
                            id: `fullscreen-item-${index}-${item.code || 'empty'}`,
                            data: item,
                            originalIndex: index,
                        }),
                    )

                    const handleFullscreenReorder = (newItems: EditableItem[]) => {
                        const newValues = newItems.map(item => item.data)
                        _p.onChange?.(updateItemSort(newValues))
                    }

                    const renderFullscreenItem = (item: EditableItem, dragHandleProps: any) => {
                        // 获取当前项目在 fullscreenSortableItems 中的实际位置
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
                                            <ContentInput
                                                heightMode="full"
                                                placeholder="请输入"
                                                value={item.data.name}
                                                rows={1}
                                                lineHeight={24}
                                                padding={{ vertical: 4, horizontal: 12 }}
                                                inactiveBackgroundColor="transparent"
                                                onChange={value => {
                                                    const newValues = [...(_p.value || [])]
                                                    newValues[currentIndex] = {
                                                        ...newValues[currentIndex],
                                                        name: value,
                                                    }
                                                    _p.onChange?.(updateItemSort(newValues))
                                                }}
                                                onChangeBlur={value => {
                                                    const newValues = [...(_p.value || [])]
                                                    newValues[currentIndex] = {
                                                        ...newValues[currentIndex],
                                                        name: value,
                                                    }
                                                    _p.onChange?.(updateItemSort(newValues))
                                                }}
                                                plainTextMode
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={styles.delete_btn}
                                    onClick={async () => {
                                        const targetItem = _p.value?.[currentIndex]
                                        if (!targetItem) return

                                        // 如果有删除确认回调，先执行确认
                                        if (props.onDeleteConfirm) {
                                            const confirmed = await props.onDeleteConfirm(
                                                currentIndex,
                                                targetItem,
                                            )
                                            if (!confirmed) return
                                        }

                                        const newValues = [...(_p.value || [])]
                                        newValues.splice(currentIndex, 1)
                                        _p.onChange?.(updateItemSort(newValues))
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
                        <div
                            className={styles.click_edit_multi_item_list_h2_card_content}
                            style={{ gap: 32, display: 'flex', flexDirection: 'column' }}
                        >
                            <SortableList
                                items={fullscreenSortableItems}
                                onReorder={handleFullscreenReorder as any}
                                renderItem={renderFullscreenItem as any}
                                className={styles.droppable_list}
                            />
                        </div>
                    )
                },
                {
                    save: async (value: IListBaseItem[]) => {
                        const res = await props.onChangeBlur?.(value)
                        onChange(value)
                        return res || false
                    },
                    items: props.items,
                    isMulti: true,
                    onUpdateItems: items => {
                        setInnerItems(items)
                    },
                },
                values || [],
            ),
        [props.items, props.onChangeBlur, onChange, values, updateItemSort],
    )

    const handleBlur = useCallback(() => {
        if (!active) return
        if (disableBlurRef.current) return
        setActive(false)
        onChange(v => v?.filter(item => item.code || item.name) || [])
        onChangeBlur()
    }, [active, onChangeBlur, onChange])

    const handleAddItem = useCallback(() => {
        const newItem: IListBaseItem = {
            code: '',
            name: '',
            sort: (values?.length || 0) + 1,
        }
        const newValues = [...(values || []), newItem]
        onChange(updateItemSort(newValues))
        setActive(true)
    }, [values, onChange, updateItemSort, setActive])

    return (
        <ClickEditActiveContainer
            active={active}
            setActive={setActive}
            onBlur={handleBlur}
            className={classNames(styles.item_list, {
                [styles.active]: active,
                [props.className as string]: props.className,
            })}
            style={props.style}
        >
            <div className={styles.item_list_header}>
                <div className={styles.item_list_header_title}>{props.title}</div>
                {active && !props.hideAI && (
                    <FullScreenEditBtn
                        ContentRender={ContentRender}
                        title={props.dataTitle}
                        subTitle={props.title}
                        items={innerItems}
                    />
                )}
            </div>

            <div className={styles.item_list_content}>
                <SortableList
                    items={sortableItems}
                    onReorder={handleReorder}
                    renderItem={renderEditableItem}
                    className={styles.droppable_list}
                />
            </div>

            <div
                className={styles.item_list_footer}
                style={{ marginTop: values?.length === 0 ? 0 : 12 }}
            >
                <Button type="ghost" onClick={handleAddItem}>
                    添加
                </Button>
            </div>
        </ClickEditActiveContainer>
    )
}

export default React.memo(ClickEditItemListH2Card)
