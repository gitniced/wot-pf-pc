import React, { useState, useEffect } from 'react'
import BlockBox from '@/components/BlockBox'
import { Form, Input, Select, Button, Space, Row, Table, Modal } from 'antd'
import { history } from 'umi'
import { states } from '../components/utils/const'
import { useLocalObservable, Observer, observer } from 'mobx-react'
import Hooks from '../components/utils/pageListStore'
import styles from './index.module.less'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import PreviewModal from './components/previewModal/index'
import CustomTitle from '@/components/CustomTitle'
import { getCookie } from '@/storage'
import { getColumnsList } from '../components/utils/columns'
import { Power } from '@wotu/wotu-pro-components'
const { Option } = Select

// 微页面管理
function Micropage() {
    const [form] = Form.useForm()
    const hooks = useLocalObservable(() => new Hooks())
    const [visible, setVisible] = useState<boolean>(false)
    const [checkRowItem, setCheckRowItem] = useState<any>({})
    const orgName = getCookie('ORG_NAME')
    useEffect(() => {
        hooks.getMicroData()
    }, [])
    useEffect(() => {
        document.title = orgName ? `微页面管理-${orgName}` : '微页面管理'
    }, [orgName])

    // 发布
    const release = (codes: string) => {
        Modal.confirm({
            title: '确定要发布该页面吗？',
            icon: <ExclamationCircleOutlined />,
            centered: true,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                hooks.publishMicro(codes)
            },
        })
    }
    //:删除
    const confirm = (codes: string) => {
        Modal.confirm({
            title: '确定要删除该页面吗，该操作不可逆。',
            icon: <ExclamationCircleOutlined />,
            centered: true,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                hooks.deleteMicro(codes)
            },
        })
    }

    const tableCol = getColumnsList({
        editClick(v) {
            history.push(`/gateway/web/create?code=${v?.code}`)
        },
        editHref: v => `/gateway/web/create?code=${v?.code}`,
        publishClick(v) {
            release(v?.code)
        },
        deleteClick(v) {
            confirm(v?.code)
        },
        viewClick(v) {
            setVisible(true)
            setCheckRowItem(v)
        },
        powerId: {
            edit: 11129,
            preview: 11131,
            delete: 11130,
            release: 11138,
        },
    })
    return (
        <div className={styles.page}>
            <BlockBox>
                <CustomTitle title="微页面" />
                <Form layout="inline" form={form}>
                    <Form.Item label="页面名称" name="name">
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item label="状态" name="status">
                        <Select style={{ minWidth: 205 }} placeholder="请选择">
                            {states.map(item => (
                                <Option value={item.value} key={item.value}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button
                                type="primary"
                                onClick={() => hooks.searchData(form.getFieldsValue())}
                            >
                                查询
                            </Button>
                            <Button
                                onClick={() => {
                                    form.resetFields()
                                    hooks.resetData()
                                }}
                            >
                                重置
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
                <Row style={{ margin: '24px 0 16px 0' }}>
                    <Space>
                        <Power powerId={11128}>
                            <Button
                                type="primary"
                                href="/gateway/web/create"
                                onClick={e => {
                                    e.preventDefault()
                                    window.open('/gateway/web/create')
                                }}
                            >
                                + 新建页面
                            </Button>
                        </Power>
                    </Space>
                </Row>
                <Observer>
                    {() => {
                        return (
                            <Table
                                columns={tableCol}
                                dataSource={hooks.dataSource}
                                pagination={{
                                    current: hooks.pageNo,
                                    pageSize: hooks.pageSize,
                                    total: hooks.totalCount,
                                    onChange: hooks.pageHandelr,
                                    showQuickJumper: true,
                                    showSizeChanger: true,
                                }}
                            />
                        )
                    }}
                </Observer>
                {/* 预览模态框 */}
                <PreviewModal
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    data={checkRowItem}
                    code={checkRowItem?.code}
                />
            </BlockBox>
        </div>
    )
}

export default observer(Micropage)
