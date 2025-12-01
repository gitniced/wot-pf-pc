export const templates = [
    {
        id: 1,
        url: 'https://static.zpimg.cn/public/business_pc/muban1.png',
    },
    {
        id: 2,
        url: 'https://static.zpimg.cn/public/business_pc/muban2.png',
    },
    {
        id: 3,
        url: 'https://static.zpimg.cn/public/business_pc/muban3.png',
    },
    {
        id: 4,
        url: 'https://static.zpimg.cn/public/business_pc/muban4.png',
    },
]

export enum TEMPLATE_ENUM {
    /**  模板1  */
    ONE = 1,
    /**  模板2 */
    TWO = 2,
    /**  模板3  */
    THREE = 3,
    /**  模板4  */
    FOUR = 4,
}
export const DEFAULT_TYPE = ['mobile', 'weChat', 'weibo']
export const mobileObj = {
    disableState: 0,
    link: '',
    marketingType: 'mobile',
    title: '移动端',
    sort: 1,
}
export const weChatObj = {
    disableState: 0,
    link: '',
    marketingType: 'weChat',
    title: '微信公众号',
    sort: 2,
}
export const weiboObj = {
    disableState: 0,
    link: '',
    marketingType: 'weibo',
    title: '官方微博',
    sort: 3,
}
