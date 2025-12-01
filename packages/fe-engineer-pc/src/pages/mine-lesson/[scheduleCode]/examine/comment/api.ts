const api = {
    /** 获取自评任务编号 */
    getSelfEvaluationTaskCode: '/wil/evaluation/getSelfEvaluationTaskCode',
    /** 获取组内互评列表 */
    getIntraGroupTargets: '/wil/evaluation/getPeerTargets',
    /** 获取组间互评列表 */
    getInterGroupTargets: '/wil/evaluation/getInterGroupPeerTargets',
    /** 获取考核项目列表 */
    getAssProjects: '/wil/evaluation/getAssProjects',
    /** 根据考核项目编号查询学习成果信息 */
    getProjectOutcomes: '/wil/evaluation/getProjectOutcomes',
    /** 获取考核项目评价标准 */
    getCriteria: '/wil/evaluation/getCriteria',
    /** 提交评价 */
    submitEvaluation: '/wil/evaluation/submitEvaluation',
}
export default api
