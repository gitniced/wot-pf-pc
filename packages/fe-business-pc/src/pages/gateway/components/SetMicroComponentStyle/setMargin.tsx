// 设置微页面组件间距的组件
import React from 'react'
import IntegerStep from './integerStep'
import { Form } from 'antd'
const SetMargin = ({
    showImageMargin = false,
}: {
    // 是否显示图片间距
    showImageMargin?: boolean
}) => {
    return (
        <>
            <Form.Item name="paddingTop" label="上边距">
                <IntegerStep />
            </Form.Item>
            <Form.Item name="paddingBottom" label="下边距">
                <IntegerStep />
            </Form.Item>
            {showImageMargin && (
                <Form.Item label="图片间距" name="imageMargin">
                    <IntegerStep showImageMargin={showImageMargin} />
                </Form.Item>
            )}
        </>
    )
}

export default SetMargin
