import type { AuthenticateDetail } from '../interface'

export interface Props {
    setEditNameVisible: (visible: boolean) => void
    editNameVisible: boolean
    isDetail?: boolean
    detail?: AuthenticateDetail
}
