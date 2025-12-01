import CustomTitle from '@/components/CustomTitle'
import type { PageProps } from '@/types'
import { Button, Col, Form, Input, Row, Steps } from 'antd'
import { Observer, useLocalObservable } from 'mobx-react'

import Store from './store'

import styles from './index.module.less'
import validateRule from '@/components/Global/ValidateRule'
import { CommonTypes, TCaptcha } from '@wotu/wotu-components'
import { getLocalStorage } from '@/storage'

const { Step } = Steps

const itemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
}

const Password = (props: PageProps) => {
    const store = useLocalObservable(() => new Store())
    const { userStore } = props

    // 密码验证表单
    const [passForm] = Form.useForm()
    // 手机号码验证表单
    const [phoneForm] = Form.useForm()

    const getCodeHandler = () => {
        phoneForm
            .validateFields(['mobile'])
            .then(async res => {
                const { mobile } = res
                store.getVerifyCode(mobile)
            })
            .catch(() => {})
    }

    const handleFinish = () => {
        passForm.validateFields().then(values => {
            store.verifyPassword({
                password: values.password,
                account: userStore?.userData?.mobile,
                appKey: userStore?.userAccount?.appKey,
                sid: getLocalStorage('SID'),
                type: CommonTypes.LOGIN_TYPE_STR_TO_NUM[userStore?.userType ?? 'org'],
            })
        })
    }

    return (
        <Observer>
            {() => {
                return (
                    <>
                        <CustomTitle title="手机号换绑" />
                        <div className={styles.form}>
                            <Steps className={styles.steps} current={store.stepIndex}>
                                <Step title="密码验证" description="请输入登录密码进行身份验证" />
                                <Step title="新手机号绑定" description="输入新手机号码绑定" />
                            </Steps>

                            {store.stepIndex === 0 && (
                                <Row>
                                    <Col span={12} offset={6}>
                                        <Form
                                            className={styles.form}
                                            form={passForm}
                                            name="bindMobile"
                                            onFinish={handleFinish}
                                            {...itemLayout}
                                        >
                                            <Form.Item
                                                label="登录密码"
                                                name="password"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '请输入登录密码',
                                                    },
                                                ]}
                                            >
                                                <Input.Password
                                                    className={styles.input}
                                                    placeholder="请输入密码"
                                                />
                                            </Form.Item>
                                            <Form.Item noStyle>
                                                <div className={styles.form_btn}>
                                                    <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                        loading={store.loading}
                                                    >
                                                        确定
                                                    </Button>
                                                </div>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                            )}

                            {store.stepIndex === 1 && (
                                <Row>
                                    <Col span={12} offset={6}>
                                        <Form
                                            className={styles.form}
                                            form={phoneForm}
                                            name="bindMobile"
                                            onFinish={values => {
                                                // @ts-ignore
                                                store.bindMobile(values, userStore?.get_user_data)
                                            }}
                                        >
                                            <Form.Item {...itemLayout} label="新手机号">
                                                <Form.Item
                                                    name="mobile"
                                                    rules={[
                                                        validateRule({
                                                            rule: 'MOBILE',
                                                            message: '手机号格式错误',
                                                            noEmpty: true,
                                                            noEmptyMessage: '请输入手机号',
                                                        }),
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input
                                                        className={styles.input}
                                                        placeholder="请输入新手机号"
                                                    />
                                                </Form.Item>
                                            </Form.Item>
                                            <Form.Item {...itemLayout} label="验证码">
                                                <Row>
                                                    <Form.Item
                                                        name="verifyCode"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: '请输入验证码',
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input
                                                            className={styles.code}
                                                            placeholder="请输入验证码"
                                                        />
                                                    </Form.Item>
                                                    <Form.Item noStyle>
                                                        <TCaptcha
                                                            depend={{
                                                                form: phoneForm,
                                                                key: 'mobile',
                                                            }}
                                                            serverVerify={store.serverVerify}
                                                        >
                                                            <Button
                                                                className={styles.code_btn}
                                                                disabled={
                                                                    store.codeBtnStr !==
                                                                    '发送验证码'
                                                                        ? true
                                                                        : false
                                                                }
                                                                onClick={getCodeHandler}
                                                            >
                                                                {store.codeBtnStr}
                                                            </Button>
                                                        </TCaptcha>
                                                    </Form.Item>
                                                </Row>
                                            </Form.Item>

                                            <Form.Item noStyle>
                                                <div className={styles.form_btn}>
                                                    <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                        loading={store.loading}
                                                    >
                                                        确认
                                                    </Button>
                                                </div>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                            )}
                        </div>
                    </>
                )
            }}
        </Observer>
    )
}

export default Password
