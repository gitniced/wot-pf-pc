import React from 'react'
import { Collapse, Tooltip } from 'antd'
import styles from './index.module.less'
import { observer } from 'mobx-react'

const { Panel } = Collapse

const openArrow = (isActive: boolean) => {
    return (
        <div className={[styles.collapse_btn, isActive ? styles.active : ''].join(' ')}>
            <span>{isActive ? '收起' : '展开'} </span>
            <svg className={['icon', styles.collapse_more].join(' ')} aria-hidden="true">
                <use xlinkHref={`#icon_shouqi`} />
            </svg>
        </div>
    )
}

const getSelectedCate = (list: any[] = [], deleteHandler?: (data: any) => void) => {
    return list.map(item => (
        <div
            className={`${styles.classification} ${styles.classification_edit}`}
            key={JSON.stringify(item)}
        >
            <Tooltip
                title={item.name?.join(' > ')}
                getPopupContainer={target => target.parentNode as unknown as HTMLElement}
            >
                <div className={styles.content}>{item.name?.join(' > ')}</div>
            </Tooltip>
            {deleteHandler ? (
                <svg
                    className={['icon', styles.cate_delete].join(' ')}
                    aria-hidden="true"
                    onClick={e => {
                        e.stopPropagation()
                        deleteHandler(item)
                    }}
                >
                    <use xlinkHref={`#Close-Circle-Fill`} />
                </svg>
            ) : null}
        </div>
    ))
}

const getViewCate = (list: any[] = [], deleteHandler?: (data: any) => void) => {
    return list.map(item => (
        <div className={`${styles.classification} ${styles.classification_edit}`} key={item}>
            <Tooltip
                title={item}
                getPopupContainer={target => target.parentNode as unknown as HTMLElement}
            >
                <div className={styles.content}>{item}</div>
            </Tooltip>
            {deleteHandler ? (
                <svg
                    className={['icon', styles.cate_delete].join(' ')}
                    aria-hidden="true"
                    onClick={e => {
                        e.stopPropagation()
                        deleteHandler(item)
                    }}
                >
                    <use xlinkHref={`#Close-Circle-Fill`} />
                </svg>
            ) : null}
        </div>
    ))
}

const getPanelHeader = (header: any) => {
    const isObject = Object.prototype.toString.call(header) === '[object Object]'
    return (
        <div className={styles.panel_header}>
            {isObject ? (
                <div className={`${styles.classification_header}`}>
                    <div className={styles.content}>{header?.name?.join(' > ')}</div>
                </div>
            ) : (
                <div className={styles.classification_header}>
                    <div className={styles.content}>{header}</div>
                </div>
            )}
        </div>
    )
}

const getPanelContent = (list: any[] = [], deleteHandler?: any) => {
    const isArr = list.some(item => Object.prototype.toString.call(item) === '[object Object]')
    if (isArr) {
        return <div className={styles.panel_content}>{getSelectedCate(list, deleteHandler)}</div>
    } else {
        return <div className={styles.panel_content}>{getViewCate(list, deleteHandler)}</div>
    }
}

const CategoryItem = observer((props: any) => {
    const { list = [], deleteHandler } = props || {}
    let headerInfo: any = null
    list?.length > 0 ? (headerInfo = list[0]) : ''
    return (
        <Collapse
            bordered={false}
            expandIcon={({ isActive }) => openArrow(isActive!)}
            expandIconPosition={'end'}
            className={styles.category_list}
        >
            <Panel header={getPanelHeader(headerInfo)} key={1} className={styles.cate_first}>
                {getPanelContent(list, deleteHandler)}
            </Panel>
        </Collapse>
    )
})

export default CategoryItem
