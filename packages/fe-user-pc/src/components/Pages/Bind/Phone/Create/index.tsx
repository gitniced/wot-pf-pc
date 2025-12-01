import { observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import createHooks from './hooks'
import CustomTitle from '@/components/Global/CustomTitle'
import { Button, Col, Form, Input, Row, message } from 'antd'
import type UserStore from '@/stores/userStore'
import validateRule from '@/components/Global/ValidateRule'
import { TCaptcha } from '@wotu/wotu-components'
import { history } from 'umi'

const Create = (props: { userStore: UserStore | undefined }) => {
    const hooks = useLocalObservable(() => new createHooks())
    const { userStore } = props

    const itemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    }

    const [form] = Form.useForm()

    const getCodeHandler = () => {
        form.validateFields(['mobile'])
            .then(async res => {
                const { mobile } = res
                hooks.getCode(mobile)
            })
            .catch(() => {})
    }

    const bindMobile = async (values: any) => {
        if (!hooks.randomKey) {
            message.error('请先获取验证码')
            return
        }

        await hooks.bindMobile(values)
        await userStore?.getUserData()
        // if (query.first) {
        //     userStore?.goWorkBench()
        // } else {
        //     history.replace('/bind')
        // }
        history.replace('/bind')
    }

    return (
        <>
            <div className={styles.customHeader}>
                <CustomTitle title="手机号码绑定" />
                {/* {query.first && (
                    <Button
                        type="primary"
                        onClick={userStore?.goWorkBench}
                        跳过
                    </Button>
                )} */}
            </div>
            <div className={styles.form}>
                {/* <div className={styles.alertTitle}></div> */}
                <Row>
                    <Col span={12} offset={6}>
                        <Form
                            className={styles.form}
                            form={form}
                            name="bindMobile"
                            onFinish={values => {
                                bindMobile(values)
                            }}
                        >
                            <Form.Item {...itemLayout} label="手机号">
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
                                    <Input className={styles.input} placeholder="请输入手机号" />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item {...itemLayout} label="验证码">
                                <Row>
                                    <Form.Item
                                        name="verifyCode"
                                        rules={[{ required: true, message: '请输入验证码' }]}
                                        noStyle
                                    >
                                        <Input className={styles.code} placeholder="请输入验证码" />
                                    </Form.Item>
                                    <Form.Item noStyle>
                                        <TCaptcha
                                            depend={{ form: form, key: 'mobile' }}
                                            serverVerify={hooks.serverVerify}
                                        >
                                            <Button
                                                className={styles.code_btn}
                                                disabled={
                                                    hooks.createCodeBtnStr !== '发送验证码'
                                                        ? true
                                                        : false
                                                }
                                                onClick={getCodeHandler}
                                            >
                                                {hooks.createCodeBtnStr}
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
                                        loading={hooks.loadingBtn}
                                    >
                                        确认
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default observer(Create)
