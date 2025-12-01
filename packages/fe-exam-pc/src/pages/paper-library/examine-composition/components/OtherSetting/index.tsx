import { InfoCircleOutlined } from '@ant-design/icons'
import { Form, InputNumber, Tooltip, Image, Radio, Typography } from 'antd'
import React, { useState } from 'react'
import styles from './index.module.less'
import TextArea from 'antd/lib/input/TextArea'

const OtherSetting = (props: { isShowEdit?: boolean }) => {
    const { isShowEdit = false } = props || {}
    const [imgVisible, setImgVisible] = useState<boolean>(false)

    return (
        <div className={styles.other}>
            <Form.Item
                label={
                    <>
                        <span>建议作答时间</span>
                        <Tooltip title="实际考试时可直接使用试卷建议作答时间，也可以重新设置考试时间">
                            <InfoCircleOutlined />
                        </Tooltip>
                    </>
                }
                required
                className={styles.pdt_8}
            >
                <Form.Item name="suggestedTime" noStyle>
                    <InputNumber
                        placeholder="请输入"
                        min={0}
                        max={1000}
                        // @ts-ignore
                        formatter={value => value && parseInt(value)}
                    />
                </Form.Item>
                <span className={styles.add_margin}>分钟</span>
            </Form.Item>
            <Form.Item label="注意事项" className={styles.pdt_8}>
                <Form.Item name="precautions" noStyle>
                    <TextArea rows={6} placeholder="请输入" maxLength={500} />
                </Form.Item>
                <div>
                    <Typography.Link onClick={() => setImgVisible(true)}>
                        查看应用场景
                    </Typography.Link>
                    <Image
                        style={{ display: 'none' }}
                        src="https://static.zpimg.cn/public/fe-merchant-pc/application_scenarios.png"
                        preview={{
                            visible: imgVisible,
                            src: 'https://static.zpimg.cn/public/fe-merchant-pc/application_scenarios.png',
                            onVisibleChange: value => {
                                setImgVisible(value)
                            },
                        }}
                    />
                </div>
                {isShowEdit && (
                    <Form.Item
                        label="允许编辑"
                        name="canEditState"
                        required
                        className={styles.no_margin}
                    >
                        <Radio.Group>
                            <Radio value={1}>允许</Radio>
                            <Radio value={0}>不允许</Radio>
                        </Radio.Group>
                    </Form.Item>
                )}
            </Form.Item>
        </div>
    )
}

export default OtherSetting
