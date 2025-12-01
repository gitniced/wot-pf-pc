import { inject, observer, useLocalObservable } from 'mobx-react'
import { useLocation, history } from 'umi'
import styles from './index.module.less'
import bindHooks from './hooks'
import { Button, Form, Input, Row } from 'antd'
import { TCaptcha } from '@wotu/wotu-components'
import { ArrowLeftOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { useEffect } from 'react'
import { QRCODE_TYPE, Type } from './const'

const Qrcode = (props: any) => {
    const { siteStore, userStore } = props || {}

    const [form] = Form.useForm()
    const hooks = useLocalObservable(() => new bindHooks())

    let { siteData } = siteStore || {}
    let { groupList }: any = siteData?.data || {}

    const { query } = useLocation() || {}
    const { type, authOpenId, authType } = query || {}

    useEffect(() => {
        type && authOpenId && authType && hooks.getAuth(authOpenId, authType, type)
    }, [authOpenId, authType])

    //todo:
    useEffect(() => {
        document.title = authType ? `${QRCODE_TYPE[authType]}绑定` : '绑定'
        hooks.getGroup(groupList)
    }, [])

    /**
     * 绑定
     * @param _form
     * @param formRef
     */
    const bindHandler = (_form: any) => {
        hooks.bindHandler(_form, siteStore, userStore!)
    }

    const getCodeHandler = () => {
        form.validateFields(['account'])
            .then(async res => {
                const { account } = res
                hooks.getCode(account)
            })
            .catch(() => {})
    }

    const validateAccount = () => {
        return {
            validator: async (_: any, value: any) => {
                const reg = /^1\d{10}$/
                if (value) {
                    if (!reg.test(value)) {
                        return Promise.reject(new Error('手机号格式错误'))
                    } else {
                        return await Promise.resolve()
                    }
                } else {
                    hooks.changeBtn(false)
                    return Promise.reject(new Error('请输入手机号'))
                }
            },
        }
    }

    return (
        <div className={styles.page}>
            <Button
                href="/user/login"
                className={styles.back_btn}
                type={'text'}
                onClick={e => {
                    e.preventDefault()
                    history.goBack()
                }}
            >
                <ArrowLeftOutlined />
                返回
            </Button>
            <div className={styles.toGrant}>
                <div className={styles.svgg}>
                    {authType === Type.NNC ? (
                        <img
                            src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/png_shenfenrenzheng%402x_775fed7d.png"
                            className={styles.img_icon}
                        />
                    ) : (
                        <svg aria-hidden="true" className={classNames('icon', styles.svg_icon)}>
                            {/* //todo: */}
                            <use xlinkHref={`#icon_shouquan`} />
                        </svg>
                    )}
                </div>
                <div className={styles.author}>
                    {authType ? `${QRCODE_TYPE[authType]}已授权` : '授权'}
                </div>
            </div>

            <Form
                form={form}
                size="large"
                name="normal_bind"
                initialValues={{ remember: true }}
                validateTrigger={'onBlur'}
                onFinish={e => {
                    bindHandler(e)
                }}
            >
                <Form.Item name="account" rules={[validateAccount]}>
                    <Input className={styles.input} placeholder="请输入手机号" />
                </Form.Item>

                <Form.Item noStyle>
                    <Form.Item
                        name="verifyCode"
                        rules={[{ required: true, message: '请输入验证码' }]}
                    >
                        <Row>
                            <Input className={styles.code} placeholder="请输入验证码" />
                            <TCaptcha
                                depend={{ form: form, key: 'account' }}
                                serverVerify={hooks.serverVerify}
                            >
                                <Button
                                    disabled={
                                        hooks.codeBtnStr !== '发送验证码' || hooks.veriCodeBtn
                                    }
                                    className={styles.code_btn}
                                    onClick={getCodeHandler}
                                >
                                    {hooks.codeBtnStr}
                                </Button>
                            </TCaptcha>
                        </Row>
                    </Form.Item>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.login_btn}>
                        绑定
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default inject('siteStore', 'userStore')(observer(Qrcode))
