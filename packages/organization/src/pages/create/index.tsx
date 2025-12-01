import React, { useEffect } from 'react'
import { inject, observer, useLocalObservable } from 'mobx-react'
import type { PageProps } from '@/types'
import { MICRO_APP_TYPE } from '@/types'
import { ITEM_LAYOUT } from '@/types'
import type { IRoute } from 'umi'
import { useModel, history } from 'umi'
// import { useModel, useLocation, history } from 'umi'
import CreatedStore from './store'
import styles from './index.module.less'
import { Button, Steps, Form, Row, message, Col } from 'antd'
// import CustomTitle from '@/components/CustomTitle'
// import { CheckCircleFilled } from '@ant-design/icons'
import type { FormValuesType } from './interface'
// import classNames from 'classnames'
// import validateRule from '@/components/ValidateRule'
// import { TCaptcha } from '@wotu/wotu-components'
import OrgInfo from '@/components/Pages/Organization/OrgInfo'
import { getLocalStorage } from '@/storage/localStorage'
import { getSourceTypeByType } from '@/utils/urlUtil'
import Prove from '@/components/Prove'
import type { MasterProps } from '@/components/MasterPlugins/interface'

const { Step } = Steps

const Page = observer((props: PageProps) => {
    const masterStore: MasterProps = useModel('@@qiankunStateFromMaster')

    let store = useLocalObservable(() => new CreatedStore())
    const { sourceType } = history.location.query

    // 是否在工作台中
    let isMerchant = masterStore?.tag === MICRO_APP_TYPE.WORK_BENCH
    // 工作台中从主应用获取userStore
    let userStore = isMerchant ? masterStore?.masterStore?.userStore : props.userStore
    let { userData } = userStore

    let getUserData = isMerchant ? userStore.getUserData : userStore?.getUserData
    const [form] = Form.useForm()
    // const { query } = useLocation()
    // useEffect(() => {
    //     if (query?.register === '1') {
    //         store.currentStep = 1
    //     }
    // }, [query?.register])

    useEffect(() => {
        let mobile = userData?.mobile
        getUserData?.().then(() => {
            if (mobile) {
                form.setFieldsValue({ mobile })
            }
        })
    }, [])

    // 点击下一步
    const clickNext = () => {
        // if (store.currentStep === 0) {
        //     form.validateFields(['mobile', 'security'])
        //         .then((values: any) => {
        //             if (userData?.isValidatePhone) {
        //                 store.verifyOld(values)
        //             } else {
        //                 store.bindMobile(values)
        //             }
        //         })
        //         .catch(() => {})
        // } else {
        form.validateFields()
            .then((values: FormValuesType) => {
                if (store.avatar) {
                    values.logo = store.avatar
                } else {
                    message.error('请上传机构LOGO')
                    return
                }

                if (values?.addressList?.length) {
                    values.province = Number(values?.addressList?.[0])
                    values.city = Number(values?.addressList?.[1])
                    values.area = Number(values?.addressList?.[2])
                    delete values?.addressList
                }

                if (values?.industry?.length) {
                    values.industryId = Number(values.industry?.[1])
                    delete values.industry
                }
                if (values?.scale) {
                    values.scale = Number(values.scale)
                }

                store.createdOrganization(
                    {
                        ...values,
                        identity:
                            getSourceTypeByType(getLocalStorage('SOURCE_TYPE')) ||
                            sourceType ||
                            undefined,
                    },
                    masterStore.updateCurrentOrganization,
                )
            })
            .catch(() => {})
        // }
    }

    // 获取验证码  getCode
    // const getCodeHandler = () => {
    //     form.validateFields(['mobile'])
    //         .then((values: any) => {
    //             store.getCode(values.mobile)
    //         })
    //         .catch(() => {})
    // }

    const onFinish = () => {
        if (store.currentStep < store.steps.length - 1) {
            clickNext()
        } else {
            history.push('/')
        }
    }

    return (
        <div className={styles.page}>
            {/* 新建机构流程 */}

            <div className={styles.flow}>
                {/* 步进器 */}
                <div className={styles.steps}>
                    <Steps current={store.currentStep} direction={'horizontal'} responsive={false}>
                        {store.steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                </div>
                <Form
                    name="basic"
                    autoComplete="off"
                    form={form}
                    onFinish={onFinish}
                    requiredMark={false}
                    {...ITEM_LAYOUT}
                >
                    <div className={styles.main}>
                        <Row>
                            <Col span={14} offset={5}>
                                {/* {store.currentStep === 0 && (
                                    <>
                                        <Form.Item label="手机号">
                                            <Form.Item
                                                noStyle
                                                name="mobile"
                                                validateTrigger="onBlur"
                                                rules={[
                                                    validateRule({
                                                        rule: 'MOBILE',
                                                        message: '手机号格式错误',
                                                        noEmpty: true,
                                                        noEmptyMessage: '请输入手机号',
                                                    }),
                                                ]}
                                            >
                                                <Input
                                                    disabled={
                                                        userData?.isValidatePhone ? true : false
                                                    }
                                                    className={styles.input}
                                                    placeholder="请输入手机号"
                                                />
                                            </Form.Item>
                                        </Form.Item>

                                        <Form.Item label="验证码">
                                            <Form.Item
                                                name="security"
                                                rules={[
                                                    { required: true, message: '请输入验证码' },
                                                ]}
                                                noStyle
                                            >
                                                <Input
                                                    className={classNames(
                                                        styles.input,
                                                        styles.security,
                                                    )}
                                                    placeholder="请输入验证码"
                                                    allowClear
                                                />
                                            </Form.Item>

                                            <Form.Item noStyle>
                                                <TCaptcha
                                                    depend={{ form: form, key: 'account' }}
                                                    serverVerify={store.serverVerify}
                                                >
                                                    <Button
                                                        disabled={
                                                            store.codeBtnStr !== '发送验证码'
                                                                ? true
                                                                : false
                                                        }
                                                        className={styles.send_btn}
                                                        onClick={getCodeHandler}
                                                    >
                                                        {store.codeBtnStr}
                                                    </Button>
                                                </TCaptcha>
                                            </Form.Item>
                                        </Form.Item>
                                    </>
                                )} */}

                                {store.currentStep === 0 && <OrgInfo createStore={store} />}
                            </Col>
                        </Row>

                        {store.currentStep < store.steps.length - 1 && (
                            <div className={styles.steps_action}>
                                <Button type="primary" htmlType="submit" loading={store.btnLoading}>
                                    下一步
                                </Button>
                            </div>
                        )}
                    </div>
                </Form>

                {store.currentStep === 1 && <Prove isCreate={true} name={store.nameValue} />}
            </div>
        </div>
    )
})

const ObserverAccount: IRoute = inject('userStore', 'siteStore')(Page)

ObserverAccount.title = '机构新建'

export default ObserverAccount
