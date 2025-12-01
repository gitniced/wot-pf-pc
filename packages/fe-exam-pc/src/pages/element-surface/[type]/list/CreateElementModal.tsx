// 新建理论知识要素细目表弹窗

import type { ModalProps } from 'antd'
import { Form, Input, Modal, Select } from 'antd'
import { observer, useLocalObservable } from 'mobx-react'

import Store from './store'
import type { CreateAuthenticates, RouteQuery } from './interface'
import type { CommonParams } from '@/hooks/useCommonParams'
import useCommonParams from '@/hooks/useCommonParams'
import useUserStore from '@/hooks/useUserStore'
import { useEffect } from 'react'
import { getCookie, getSessionStorage } from '@/storage'
import { history } from 'umi'

const CreateElementModal = (
    props: Omit<ModalProps, 'onCancel' | 'onOk'> & {
        onCancel: () => void
        onOk: (code: string) => void
        levelCode: number
        typeCode: number
    },
) => {
    const userStore = useUserStore()
    const store = useLocalObservable(() => Store)

    const routeQuery = history.location.query as unknown as RouteQuery
    const { jobName, jobType, jobLevel } =
        { ...(getSessionStorage('AUTHENTICATE_PAGE_QUERY') || {}), ...routeQuery }

    const commonParams = useCommonParams()
    const { belongType, subject } = commonParams as CommonParams

    const { open, onCancel, onOk, levelCode, typeCode } = props
    const [form] = Form.useForm()

    const handleCancel = () => {
        form.resetFields()
        onCancel()
    }

    const handleOk = () => {
        form.validateFields().then(values => {
            const { customContent, ...restVal } = values
            const { label: programName, value: programId } = customContent || {}
            const params: CreateAuthenticates = {
                ...restVal,
                customContent: getCookie('ALIAS') === 'esh' ? {
                    programName,
                    programId,
                } : null,
                levelCode,
                typeCode,
                belongType,
                subject,
                organizationCode: userStore?.selectedOrganization,
            }
            // @ts-ignore
            store.createAuthenticates(params).then((code: string) => {
                form.resetFields()
                onOk(code)
            })
        })
    }

    useEffect(() => {
        if (open) {
            form.setFieldValue('name', `${jobName || '--'}/${jobType || '--'}/${jobLevel || '--'}理论知识细目表`)
        } else {
            form.resetFields()
        }
    }, [open])

    return (
        <Modal
            centered
            open={open}
            title="新建理论知识细目表"
            onCancel={handleCancel}
            onOk={handleOk}
        >
            <Form form={form} labelCol={{ span: 7 }}>
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
                    getCookie('ALIAS') === 'esh' && <Form.Item
                        required
                        label={subject === 10 ? "评价方案" : "竞赛方案"}
                        name="customContent"
                        rules={[{ required: true, message: '请选择' }]}
                    >
                        <Select options={store.planList} placeholder={`请选择${subject === 10 ? "评价方案" : "竞赛方案"}`} labelInValue />
                    </Form.Item>
                }
            </Form>
        </Modal>
    )
}

export default observer(CreateElementModal)
