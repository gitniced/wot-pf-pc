import { Button, Form, Input } from 'antd'
import styles from './index.module.less'
import type { LoginProps } from './interface'
import { useState } from 'react'

const Login: React.FC<LoginProps> = (props: LoginProps) => {
    const { quick, loginHandler } = props
    const [form] = Form.useForm()

    const [loading, setLoading] = useState(false)

    const getPlaceholder = () => {
        if (quick) {
            return '请输入证件号码'
        } else {
            return '请输入手机号或证件号码'
        }
    }

    const placeholderStr = getPlaceholder()

    return (
        <div className={styles.page}>
            <div className={styles.title}>考生登录</div>
            <Form
                form={form}
                layout="vertical"
                name="login"
                className={styles.form}
                onFinish={() => {
                    setLoading(true)
                    const params = form.getFieldsValue()
                    // @ts-ignore
                    loginHandler(params)?.finally?.(() => {
                        setLoading(false)
                    })
                }}
            >
                <Form.Item
                    name={'account'}
                    validateTrigger={['onBlur']}
                    rules={[{ required: true, message: `${placeholderStr}` }]}
                >
                    <Input className={styles.input} placeholder={`${placeholderStr}`} />
                </Form.Item>
                {!quick && (
                    <Form.Item
                        name={'password'}
                        validateTrigger={['onBlur']}
                        rules={[{ required: true, message: '请输入登录密码' }]}
                        hidden={quick}
                    >
                        <Input className={styles.input} placeholder="请输入登录密码" />
                    </Form.Item>
                )}

                <Form.Item noStyle>
                    <Button
                        disabled={loading}
                        type={'primary'}
                        htmlType={'submit'}
                        className={styles.submit}
                    >
                        确定
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login
