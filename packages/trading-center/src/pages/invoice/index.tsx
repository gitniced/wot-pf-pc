/**
 * @ File:
 * @ Description:
 * @ Author: cqh
 * @ Create Time: 2022-12-22 11:08:05
 * @ Modified by: feeling
 * @ Modified time: 2025-02-12 11:49:27
 */

import React, { useEffect } from 'react'
import { useLocalObservable, Observer, observer } from 'mobx-react'
import Minititle from '@/components/Order/Minititle'
import BlockBox from '@/components/Order/BlockBox'
import { Button, Select } from 'antd'
import type { IRoute } from 'umi'
import { history, NavLink } from 'umi'
import { invoiceState, invoiceType } from './constants'
import Hooks from './store'
import styles from './index.module.less'
import PointItem from '@/components/Order/PointItem'
import { INVOICE_STATUS_MAP } from '@/pages/order/const'
import { Empty, SuperTable } from '@wotu/wotu-components'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { InvoiceType } from './typing'
import { getCookie } from '@/storage'

const { Option } = Select

function Invoice() {
    // const [form] = Form.useForm()
    const hooks = useLocalObservable(() => new Hooks())

    useEffect(() => {
        document.title = '我的发票'
    })
    //模糊搜索高亮显示
    const showColor = (light: string) => {
        return <span dangerouslySetInnerHTML={{ __html: light }} />
    }

    const columns: ColumnsTypeItem<InvoiceType>[] = [
        {
            title: '申请编号',
            align: 'center',
            dataIndex: 'invoiceNo',
            search: true,
            formItemProps: {
                labelCol: { span: 6 },
                wrapperCol: { span: 18 },
            },
            render: (_: string, { code, makeType, highlightInvoiceNo, invoiceNo }) => {
                return (
                    <NavLink to={`/invoice/detail?code=${code}&makeType=${makeType}`}>
                        {showColor(highlightInvoiceNo ? highlightInvoiceNo : invoiceNo)}
                    </NavLink>
                )
            },
        },
        {
            title: '抬头名称',
            align: 'center',
            dataIndex: 'titleName',
            render(col: string, { name }) {
                return name || col || '--'
            },
        },
        // {
        //     title: '类别',
        //     align: 'center',
        //     dataIndex: 'makeType',
        //     render(col: number) {
        //         return invoiceCategoryTypeText[col] || '--'
        //     },
        // },
        {
            title: '开票金额',
            align: 'center',
            dataIndex: 'amount',
            render(col: number) {
                return `￥${col || '--'}`
            },
        },
        {
            title: '开票类型',
            align: 'center',
            dataIndex: 'invoiceType',
            render(col: number) {
                return <span>{invoiceType[col] || '--'}</span>
            },
        },
        {
            title: '状态',
            align: 'center',
            dataIndex: 'status',
            renderFormItem: () => (
                <Select style={{ width: '224px' }} placeholder="请选择开票状态">
                    {invoiceState.map(item => (
                        <Option value={item.value} key={item.value}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
            ),
            render: (col: number) => {
                return <PointItem status={String(col)} statusMap={INVOICE_STATUS_MAP} />
            },
        },
        {
            title: '操作',
            align: 'center',
            dataIndex: 'code',
            render: (col: string, { makeType }) => {
                return (
                    <NavLink to={`/invoice/detail?code=${col}&makeType=${makeType}`}>详情</NavLink>
                )
            },
        },
    ]
    return (
        <div className={styles.page}>
            <BlockBox style={{ height: '100%' }}>
                <Minititle title="我的发票" />
                <Observer>
                    {() => {
                        return (
                            <SuperTable
                                params={{
                                    organizationCode: getCookie('SELECT_ORG_CODE'),
                                    identity: getCookie('SELECT_IDENTITY_CODE'),
                                    orgUser: getCookie('SELECT_USER_TYPE') === 'org',
                                }}
                                columns={columns}
                                // @ts-ignore
                                request={hooks.getInvoiceData}
                                // dataSource={hooks.dataSource}
                                locale={{
                                    emptyText: <Empty />,
                                }}
                                pagination={{
                                    pageSize: hooks.pagination.pageSize,
                                    current: hooks.pagination.pageNo,
                                    total: hooks.totalCount,
                                    showSizeChanger: true,
                                    showQuickJumper: true,
                                    onChange(page, pageSize) {
                                        hooks.pageChange(page, pageSize)
                                    },
                                }}
                                renderOptionBar={{
                                    center: () => {
                                        return (
                                            <Button
                                                type={'primary'}
                                                onClick={() => {
                                                    history.push('/invoice/create')
                                                }}
                                            >
                                                开发票
                                            </Button>
                                        )
                                    },
                                }}
                            />
                        )
                    }}
                </Observer>
            </BlockBox>
        </div>
    )
}

const ObserverInvoice: IRoute = observer(Invoice)

ObserverInvoice.title = '我的发票'

export default ObserverInvoice
