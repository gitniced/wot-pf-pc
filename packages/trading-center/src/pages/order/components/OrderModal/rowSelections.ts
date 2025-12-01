import type { BackendOrderPageRespDto } from '@/@types/search'

const getRowSelections = (store: any, selectedRow: BackendOrderPageRespDto[]) => {
    return {
        selectedRowKeys: store.selectedRows.map(item => item.code),
        checkStrictly: false,
        onSelect: (record: BackendOrderPageRespDto, selected: boolean) => {
            if (selected) {
                store.addSelectRow(record)
            } else {
                store.delSelectRow(record.code!)
            }
        },
        onSelectAll: (
            selected: boolean,
            _selectedRows: BackendOrderPageRespDto[],
            changeRows: BackendOrderPageRespDto[],
        ) => {
            if (selected) {
                store.addSelectRow(changeRows)
            } else {
                changeRows.forEach(item => {
                    store.delSelectRow(item.code!)
                })
            }
        },
        getCheckboxProps: (record: BackendOrderPageRespDto) => ({
            disabled: selectedRow.length ? !selectedRow?.[0]?.contractCodes?.includes(record?.contractCodes?.[0]) : false,
        }),
    }
}

export default getRowSelections 