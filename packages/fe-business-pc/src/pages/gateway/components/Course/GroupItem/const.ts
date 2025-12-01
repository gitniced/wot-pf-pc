export interface GroupCardProps {
    id: string
    name: string
    allowDelete?: boolean // 是否允许删除
    onDelete?: (id: string) => void
}
