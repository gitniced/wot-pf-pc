/**
 * table 脱敏组件
 */
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { getDecodeInfo } from '@wotu/wotu-components'
import React, { useState } from 'react'
import styles from './index.module.less'

interface IDesensitizationItemProps {
    encryptValue: string
    showEye?: boolean
    render?: (text: string) => React.ReactNode
    isVisible?: boolean
    onToggleVisible?: (visible: boolean) => void
    desensitizationType?: '1' | '2' | '3'
}

const DesensitizationItem = (props: IDesensitizationItemProps) => {
    const {
        encryptValue,
        showEye: showEye = true,
        render,
        isVisible,
        onToggleVisible,
        desensitizationType = '1',
    } = props
    const [internalChecked, setInternalChecked] = useState(false)

    const isChecked = isVisible !== undefined ? isVisible : internalChecked

    const encryptText = getDecodeInfo(encryptValue, desensitizationType)
    const decryptText = getDecodeInfo(encryptValue)

    const showCompleteInfo = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        e.preventDefault()
        if (onToggleVisible) {
            onToggleVisible(true)
        } else {
            setInternalChecked(true)
        }
    }

    const hideCompleteInfo = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        e.preventDefault()
        if (onToggleVisible) {
            onToggleVisible(false)
        } else {
            setInternalChecked(false)
        }
    }

    const content = isChecked ? decryptText : encryptText

    return (
        <div className={styles.sensitive_info_box}>
            {render ? render(content) : content}
            {showEye && (
                <>
                    {isChecked ? (
                        <EyeInvisibleFilled
                            className={styles.sensitive_icon}
                            onClick={hideCompleteInfo}
                        />
                    ) : (
                        <EyeFilled className={styles.sensitive_icon} onClick={showCompleteInfo} />
                    )}
                </>
            )}
        </div>
    )
}

export default React.memo(DesensitizationItem)
