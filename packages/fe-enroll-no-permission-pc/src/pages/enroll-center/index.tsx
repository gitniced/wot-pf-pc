import { inject, observer, useLocalStore } from 'mobx-react'
import styles from './index.modules.less'
import { Button, Form, Input, Col, Row, Modal, Descriptions } from 'antd'
const { TextArea } = Input
import type { IRoute } from 'umi'
import validateRule from '@/components/ValidateRule'
import Store from './store'
import type { SubmitData } from './interface'
import { useEffect, useState } from 'react'
import { history, useModel } from 'umi'
import { ExclamationCircleFilled } from '@ant-design/icons'
import HeaderBar from '../components/HeaderBar'
import CustomTitle from '@/components/CustomTitle'
import dayjs from 'dayjs'
import { TYPE_ENUM } from './const'
import type SiteStore from '@/stores/siteStore'
import { getCookie, getSessionStorage } from '@/storage'

interface IProps {
    userStore: any
    siteStore: SiteStore
}

const EnrollCenter = (props: IProps) => {
    console.log(props)
    const store = useLocalStore(() => new Store())
    const { query = {} } = history.location || {}
    const { type = '', code = '' } = query || {}
    const [form] = Form.useForm()

    const masterStore = useModel('@@qiankunStateFromMaster')
    const { tag, gatewayUserStore, gatewaySiteStore } = masterStore || {}
    const { siteData } = gatewaySiteStore || {}

    useEffect(() => {
        if (type === 'org') {
            code && store.getGatewayInfo(code as string)
            code && store.getNavList(code as string)
        }
    }, [type])

    useEffect(() => {
        const platform = getSessionStorage('PLATFORM')
        const selectUserType = getCookie('SELECT_USER_TYPE') || ''
        if (platform === 'portal') {
            if (selectUserType && selectUserType !== 'user') {
                gatewayUserStore?.loginOut() || history.push('/404')
            }
        }
    }, [])

    /** 按钮禁止对象 */
    const [disableds, setDisableds] = useState({
        userName: false,
        userIdentify: false,
        userMobile: false,
    })

    useEffect(() => {
        enum ENROLL_TYPE_ENUM {
            ORG = 'org', //机构报名
            PLAN = 'plan', //计划报名
        }

        const typeEnum = type || ''

        const queryTypeMap: Record<string, () => void> = {
            [ENROLL_TYPE_ENUM.ORG]: () => store.getOrgInfo(code as string),
            [ENROLL_TYPE_ENUM.PLAN]: () => store.getItemInfo(code as string),
        }
        queryTypeMap?.[typeEnum as string]?.()
    }, [query?.type])

    /** 初始化 */
    const init = async () => {
        store.updateSubmitData({
            ...query,
        } as unknown as SubmitData)
        await store.getUserinfoData()
        form.setFieldsValue(store.submitData)
        // 输入框禁止设置
        setDisableds({
            userName: !!store.submitData?.userName,
            userIdentify: !!store.submitData?.userIdentify,
            userMobile: !!store.submitData?.userMobile,
        })
    }

    useEffect(() => {
        init()
    }, [])

    /**
     * 更新数据并查询
     * @param values 数据
     */
    const onFinish = (values: SubmitData) => {
        Modal.confirm({
            title: '是否提交报名信息',
            icon: <ExclamationCircleFilled />,
            centered: true,
            onOk: async () => {
                store.updateSubmitData(values)
                try {
                    await store.onSubmitData(type as string)
                    //	是否开启审核：0否，1是
                    const openAudit = store.itemInfo?.openAudit || 0
                    //是否开启缴费：0否，1是
                    const openPay = store.itemInfo?.openPay || 0
                    //  活动状态，1未开始、2报名中、3已结束
                    const activityStatus = store.itemInfo?.status || ''

                    const pathname = `/enroll-succeeded?openAudit=${openAudit}&openPay=${openPay}&status=${activityStatus}`

                    /**  审核关闭&在线缴费开启  跳转到打开交易中心   */
                    if (!Number(openAudit) && Number(openPay)) {
                        // 调去支付的接口
                        store.goToPay(store.recordCode, siteData)
                    } else {
                        history.push(pathname)
                    }
                } catch (error) {
                    // 关闭弹窗
                    Promise.reject(error)
                }
            },
        })
    }

    const itemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    }

    /** 身份证校验 */
    const userIdentifyValidator = (_: any, value: string, callback: (e?: any) => void) => {
        if (!value) {
            callback(new Error('请输入身份证号'))
            return
        }
        if (![15, 18].includes(value?.length)) {
            callback(new Error('请输入18或15位有效身份证号'))
            return
        }
        if (
            value.length === 18 &&
            !/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$/.test(
                value,
            )
        ) {
            callback(new Error('请输入18或15位有效身份证号'))
            return
        }
        if (
            value.length === 15 &&
            !/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/.test(value)
        ) {
            callback(new Error('请输入18或15位有效身份证号'))
            return
        }
        callback()
    }

    /**
     * 渲染 type 是哪个类型
     * @returns {*}
     */
    const CardRender = () => {
        const {
            address = '',
            name = '',
            organizationName = '',
            activityStart = '',
            activityEnd = '',
            applyStartTime = '',
            applyEndTime = '',
            quota = '',
            appliedNum = '',
            price = '',
            payEndTime = '',
        } = store.itemInfo || {}

        const type_ = store.enrollType?.toString() || ''

        /**  机构   */
        const renderOrgCard = () => (
            <>
                <CustomTitle title={name || '-'} />
                <Descriptions column={3} className={styles.messageItem}>
                    <Descriptions.Item label="机构地址">{address || '-'}</Descriptions.Item>
                </Descriptions>
            </>
        )

        /**  渲染报名人数  */
        const renderAppliedNum = (max: any, people: any) => {
            if (max === -1 && !people) {
                return '-'
            }

            if (max === -1 && people) {
                return people
            }
            if (max !== -1) {
                return `${people || '0'}/${max}`
            }
        }

        /**  评价计划   */
        const renderEvaluateCard = () => (
            <>
                <CustomTitle title={name || '-'} />
                <Descriptions column={3} className={styles.messageItem}>
                    <Descriptions.Item label="机构名称">
                        {organizationName || '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="认定考试时间">
                        {activityStart ? dayjs(activityStart).format('YYYY-MM-DD ') : '-'}
                        {activityEnd ? `至 ${dayjs(activityEnd).format('YYYY-MM-DD ')}` : ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="报名开始时间">
                        {applyStartTime ? dayjs(applyStartTime).format('YYYY-MM-DD HH:mm:ss') : '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="报名结束时间">
                        {applyEndTime ? dayjs(applyEndTime).format('YYYY-MM-DD HH:mm:ss') : '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="报名人数">
                        {renderAppliedNum(quota, appliedNum)}
                    </Descriptions.Item>
                    <Descriptions.Item label="报名费用" className={styles.money}>{`${
                        price || '0'
                    }元`}</Descriptions.Item>
                    <Descriptions.Item label="缴费截止时间">
                        {payEndTime ? dayjs(payEndTime).format('YYYY-MM-DD HH:mm:ss') : '-'}
                    </Descriptions.Item>
                </Descriptions>
            </>
        )
        /**  培训计划   */
        const renderTrainCard = () => (
            <>
                <CustomTitle title={name || '-'} />
                <Descriptions column={3} className={styles.messageItem}>
                    <Descriptions.Item label="机构名称">
                        {organizationName || '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="培训时间">
                        {activityStart ? dayjs(activityStart).format('YYYY-MM-DD ') : '-'}
                        {activityEnd ? `至 ${dayjs(activityEnd).format('YYYY-MM-DD ')}` : ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="报名开始时间">
                        {applyStartTime ? dayjs(applyStartTime).format('YYYY-MM-DD HH:mm:ss') : '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="报名结束时间">
                        {applyEndTime ? dayjs(applyEndTime).format('YYYY-MM-DD HH:mm:ss') : '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="报名人数">
                        {renderAppliedNum(quota, appliedNum)}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="报名费用"
                        className={styles.money}
                    >{`${price}元`}</Descriptions.Item>
                    <Descriptions.Item label="缴费截止时间">
                        {payEndTime ? dayjs(payEndTime).format('YYYY-MM-DD HH:mm:ss') : '-'}
                    </Descriptions.Item>
                </Descriptions>
            </>
        )

        switch (type_) {
            case TYPE_ENUM.ORG:
                return renderOrgCard()
            case TYPE_ENUM.EVALUATE:
                return renderEvaluateCard()
            case TYPE_ENUM.TRAIN:
                return renderTrainCard()
            default:
                return null
        }
    }

    return (
        <div className={styles.enroll_center}>
            {tag !== 'portal' ? <HeaderBar /> : null}

            <div className={styles.main}>
                <div className={styles.registrationProject}>{CardRender()}</div>
                <h2 className={styles.h2}>请填写报名信息</h2>
                <div className={styles.content}>
                    <Row>
                        <Col span={13} offset={6}>
                            <Form
                                className={styles.form}
                                form={form}
                                name="form"
                                validateTrigger={'onBlur'}
                                onFinish={onFinish}
                                initialValues={{}}
                            >
                                <Form.Item
                                    {...itemLayout}
                                    label="姓名"
                                    name="userName"
                                    rules={[{ required: true, message: '请输入姓名' }]}
                                >
                                    <Input
                                        disabled={disableds.userName}
                                        className={styles.input}
                                        placeholder="请输入姓名"
                                    />
                                </Form.Item>
                                <Form.Item
                                    {...itemLayout}
                                    label="身份证号"
                                    name="userIdentify"
                                    required
                                    rules={[{ validator: userIdentifyValidator }]}
                                >
                                    <Input
                                        disabled={disableds.userIdentify}
                                        className={styles.input}
                                        placeholder="请输入身份证号"
                                    />
                                </Form.Item>
                                <Form.Item
                                    {...itemLayout}
                                    label="手机号"
                                    name="userMobile"
                                    required
                                    rules={[
                                        validateRule({
                                            rule: 'MOBILE',
                                            message: '手机格式错误',
                                            noEmpty: true,
                                            noEmptyMessage: '请输入手机号',
                                        }),
                                    ]}
                                >
                                    <Input
                                        disabled={disableds.userMobile}
                                        className={styles.input}
                                        placeholder="请输入手机号"
                                    />
                                </Form.Item>
                                <Form.Item {...itemLayout} label={'备注'} name="remark">
                                    <TextArea
                                        className={styles.textarea}
                                        rows={4}
                                        maxLength={200}
                                        showCount={true}
                                        placeholder="请输入备注"
                                    />
                                </Form.Item>
                                <Form.Item noStyle>
                                    <div className={styles.form_btn}>
                                        <Button type="primary" htmlType="submit">
                                            提交
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

const ObserverPassword: IRoute = inject('siteStore', 'userStore')(observer(EnrollCenter))

ObserverPassword.title = '填写报名信息'

export default ObserverPassword
