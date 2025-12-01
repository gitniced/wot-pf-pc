import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type { StudentTeamInfoDto, TeamApplyDto, TeamListDto } from './interface'
import { cloneDeep } from 'lodash'

class store {
    constructor() {
        makeAutoObservable(this)
    }
    /**排课编码 */
    public scheduleCode = ''

    /**是否为团队组长 */
    public isTeamLeader: boolean = false

    /**是否请求成功 */
    public hasRequest: boolean = false

    /**我的团队信息 */
    public teamInfo: Partial<StudentTeamInfoDto> | null = null

    /**团队列表 */
    public teamList: TeamListDto[] = []

    /**等待加入审核列表 */
    // public applyWaitList: TeamApplyDto[] = []

    /**加入审核列表 */
    public applyList: TeamApplyDto[] = []

    /**审核列表正在操作 */
    public applyListInDeal: boolean = false

    /**需要移除的成员列表 */
    public removeList: string[] = []

    /**更新团队信息回调 */
    public teamInfoUpdataCallback: (teamInfo: Partial<StudentTeamInfoDto>) => void = () => {}

    /**更新移除列表 */
    updateRemoveList = (memberCode: string) => {
        let tempRemoveList = cloneDeep(this.removeList)
        const isInList = tempRemoveList.some(i => i === memberCode)
        !isInList ? tempRemoveList.push(memberCode) : ''
        this.removeList = tempRemoveList
    }

    /**清空移除列表 */
    clearRemoveList = () => {
        this.removeList = []
    }

    /**更新队长选择 */
    updateLeaderActive = (memberCode: string) => {
        let tempTeamInfo = cloneDeep(this.teamInfo)
        let { members = [] } = tempTeamInfo || {}
        members.map(i => {
            if (i.code === memberCode) {
                i.active = !i.active
            } else {
                i.active = false
            }
        })
        this.teamInfo = tempTeamInfo
    }
    /**绑定更新团队信息 */
    bindTeamInfoUpdata = (callback: (teamInfo: Partial<StudentTeamInfoDto>) => void) => {
        this.teamInfoUpdataCallback = callback
    }

    /**获取我的团队 */
    getTeamInfo = async (scheduleCode: string) => {
        try {
            this.scheduleCode = scheduleCode
            const teamInfo = (await http(api.getTeamInfo, 'post', {
                scheduleCode,
            })) as unknown as StudentTeamInfoDto
            if (teamInfo) {
                const { role, members = [] } = teamInfo || {}
                const leaderArr = members.filter(i => String(i.role) === '1')
                const memberArr = members.filter(i => String(i.role) === '0')
                let finallyMember = leaderArr.concat(memberArr)
                finallyMember.map(i => (i.active = false))
                this.isTeamLeader = String(role) === '1'
                this.teamInfo = { ...teamInfo, members: finallyMember }
                if (this.teamInfoUpdataCallback) {
                    this.teamInfoUpdataCallback(this.teamInfo)
                }
            } else {
                this.teamInfo = null
            }
            this.hasRequest = true
        } catch (error) {
            this.hasRequest = true
        }
    }

    /**创建团队 */
    createTeam = async (
        teamName: string,
        successCallback: () => void,
        failCallback: () => void,
    ) => {
        http(api.createTeam, 'post', {
            name: teamName,
            scheduleCode: this.scheduleCode,
        })
            .then(data => {
                if (data) {
                    this.getTeamInfo(this.scheduleCode)
                    successCallback()
                } else {
                    failCallback()
                }
            })
            .finally(() => {
                failCallback()
            })
    }

    /**查询可加入的团队列表 */
    getTeamList = async () => {
        this.applyListInDeal = true
        http(api.getTeamList, 'post', {
            scheduleCode: this.scheduleCode,
        })
            .then(data => {
                this.teamList = data as unknown as TeamListDto[]
            })
            .finally(() => {
                this.applyListInDeal = false
            })
    }

    /**加入团队 */
    joinTeam = async (teamCode: string) => {
        this.applyListInDeal = true
        http(api.submitApply, 'post', {
            teamCode,
        })
            .then(data => {
                if (data) {
                    this.getTeamList()
                }
            })
            .finally(() => {
                this.applyListInDeal = false
            })
    }

    /**解散团队 */
    disbandTeam = async () => {
        const { code: teamCode } = this.teamInfo || {}
        if (teamCode) {
            return http(api.disbandTeam, 'post', { teamCode }).then(data => {
                if (data) {
                    this.teamInfo = null
                    this.teamInfoUpdataCallback(null)
                }
            })
        }
    }

    /**移除团队成员 */
    delTeamMember = async () => {
        this.applyListInDeal = true
        http(api.delTeamMember, 'post', { memberCodes: this.removeList })
            .then(data => {
                if (data) {
                    this.getTeamInfo(this.scheduleCode)
                }
            })
            .finally(() => {
                this.clearRemoveList()
                this.applyListInDeal = false
            })
    }

    /**退出团队 */
    exitTeam = () => {
        const { code: teamCode } = this.teamInfo || {}
        if (teamCode) {
            return http(api.exitTeam, 'post', {
                teamCode,
            }).then(data => {
                if (data) {
                    this.teamInfo = null
                }
            })
        }
    }

    /**获取新申请列表 */
    getApplyList = () => {
        const { code: teamCode } = this.teamInfo || {}
        if (teamCode) {
            return http(`${api.getApplyList}/${teamCode}`, 'get', {}).then(data => {
                this.applyList = data as unknown as TeamApplyDto[]
            })
        }
    }

    /**处理新申请 */
    judgeApply = (applyCode: string, status: string) => {
        this.applyListInDeal = true
        http(api.judgeApply, 'post', { applyCode, status })
            .then(data => {
                if (data) {
                    const tempApplyList = cloneDeep(this.applyList)
                    tempApplyList.map(i => {
                        if (i.code === applyCode) {
                            i.status = Number(status)
                        }
                    })
                    this.applyList = tempApplyList
                    this.getTeamInfo(this.scheduleCode)
                }
            })
            .finally(() => {
                this.applyListInDeal = false
            })
    }

    /**转让组长 */
    transferLeader = () => {
        this.applyListInDeal = true
        const { members = [], memberCode } = this.teamInfo!
        const currentLeaderMemberCode = memberCode
        const newLeaderMemberCode = members.find(i => i.active)?.code
        if (currentLeaderMemberCode && newLeaderMemberCode) {
            return http(api.transferLeader, 'post', {
                currentLeaderMemberCode,
                newLeaderMemberCode,
            })
                .then(data => {
                    if (data) {
                        this.getTeamInfo(this.scheduleCode)
                    }
                })
                .finally(() => {
                    this.applyListInDeal = false
                })
        }
    }
}

export default store
