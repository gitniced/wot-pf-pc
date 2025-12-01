export default {
    frontSubmit: '/apply/front/record/submit_record',
    userinfo: '/auth/user/v1/info/all',
    //根据报名项目code查询报名项目  用户端-报名活动详情页（计划类型）
    itemInfo: '/apply/front/activity/detail_user',
    //根据报名项目code查询报名项目
    // 获取机构信息
    orgInfo: '/organization/organization/organization_detail',

    //用户端-支付（创建订单）
    // createOrder: '/apply/front/record/pay_apply',
    createOrder: '/apply/front/record/pay_apply_back_order',

    /**  获取门户信息  */
    getGatewayInfo: '/business/portal/one',
    /**  导航数据  */
    getNavList: '/business/navigation/list_pc',
}
