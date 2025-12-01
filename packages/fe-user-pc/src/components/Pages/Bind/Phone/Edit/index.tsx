import { Observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import editHooks from './hooks'
import CustomTitle from '@/components/Global/CustomTitle'
import { useEffect } from 'react'
import { Button, Col, Form, Input, Steps, Row } from 'antd'
import type { PageProps } from '@/types'
import validateRule from '@/components/Global/ValidateRule'
import { getDecodeInfo, TCaptcha } from '@wotu/wotu-components'
const { Step } = Steps

const Edit = (props: PageProps) => {
    let { userStore } = props
    const hooks = useLocalObservable(() => new editHooks())
    const itemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    }

    const [oldForm] = Form.useForm()
    const [newForm] = Form.useForm()

    useEffect(() => {
        const { mobile } = userStore?.userData || {}
        oldForm.setFieldsValue({
            mobile: getDecodeInfo(mobile!),
        })
    }, [])

    const getCodeHandler = () => {
        if (hooks.stepIndex === 0) {
            oldForm
                .validateFields(['mobile'])
                .then(async res => {
                    const { mobile } = res
                    hooks.getCode(mobile, 'old')
                })
                .catch(() => {})
        } else {
            newForm
                .validateFields(['mobile'])
                .then(async res => {
                    const { mobile } = res
                    hooks.getCode(mobile, 'new')
                })
                .catch(() => {})
        }
    }

    return (
        <Observer>
            {() => {
                return (
                    <>
                        <CustomTitle title="手机号码换绑" />

                        <div className={styles.form}>
                            <Steps className={styles.steps} current={hooks.stepIndex}>
                                <Step
                                    title="旧手机验证"
                                    description="用已认证的旧手机进行身份验证"
                                />
                                <Step title="新手机号换绑" description="输入新手机号码绑定" />
                            </Steps>
                            {hooks.stepIndex === 0 ? (
                                <Row>
                                    <Col span={12} offset={6}>
                                        <Form
                                            className={styles.form}
                                            form={oldForm}
                                            name="bindMobile"
                                            onFinish={e => {
                                                hooks.verifyOld(e)
                                            }}
                                        >
                                            <Form.Item {...itemLayout} label="旧手机号">
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
                                                        disabled={Boolean(
                                                            userStore?.userData?.mobile,
                                                        )}
                                                        placeholder="请输入旧手机号"
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
                                                                form: oldForm,
                                                                key: 'mobile',
                                                            }}
                                                            serverVerify={hooks.serverVerify}
                                                        >
                                                            <Button
                                                                className={styles.code_btn}
                                                                disabled={
                                                                    hooks.oldCodeBtnStr !==
                                                                    '发送验证码'
                                                                        ? true
                                                                        : false
                                                                }
                                                                onClick={getCodeHandler}
                                                            >
                                                                {hooks.oldCodeBtnStr}
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
                                                        loading={hooks.oldBtnLoading}
                                                    >
                                                        确定
                                                    </Button>
                                                </div>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                            ) : null}
                            {hooks.stepIndex === 1 ? (
                                <Row>
                                    <Col span={12} offset={6}>
                                        <Form
                                            className={styles.form}
                                            form={newForm}
                                            name="bindMobile"
                                            onFinish={e => {
                                                hooks.verifyNew(e, userStore?.getUserData)
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
                                                                form: newForm,
                                                                key: 'mobile',
                                                            }}
                                                            serverVerify={hooks.serverVerify}
                                                        >
                                                            <Button
                                                                className={styles.code_btn}
                                                                disabled={
                                                                    hooks.newCodeBtnStr !==
                                                                    '发送验证码'
                                                                        ? true
                                                                        : false
                                                                }
                                                                onClick={getCodeHandler}
                                                            >
                                                                {hooks.newCodeBtnStr}
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
                                                        loading={hooks.newBLoading}
                                                    >
                                                        确认
                                                    </Button>
                                                </div>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                            ) : null}
                        </div>
                    </>
                )
            }}
        </Observer>
    )
}

export default Edit
