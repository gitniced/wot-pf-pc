import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type { TeamDetailDto, TeamListResponseDto } from './interface'

class store {
    constructor() {
        makeAutoObservable(this)
    }

    /**是否请求成功 */
    public hasRequest: boolean = false

    /**我的团队信息 */
    public teamInfo: Partial<TeamListResponseDto> | null = null

    /**团队列表 */
    public teamList: TeamDetailDto[] = []

    /**审核列表正在操作 */
    public applyListInDeal: boolean = false

    /**获取团队列表 */
    getTeamList = async (scheduleCode: string) => {
        this.applyListInDeal = true
        http(api.getTeamList, 'post', {
            scheduleCode,
        })
            .then(data => {
                const { teams = [] } = data as unknown as TeamListResponseDto
                this.teamInfo = data as unknown as TeamListResponseDto
                this.teamList = teams
            })
            .finally(() => {
                this.hasRequest = true
                this.applyListInDeal = false
            })
    }
}

export default store
