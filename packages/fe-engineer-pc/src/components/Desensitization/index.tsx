/**
 * table 脱敏组件
 */
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { getDecodeInfo } from '@wotu/wotu-components'
import { useState } from 'react'
import styles from './index.module.less'

interface propsType {
    text: string
    show: boolean
    changeInfo: (info: Record<string, string>) => void
    info: {
        nameCode: string
        mobileCode: string
    }
}

export default (props: propsType) => {
    const { text, info, show, changeInfo } = props
    const [isChecked, setIsChecked] = useState(false)

    const showCompleteInfo = () => {
        changeInfo({
            name: getDecodeInfo(info?.nameCode),
            mobile: getDecodeInfo(info?.mobileCode),
        })
        setIsChecked(true)
    }

    const hideCompleteInfo = () => {
        changeInfo({
            name: getDecodeInfo(info?.nameCode, '1'),
            mobile: getDecodeInfo(info?.mobileCode, '2'),
        })
        setIsChecked(false)
    }

    return (
        <div className={styles.sensitive_info_box}>
            {text}
            {show && (
                <>
                    {isChecked ? (
                        <EyeFilled className={styles.sensitive_icon} onClick={hideCompleteInfo} />
                    ) : (
                        <EyeInvisibleFilled
                            className={styles.sensitive_icon}
                            onClick={showCompleteInfo}
                        />
                    )}
                </>
            )}
        </div>
    )
}
