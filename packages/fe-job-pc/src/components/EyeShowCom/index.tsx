import React, { useState } from 'react'
import styles from './index.module.less'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

export default ({ fullStr = '', type = 'name' }: { fullStr: string, type: 'phone' | 'name' | 'idcard' }) => {
    const [showFull, setShowFull] = useState<boolean>(false)

    const getMaskedStr = (str: string, type: 'phone' | 'name' | 'idcard') => {
        if (!str) return ''
        
        switch (type) {
            case 'phone':
            case 'idcard':
                return str.replace(/^(.{3})(.*)(.{2})$/, '$1' + '*'.repeat(str.length - 5) + '$3')
            case 'name':
                return '*' + str.slice(1)
            default:
                return str
        }
    }

    const shortStr = getMaskedStr(fullStr, type)
    return (
        <div className={styles.content}>
            <div className={styles.content_str} title={showFull ? fullStr : undefined}>{showFull ? fullStr : shortStr}</div>
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
