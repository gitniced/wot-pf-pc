const api = {
    // 新建微页面 草稿
    micropageInsert: '/business/micropage/saveOrUpdateDraft',
    // 新建微页面 发布
    micropagePublish: '/business/micropage/publish',
    // 修改微页面
    updataMicro: '/business/micropage/update',

    // micropageDetail: '/business/micropage/summary/',
    micropageDetail: '/business/micropage/summary_of_admin',
    // 获取图文管理分页
    getGraphicData: '/business/front/imagetext/page',
    // 获取评价计划分页
    getPlanData: '/exam_main/plan/componentPlanList',
    // 获取计划分类分页
    getPlayTypeListData: '/exam_main/plan/componentPlanTypePlan',
}

export default api
