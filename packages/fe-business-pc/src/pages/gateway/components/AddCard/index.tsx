import type { ReactNode } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { Button } from 'antd'
import CustomUpload from '../CustomUpload'

const AddCard = ({
    label,
    children,
    onChange,
    onUplaodStar,
    onUploadEnd,
    disabled,
    isUpload,
}: {
    label: string
    children: ReactNode
    onChange: (files: any) => void
    onUplaodStar?: () => void
    onUploadEnd?: () => void
    disabled: boolean
    isUpload: boolean
}) => {
    const CustomButton = (hasClick: boolean = true) => {
        if (hasClick) {
            return (
                <Button
                    disabled={disabled}
                    type={disabled ? 'default' : 'dashed'}
                    className={styles.add_button}
                    onClick={onChange}
                >
                    <PlusOutlined
                        className={[styles.add_icon, disabled ? styles.add_icon_disabled : ''].join(
                            ' ',
                        )}
                    />
                    <span className={disabled ? styles.add_label_disabled : ''}>{label}</span>
                </Button>
            )
        } else {
            return (
                <Button
                    disabled={disabled}
                    className={styles.add_button}
                    type={disabled ? 'default' : 'dashed'}
                >
                    <PlusOutlined
                        className={[styles.add_icon, disabled ? styles.add_icon_disabled : ''].join(
                            ' ',
                        )}
                    />
                    <span className={disabled ? styles.add_label_disabled : ''}>{label}</span>
                </Button>
            )
        }
    }

    const getButton = () => {
        if (isUpload) {
            return (
                <CustomUpload
                    onChange={onChange}
                    onUplaodStar={() => {
                        onUplaodStar?.()
                    }}
                    onUploadEnd={() => {
                        onUploadEnd?.()
                    }}
                >
                    {CustomButton(false)}
                </CustomUpload>
            )
        } else {
            return CustomButton()
        }
    }
    return (
        <div className={styles.add_card_wap}>
            {children}
            {getButton()}
        </div>
    )
}

export default AddCard
