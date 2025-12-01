import { inject, Observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import baseHooks from './hooks'
import { Button, Col, Form, Input, Row, Modal } from 'antd'
import CustomTitle from '@/components/Global/CustomTitle'
import validateRule from '@/components/Global/ValidateRule'
import type { IRoute } from 'umi'
import { history } from 'umi'
import type { PageProps } from '@/types'
import { ExclamationCircleFilled } from '@ant-design/icons'

const Password = ({ userStore }: PageProps) => {
    const hooks = useLocalObservable(() => new baseHooks())

    const itemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 },
    }

    const [form] = Form.useForm()

    const validatePsw = () => {
        return {
            validator: (_, value) => {
                if (value) {
                    return Promise.resolve()
                } else {
                    return Promise.reject(new Error('请输入旧密码'))
                }
            },
        }
    }

    const validatePsw2 = ({ getFieldValue }) => {
        return {
            validator: (_, value) => {
                if (value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                    }
                    return Promise.reject(new Error('两次输入密码不一致'))
                } else {
                    return Promise.reject(new Error('请输入确认密码'))
                }
            },
        }
    }

    return (
        <Observer>
            {() => {
                return (
                    <div className={styles.page}>
                        <div className={styles.content}>
                            <CustomTitle title="登录密码" />
                            <Row>
                                <Col span={10} offset={7}>
                                    <Form
                                        className={styles.form}
                                        form={form}
                                        name="password"
                                        validateTrigger={'onBlur'}
                                        onFinish={async e => {
                                            const data = await userStore?.getUserData()
                                            if (!data?.mobile) {
                                                Modal.confirm({
                                                    icon: <ExclamationCircleFilled />,
                                                    content: '您还未绑定手机，请先绑定手机再修改密码。',
                                                    onOk: () => {
                                                        history.push('/bind/phone?type=create')
                                                    },
                                                })
                                                return
                                            }
                                            Modal.confirm({
                                                icon: <ExclamationCircleFilled />,
                                                content: '是否更新登录密码?',
                                                onOk: () => {
                                                    return hooks.fixPassword(
                                                        e,
                                                        form,
                                                        userStore?.getUserData,
                                                    )
                                                },
                                            })
                                        }}
                                    >
                                        <Form.Item
                                            {...itemLayout}
                                            label={'旧密码'}
                                            name="oldPassword"
                                            rules={[validatePsw]}
                                        >
                                            <Input.Password
                                                className={styles.input}
                                                placeholder="请输入旧密码"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...itemLayout}
                                            label={'新密码'}
                                            name="password"
                                            rules={[
                                                validateRule({
                                                    rule: 'PASSWORD',
                                                    message:
                                                        '包含数字、字母或特殊字符中的两种，且长度在8-20位之间',
                                                    noEmpty: true,
                                                    noEmptyMessage: '请输入新密码',
                                                }),
                                            ]}
                                        >
                                            <Input.Password
                                                className={styles.input}
                                                placeholder="请输入新密码"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...itemLayout}
                                            label={'确认密码'}
                                            name="passwordRepeat"
                                            validateFirst={true}
                                            rules={[validatePsw2]}
                                            hasFeedback
                                        >
                                            <Input.Password
                                                className={styles.input}
                                                placeholder="请确认新密码"
                                            />
                                        </Form.Item>

                                        <Form.Item noStyle>
                                            <div className={styles.form_btn}>
                                                <Button type="primary" htmlType="submit">
                                                    确认
                                                </Button>
                                            </div>
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </div>
                )
            }}
        </Observer>
    )
}

const ObserverPassword: IRoute = inject('userStore')(Password)

ObserverPassword.title = '登录密码'

export default ObserverPassword
