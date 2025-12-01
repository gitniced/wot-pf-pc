/**
 * @ File: 开票
 * @ Description:
 * @ Author: feeling
 * @ Modified by: feeling
 * @ Modified time: 2025-02-13 11:28:59
 */

import { useEffect } from 'react'
import { useLocalObservable, observer } from 'mobx-react'
import Hooks from './hooks'
import styles from './index.module.less'
import CountFooter from '../components/CountFooter'
import Minititle from '@/components/Order/Minititle'
import { Col, message, Row, Tooltip } from 'antd'
import { Button, Form, Input, Modal, Radio, Steps } from 'antd'
import { STEP_ENUM } from './interface'
import InvoiceHeaderModal from '@/components/Order/addAndEditHeaderModal/Modal'
import type { IRouteProps } from 'umi'
import CustomLayout from '@/components/CustomLayout'
import OrderStep from './components/OrderStep'
import InvoiceResultModal from './components/InvoiceResultModal'

const { Step } = Steps
function CreateInvoice(props: IRouteProps) {
    const {
        location: {
            query: { code: orderCode },
        },
    } = props || {}
    const hooks = useLocalObservable(() => new Hooks())

    const [formRef] = Form.useForm()
    const type = Form.useWatch('type', formRef)
    const invoiceType = Form.useWatch('invoiceType', formRef)

    useEffect(() => {
        if (orderCode) {
            hooks.getOrderDetail(orderCode)
        }
    }, [])

    useEffect(() => {
        if (type) {
            hooks.updateCurrentInvoiceHeaderType(type)
            hooks.getInvoiceHeader()
        }
    }, [type])

    useEffect(() => {
        if (invoiceType === 2) {
            formRef.setFieldValue('type', 1)
        }
    }, [invoiceType])

    useEffect(() => {
        if (orderCode) {
            formRef.setFieldValue('mergeInvoice', 1)
        }
    }, [orderCode])

    return (
        <div className={styles.my_layout}>
            <CustomLayout>
                <>
                    <div className={styles.invoice}>
                        <div className={styles.invoice_top}>
                            <Minititle title="开发票" />

                            <div className={styles.step}>
                                <Steps current={Number(hooks.currentStep)}>
                                    {hooks.stepList.map(item => {
                                        return (
                                            <Step
                                                key={item.key}
                                                title={item.title}
                                                description={item.description}
                                            />
                                        )
                                    })}
                                </Steps>
                            </div>
                        </div>

                        <div className={styles.invoice_bottom}>
                            {hooks.currentStep === STEP_ENUM.FIRST_STEP ? (
                                <OrderStep store={hooks} />
                            ) : null}
                            {hooks.currentStep === STEP_ENUM.SECOND_STEP ? (
                                <Form
                                    form={formRef}
                                    {...{
                                        labelCol: { span: 6 },
                                        wrapperCol: { span: 18 },
                                    }}
                                    className={styles.invoice_title_form}
                                    initialValues={{ type: 1 }}
                                >
                                    <Form.Item
                                        name="mergeInvoice"
                                        label="开票数量"
                                        rules={[{ required: true, message: '请选择开票数量' }]}
                                        hidden={!!orderCode}
                                    >
                                        <Radio.Group>
                                            <Radio value={1}>合并1张发票</Radio>
                                            <Radio value={2}>每个订单1张发票</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        name="invoiceType"
                                        label="开票类型"
                                        rules={[{ required: true, message: '请选择开票类型' }]}
                                    >
                                        <Radio.Group>
                                            <Radio value={1}>增值税普通发票</Radio>
                                            <Radio value={2}>增值税专用发票</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        noStyle
                                        shouldUpdate={(prevValues, currentValues) =>
                                            prevValues?.invoiceType !== currentValues?.invoiceType
                                        }
                                    >
                                        {({ getFieldValue }) => {
                                            return (
                                                <Form.Item
                                                    name="type"
                                                    label="抬头类型"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: '请选择抬头类型',
                                                        },
                                                    ]}
                                                >
                                                    <Radio.Group
                                                        disabled={
                                                            getFieldValue('invoiceType') === 2
                                                        }
                                                    >
                                                        <Radio value={1}>企业</Radio>
                                                        <Radio value={2}>个人</Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                            )
                                        }}
                                    </Form.Item>

                                    <Form.Item noStyle shouldUpdate>
                                        <Row style={{ marginBottom: '24px' }}>
                                            <Col span={6} />
                                            <Col span={18}>
                                                {hooks.invoiceHeaderList.map((item: any) => {
                                                    return type === item.type ? (
                                                        <div
                                                            key={item.code}
                                                            className={[
                                                                styles.title_item,
                                                                hooks.currentInvoiceHeader?.code ===
                                                                item.code
                                                                    ? styles.active
                                                                    : '',
                                                            ].join(' ')}
                                                            onClick={() => {
                                                                hooks.updateInvoiceHeader(item)
                                                            }}
                                                        >
                                                            <div className={styles.title_active} />
                                                            <div className={styles.title_content}>
                                                                {type === 1 ? (
                                                                    <>
                                                                        <div
                                                                            className={
                                                                                styles.title_content_item
                                                                            }
                                                                        >
                                                                            抬头名称:
                                                                            <Tooltip
                                                                                placement="topLeft"
                                                                                title={
                                                                                    item.titleName
                                                                                }
                                                                                getTooltipContainer={e =>
                                                                                    e.parentElement
                                                                                        ?.parentElement!
                                                                                }
                                                                            >
                                                                                {item.titleName}
                                                                            </Tooltip>
                                                                        </div>
                                                                        <div
                                                                            className={
                                                                                styles.title_content_item
                                                                            }
                                                                        >
                                                                            税号:
                                                                            <Tooltip
                                                                                placement="topLeft"
                                                                                title={item.taxNum}
                                                                                getTooltipContainer={e =>
                                                                                    e.parentElement
                                                                                        ?.parentElement!
                                                                                }
                                                                            >
                                                                                {item.taxNum}
                                                                            </Tooltip>
                                                                        </div>
                                                                        <div
                                                                            className={
                                                                                styles.title_content_item
                                                                            }
                                                                        >
                                                                            地址:
                                                                            <Tooltip
                                                                                placement="topLeft"
                                                                                title={item.address}
                                                                                getTooltipContainer={e =>
                                                                                    e.parentElement
                                                                                        ?.parentElement!
                                                                                }
                                                                            >
                                                                                {item.address
                                                                                    ? item.address
                                                                                    : '-'}
                                                                            </Tooltip>
                                                                        </div>
                                                                        <div
                                                                            className={
                                                                                styles.title_content_item
                                                                            }
                                                                        >
                                                                            电话:
                                                                            <Tooltip
                                                                                placement="topLeft"
                                                                                title={item.phone}
                                                                                getTooltipContainer={e =>
                                                                                    e.parentElement
                                                                                        ?.parentElement!
                                                                                }
                                                                            >
                                                                                {item.phone
                                                                                    ? item.phone
                                                                                    : '-'}
                                                                            </Tooltip>
                                                                        </div>
                                                                        <div
                                                                            className={
                                                                                styles.title_content_item
                                                                            }
                                                                        >
                                                                            银行账号:
                                                                            <Tooltip
                                                                                placement="topLeft"
                                                                                title={
                                                                                    item.bankAccount
                                                                                }
                                                                                getTooltipContainer={e =>
                                                                                    e.parentElement
                                                                                        ?.parentElement!
                                                                                }
                                                                            >
                                                                                {item.bankAccount
                                                                                    ? item.bankAccount
                                                                                    : '-'}
                                                                            </Tooltip>
                                                                        </div>
                                                                        <div
                                                                            className={
                                                                                styles.title_content_item
                                                                            }
                                                                        >
                                                                            开户行:
                                                                            <Tooltip
                                                                                placement="topLeft"
                                                                                title={
                                                                                    item.openningBank
                                                                                }
                                                                                getTooltipContainer={e =>
                                                                                    e.parentElement
                                                                                        ?.parentElement!
                                                                                }
                                                                            >
                                                                                {item.openningBank
                                                                                    ? item.openningBank
                                                                                    : '-'}
                                                                            </Tooltip>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div
                                                                            className={
                                                                                styles.title_content_item_2
                                                                            }
                                                                        >
                                                                            抬头名称:{item.name}
                                                                            <Tooltip
                                                                                placement="topLeft"
                                                                                title={item.name}
                                                                                getTooltipContainer={e =>
                                                                                    e.parentElement
                                                                                        ?.parentElement!
                                                                                }
                                                                            >
                                                                                {item.name}
                                                                            </Tooltip>
                                                                        </div>
                                                                        <div
                                                                            className={
                                                                                styles.title_content_item_2
                                                                            }
                                                                        >
                                                                            税号:
                                                                            <Tooltip
                                                                                placement="topLeft"
                                                                                title={item.idCard}
                                                                                getTooltipContainer={e =>
                                                                                    e.parentElement
                                                                                        ?.parentElement!
                                                                                }
                                                                            >
                                                                                {item.idCard}
                                                                            </Tooltip>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                            <div className={styles.title_tool}>
                                                                <div
                                                                    className={
                                                                        styles.title_tool_btn
                                                                    }
                                                                    onClick={() => {
                                                                        hooks.updateIsInvoiceCreate(
                                                                            false,
                                                                        )
                                                                        hooks.updateInvoiceHeader(
                                                                            item,
                                                                        )
                                                                        hooks.toggleModalVisible()
                                                                    }}
                                                                >
                                                                    编辑
                                                                </div>
                                                                <div
                                                                    className={
                                                                        styles.title_tool_btn
                                                                    }
                                                                    onClick={() => {
                                                                        Modal.confirm({
                                                                            content:
                                                                                '确定要删除吗，该操作不可逆。',
                                                                            onOk: () => {
                                                                                hooks.delInvoiceHeader(
                                                                                    item,
                                                                                )
                                                                            },
                                                                        })
                                                                    }}
                                                                >
                                                                    删除
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : null
                                                })}
                                            </Col>
                                        </Row>
                                        <Row style={{ marginBottom: '24px' }}>
                                            <Col span={6} />
                                            <Col span={18}>
                                                <Button
                                                    style={{ width: '148px' }}
                                                    type="dashed"
                                                    block
                                                    onClick={() => {
                                                        // setTitleCode('')
                                                        hooks.updateIsInvoiceCreate(true)
                                                        hooks.toggleModalVisible()
                                                    }}
                                                >
                                                    新增抬头信息
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form.Item>

                                    <Form.Item
                                        name="email"
                                        label="邮箱"
                                        rules={[{ required: true, message: '请输入邮箱' }]}
                                    >
                                        <Input placeholder="请输入" />
                                    </Form.Item>

                                    <Form.Item name="remark" label="发票备注">
                                        <Input.TextArea
                                            autoSize={{ minRows: 4, maxRows: 6 }}
                                            maxLength={200}
                                            showCount
                                            placeholder="请输入您想要在发票备注栏展示的内容"
                                        />
                                    </Form.Item>

                                    <Form.Item name="requirement" label="开票要求">
                                        <Input.TextArea
                                            autoSize={{ minRows: 4, maxRows: 6 }}
                                            maxLength={200}
                                            showCount
                                            placeholder="若您有其他开票要求，请在此说明"
                                        />
                                    </Form.Item>
                                </Form>
                            ) : null}
                        </div>
                    </div>

                    <InvoiceHeaderModal
                        visible={hooks.modalVisible}
                        isCreate={hooks.isInvoiceCreate}
                        records={hooks.currentInvoiceHeader}
                        onCancel={hooks.toggleModalVisible}
                        onSubmit={hooks.addInvoiceHeader}
                        radioVal={hooks.currentInvoiceHeaderType}
                    />
                    <InvoiceResultModal
                        visible={hooks.showMessage}
                        invoiceCode={hooks.invoiceCode}
                    />
                    <CountFooter
                        count={hooks.selectedRows.length}
                        money={hooks.selectRowsMoney as unknown as string}
                        showSubmit={hooks.currentStep === STEP_ENUM.SECOND_STEP}
                        onBack={hooks.backToMyOrder}
                        onNext={hooks.doNext}
                        onSubmit={() => {
                            if (hooks.invoiceHeaderList.length === 0) {
                                message.error('请先创建发票抬头信息', 2)
                            } else {
                                formRef
                                    .validateFields()
                                    .then(values => {
                                        console.log(values)
                                        hooks.doSubmit(values)
                                    })
                                    .catch(e => console.log(e))
                            }
                        }}
                    />
                </>
            </CustomLayout>
        </div>
    )
}
const Component = observer(CreateInvoice)

CreateInvoice.title = '开发票'
export default Component
