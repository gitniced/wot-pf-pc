import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from '../index.module.less'
import { observer } from 'mobx-react'
import { Dropdown, Menu, Tooltip } from 'antd'
// import { SmileOutlined } from '@ant-design/icons'

interface PropsType {
    data: any
    title: string
    count: string
    level: number
    addGroup: any
    editGroup: any
    delGroup: any
    addAdmin: any
    store: any
    onClick: any
}

const TreeTitle = (props: PropsType) => {
    const { data, addGroup, editGroup, delGroup, addAdmin, onClick } = props
    const [contentW, setContentW] = useState(0)
    const [titleW, setTitleW] = useState(0)
    const contentRef = useRef(null)
    const countRef = useRef(null)

    useEffect(() => {
        if (contentRef) {
            //@ts-ignore
            const grandParentDom = contentRef?.current?.parentElement?.parentElement
                ?.parentElement || { children: [] }
            const grandParentDomChildren = grandParentDom.children
            let indentW = 0
            let switchW = 24
            for (let i = 0; i < grandParentDomChildren.length; i++) {
                if (grandParentDomChildren[i].className.includes('organization-tree-indent')) {
                    indentW = grandParentDomChildren[i].offsetWidth || 0
                }
            }
            setContentW(248 - indentW - switchW - 16)
        }
    }, [contentRef])

    useEffect(() => {
        if (countRef && props.count) {
            //@ts-ignore
            setTitleW(countRef?.current?.offsetWidth || 0 + 8)
        }
    }, [props.count])

    const selfAddGroup = () => {
        addGroup(data)
    }
    const selfEditGroup = () => {
        editGroup(data)
    }
    // 删除部门
    const selfDelGroup = () => {
        delGroup(data)
    }
    const selfAddAdmin = () => {
        addAdmin(data)
    }

    // Modal.confirm({
    //     title: '删除部门',
    //     content: '确认删除该部门吗',
    //     okText: '确认',
    //     cancelText: '取消',
    //     centered: true,
    //     onOk: store.delDepartment,
    // })
    // }

    const getMenu = useMemo(() => {
        if (props.level > 2) {
            return (
                <Menu>
                    <Menu.Item>
                        <div className={styles.tree_item_down} onClick={selfAddAdmin}>
                            设置主管
                        </div>
                    </Menu.Item>
                    <Menu.Item>
                        <div className={styles.tree_item_down} onClick={selfEditGroup}>
                            编辑
                        </div>
                    </Menu.Item>
                    <Menu.Item>
                        <div className={styles.tree_item_down} onClick={selfDelGroup}>
                            删除
                        </div>
                    </Menu.Item>
                </Menu>
            )
        } else {
            return (
                <Menu>
                    <Menu.Item>
                        <div className={styles.tree_item_down} onClick={selfAddGroup}>
                            添加子部门
                        </div>
                    </Menu.Item>
                    <Menu.Item>
                        <div className={styles.tree_item_down} onClick={selfAddAdmin}>
                            设置主管
                        </div>
                    </Menu.Item>
                    <Menu.Item>
                        <div className={styles.tree_item_down} onClick={selfEditGroup}>
                            编辑
                        </div>
                    </Menu.Item>
                    <Menu.Item>
                        <div className={styles.tree_item_down} onClick={selfDelGroup}>
                            删除
                        </div>
                    </Menu.Item>
                </Menu>
            )
        }
    }, [props.level, props.title])

    return (
        <div
            ref={contentRef}
            className={[styles.tree_item].join(' ')}
            style={{ maxWidth: contentW ? `${contentW}px` : 'auto' }}
            onClick={e => {
                e.stopPropagation()
                onClick(data)
            }}
        >
            <div className={styles.tree_item_info}>
                <div
                    className={styles.tree_item_title}
                    style={{ maxWidth: titleW ? `calc(100% - ${titleW}px)` : 'auto' }}
                >
                    <Tooltip title={props.title}>{props.title}</Tooltip>
                </div>
                <div ref={countRef} className={styles.tree_item_count}>
                    {props.count}
                </div>
            </div>
            <Dropdown overlay={getMenu} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                <svg className={['icon', styles.tree_item_btn].join(' ')} aria-hidden="true">
                    <use xlinkHref={`#gengduo`} />
                </svg>
            </Dropdown>
        </div>
    )
}

export default observer(TreeTitle)
