import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import dayjs from 'dayjs'
import { ORDER_STATUS_MAP } from './const'
import { Badge, Tag } from 'antd'
import DatePicker from '@/components/Picker/DatePicker'
import { getSessionStorage } from '@/storage'
import { getPortalCodeFromUrl } from '@wotu/wotu-components'
import { calculateInvoiceAmount } from './utils'
import { filterNum } from '@/utils/numberTransform'

const { RangePicker } = DatePicker

function relatedOrderColumns(): ColumnsType<any> {
    const openOrderDetail = (code: string) => {
        const platform = getSessionStorage('PLATFORM')
        let finalUrl = ''
        const currentAlias = getPortalCodeFromUrl({ isGetDomain: true })
        switch (platform) {
            case 'portal':
                finalUrl = `/${currentAlias}/transaction/order/detail?orderId=${code}`
                break
            case 'workbench':
                finalUrl = `/trading-center/order/detail?orderId=${code}`
                break
            case 'middle':
                finalUrl = `/transaction/order/detail?orderId=${code}`
                break
                default:
                finalUrl = `/order/detail?orderId=${code}`
        }
        window.open(finalUrl)
    }

    return [
        {
            fixed: 'left',
            search: true,
            title: '订单编号',
            dataIndex: 'orderNo',
            width: 150,
            render: (_, { orderNo, code }) => (
                <a onClick={() => openOrderDetail(code)}>{orderNo || '-'}</a>
            ),
        },
        {
            search: false,
            title: '订单金额',
            dataIndex: 'payAmount',
            width: 150,
            render: (_, { payAmount }) => <>{payAmount ? `¥${payAmount}` : '-'}</>,
        },
        {
            search: false,
            title: '可开票金额',
            dataIndex: 'invoiceAmount',
            width: 150,
            render: (_, { status, payAmount, paidAmount }) => {
                const invoiceAmount = calculateInvoiceAmount(status, payAmount, paidAmount)
                return <>{`¥${filterNum(invoiceAmount)}`}</>
            },
        },
        {
            search: false,
            title: '创建日期',
            dataIndex: 'createdAt',
            width: 150,
            render: (_, { createdAt }) => (
                <>{createdAt ? dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss') : '-'}</>
            ),
            renderFormItem: () => {
                return <RangePicker format="YYYY-MM-DD" placeholder={['开始日期', '结束日期']} />
            },
        },
        {
            search: false,
            title: '订单状态',
            dataIndex: 'status',
            width: 150,
            render: (_, { status }) => {
                type statusType =
                    | 'warning'
                    | 'error'
                    | 'success'
                    | 'default'
                    | 'processing'
                    | undefined
                const statusMap: Record<string, statusType> = {
                    '1': 'warning',
                    '2': 'processing',
                    '3': 'success',
                    '4': 'success',
                    '5': 'error',
                    '6': 'warning',
                }
                return (
                    <>
                        <Badge status={statusMap[status] || 'default'} />
                        &nbsp;<span> {ORDER_STATUS_MAP[status]}</span>
                    </>
                )
            },
        },
        {
            search: true,
            title: '业务编码',
            dataIndex: 'reservedCodes',
            width: 250,
            formItemProps: { name: 'reservedCode' },
            render: (_, { reservedCodes }) => (
                <>
                    {reservedCodes.map((i: any) => (
                        <Tag key={i} color="blue">
                            {i}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            search: false,
            title: '业务名称',
            dataIndex: 'reservedNames',
            width: 250,
            render: (_, { reservedNames }) => (
                <>
                    {reservedNames.map((i: any) => (
                        <Tag key={i} color="blue">
                            {i}
                        </Tag>
                    ))}
                </>
            ),
        },
        // {
        //     search: false,
        //     title: '业务标签',
        //     dataIndex: 'tag',
        //     width: 150,
        //     render: (_, { tags }) => {
        //         return (
        //             <>
        //                 {tags?.map((value: string, idx: number) => {
        //                     return (
        //                         <>
        //                             {BUSINESS_TAG_MAP[Number(value)]}
        //                             {idx < tags?.length - 1 && '/'}
        //                         </>
        //                     )
        //                 })}
        //             </>
        //         )
        //     },
        // },
        {
            search: false,
            title: '业务日期',
            dataIndex: 'optDate',
            width: 150,
            render: (_, { optDate }) => (
                <>{optDate ? dayjs(optDate).format('YYYY-MM-DD HH:mm:ss') : '-'}</>
            ),
            renderFormItem: () => {
                return <RangePicker format="YYYY-MM-DD" placeholder={['开始日期', '结束日期']} />
            },
        },
    ]
}

export default relatedOrderColumns
