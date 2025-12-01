const api = {
    /** 职位分类 */
    listByPid: '/common_data/capacity/list_by_pid/0',
    /** 热门职位 */
    hotList: '/profession/front/portal/list/hot',
    /** 企业热门职位 */
    orgHot: '/profession/front/portal/org/hot',
    /** 精选职位 */
    choicesList: '/profession/front/portal/list/choices',
    /** 最新职位 */
    newList: '/profession/front/portal/list/new',
    /** 实习职位 */
    practice: '/profession/front/portal/list/practice',
    /** 职业分页 */
    listByTop: '/common_data/capacity/list_by_top',
    /** 职位详情 */
    jobDetail: '/profession/front/portal/info',
    /** 热门企业 */
    orgList: '/profession/front/portal/list/org',
    /** 相似职位 */
    similarList: '/profession/front/portal/list/similar',
    /** 获取当前职位的企业卡片 */
    orgCard: '/profession/front/portal/get/org_card',
    /** 获取行业数据 */
    industryList: '/common_data/industry/all',
    /** 获取职位列表 */
    jobList: '/profession/front/portal/page/search',
    /** 经验枚举下拉 */
    experience: '/profession/drop_down/experience',
    /** 学历枚举下拉 */
    education: '/profession/drop_down/education',
    /** 公司规模下拉 */
    category: '/common_data/category/category',
    /** 招聘类型 */
    recruit: '/profession/drop_down/recruit_type',
    /** 热门企业列表 */
    hotEnterprises: '/organization/organization/hot_enterprises',
    /** 企业详情 */
    companyDetail: '/organization/organization/info/enterprise_home',
    /** 投递在线简历 */
    deliverOnlineResume: '/job/resume/deliver_online',
    /** 投递简历附件 */
    deliverPdfResume: '/job/resume/deliver',
    /** 推荐位管理 */
    recommend: '/form/recommend/list',
    /** 求职意向 */
    JobExpectList: '/job/resume/get_job_expect_list',
    /** 附件简历列表 */
    resumeList: '/job/resume/list_pc',
    /** 上传简历附件 */
    uploadResumeFile: '/job/resume/upload_resume_file',
    /** 热门搜索词 */
    recommendpage: '/form/front/recommend/page',
    /** 活动分类 */
    activity: '/activity/front/activity/catalog/list/open',
    /** 活动 */
    activitypage: '/activity/front/activity/page',
    /** 就业专题详情 */
    subjectdetail: '/job/subject/detail',
    /** 就业专题报名 */
    subjectapply: '/job/subject/apply',
    city: '/common_data/city/city', //根据上级编码获取省市
}
export default api
