import React, { useState, useEffect } from 'react'
import CustomTitle from '@/components/CustomTitle'
import BlockBox from '@/components/BlockBox'
import { Form, Input, Button, Space, Row, Table, message } from 'antd'
import { useLocalObservable, Observer } from 'mobx-react'
import Hooks from './store'
import styles from './index.module.less'
import dayjs from 'dayjs'
import FormModal from './components/addEDitModal/index'
import { getCookie } from '@/storage'
import type { graphicType } from './interface'
import type { ColumnsType } from 'antd/es/table'
import { Power } from '@wotu/wotu-pro-components'
// 图文分类
function GraphicClassic() {
    const [form] = Form.useForm()
    const hooks = useLocalObservable(() => new Hooks())

    const [visible, setVisible] = useState<boolean>(false) //控制显示隐藏
    const [records, setRecords] = useState<graphicType | undefined>(undefined) //点击编辑获取到的数据
    const orgCode = getCookie('SELECT_ORG_CODE') //获取organizationCode
    const orgName = getCookie('ORG_NAME')
    useEffect(() => {
        document.title = orgName ? '图文分类' + '-' + orgName : '图文分类'
    }, [document.title])

    useEffect(() => {
        hooks.getGraphicClassData()
    }, [])

    // 取消按钮
    const onCancel = () => {
        setRecords(undefined)
        setVisible(false)
    }
    // 确认按钮
    const onSubmit = (params: graphicType, callback: () => void) => {
        const createdAt = dayjs(params.createdAt).valueOf()
        let messageText: string = '新增'
        if (records) {
            messageText = '编辑'
            const tempVal = { ...params, code: records?.code, createdAt }
            hooks
                .editClass(tempVal)
                .then(() => {
                    message.success(`${messageText}成功`)
                    hooks.getGraphicClassData()
                    onCancel()
                })
                .finally(() => {
                    callback()
                })
        } else {
            const tempVal = { ...params, organizationCode: orgCode }
            hooks
                .addClass(tempVal)
                .then(() => {
                    message.success(`${messageText}成功`)
                    hooks.getGraphicClassData()
                    onCancel()
                })
                .finally(() => {
                    callback()
                })
        }
    }

    const columns: ColumnsType<graphicType> = [
        {
            title: '分类名称',
            align: 'center',
            dataIndex: 'name',
            width: '40%',
            render(col: string) {
                return <>{col ? col : '-'}</>
            },
        },
        {
            title: '创建时间',
            align: 'center',
            dataIndex: 'createdAt',
            width: '30%',
            render(col: number) {
                return <>{col ? dayjs(col).format('YYYY-MM-DD HH:mm:ss') : '-'}</>
            },
        },
        {
            title: '操作',
            align: 'center',
            dataIndex: 'code',
            width: '30%',
            render(_, record: graphicType) {
                return (
                    <>
                        <Power powerId={11135}>
                            <a
                                onClick={() => {
                                    setVisible(true)
                                    setRecords(record)
                                }}
                                style={{ marginRight: 16 }}
                            >
                                编辑
                            </a>
                        </Power>
                        <Power powerId={11136}>
                            <a onClick={() => hooks.confirm(record?.code)}>删除</a>
                        </Power>
                    </>
                )
            },
        },
    ]
    return (
        <div className={styles.page}>
            <BlockBox>
                <CustomTitle title="图文分类" />
                <Form layout="inline" form={form}>
                    <Form.Item label="分类名称" name="name">
                        <Input placeholder="请输入" />
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
                    <Power powerId={11134}>
                        <Space>
                            <Button
                                type="primary"
                                onClick={() => {
                                    setVisible(true)
                                }}
                            >
                                新建分类
                            </Button>
                        </Space>
                    </Power>
                </Row>
                <Observer>
                    {() => {
                        return (
                            <Table
                                columns={columns}
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
                {/* 模态框 */}
                <FormModal
                    visible={visible}
                    onCancel={onCancel}
                    onSubmit={onSubmit}
                    records={records}
                />
            </BlockBox>
        </div>
    )
}

export default GraphicClassic
