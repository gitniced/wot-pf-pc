import React, { useEffect } from 'react'
import RoleStore from './store'
import styles from './index.module.less'
import { Form, Input, Button, Steps } from 'antd'
import { observer, useLocalObservable } from 'mobx-react'
import { history, useLocation } from 'umi'
import CustomTitle from '@/components/CustomTitle'
import type { IRoute } from 'umi'
import type { RoleDataType, RoleQueryType } from './interface'
import { useModel } from 'umi'
import type { MasterProps } from '@/components/MasterPlugins/interface'
import RolePermission from '@/components/Pages/Role/RolePermission'
const { Step } = Steps

const Page: IRoute = observer(() => {
    let { query }: { query: RoleQueryType; state: RoleDataType } = useLocation()
    const masterStore: MasterProps = useModel('@@qiankunStateFromMaster')
    let { getCurrentOrganization } = masterStore
    let currentOrganization = getCurrentOrganization?.()
    const [form] = Form.useForm()
    let store = useLocalObservable(() => new RoleStore())

    let { createRole, enterAuth, getRoleDetail, editRole } = store

    useEffect(() => {
        enterAuth(query, currentOrganization!)
        query.code &&
            getRoleDetail(query.code).then(() => {
                form.setFieldsValue({ name: store.name, description: store?.description || '' })
                if (query.step?.toString?.() === '1') {
                    store.updateStep(1)
                }
            })
    }, [currentOrganization])

    const onFinish = () => {
        if (store.step === 0) {
            form.validateFields().then(() => {
                store.updateStep(1)
            })
        } else {
            form.validateFields()
                .then((values: any) => {
                    store.operationRole === 'new' ? createRole(values) : editRole(values)
                })
                .catch(() => {})
        }
    }

    return (
        <div className={styles.page}>
            <CustomTitle title={store.pageTitle} />
            <div className={styles.step}>
                <Steps current={store.step}>
                    <Step title="基本信息" />
                    <Step title="权限配置" />
                </Steps>
            </div>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                colon
            >
                <Form.Item
                    label="角色名称"
                    name="name"
                    rules={[{ required: true, message: '请输入角色名称' }]}
                    hidden={store.step === 1}
                >
                    <Input maxLength={15} className={styles.input} placeholder="请输入角色名称" />
                </Form.Item>

                <Form.Item label="角色描述" name="description" hidden={store.step === 1}>
                    <Input.TextArea
                        className={styles.textarea}
                        placeholder="请输入角色描述"
                        rows={5}
                        maxLength={30}
                        showCount
                    />
                </Form.Item>
                <Form.Item noStyle hidden={store.step === 0}>
                    {store.organizationCode ? (
                        <RolePermission
                            roleCode={store.roleCode}
                            organizationCode={store.organizationCode}
                            checkChange={store.checkChange}
                        />
                    ) : null}
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 10, span: 8 }}>
                    <Button
                        className={styles.input_btn}
                        onClick={() => {
                            if (store.step === 0) {
                                history.goBack()
                            } else {
                                store.updateStep(0)
                            }
                        }}
                    >
                        {store.step === 0 ? '取消' : '上一步'}
                    </Button>
                    <Button
                        className={styles.input_btn}
                        type="primary"
                        htmlType="submit"
                        loading={store.btnLoading}
                        disabled={store.step !== 0 && store.permissionIds.length === 0}
                    >
                        {store.step === 0 ? '下一步' : '提交'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
})

Page.title = '角色编辑'

export default Page
