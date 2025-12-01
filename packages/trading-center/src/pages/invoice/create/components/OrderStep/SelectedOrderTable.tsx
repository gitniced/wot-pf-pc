import { observer } from 'mobx-react'
import { SuperTable } from '@wotu/wotu-components'
import getRowSelections from './utils'
import columns from './columns'

const SelectedOrderTable = ({
    selectedRows,
    store,
}: {
    selectedRows: any[]
    store: any
}) => {
    return (
        <SuperTable
            rowKey={'code'}
            columns={columns()}
            dataSource={selectedRows}
            search={false}
            scroll={{ x: 1400, y: 300 }}
            rowSelection={
                {
                    type: 'checkbox',
                    ...getRowSelections(store),
                    preserveSelectedRowKeys: true,
                } as any
            }
            pagination={false}
        />
    )
}

export default observer(SelectedOrderTable)
