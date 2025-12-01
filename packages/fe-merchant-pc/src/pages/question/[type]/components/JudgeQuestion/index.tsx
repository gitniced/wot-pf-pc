// 判断题答案
import React from 'react'
import { Form, Radio } from 'antd'
import styles from './index.moduless.less'

export default function Index() {
    return (
        <div className={styles.judge}>
            <Form.Item name="answer" noStyle>
                <Radio.Group>
                    <Radio value={true}>正确</Radio>
                    <Radio value={false}>错误</Radio>
                </Radio.Group>
            </Form.Item>
        </div>
    )
}
