import type UserStore from '@/stores/userStore'
import type TeamStore from '../store'
export type TeamLeaderProps = {
    teamStore: TeamStore
    userStore?: UserStore
}
