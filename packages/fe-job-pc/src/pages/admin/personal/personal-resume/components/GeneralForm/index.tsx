import { Button, Form, Row, Col, Space } from 'antd'
import FormItems from './FormItems'
import styles from './index.module.less'
import { useEffect, useImperativeHandle, forwardRef, useState } from 'react'
import type { FormLayout } from 'antd/lib/form/Form'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
enum FormLayoutEnum {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical',
    INLINE = 'inline',
}

interface IFormItems {
    label?: string
    name?: string
    type?: string
    span?: number
}

const Index = forwardRef(
    (
        {
            formLayout = 'horizontal',
            structure = [],
            formData,
            onFinish,
            onCancel,
            footer = true,
            style = {},
            formValueChange,
            children,
            gutter = 16,
            config2 = [],
        }: {
            onCancel: () => void
            onFinish: (params: object) => void
            formLayout: FormLayout
            structure: IFormItems[]
            formData: object
            footer: boolean
            style: object
            formValueChange: (changedValues: object, allValues: object) => void
            children: any
            gutter: number
            config2: any[]
        },
        ref,
    ) => {
        const [form] = Form.useForm()
        const [show, setShow] = useState(false)
        const formDataStr = JSON.stringify(formData)

        useEffect(() => {
            form.setFieldsValue(formData)
        }, [formDataStr])

        useImperativeHandle(
            ref,
            () => {
                return {
                    form,
                }
            },
            [],
        )

        const onValuesChange = (changedValues: object, allValues: object) => {
            formValueChange?.(changedValues, allValues)
        }

        const setField = (name: any, value: any) => {
            form.setFieldValue(name, value)
        }

        const getField = (name: any) => {
            return form.getFieldValue(name)
        }

        const triggerShow = () => {
            setShow(!show)
        }

        return (
            <div style={style} className={styles.container}>
                <Form
                    form={form}
                    layout={formLayout}
                    onValuesChange={onValuesChange}
                    onFinish={onFinish}
                >
                    <div className={styles.layout_horizontal}>
                        {children}
                        <div style={{ flex: 1 }}>
                            <Row gutter={gutter}>
                                {structure.map((item, i) => (
                                    <Col
                                        key={i}
                                        className={
                                            item?.type === 'inline' ? styles.inline_wrap : ''
                                        }
                                        span={item?.span || 24}
                                    >
                                        {/* @ts-ignore */}
                                        <FormItems
                                            {...item}
                                            gutter={gutter}
                                            getField={getField}
                                            setField={setField}
                                            FormInstance={Form}
                                            formInstance={form}
                                        />
                                    </Col>
                                ))}
                            </Row>
                            {config2.length ? (
                                <>
                                    <div className={styles.show_more} onClick={triggerShow}>
                                        更多求职偏好&nbsp;
                                        {!show ? <DownOutlined /> : <UpOutlined />}
                                    </div>
                                    <Row
                                        gutter={gutter}
                                        style={{ display: show ? 'flex' : 'none' }}
                                    >
                                        {config2.map((item, i) => (
                                            <Col
                                                key={i}
                                                className={
                                                    item?.type === 'inline'
                                                        ? styles.inline_wrap
                                                        : ''
                                                }
                                                span={item?.span || 24}
                                            >
                                                {/* @ts-ignore */}
                                                <FormItems
                                                    {...item}
                                                    gutter={gutter}
                                                    getField={getField}
                                                    setField={setField}
                                                    FormInstance={Form}
                                                    formInstance={form}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </>
                            ) : null}
                        </div>
                    </div>
                    {footer && (
                        <div className={styles.btn_group}>
                            <Space>
                                <Button onClick={onCancel}>取消</Button>
                                <Button type="primary" htmlType="submit">
                                    完成
                                </Button>
                            </Space>
                        </div>
                    )}
                </Form>
            </div>
        )
    },
)

export default Index
