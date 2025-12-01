import { Form } from 'antd'
import React from 'react'
import EditorInput from '../EditorInput'
import ItemContainer from '../ItemContainer'

export default function Index() {
    return (
        <ItemContainer title="答案">
            <Form.Item noStyle name="answer">
                <EditorInput minHeight={64} />
            </Form.Item>
        </ItemContainer>
    )
}
