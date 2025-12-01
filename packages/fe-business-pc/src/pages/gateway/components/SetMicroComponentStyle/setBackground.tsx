// 设置微页面组件背景的组件
import React from 'react'
import styles from './index.module.less'
import { Form, Radio } from 'antd'
import { CustomColorPicker } from '@wotu/wotu-pro-components'
import { BACKGROUND_OPTIONS } from './const'
import { BACKGROUND_TYPE_ENUM } from '../utils/interface.d'
import GlobalUpload from '@/components/GlobalUpload'
import { PlusOutlined } from '@ant-design/icons'
const SetBackground = () => {
    return (
        <div className={styles.set_background}>
            <Form.Item label="组件背景" name="backgroundType" className={styles.column_form_item}>
                <Radio.Group options={BACKGROUND_OPTIONS} />
            </Form.Item>
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                    prevValues?.backgroundType !== currentValues?.backgroundType
                }
            >
                {({ getFieldValue }) => {
                    let backgroundType = getFieldValue('backgroundType')

                    return (
                        <>
                            {backgroundType === BACKGROUND_TYPE_ENUM.COLOR && (
                                <Form.Item
                                    label="背景颜色"
                                    name="backgroundColor"
                                    className={styles.column_form_item}
                                >
                                    <CustomColorPicker />
                                </Form.Item>
                            )}
                            {backgroundType === BACKGROUND_TYPE_ENUM.IMAGE && (
                                <Form.Item
                                    label="背景图片"
                                    className={styles.column_form_item}
                                    name="backgroundImage"
                                    extra="支持上传jpg、jpeg、png格式图片，大小不超过10M"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请上传背景图片',
                                        },
                                    ]}
                                    // valuePropName="fileList"
                                    // getValueFromEvent={normFile}
                                >
                                    <GlobalUpload
                                        amount={1}
                                        otherProps={{
                                            listType: 'picture-card',
                                        }}
                                        drag={false}
                                        size={10}
                                        type={11}
                                        accept={'image'}
                                        className={styles.image_upload}
                                    >
                                        <div className={styles.image_upload_placeholder}>
                                            <PlusOutlined />
                                            上传
                                        </div>
                                    </GlobalUpload>
                                </Form.Item>
                            )}
                        </>
                    )
                }}
            </Form.Item>
        </div>
    )
}

export default SetBackground
