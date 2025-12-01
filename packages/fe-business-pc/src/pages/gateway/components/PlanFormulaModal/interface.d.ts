export interface ModalProps {
    visible: boolean
    onCancel: () => void
    onConfirmSel: (rows: any, keys: any) => void
    title: string
    tableOptions: any
    selectType: RowSelectionType
    selectedRowKeys: key[]
    _selectedRows: any[]
}

export interface GetPlanDataParams {
    orgCode: string
    type: string
    [propName: string]: any
}

type RowSelectionType = 'checkbox' | 'radio'
type key = string | number
type Item = {
    appraise: { name: string }
    planTypeCategory: { name: string }
}
