import React from 'react'
import styles from './index.module.less'
import type { ResourceListDto } from '../StepComponents/interface'

const StepResourceTitle = ({
    list,
    current,
    onChange,
}: {
    list: ResourceListDto[]
    current: string
    onChange: (_i: string) => void
}) => {
    return (
        <div className={styles.tag_content}>
            {list.map(item => {
                const { key, value } = item || {}
                return (
                    <div
                        key={key}
                        className={[styles.tag_item, key === current ? styles.active : ''].join(
                            ' ',
                        )}
                        onClick={() => {
                            onChange(key!)
                        }}
                    >
                        {value}
                    </div>
                )
            })}
        </div>
    )
}

export default StepResourceTitle
