const api = {
    // 获取todo列表
    getToDoList: '/search/front/todo/list',
    // 获取数据概览
    // getDataCardList: '/search/front/todo/data-overview/list',
    // 获取数据概览
    getDataCardList: '/auth/access/list/access',
    // 时间区间的是否有日程
    getCalenderNowMonthMap: '/search/front/todo/schedule/date',
    //获取当天的日程
    getNowDayCalender: '/search/front/todo/schedule/list',
    // 获取标杆案例 --暂时无用
    getCaseList: '',
    // 获取机构的权限
    organizationPermissionList: '/organization/organization/v2/user_permission',
    // 获取用户的权限
    userPermissionList: '/auth/user_permission/v1/tree',
    // 获取门户信息
    getPortalInfo: '/business/portal/visit/',
    // 获取当前身份的组件
    nowIdentityViewComponents: '/auth/identity/component_list',
    // 查推荐位内容管理分页列表
    recommendPage: '/form/front/recommend/page',
    // 通过图文code去换取 图文列表
    getImageTextList: '/business/front/imagetext/list_all_copy',
    // 走马灯 轮播图数据
    carousel: '/search/front/recommend/page',
    //编辑常用功能列表
    commonlyUsed: '/todo/front/normal_function/edit',
    //获取常用功能列表
    commonlyUsedList: '/todo/front/normal_function/list',
    //个人获取常用功能菜单列表
    getUserUsualList: 'auth/user_permission/normal_function_list',
    //机构获取常用功能菜单列表
    getOrgUsualList: '/organization/menu/normal_function_list',
    //获取当前用户轮播状态
    carouselStatus: '/search/front/recommend/get_carousel_status',
    //设置当前用户轮播状态
    setCarouselStatus: '/search/front/recommend/update_carousel_status',
    //获取ip地区
    getIpCity: '/admin/front/ip_address/address_info',
    // 获取题库数据
    getQuestionList: 'question/front/dashboard',
}

export default api
