import React from 'react'
import type { ReactNode } from 'react'
import styles from './index.module.less'

type StepTitleProps = { label: string; right?: ReactNode | null }

const StepTitle = ({ label, right = null }: StepTitleProps) => {
    return (
        <div className={styles.step_title_content}>
            <div className={styles.step_title_label}>{label}</div>
            <>{right}</>
        </div>
    )
}

export default StepTitle
