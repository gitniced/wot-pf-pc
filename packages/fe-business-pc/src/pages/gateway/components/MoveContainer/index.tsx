import React from 'react'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd'
import type { DropResult } from 'react-beautiful-dnd'
import { toJS } from 'mobx'
import { cloneDeep } from 'lodash'
import './index.module.less'

/* 
   会给传进来的每一个children 自动包裹拖动
   使用者只需要传递一个 onDragEnd 监听即可
 */
interface MoveContainerPropsType {
    children?: (value: any) => JSX.Element
    /* 
        f 被拖动元素的 index
        t 目标元素的index
        o 源拖动返回值
     */
    onDragEnd?: (from: number, to: number, origin: DropResult) => void

    onChange?: (result: any[]) => void
    /* 
        数据源 会遍历数据源 进行操作 调用children
     */
    datasource: any[]

    rowKey?: string
    /**
     *  默认规则不允许拖拽
     *  示例 radioValue: 1  不可拖拽
     */
    isDragDisabled?: boolean // 是否禁止拖拽
}
function MoveContainer({
    children,
    onDragEnd,
    datasource,
    rowKey = 'id',
    onChange,
    // radioValue,
    isDragDisabled,
}: MoveContainerPropsType) {
    return (
        //@ts-ignore
        <DragDropContext
            onDragEnd={result => {
                const { destination, source } = result
                if (!destination) return
                const from = source.index
                const to = destination.index
                onDragEnd?.(from, to ?? source.index, result)
                const list = cloneDeep(toJS(datasource || []))
                const [removed] = list.splice(from, 1)
                list.splice(to, 0, removed)
                onChange?.(list)
            }}
        >
            <div className={'dragMain'}>
                <Droppable droppableId="moveRight">
                    {provided => {
                        return (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {datasource.filter(Boolean).map((item, index) => {
                                    return (
                                        <Draggable
                                            key={item?.[rowKey]}
                                            draggableId={String(item?.[rowKey] || index)}
                                            index={index}
                                            isDragDisabled={isDragDisabled}
                                        >
                                            {draprovided => {
                                                return (
                                                    <div
                                                        ref={draprovided.innerRef}
                                                        {...draprovided.draggableProps}
                                                        {...draprovided.dragHandleProps}
                                                    >
                                                        {children?.(item)}
                                                    </div>
                                                )
                                            }}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )
                    }}
                </Droppable>
            </div>
        </DragDropContext>
    )
}

export default MoveContainer
