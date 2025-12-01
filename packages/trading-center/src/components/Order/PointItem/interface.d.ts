export type StatusMapValue = {
    name: string
    type: 'warning' | 'success' | 'default' | 'error' | 'processing' | undefined
}

export type StatusMap = Record<string, StatusMapValue>

export type PointItemProps = { status: string; statusMap: StatusMap }
