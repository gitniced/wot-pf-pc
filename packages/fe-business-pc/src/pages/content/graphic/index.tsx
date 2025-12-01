import React, { useEffect } from 'react'
import CustomTitle from '@/components/CustomTitle'
import BlockBox from '@/components/BlockBox'
import { Form, Input, Button, Space, Row, Table, Modal, Badge, Tag } from 'antd'
import { history } from 'umi'
import { STATUS_RELEASE, statusMap, statusEnum } from './const'
import { useLocalObservable, Observer } from 'mobx-react'
import Hooks from './store'
import styles from './index.module.less'
import dayjs from 'dayjs'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { ItemType } from './interface'
import MoreSelect from '@/components/MoreSelect'
import { getCookie } from '@/storage'
import { Power } from '@wotu/wotu-pro-components'
import { SuperLink } from '@wotu/wotu-components'

// 图文管理
function Graphic() {
    const organizationCode = getCookie('SELECT_ORG_CODE')
    const [form] = Form.useForm()
    const hooks = useLocalObservable(() => new Hooks())
    const orgName = getCookie('ORG_NAME')
    useEffect(() => {
        hooks.getGraphicData()
    }, [])
    useEffect(() => {
        document.title = orgName ? '图文管理' + '-' + orgName : '图文管理'
    }, [document.title])

    //新建或者编辑图文  跳转页面
    // 发布
    const release = (cod: string) => {
        Modal.confirm({
            title: '确定要发布该页面吗？',
            icon: <ExclamationCircleOutlined />,
            centered: true,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                hooks.publishText(cod)
            },
        })
    }

    /**
     *  删除
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
                hooks.deleteText(codes)
            },
        })
    }

    //表格数据
    const columns: ColumnsType<ItemType> = [
        {
            title: '图文标题',
            align: 'center',
            dataIndex: 'title',
            width: '20%',
            render(col: string) {
                return <div className={styles.title}>{col ? col : '-'}</div>
            },
        },
        {
            title: '分类',
            align: 'center',
            dataIndex: 'categoryNameList',
            width: '20%',
            render(col: []) {
                return (
                    <>
                        {col?.length !== 0
                            ? col?.map(item => {
                                  return (
                                      <Tag
                                          key={item}
                                          color="default"
                                          style={{
                                              marginRight: 4,
                                              marginBottom: 4,
                                          }}
                                      >
                                          {item}
                                      </Tag>
                                  )
                              })
                            : '-'}
                    </>
                )
            },
        },
        {
            title: '状态',
            align: 'center',
            dataIndex: 'status',
            width: '20%',
            render(col: number) {
                return (
                    <>
                        <Badge status={statusMap[col] || 'default'} />
                        &nbsp;
                        {STATUS_RELEASE[col] || '-'}
                    </>
                )
            },
        },
        {
            title: '发布时间',
            align: 'center',
            dataIndex: 'publishTime',
            width: '20%',
            render(col: number) {
                return <>{col ? dayjs(col).format('YYYY-MM-DD HH:mm:ss') : '-'}</>
            },
        },
        {
            title: '操作',
            onHeaderCell: () => ({
                style: {
                    textAlign: 'center',
                },
            }),
            align: 'center',
            dataIndex: 'code',
            width: '20%',
            render(_, recode: ItemType) {
                return (
                    <div className={styles.opera}>
                        <div className={styles.bba}>
                            <Power powerId={11132}>
                                <SuperLink
                                    href={`/content/graphic/add-graphic?code=${recode?.code || ''}`}
                                    onClick={() =>
                                        history.push(
                                            `/content/graphic/add-graphic?code=${
                                                recode?.code || ''
                                            }`,
                                        )
                                    }
                                >
                                    编辑
                                </SuperLink>
                            </Power>
                            {recode.status === statusEnum.draft && (
                                <Power powerId={11139}>
                                    <a onClick={() => release(recode?.code)}>发布</a>
                                </Power>
                            )}
                            <Power powerId={11133}>
                                <a onClick={() => confirm(recode?.code)}>删除</a>
                            </Power>
                        </div>
                    </div>
                )
            },
        },
    ]
    return (
        <div className={styles.page}>
            <BlockBox>
                <CustomTitle title="图文管理" />
                <Form layout="inline" form={form}>
                    <Form.Item label="图文标题" name="title">
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item label="分类" name="categoryCodes" style={{ minWidth: 250 }}>
                        <MoreSelect
                            all={false}
                            placeholder="请选择分类"
                            valueKey={'code'}
                            requestParams={{ organizationCode }}
                            requestUrl={'/business/imagetext_category/page'}
                            className={styles.view}
                            beforeChange={(_, selectItem: any) => {
                                form.setFieldValue('categoryCodes', selectItem?.code)
                            }}
                        />
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
                        <Power powerId={10167}>
                            <Button
                                type="primary"
                                href="/content/graphic/add-graphic"
                                onClick={e => {
                                    e.preventDefault()
                                    history.push('/content/graphic/add-graphic')
                                }}
                            >
                                新增图文
                            </Button>
                        </Power>
                    </Space>
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
            </BlockBox>
        </div>
    )
}
export default Graphic
