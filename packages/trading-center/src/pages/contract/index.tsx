import React from 'react'
import styles from './index.module.less'
import Minititle from '@/components/Order/Minititle'
import { SuperTable } from '@wotu/wotu-components'
import type {} from '@wotu/wotu-components'
import { Empty } from '@wotu/wotu-components'
import api from './api'
import Http from '@/servers/http'
import dayjs from 'dayjs'
import { getCookie } from '@/storage'
import type {
    CustomerContractPageDto,
    BasePaginationRspCustomerContractPageDto,
    CustomerContractPageUsingPOSTRequest,
} from '@/@types/finance'
import { history } from 'umi'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'

const Contract = () => {
    const TableRequest = async (query: CustomerContractPageUsingPOSTRequest) => {
        if (getCookie('SELECT_ORG_CODE')) {
            let params: CustomerContractPageUsingPOSTRequest = {
                organizationCode: getCookie('SELECT_ORG_CODE'),
                pageNo: query.pageNo,
                pageSize: query.pageSize,
            }
            const res = (await Http(
                api.getContractList,
                'post',
                params,
            )) as unknown as BasePaginationRspCustomerContractPageDto

            return {
                total: res.totalCount!,
                data: res.data! || [],
                success: true,
            }
        } else {
            return {
                total: 0,
                data: [],
                success: true,
            }
        }
    }
    const gotoDetail = (record: CustomerContractPageDto) => {
        history.push(`/contract/detail?code=${record.code}`)
    }

    const getTime = (timeStamp: number) => {
        if (!timeStamp) return timeStamp
        return dayjs(timeStamp).format('YYYY-MM-DD')
    }
    const columns: ColumnsTypeItem<CustomerContractPageDto>[] = [
        {
            title: '合同编号',
            dataIndex: 'contractNo',
            fixed: 'left',
            width: 200,
        },
        {
            title: '甲方',
            dataIndex: 'partyA',
            width: 240,
        },
        {
            title: '乙方',
            dataIndex: 'partyB',
            width: 240,
        },
        {
            title: '服务有效期',
            dataIndex: 'serviceStart',
            width: 260,
            render: (_: any, record: CustomerContractPageDto) => {
                if (record.contractEnd && record.serviceStart) {
                    return `${getTime(record.serviceStart)}至${getTime(record.contractEnd)} `
                }
                return '-'
            },
        },
        {
            title: '剩余天数',
            dataIndex: 'remainingDays',
            width: 120,
        },
        {
            title: '结算标准',
            dataIndex: 'settleStandardName',
            width: 120,
        },
        {
            title: '结算方式',
            dataIndex: 'settleTypeName',
            width: 120,
        },
        {
            title: '操作',
            width: 120,
            fixed: 'right',
            render: (_: any, record: CustomerContractPageDto) => {
                return <a onClick={() => gotoDetail(record)}>详情</a>
            },
        },
    ]
    return (
        <div className={styles.contract_page}>
            <Minititle title="我的合同" />
            <SuperTable
                columns={columns}
                scroll={{ x: 1200 }}
                // @ts-ignore
                request={TableRequest}
                search={false}
                locale={{
                    emptyText: <Empty size="small" />,
                }}
            />
        </div>
    )
}

export default Contract
