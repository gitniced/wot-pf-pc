/* eslint-disable */
import { Form, Input, Modal, Tabs } from 'antd'
import type { AddPersonModalProps } from './interface'
import { useLocalObservable } from 'mobx-react-lite'

import PracticeStore from '../../store'
import { observer } from 'mobx-react'

import styles from './index.module.less'
import { useState } from 'react'

const AddPersonModal = ({ open, onCancel }: AddPersonModalProps) => {
    const [form] = Form.useForm()

    const store = useLocalObservable(() => PracticeStore)
    // @ts-ignore
    const [activeTab, setActiveTab] = useState<string>('idcard')

    const handleCancel = () => {
        form.resetFields()
        onCancel()
    }

    const handleOk = () => {
        form.validateFields().then(values => {
            const byUsername = activeTab === 'username'

            store.createPerson({ ...values, byUsername }).then(() => {
                handleCancel()
            })
        })
    }

    const renderForm = () => {
        const byUsername = activeTab === 'username'

        return (
            <Form
                form={form}
                labelCol={{ span: 6 }}
                // initialValues={{
                //     personName: '白利忠',
                //     personCertNumber: '150202198510214213',
                //     personPhone: '17838562819',
                // }}
            >
                <Form.Item
                    label="姓名"
                    name="personName"
                    rules={[{ required: true, message: '请输入姓名' }]}
                >
                    <Input placeholder="请输入" />
                </Form.Item>
                {!byUsername ? (
                    <>
                        <Form.Item
                            label="身份证号"
                            name="personCertNumber"
                            rules={[{ required: true, message: '请输入身份证号' }]}
                        >
                            <Input placeholder="请输入" />
                        </Form.Item>
                        <Form.Item
                            label="手机号码"
                            name="personPhone"
                            rules={[{ required: true, message: '请输入手机号码' }]}
                        >
                            <Input placeholder="请输入" />
                        </Form.Item>
                    </>
                ) : (
                    <Form.Item
                        label="账号名"
                        name="username"
                        rules={[{ required: true, message: '请输入账号名' }]}
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>
                )}
            </Form>
        )
    }

    const items = [
        {
            label: '通过身份证号添加',
            key: 'idcard',
            children: renderForm(),
        },
        {
            label: '通过账号名添加',
            key: 'username',
            children: renderForm(),
        },
    ]

    return (
        <Modal
            centered
            open={open}
            title="手动添加用户"
            width={616}
            onCancel={handleCancel}
            onOk={handleOk}
            className={styles.add_person_modal}
        >
            {renderForm()}
            {/* 暂时隐藏Tab */}
            {/* <Tabs items={items} onChange={(_activeTab: string) => setActiveTab(_activeTab) }/> */}
        </Modal>
    )
}

export default observer(AddPersonModal)
