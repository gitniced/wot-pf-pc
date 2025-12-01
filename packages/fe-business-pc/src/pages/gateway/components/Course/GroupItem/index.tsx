// 内容卡片组件
import React from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import styles from './index.module.less'
import type { GroupCardProps } from './const'

const PTGroupView = ({ id, name = '', allowDelete = false, onDelete }: GroupCardProps) => {
    return (
        <div className={styles.group_card}>
            {allowDelete && (
                <CloseCircleFilled
                    className={styles.group_card_close}
                    onClick={() => {
                        onDelete?.(id)
                    }}
                />
            )}
            <div className={styles.group_card_title}>{name}</div>
        </div>
    )
}

export default PTGroupView
