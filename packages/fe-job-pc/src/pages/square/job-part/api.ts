const api = {
    cityTrace: '/job/job/city_trace', // 获取已经选择的省份和城市
    city: '/common_data/city/city', //根据上级编码获取城市
    cityList: '/common_data/city/city_list', // 城市列表
    category: '/common_data/category/category', //获取分类配置
    byPid: '/common_data/capacity/list_by_pid', //根据上级id获取职位列表
    capacityList: '/common_data/capacity/list_tree', //根据一级id获取二三级岗位树
    joinTime: '/job/candidate/change_join_time', // 修改入职时间
    candidateInfo: '/job/candidate/info', //获取求职者信息
    jobExpectList: '/job/resume/get_job_expect_list', //用户求职期望列表
    jobExpectDetail: '/job/resume/get_job_expect', //根据code求职期望详情s
    saveJobExpect: '/job/resume/save_job_expect', //保存或编辑用户求职期望
    checkUserJoin: '/activity/front/activity/apply/check', //校验用户是否在活动名单
    getJobList: '/activity/front/activity/market/profession', //职位列表
    getCompanyList: '/activity/front/activity/market/organization', //职位列表
}

export default api
