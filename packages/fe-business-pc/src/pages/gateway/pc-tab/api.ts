export default {
    /** api */
    addNav: '/business/navigation/save_pc',
    editNav: '/business/navigation/edit_pc',
    deleteNav: '/business/navigation/delete_pc',
    getNav: '/business/navigation/list_pc',
    upDataGateway: '/business/portal/update',
    getGateway: '/business/portal/info_by_org_code',
    getPage: '/business/micropage/summary',

    /**  获取悬浮窗列表  */
    getSuspendedWindowList: '/business/suspension/list',
    /**  创建悬浮窗  */
    createSuspendedWindow: '/business/suspension/create',
    /**  修改悬浮窗  */
    editSuspendedWindow: '/business/suspension/edit',
    /**  删除悬浮窗  */
    deleteSuspendedWindow: '/business/suspension/delete',
    /**   修改悬浮窗排序  */
    updateSuspendedWindowSort: '/business/suspension/change_sort',
    /** 查询页脚配置   */
    findFooterConfig: '/business/footer/get',
    /**  更新页脚配置  */
    updateFooterConfig: '/business/footer/update',
    // 页脚链接判重
    checkFooterLink: '/business/footer/checkFooterLink',
}
