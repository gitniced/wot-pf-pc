import { SuperTable } from '@wotu/wotu-components'
import { observer } from 'mobx-react'
import http from '@/servers/http'
import api from './api'
import dayjs from 'dayjs'
import getRowSelections from './rowSelections'
import selectOrderColumns from './selectOrderColumns'
import { getCookie } from '@/storage'

const AllOrderTable = ({
    store,
    type,
}: {
    store: any
    type: 'DOWNLOAD_BILL'
}) => {
    const getOrderList = async (params: any) => {

        const res = await http(`${api.getOrderForContract}`, 'post', {
            ...params,
            orgUser: true,
            organizationCode: getCookie('SELECT_ORG_CODE'),
        })
        return res
    }

    return (
        <SuperTable
            rowKey='code'
            scroll={{ y: 300 }}
            formItemsStyle={{
                width: '332px',
            }}
            columns={selectOrderColumns(type)}
            request={getOrderList}
            rowSelection={
                {
                    type: 'checkbox',
                    ...getRowSelections(store, store.selectedRows),
                    preserveSelectedRowKeys: true,
                    hideSelectAll: true
                } as any
            }
            beforeSearchSubmit={(params: Record<string, any>) => {
                const convertDate = (dateArray: any[]) => {
                    if (!dateArray?.length) {
                        return {
                            start: undefined,
                            end: undefined
                        }
                    }
                    const start = +dayjs(dateArray[0].$d).startOf('day').format('x')
                    const end = +dayjs(dateArray[1].$d).endOf('day').format('x')
                    return {
                        start,
                        end
                    }
                }

                const { start: createStartTime, end: createEndTime } = convertDate(params.createdAt)
                params.createStartTime = createStartTime
                params.createEndTime = createEndTime
                delete params.createdAt

                const { start: optStartTime, end: optEndTime } = convertDate(params.optDate)
                params.optStartTime = optStartTime
                params.optEndTime = optEndTime
                delete params.optDate

                return params
            }}
        />
    )
}

export default observer(AllOrderTable) 