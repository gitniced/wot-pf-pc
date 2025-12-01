import React, { useEffect } from 'react'
import { Form, Input, Select, Button, Row, Cascader } from 'antd'
import AuthStore from './store'
import styles from './index.module.less'
import { observer, useLocalObservable } from 'mobx-react'
import { useLocation } from 'umi'
import type { createAuthPropsType, addAuthQueryType, StateType } from './interface'
import CustomTitle from '@/components/CustomTitle'
import type { IRoute } from 'umi'
import { useModel } from 'umi'
import type { MasterProps } from '@/components/MasterPlugins/interface'
import { getDecodeInfo } from '@wotu/wotu-components'
// TODO 等后端出了根据userCode获取成员信息等接口后 改造路由和请求方式

const { Option } = Select

const Page: IRoute = observer(() => {
    let { query, state }: { query: addAuthQueryType; state: StateType } = useLocation()
    const masterStore: MasterProps = useModel('@@qiankunStateFromMaster')
    let { getCurrentOrganization } = masterStore
    let currentOrganization = getCurrentOrganization?.()
    let store = useLocalObservable(() => new AuthStore())
    // store = toJS(store)

    const { getRoleList, getDepartmentTree, createAuth, enterAuth, editAuth, getOrganizationCode } =
        store
    const [form] = Form.useForm()

    useEffect(() => {
        enterAuth(query)
        getOrganizationCode(currentOrganization)
        document.title = store.operationAuth
        getRoleList()
        getDepartmentTree(state?.departmentCode)
    }, [currentOrganization])

    useEffect(() => {
        if (query.type === 'edit') {
            document.title = '用户编辑'
            form.setFieldsValue({
                name: getDecodeInfo(state?.name || ''),
                idCard: getDecodeInfo(state?.idCard || ''),
                mobile: getDecodeInfo(state?.mobile || ''),
                roleCode: state?.roleCode,
                departmentCode: store.departmentCode,
            })
        } else {
            document.title = '用户新增'
        }
        // }, [store.defaultAuth, state?.roleCode, store.departmentCode])
    }, [store.departmentCode])

    const submitForm = (values: createAuthPropsType) => {
        if (query.idCard) {
            editAuth(values)
        } else {
            createAuth(values)
        }
    }
    return (
        <div className={styles.page}>
            <CustomTitle title={store.operationAuth} />
            <Form
                name="basic"
                autoComplete="off"
                form={form}
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 6 }}
                onFinish={submitForm}
                className={styles.form}
                // requiredMark={false}
            >
                <Form.Item
                    label="姓名"
                    name="name"
                    required
                    validateTrigger="onBlur"
                    rules={[
                        { required: true, message: '请输入姓名' },
                        {
                            pattern: /[^0-9]/,
                            message: '请输入正确的姓名',
                        },
                    ]}
                >
                    <Input
                        disabled={store.isInfoDisabled}
                        className={styles.input}
                        placeholder="请输入姓名"
                        maxLength={50}
                    />
                </Form.Item>

                <Form.Item
                    label="手机号码"
                    name="mobile"
                    validateTrigger="onBlur"
                    required
                    rules={[
                        { required: true, message: '请输入手机号' },
                        {
                            pattern: /^1\d{10}$/,
                            message: '手机号码格式不对，请重新输入',
                        },
                    ]}
                >
                    <Input
                        disabled={store.isInfoDisabled}
                        className={styles.input}
                        placeholder="请输入手机号码"
                    />
                </Form.Item>

                <Form.Item
                    name="roleCode"
                    label="关联角色"
                    required
                    rules={[{ required: true, message: '请选择关联角色' }]}
                >
                    <Select className={styles.select} allowClear placeholder={'请选择关联角色'}>
                        {store.roleList?.length !== 0 &&
                            store.roleList?.map((item: any) => {
                                return (
                                    <Option key={item.code} value={item.code}>
                                        {item.name}
                                    </Option>
                                )
                            })}
                    </Select>
                </Form.Item>
                <Form.Item name="departmentCode" label="所属部门">
                    <Cascader
                        className={styles.select}
                        fieldNames={{ label: 'title', value: 'key' }}
                        options={store.departmentTree || []}
                        placeholder="请选择所属部门"
                        changeOnSelect
                    />
                </Form.Item>
                <Row justify="center">
                    <Form.Item>
                        <Button
                            // loading={store.btnLoading}
                            type="primary"
                            htmlType="submit"
                            className={styles.ok}
                        >
                            提 交
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </div>
    )
})

Page.title = '用户编辑'

export default Page
