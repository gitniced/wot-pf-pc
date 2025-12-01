import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import styles from './index.module.less'
import { inject, observer } from 'mobx-react'
import type { PageProps } from '@/types'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { history, useLocation } from 'umi'
import FaceModel from '@/components/FaceModel'
import http from '@/servers/http'
import api from './api'
import { getLocalStorage, getSessionStorage, setSessionStorage } from '@/storage'
import { useForm } from 'antd/lib/form/Form'

const Login = (props: PageProps) => {
    const { search: urlSearch } = useLocation() || {}
    console.log(props)
    const [accountForm] = useForm()
    const [currentUserCode, setCurrentUserCode] = useState('')
    const [showFaceModal, setShowFaceModal] = useState(false)

    useEffect(() => {
        /**  记住登上次登录  */
        let lastLoginAccount = getSessionStorage('LAST_LOGIN_ACCOUNT') || ''
        if (lastLoginAccount) {
            accountForm.setFieldValue('account', lastLoginAccount)
        }
    }, [])

    /**
     *登录
     * @param form
     * @param formRef
     */
    const checkAccount = async (account: string) => {
        const sid = getLocalStorage('SID')
        const checkInfo = await http(api.checkAccount, 'post', { account, sid })
        //@ts-ignore
        const { existPhoto, userCode } = checkInfo || {}
        setCurrentUserCode(userCode)
        if (existPhoto) {
            setShowFaceModal(true)
        } else {
            Modal.warning({
                className: styles.face_login_modal_warning,
                content: '请登录后录入人脸，再使用人脸识别登录',
                okText: '我知道了',
            })
        }
    }

    /**
     *返回登录
     */
    const goBack = () => {
        history.replace(`/user/login${urlSearch ? `${urlSearch}` : ''}`)
    }

    useEffect(() => {}, [])

    return (
        <div className={styles.page}>
            <Button className={styles.back_btn} type={'text'} onClick={goBack}>
                <ArrowLeftOutlined />
                返回
            </Button>
            <Form
                form={accountForm}
                validateTrigger={'onBlur'}
                size="large"
                name="normal_login"
                className={styles.login_form}
                onFinish={(values: any) => {
                    const { account } = values
                    checkAccount(account)
                }}
                onValuesChange={e => {
                    const { account } = e
                    if (account) {
                        setSessionStorage('LAST_LOGIN_ACCOUNT', account)
                    }
                }}
            >
                <div className={styles.title}>人脸识别登录</div>
                <Form.Item name="account" rules={[{ required: true, message: '请输入账号' }]}>
                    <Input className={styles.input} placeholder={'请输入账号'} maxLength={30} />
                </Form.Item>
                <Form.Item className={styles.login_item}>
                    <Button type="primary" htmlType="submit" className={styles.login_btn}>
                        下一步
                    </Button>
                </Form.Item>
            </Form>

            {showFaceModal ? (
                <FaceModel
                    isLogin={true}
                    userCode={currentUserCode}
                    onCancel={() => {
                        setShowFaceModal(false)
                    }}
                />
            ) : null}
        </div>
    )
}

export default inject('siteStore', 'userStore')(observer(Login))
