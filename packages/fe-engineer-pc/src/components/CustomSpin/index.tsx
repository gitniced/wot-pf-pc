import React from 'react'
import styles from './index.module.less'
import { Spin } from 'antd'

export default ({ className }: { className?: string }) => {
    return (
        <Spin
            size={'large'}
            className={[styles.custom_spin, className ? className : ''].join(' ')}
        />
    )
}
