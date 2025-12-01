import { useObserver } from 'mobx-react'
import { Form, Modal, Button, Input } from 'antd'
import { useEffect } from 'react'
import { SyncOutlined } from '@ant-design/icons'
import type { ModalProps } from './interface'
import Hook from './hook'
import styles from './index.module.less'

export default (props: ModalProps) => {
    const [form] = Form.useForm()
    const hook = Hook()

    useEffect(() => {
        if (props.visible) {
            hook.handleGetNumberCode(props.uniKey)
        }
    }, [props.visible])

    return useObserver(() => {
        return (
            <Modal
                title="图片验证码"
                visible={props.visible}
                width={388}
                style={{ ...props.styles }}
                onCancel={() => {
                    hook.handleCancelModal(form)
                    props.onCancel()
                }}
                className={styles.codeModal}
                maskClosable={false}
                footer={
                    <div className={styles.btn_box}>
                        <div
                            className={styles.refresh_box}
                            onClick={() => hook.handleGetNumberCode(props.uniKey)}
                        >
                            <SyncOutlined />
                        </div>
                        <Button
                            type="primary"
                            onClick={() => {
                                form.submit()
                            }}
                        >
                            确认
                        </Button>
                    </div>
                }
            >
                <div className={styles.numberCode_box}>
                    <img src={hook.codeImg} />
                    <Form
                        form={form}
                        layout="vertical"
                        name="numberCode"
                        onFinish={() => {
                            hook.handleConfirmModal(form, props)
                        }}
                    >
                        <Form.Item
                            name="code"
                            rules={[{ required: true, message: '请输入数字验证码!' }]}
                        >
                            <Input
                                className={styles.img_code_input}
                                // type="number"
                                autoComplete={'off'}
                                prefix={
                                    <img
                                        src="https://static.zpimg.cn/public/career_admin/image/yzm.png"
                                        alt=""
                                        style={{ width: '18px', height: '18px', margin: '0' }}
                                    />
                                }
                                onChange={hook.handleChangeCodeInput}
                                placeholder="请输入图片验证码"
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        )
    })
}
