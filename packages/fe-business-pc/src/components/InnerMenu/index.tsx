import React from 'react'
import style from './index.module.less'
import { Collapse } from 'antd'
import { groupEnum } from '@/layouts/menuConfig'

const { Panel } = Collapse

interface InnerMenuType {
    items: menuDataType[]
    title: string
    onSelect: (v: string, data: menuDataType) => void
    activeKeys: string
}

function InnerMenu({ items, title, onSelect, activeKeys }: InnerMenuType) {
    const getActive = (key: string) => {
        return key === activeKeys ? style.inner_menu_item_active : style.inner_menu_item
    }
    console.log('item=====')
    return (
        <div className={style.inner_menu}>
            <div className={style.inner_menu_deader}>{title || ''}</div>
            {items.map(item => {
                if (item.type === groupEnum) {
                    return (
                        <div className={[style.inner_menu_item].join(' ')} key={item.key}>
                            <Collapse ghost expandIconPosition="right">
                                <Panel header={item.label} key={item.key}>
                                    {item.children?.map(childrenItem => {
                                        return (
                                            <div
                                                key={childrenItem.key}
                                                className={[
                                                    getActive(childrenItem.key),
                                                    style.inner_menu_item_children,
                                                ].join(' ')}
                                                onClick={() => {
                                                    onSelect?.(childrenItem.key, childrenItem)
                                                }}
                                            >
                                                {childrenItem.label}
                                            </div>
                                        )
                                    })}
                                </Panel>
                            </Collapse>
                        </div>
                    )
                } else {
                    return (
                        <div
                            className={[getActive(item.key)].join(' ')}
                            key={item.key}
                            onClick={() => {
                                onSelect?.(item.key, item)
                            }}
                        >
                            {item.label}
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default InnerMenu
