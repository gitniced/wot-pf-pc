// 新建/编辑帮扶措施

import { Form, Input, Modal, ModalProps, Radio, Select } from 'antd'
import { useEffect, useState } from 'react'
import { MeasureItem } from './interface'
import { MEASURE_TYPE } from '../../hierarchical-diagnosis/diagnosis/consts'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'

const AddMeasureModal = ({
    open,
    isEdit,
    record,
    onOk,
    onCancel,
    sysMeasureList
}: ModalProps & {
    isEdit: boolean
    record?: MeasureItem
    onOk: (values: any) => void
    onCancel: () => void
    sysMeasureList: any[]
}) => {
    const store = useLocalObservable(() => Store)
    const { assistanceInfo } = store

    const [form] = Form.useForm()

    const measureType = Form.useWatch('type', form)
    const [options, setOptions] = useState<any>([])

    useEffect(() => {
        if (isEdit) {
            form.setFieldsValue({ title: record?.title })
        }
    }, [isEdit, record])

    const handleSubmit = () => {
        form.validateFields().then(values => {
            onOk(values)
        })
    }

    const handleCancel = () => {
        onCancel()
    }

    useEffect(() => {
        if (!open) {
            form.resetFields()
        }
        const { measureList } = assistanceInfo
        const selectSys = measureList?.filter((resItem => Number(resItem.type) !== MEASURE_TYPE.CUSTOM)).map(i => i.title)
        console.log(selectSys, sysMeasureList.filter(item => !selectSys?.includes(item.title)))
        setOptions(
            sysMeasureList.filter(item => !selectSys?.includes(item.title))
        )
    }, [open])

    return (
        <Modal
            centered
            open={open}
            title={isEdit ? '编辑措施内容' : '新建帮扶措施'}
            onOk={handleSubmit}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 17 }}
                initialValues={{
                    type: 2,
                }}
            >
                {!isEdit && (
                    <Form.Item required label="类型" name="type">
                        <Radio.Group
                            options={[
                                { label: '系统措施', value: 2 },
                                { label: '自定义措施', value: 3 },
                            ]}
                        />
                    </Form.Item>
                )}
                {(isEdit || measureType === 3) ? (
                    <Form.Item
                        required
                        label="措施内容"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: '请输入措施内容',
                            },
                        ]}
                    >
                        <Input.TextArea rows={3} placeholder="请输入" maxLength={50} />
                    </Form.Item>
                ) : (
                    <Form.Item
                        required
                        label="选择措施"
                        name="measure"
                        rules={[
                            {
                                required: true,
                                message: '请选择具体的措施',
                            },
                        ]}
                    >
                        <Select placeholder="请选择具体的措施" options={options} fieldNames={{ label: 'title', value: 'title' }} labelInValue />
                    </Form.Item>
                )}
            </Form>
        </Modal>
    )
}

export default observer(AddMeasureModal)
