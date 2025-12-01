import React from 'react'
import styles from './index.module.less'
import type { LearningNodeDto } from './interface'
import { Link } from 'umi'

const CourseItem = ({
    list,
    linkHandler,
    updateNodeTreeActiveAndOpen,
}: {
    list: LearningNodeDto[]
    linkHandler: (_i: LearningNodeDto) => string
    updateNodeTreeActiveAndOpen: (_i: string) => void
}) => {
    const doLoopItem = (arr: LearningNodeDto[]) => {
        return arr.map((item: LearningNodeDto) => {
            const { name, code, type = 0, children = [], active = false, open = false } = item
            switch (String(type)) {
                case '1':
                    return (
                        <Link
                            key={code}
                            className={styles.group_menu_item}
                            to={linkHandler(item)}
                            onClick={e => {
                                e.stopPropagation()
                                updateNodeTreeActiveAndOpen(code)
                            }}
                        >
                            <div
                                className={[
                                    styles.group_menu_item_content,
                                    active ? styles.active : '',
                                    open ? styles.open : '',
                                ].join(' ')}
                            >
                                <div className={styles.sign} />
                                <div className={styles.name}>{name}</div>
                                {children.length !== 0 ? (
                                    <svg
                                        className={['icon', styles.arrow].join(' ')}
                                        aria-hidden="true"
                                    >
                                        <use xlinkHref={`#Down`} />
                                    </svg>
                                ) : null}
                            </div>

                            <div
                                className={[styles.menu_item_child, open ? styles.open : ''].join(
                                    ' ',
                                )}
                            >
                                {doLoopItem(children)}
                            </div>
                        </Link>
                    )
                case '2':
                    return (
                        <Link
                            key={code}
                            className={styles.group_menu_item}
                            to={linkHandler(item)}
                            onClick={e => {
                                e.stopPropagation()
                                updateNodeTreeActiveAndOpen(code)
                            }}
                        >
                            <div
                                className={[
                                    styles.sub_menu_item_content,
                                    active ? styles.active : '',
                                    open ? styles.open : '',
                                ].join(' ')}
                            >
                                <div className={styles.name}>{name}</div>

                                {children.length !== 0 ? (
                                    <svg
                                        className={['icon', styles.arrow].join(' ')}
                                        aria-hidden="true"
                                    >
                                        <use xlinkHref={`#Down`} />
                                    </svg>
                                ) : null}
                            </div>

                            <div
                                className={[styles.menu_item_child, open ? styles.open : ''].join(
                                    ' ',
                                )}
                            >
                                {doLoopItem(children)}
                            </div>
                        </Link>
                    )
                case '3':
                    return (
                        <Link
                            to={linkHandler(item)}
                            key={code}
                            className={styles.group_menu_item}
                            onClick={e => {
                                e.stopPropagation()
                                updateNodeTreeActiveAndOpen(code)
                            }}
                        >
                            <div
                                className={[
                                    styles.step_menu_item_content,
                                    active ? styles.active : '',
                                    open ? styles.open : '',
                                ].join(' ')}
                            >
                                <div className={styles.name}>{name}</div>
                            </div>
                        </Link>
                    )
                default:
                    return null
            }
        })
    }

    return <div className={styles.menu_content}>{doLoopItem(list)}</div>
}

export default CourseItem
