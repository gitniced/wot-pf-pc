import getRowSelections from './utils'
import { SuperTable } from '@wotu/wotu-components'
import { ORDER_STATUS_ENUM } from './const'
import http from '@/servers/http'
import api from './api'
import { observer } from 'mobx-react'
import columns from './columns'
import dayjs from 'dayjs'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { getCookie, getLocalStorage } from '@/storage'

const AllOrderTable = forwardRef(
    (
        {
            store,
            type,
        }: {
            store: any
            customerCode?: string
            type?: 'OFFLINE_PAYMENT' | 'ADD_DISCOUNT'
        },
        ref: any,
    ) => {
        const tableRef = useRef(null)
        const getOrderForContactList = async (params: any) => {
            /**  买家code  */
            params.buyerCode = getCookie('SELECT_ORG_CODE')
            // 订单状态不等于"已关闭"
            params.statusList = [ORDER_STATUS_ENUM.unpaid, ORDER_STATUS_ENUM.payConfirm, ORDER_STATUS_ENUM.paid, ORDER_STATUS_ENUM.completed, ORDER_STATUS_ENUM.partialPayment]
            /**  sid  */
            params.sid = getLocalStorage('SID')
            // 可开票金额大于0的订单
            params.minPaidAmount = 0
            /**
             * 订单的开票状态筛选
             */
            params.invoicingstatusList = ['0', '6']
            /**
             * 订单的售后状态筛选
             */
            params.refundStatus = 0

            // 查询批量添加优惠订单
            if (type === 'ADD_DISCOUNT') {
                params.forBatchPreferential = true
            }

            /**  查询批量线下支付订单  */
            if (type === 'OFFLINE_PAYMENT') {
                params.forBatchOfflinePay = true
            }

            params.orgUser = getCookie('SELECT_USER_TYPE') === 'org'

            params.identity = getCookie('SELECT_IDENTITY_CODE')

            const res = await http(api.getOrderForContract, 'post', { ...params })
            return res
        }

        useImperativeHandle(ref, () => {
            return {
                reload: (tableRef?.current as any)?.reload,
            }
        })

        return (
            <SuperTable
                actionRef={tableRef as any}
                rowKey="code"
                scroll={{ x: 1400, y: 300 }}
                formItemsStyle={{
                    width: '332px',
                }}
                columns={columns()}
                request={getOrderForContactList as any}
                rowSelection={
                    {
                        type: 'checkbox',
                        ...getRowSelections(store),
                        preserveSelectedRowKeys: true,
                    } as any
                }
                beforeSearchSubmit={(myParams: Record<string, any>) => {
                    const convertDate = (dateArray: any[]) => {
                        if (!dateArray?.length) {
                            return {
                                start: undefined,
                                end: undefined,
                            }
                        }
                        const start = +dayjs(dateArray[0].$d).startOf('day').format('x')
                        const end = +dayjs(dateArray[1].$d).endOf('day').format('x')
                        return {
                            start,
                            end,
                        }
                    }

                    const { start: createStartTime, end: createEndTime } = convertDate(
                        myParams.createdAt,
                    )
                    const { start: optStartTime, end: optEndTime } = convertDate(myParams.optDate)
                    myParams.createStartTime = createStartTime
                    myParams.createEndTime = createEndTime
                    myParams.optStartTime = optStartTime
                    myParams.optEndTime = optEndTime
                    delete myParams.createdAt
                    delete myParams.optDate

                    return myParams
                }}
            />
        )
    },
)

export default observer(AllOrderTable)
