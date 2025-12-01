export interface PositionModalProps {
    visible: boolean
    closeDialog: () => void
    value?: any
    submit?: (value?: object) => void
}

export interface IAllDataSuperTableProps {
    selectedPosition: any[]
    setSelectedPosition: React.Dispatch<React.SetStateAction<any[]>>
}
