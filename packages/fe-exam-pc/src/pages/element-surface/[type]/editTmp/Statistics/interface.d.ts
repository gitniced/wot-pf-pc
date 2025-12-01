import type { AuthenticateDetail } from '../interface'

export interface Props {
    setStatisticsVisible: (visible: boolean) => void
    statisticsVisible: boolean
    detail?: AuthenticateDetail
}
