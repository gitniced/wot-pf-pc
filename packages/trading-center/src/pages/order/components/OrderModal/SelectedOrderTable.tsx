import { observer } from 'mobx-react'
import { SuperTable } from '@wotu/wotu-components'
import type { BackendOrderPageRespDto } from '@/@types/search'
import getRowSelections from './rowSelections'
import selectOrderColumns from './selectOrderColumns'

const SelectedOrderTable = ({
    selectedRows,
    store,
    type,
}: {
    type: 'DOWNLOAD_BILL'
    selectedRows: BackendOrderPageRespDto[]
    store: any
}) => {

    return (
        <SuperTable
            rowKey={'code'}
            columns={selectOrderColumns(type)}
            dataSource={selectedRows}
            search={false}
            scroll={{ y: 300 }}
            rowSelection={{
                type: 'checkbox',
                ...getRowSelections(store, store.selectedRows),
                preserveSelectedRowKeys: true,
            }}
            pagination={false}
        />
    )
}

export default observer(SelectedOrderTable) 