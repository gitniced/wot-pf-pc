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

    // 根据工种分类的id批量获取
    getBatchLessonByJobClass: '/career_main/course/batch_course_detail',
    //获取评价计划分页
    getPlanData: '/exam_main/plan/componentPlanList',
    //获取计划类型枚举
    getPlanTypeCategory: '/exam_main/category/getPlanTypeCategory',
    //根据id批量查询评价计划
    getPlanDetailByIds: '/exam_main/plan/componentPlans',
    // 获取计划分类分页
    getPlayTypeListData: '/exam_main/plan/componentPlanTypePlan',

    // 获取组件列表
    getComponentList: '/business/jumpurl/list',

    /**  获取练习分页列表  */
    getBrushList: '/question/front/practice/page',
    getEnrollData: '/apply/front/activity/page',
}

export default api
