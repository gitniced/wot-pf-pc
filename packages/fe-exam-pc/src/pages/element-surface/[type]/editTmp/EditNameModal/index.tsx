import type { ModalProps } from 'antd';
import { Form, Input, Modal, Select } from 'antd'
import { history } from 'umi'

import Hooks from './hooks'
import type { RouteQuery } from '../interface'
import { useEffect } from 'react';
import { useState } from 'react';
import { getCookie } from '@/storage';
import useCommonParams from '@/hooks/useCommonParams';

const EditNameModal = (
    props: Omit<ModalProps, 'onCancel' | 'onOk'> & {
        onCancel: () => void
        onOk: () => void
        name?: string
        detail?: any
    },
) => {
    const { name, open, onCancel, onOk, detail } = props
    const { recordId } = history.location.query as unknown as RouteQuery
    const [programList, setProgramList] = useState([])
    const commonParams = useCommonParams()
    const { subject } = commonParams


    const [form] = Form.useForm()
    const hooks = Hooks()

    const handleCancel = () => {
        form.resetFields()
        onCancel()
    }

    const handleOk = () => {
        form.validateFields().then(({ name, programs }) => {
            hooks.editAuthenticateName({ code: recordId, name, customContent: { programName: programs?.label, programId: programs?.value } }).then(() => {
                form.resetFields()
                onOk()
            })
        })
    }

    useEffect(() => {
        if (getCookie('ALIAS') === 'esh' && open) {
            hooks.getExamPrograms({
                type: subject === 10 ? 0 : 1,
                level_id: detail?.levelCode,
                is_select: 1
            }).then((data) => {
                setProgramList(data?.map(({ id, name }: any) => ({ label: name, value: id })) || [])
            })
        }
        form.setFieldsValue({
            name,
            programs: detail?.customContent?.programId ? { label: detail?.customContent?.programName, value: detail?.customContent?.programId } : null,
        })
    }, [open])

    return (
        <Modal centered open={open} title="修改名称" onCancel={handleCancel} onOk={handleOk} destroyOnClose>
            <Form
                form={form}
                labelCol={{ span: 7 }}
            >
                <Form.Item
                    required
                    label="要素细目表名称"
                    name="name"
                    rules={[{ required: true, message: '请输入要素细目表名称' }]}
                    extra="建议填入对应的职业/工种/等级+科目+要素细目表+自定义编号标识等，如“茶艺师/茶艺师/一级理论知识要素细目表1”，方便后续引用时选择"
                >
                    <Input placeholder="请输入" maxLength={60} showCount />
                </Form.Item>
                {
                    getCookie('ALIAS') === 'esh' && (
                        <Form.Item
                            required
                            label={subject === 10 ? "评价方案" : "竞赛方案"}
                            name="programs"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Select options={programList} placeholder={`请选择${subject === 10 ? "评价方案" : "竞赛方案"}`} labelInValue />
                        </Form.Item>
                    )
                }
            </Form>
        </Modal>
    )
}

export default EditNameModal
