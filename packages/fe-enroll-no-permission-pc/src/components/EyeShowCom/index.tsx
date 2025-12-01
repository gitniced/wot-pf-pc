import React, { useState } from 'react'
import styles from './index.module.less'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

export default ({ fullStr, shortStr }: any) => {
    const [showFull, setShowFull] = useState<boolean>(false)
    return (
        <div className={styles.content}>
            <div className={styles.content_str}>{showFull ? fullStr : shortStr}</div>
            <div
                className={styles.content_btn}
                onClick={e => {
                    e.stopPropagation()
                    setShowFull(!showFull)
                }}
            >
                {showFull ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </div>
        </div>
    )
}
