export enum TABS_ENUM {
    /**  导航设置  */
    NAV = '1',
    /**  页脚设置  */
    FOOTER = '2',
    /**  悬浮窗设置  */
    SUS = '3',
}

/**  名称显示 1 显示 2隐藏  */
export enum NAME_SHOW {
    /**  显示  */
    SHOW = 1,
    /**   2隐藏   */
    HIDE = 2,
}

/**  交互类型 1 悬浮出现图片 2 悬浮出现文案 3 点击跳转链接  */
export enum INTERACTION_TYPE {
    /**  悬浮出现图片  */
    IMAGE = 1,
    /**  悬浮出现文案  */
    TEXT = 2,
    /**  点击跳转链接  */
    LINK = 3,
}

// 页头页脚链接类型
export enum FOOTER_LINK_TYPE {
    // 1友情链接
    FRIEND_LINK = 1,
    // 2营销链接
    MARKET_LINK = 2,
    // 3导航链接
    NAV_LINK = 3,
}
