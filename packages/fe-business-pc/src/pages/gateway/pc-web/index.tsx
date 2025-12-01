import React, { useEffect } from 'react'
import BlockBox from '@/components/BlockBox'
import { Form, Input, Select, Button, Space, Row, Table, Modal } from 'antd'
import { history } from 'umi'
import { states } from '../components/utils/const'
import { useLocalObservable, observer } from 'mobx-react'
import Hooks from '../components/utils/pageListStore'
import styles from './index.module.less'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import CustomTitle from '@/components/CustomTitle'
// import Preview from './create/components/Preview'
import { getCookie } from '@/storage'
import { getColumnsList } from '../components/utils/columns'
import { Power } from '@wotu/wotu-pro-components'
const { Option } = Select

// 微页面管理
function Micropage() {
    const [form] = Form.useForm()
    const hooks = useLocalObservable(() => new Hooks('pc'))
    const orgName = getCookie('ORG_NAME')

    useEffect(() => {
        hooks.getMicroData()
    }, [])
    useEffect(() => {
        document.title = orgName ? `微页面管理-${orgName}` : '微页面管理'
    }, [orgName])

    /**
     * 发布页面
     * @param codes
     */
    const release = (codes: string) => {
        Modal.confirm({
            title: '确定要发布该页面吗？',
            icon: <ExclamationCircleOutlined />,
            centered: true,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                hooks.publishMicro(codes).then(() => {
                    hooks.getMicroData()
                })
            },
        })
    }

    /**
     *  微页面删除
     * @param codes
     */
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
            history.push(`/gateway/pc-web/create?code=${v?.code}`)
        },
        editHref: v => `/gateway/pc-web/create?code=${v?.code}`,
        publishClick(v) {
            release(v?.code)
        },
        deleteClick(v) {
            confirm(v?.code)
        },
        viewClick(v) {
            window.open(`/gateway/pc-view?code=${v?.code}`)
        },
        viewHref: v => `/gateway/pc-view?code=${v?.code}`,
        powerId: {
            edit: 11124,
            preview: 11126,
            delete: 11125,
            release: 11137,
        },
    })

    return (
        <div className={styles.pc_web_list}>
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
                        <Power powerId={11123}>
                            <Button
                                type="primary"
                                href="/gateway/pc-web/create"
                                onClick={e => {
                                    e.preventDefault()
                                    window.open('/gateway/pc-web/create')
                                }}
                            >
                                + 新建页面
                            </Button>
                        </Power>
                    </Space>
                </Row>
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
            </BlockBox>
        </div>
    )
}

export default observer(Micropage)
