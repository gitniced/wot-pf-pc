import type UserStore from '@/stores/userStore'
import type TeamStore from '../store'
export type TeamMemberProps = {
    teamStore: TeamStore
    userStore?: UserStore
}
