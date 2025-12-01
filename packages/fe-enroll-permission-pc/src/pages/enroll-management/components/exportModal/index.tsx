import React, { useEffect, useState } from 'react'
import { Modal, Form, Radio, DatePicker, Tooltip, Space } from 'antd'
import type { RadioChangeEvent } from 'antd'
import styles from './index.modules.less'
import { ExportEnum, ExportTextList } from './const'
import dayjs from 'dayjs'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { getCookie } from '@wotu/wotu-components'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import NewMoreSelect from '@/components/NewMoreSelect'

moment.locale('zh-cn')

interface IProps {
    visible: boolean //控制显示隐藏
    onCancel: () => void //取消
    onSubmit: (data: any) => void //提交
}

const ExportModal = (props: IProps) => {
    const { visible, onCancel, onSubmit } = props
    const [loading, setLoading] = useState<boolean>(false) //加载
    const [value, setValue] = useState(ExportEnum.USER) //radio值
    const [form] = Form.useForm()
    const organizationCode: string = getCookie('SELECT_ORG_CODE')

    /**   编辑完成 表单验证 */
    const finish = () => {
        setLoading(true)
        form.validateFields()
            .then(values => {
                return onSubmit(values)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    /**
     * radio值改变
     */
    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        if (!visible) {
            setValue(ExportEnum.USER)
            setTimeout(() => {
                form.resetFields()
            }, 100)
        }
    }, [visible])

    return (
        <>
            <Modal
                title="导出"
                open={visible}
                onOk={finish}
                onCancel={onCancel}
                centered
                destroyOnClose
                confirmLoading={loading}
                className={styles.page}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 17 }}
                    preserve={false}
                    validateTrigger="onBlur"
                    initialValues={{
                        exportType: ExportEnum.USER,
                        date: [dayjs().startOf('year'), dayjs().endOf('year')],
                    }}
                >
                    <Form.Item
                        label="本次导出"
                        name="exportType"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Radio.Group
                            onChange={onChange}
                            value={value}
                            options={ExportTextList}
                            style={{
                                display: 'inline-flex',
                                flexDirection: 'column',
                                gap: 8,
                                padding: '4px 0',
                            }}
                        />
                    </Form.Item>
                    {/* <Form.Item
                        label="站点"
                        name="site"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <MoreSelect
                            all={false}
                            mode="multiple"
                            placeholder="请选择站点"
                            valueKey={'value'}
                            requestUrl={'/apply/front/activity/page'}
                        />
                    </Form.Item> */}
                    <Form.Item shouldUpdate={(p, c) => p.exportType !== c.exportType} noStyle>
                        {() => {
                            return value === ExportEnum.USER ? (
                                <Form.Item label="报名时间" required>
                                    <Space>
                                        <Form.Item
                                            noStyle
                                            name="date"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请选择',
                                                },
                                                {
                                                    validator: (_, val) => {
                                                        if (!val) return Promise.resolve()
                                                        const [start, end] = val
                                                        const diff = end.diff(start, 'days')
                                                        if (diff > 365) {
                                                            return Promise.reject(
                                                                '时间间隔不能超过365天',
                                                            )
                                                        }
                                                        return Promise.resolve()
                                                    },
                                                },
                                            ]}
                                        >
                                            <DatePicker.RangePicker />
                                        </Form.Item>
                                        <Tooltip title="支持按报名活动导出用户报名表单全部字段信息">
                                            <ExclamationCircleOutlined />
                                        </Tooltip>
                                    </Space>
                                </Form.Item>
                            ) : (
                                <Form.Item
                                    label="报名活动"
                                    name="codeList"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择报名活动',
                                        },
                                    ]}
                                >
                                    <NewMoreSelect
                                        all={false}
                                        mode="multiple"
                                        placeholder="请选择报名活动"
                                        valueKey={'code'}
                                        requestParams={{
                                            organizationCode,
                                        }}
                                        requestUrl={'/apply/front/activity/page'}
                                    />
                                </Form.Item>
                            )
                        }}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ExportModal
