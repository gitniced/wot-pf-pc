import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import dayjs from 'dayjs'
import { Select } from 'antd'
import DatePicker from '@/components/Picker/DatePicker'
import { BUSSINESS_TAGES_MAP, ORDER_STATUS_LIST } from './const'
import { getSessionStorage } from '@/storage'
import { getPortalCodeFromUrl } from '@wotu/wotu-components'

const { RangePicker } = DatePicker

function selectOrderColumns(): ColumnsType<any> {
    const platform = getSessionStorage('PLATFORM')
    const currentAlias = getPortalCodeFromUrl({ isGetDomain: true })
    return [
        {
            search: true,
            title: '订单编号',
            dataIndex: 'orderNo',
            render: (_, { orderNo, code }) => {
                switch (platform) {
                    case 'portal':
                        return (
                            <a
                                href={`/${currentAlias}/transaction/order/detail?orderId=${code}`}
                                target="_blank"
                            >
                                {orderNo || '-'}
                            </a>
                        )
                    case 'workbench':
                        return (
                            <a
                                href={`/trading-center/order/detail?orderId=${code}`}
                                target="_blank"
                            >
                                {orderNo || '-'}
                            </a>
                        )
                    case 'middle':
                        return (
                            <a href={`/transaction/order/detail?orderId=${code}`} target="_blank">
                                {orderNo || '-'}
                            </a>
                        )
                    default:
                        return (
                            <a href={`/order/detail?orderId=${code}`} target="_blank">
                                {orderNo || '-'}
                            </a>
                        )
                }
            },
        },
        {
            search: false,
            title: '业务标签',
            dataIndex: 'tags',
            render: tags => tags.map((item: number) => BUSSINESS_TAGES_MAP.get(item)),
        },
        {
            search: false,
            title: '订单金额',
            dataIndex: 'payAmount',
            render: (_, { payAmount }) => <>{payAmount ? `¥${payAmount}` : '-'}</>,
        },
        {
            search: false,
            title: '已支付金额',
            dataIndex: 'paidAmount',
            render: (_, { paidAmount }) => <>{paidAmount ? `¥${paidAmount}` : '-'}</>,
        },
        {
            search: false,
            title: '创建时间',
            dataIndex: 'paidAmount',
            render: (_, { createdAt }) => (
                <>{createdAt ? dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss') : '-'}</>
            ),
        },
        {
            search: true,
            title: '订单状态',
            formOrder: 4,
            dataIndex: 'status',
            render: status => {
                return ORDER_STATUS_LIST.filter(item => item.value === status)?.[0]?.label
            },
            renderFormItem: () => (
                <Select
                    options={ORDER_STATUS_LIST}
                    placeholder="请选择"
                    style={{ width: '100%' }}
                />
            ),
        },
        {
            search: true,
            title: '业务编码',
            dataIndex: 'reservedCodes',
            formOrder: 2,
            formItemProps: {
                name: 'reservedCodes',
            },
        },
        {
            search: true,
            title: '业务日期',
            dataIndex: 'optDate',
            formOrder: 3,
            renderFormItem: () => (
                <RangePicker format="YYYY-MM-DD" placeholder={['开始日期', '结束日期']} />
            ),
            render: (_, { optDate }) => <>{optDate ? dayjs(optDate).format('YYYY-MM-DD') : '-'}</>,
        },
    ]
}

export default selectOrderColumns
