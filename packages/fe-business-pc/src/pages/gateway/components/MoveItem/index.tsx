import { Collapse } from 'antd'
import React, { useEffect, useState } from 'react'
import type { ComponentsItem } from '../utils/interface'
import styles from './index.module.less'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { Draggable, Droppable } from 'react-beautiful-dnd'

const { Panel } = Collapse

const MoveCom = (list: ComponentsItem[], currentDrag: string, colProps?: any) => {
    const [selectKeys, setSelectKeys] = useState<string[]>([])
    useEffect(() => {
        const initKeys = list.map(item => `${item.type}${item.id}`)
        setSelectKeys(initKeys)
    }, [list])

    const getExtra = (item: ComponentsItem) => {
        if (selectKeys.includes(`${item.type}${item.id}`)) {
            return <UpOutlined className={styles.icon} />
        } else {
            return <DownOutlined className={styles.icon} />
        }
    }

    const getDragItem = (temp: ComponentsItem) => {
        return (
            <Droppable
                key={`${temp.type}${temp.id}`}
                droppableId={`${temp.type}${temp.id}`}
                isDropDisabled={temp.type !== currentDrag}
            >
                {dropProvided => (
                    <div
                        ref={dropProvided.innerRef}
                        {...dropProvided.droppableProps}
                        className={styles.drop_content}
                    >
                        <Draggable
                            draggableId={temp.type as string}
                            key={`${temp.type}${temp.id}`}
                            index={temp.id}
                        >
                            {dragProvided => {
                                return (
                                    <div
                                        ref={dragProvided.innerRef}
                                        {...dragProvided.draggableProps}
                                        {...dragProvided.dragHandleProps}
                                        className={[
                                            styles.drag_item,
                                            temp.type !== currentDrag ? '' : styles.active,
                                        ].join(' ')}
                                    >
                                        <svg
                                            className={[styles.drag_image, 'icon'].join(' ')}
                                            aria-hidden="true"
                                        >
                                            <use xlinkHref={`#${temp.icon}`} />
                                        </svg>
                                        <div className={styles.drag_title}>{temp.title}</div>
                                    </div>
                                )
                            }}
                        </Draggable>
                        {dropProvided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }

    return (
        <div className={styles.page}>
            <Collapse
                {...colProps}
                className={styles.custom_collapse}
                activeKey={selectKeys}
                onChange={e => {
                    if (Array.isArray(e)) {
                        setSelectKeys(e)
                    } else {
                        setSelectKeys([e])
                    }
                }}
            >
                {list.map((item: ComponentsItem) => {
                    const { children, title } = item || {}
                    return (
                        <Panel
                            key={`${item.type}${item.id}`}
                            header={<span className={styles.custom_title}>{title}</span>}
                            showArrow={false}
                            extra={getExtra(item)}
                            className={styles.custom_panel}
                        >
                            {children?.map((temp: ComponentsItem) => {
                                return (
                                    <div
                                        key={`${temp.type}${temp.id}`}
                                        className={styles.panel_item}
                                    >
                                        {getDragItem(temp)}
                                    </div>
                                )
                            })}
                        </Panel>
                    )
                })}
            </Collapse>
        </div>
    )
}

export default MoveCom
