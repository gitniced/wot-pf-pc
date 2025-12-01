// 内容卡片组件
import React from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import type { PlanCardProps } from './interface'
import styles from './index.module.less'

const PlanCard = ({ data, allowDelete, onDelete }: PlanCardProps) => {
    return (
        <div className={styles.component_plan_card}>
            {allowDelete && <CloseCircleFilled onClick={onDelete} />}
            <div className={`${styles.title} ${styles.ellipsis}`}>{data.appraise.name}</div>
            <div className={`${styles.content} ${styles.ellipsis}`}>{data.publicityContent}</div>
            <div className={`${styles.category_name} ${styles.ellipsis}`}>
                {data.planTypeCategory.name}
            </div>
        </div>
    )
}

export default PlanCard
