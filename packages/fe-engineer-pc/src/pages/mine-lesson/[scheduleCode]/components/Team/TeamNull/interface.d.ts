import type UserStore from '@/stores/userStore'
import type TeamStore from '../store'
export type TeamNullProps = {
    teamStore: TeamStore
    userStore?: UserStore
}
