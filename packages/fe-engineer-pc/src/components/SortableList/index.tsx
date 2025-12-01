import React, { useMemo, useState } from 'react'
import type { DragEndEvent } from '@dnd-kit/core'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import classNames from 'classnames'
import styles from './index.module.less'

export interface SortableItemData {
    id: string
}

interface SortableItemProps<T extends SortableItemData> {
    item: T
    children: (item: T, dragHandleProps: any) => React.ReactNode
    className?: string
    isDragging?: boolean
    isOver?: boolean
}

const SortableItem = <T extends SortableItemData>({
    item,
    children,
    className,
    isOver,
}: SortableItemProps<T>) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: item.id,
    })

    const style = isDragging
        ? { opacity: 0 }
        : {
              transform: CSS.Transform.toString(transform),
              transition,
          }

    const dragHandleProps = {
        ...listeners,
        ...attributes,
        className: styles.drag_handle,
        tabIndex: -1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={classNames(styles.sortable_item, className, {
                [styles.dragging]: isDragging,
                [styles.drop_indicator]: isOver && !isDragging,
            })}
        >
            {children(item, dragHandleProps)}
        </div>
    )
}

export interface SortableListProps<T extends SortableItemData> {
    items: T[]
    onReorder: (newItems: T[]) => void
    renderItem: (item: T, dragHandleProps: any, index?: number) => React.ReactNode
    className?: string
    itemClassName?: string
    disabled?: boolean
}

const SortableList = <T extends SortableItemData>({
    items,
    onReorder,
    renderItem,
    className,
    itemClassName,
    disabled = false,
}: SortableListProps<T>) => {
    const [activeId, setActiveId] = useState<string | null>(null)
    const [overId, setOverId] = useState<string | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    const itemIds = useMemo(() => items.map(item => item.id), [items])

    const findItem = (id: string) => items.find(item => item.id === id)

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id as string)
    }

    const handleDragOver = (event: any) => {
        setOverId(event.over?.id ?? null)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        setActiveId(null)
        setOverId(null)

        if (active.id !== over?.id && over?.id) {
            const oldIndex = items.findIndex(item => item.id === active.id)
            const newIndex = items.findIndex(item => item.id === over.id)

            if (oldIndex !== -1 && newIndex !== -1) {
                const newItems = arrayMove(items, oldIndex, newIndex)
                onReorder(newItems)
            }
        }
    }

    const handleDragCancel = () => {
        setActiveId(null)
    }

    const dropPositionClass = (itemId: string) => {
        if (!overId) return undefined
        if (overId !== itemId) return undefined

        const activeIndex = items.findIndex(i => i.id === activeId)
        const overIndex = items.findIndex(i => i.id === overId)

        if (activeIndex === -1 || overIndex === -1) return undefined

        return activeIndex < overIndex ? styles.drop_indicator_bottom : styles.drop_indicator_top
    }

    if (disabled) {
        return (
            <div className={classNames(styles.sortable_list, className)}>
                {items.map((item, index) => (
                    <div key={item.id} className={classNames(styles.sortable_item, itemClassName)}>
                        {renderItem(item, { className: styles.drag_handle_disabled }, index)}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
                <div className={classNames(styles.sortable_list, className)}>
                    {items.map((item, index) => (
                        <SortableItem
                            key={item.id}
                            item={item}
                            className={classNames(itemClassName, dropPositionClass(item.id))}
                            isOver={overId === item.id}
                        >
                            {(sortableItem, dragHandleProps) =>
                                renderItem(sortableItem, dragHandleProps, index)
                            }
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>

            <DragOverlay adjustScale={false}>
                {activeId
                    ? (() => {
                          const current = findItem(activeId)
                          return current
                              ? renderItem(current, { className: styles.drag_handle_disabled })
                              : null
                      })()
                    : null}
            </DragOverlay>
        </DndContext>
    )
}

export default React.memo(SortableList) as typeof SortableList
