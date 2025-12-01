const api = {
    /**我的团队信息查询（包含团队和成员信息）*/
    getTeamInfo: '/wil/courseTeam/student/teamInfo',
    /**创建团队 */
    createTeam: '/wil/courseTeam/createTeam',
    /**解散团队*/
    disbandTeam: '/wil/courseTeam/deleteTeam',
    /**退出团队*/
    exitTeam: '/wil/teamMember/exitTeam',
    /**查询团队列表（加入已有团队）*/
    getTeamList: '/wil/courseTeam/listWithLeader',
    /**查询团队成员列表 */
    getTeamMemberList: '/wil/teamMember/team',
    /**移除团队成员 */
    delTeamMember: '/wil/teamMember/batchRemoveMembers',
    /**转让组长 */
    transferLeader: '/wil/teamMember/transferLeader',
    /**申请加入团队 */
    submitApply: '/wil/teamApply/submitApply',
    /**新申请列表 */
    getApplyList: '/wil/teamApply/pendingList',
    /**处理团队申请 */
    judgeApply: '/wil/teamApply/process',
}
export default api
