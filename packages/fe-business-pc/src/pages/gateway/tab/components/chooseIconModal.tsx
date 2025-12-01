import React, { useState, useEffect } from 'react'
import { Modal, Form } from 'antd'
import styles from './index.module.less'
// import GlobalUpload from '@/components/GlobalUpload'
import ImageUpload from '@/components/ImageUpload'

import classNames from 'classnames'
import { ICON_BASE } from './const'

interface Props {
    visible: boolean
    iconType: number // 0默认 1选中
    onCancel: () => void
    onOk: (iconKey: string) => void
    saveIconKey: string
    setVisible: any
    activeColor: string
}

export const ChooseIconModal = ({
    visible,
    iconType,
    onCancel,
    onOk,
    saveIconKey,
    setVisible,
    activeColor,
}: Props) => {
    const [curChooseIconName, setIconName] = useState<string>(saveIconKey) //选择的icon或者是自己上传的
    const [form] = Form.useForm()

    const onOkModal = (icon: string) => {
        setVisible(false)
        setIconName(icon)
        onOk(icon)
    }

    useEffect(() => {
        if (!visible) {
            form.resetFields()
            setIconName('')
        }
    }, [visible])

    useEffect(() => {
        setIconName(saveIconKey)
    }, [saveIconKey, iconType])

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e
        }
        return e && e.fileList
    }

    return (
        <Modal
            forceRender
            title="选择图标"
            open={visible}
            onCancel={onCancel}
            width={864}
            // onOk={Finish}
            footer={false}
        >
            <div className={styles.choosePage}>
                <div className={styles.locaiton}>
                    <h3>本地上传</h3>
                    <Form form={form}>
                        <Form.Item
                            name={saveIconKey}
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <ImageUpload
                                type={10}
                                otherProps={{
                                    maxCount: 1,
                                    accept: ['image/jpeg', 'image/png', 'image/jpg'],
                                    size: 5,
                                }}
                                onChange={(e: any) => {
                                    if (e?.file?.response?.url) {
                                        onOk(e?.file?.response?.url as string)
                                        setVisible(false)
                                    }
                                }}
                            />
                        </Form.Item>
                    </Form>
                    <p className={styles.tip}>支持jpg、jpeg、png格式，尺寸建议56*56px</p>
                </div>
                <div className={styles.base}>
                    <h3>图标库中选择</h3>
                    <div className={styles.iconBase}>
                        {ICON_BASE.map((i: string) => (
                            <div
                                key={i}
                                onClick={() => onOkModal(i)}
                                className={i === curChooseIconName ? styles.activeIcon : ''}
                            >
                                <svg
                                    className={classNames('icon')}
                                    style={iconType === 1 ? { fill: `${activeColor}` } : {}}
                                    aria-hidden="true"
                                >
                                    <use xlinkHref={`#${i}`} />
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    )
}
