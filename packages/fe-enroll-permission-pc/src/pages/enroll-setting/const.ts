export enum TYPE_ENUM {
    TO_EXAMINE = 1, //报名审核
    PAY = 2, // 报名缴费
}

export enum PUBLISH_STATUS_ENUM {
    /**  发布状态，0未发布、1已发布  */
    DRAFT = 0,

    /**  发布状态，0未发布、1已发布  */
    RELEASE = 1,
}

//	活动状态，1未开始、2报名中、3已结束
export enum ACTIVITY_STATUS_ENUM {
    /**  1未开始  */
    DRAFT = 1,
    /**  2报名中  */
    RELEASE = 2,
    /**  3已结束  */
    END = 3,
}

//业务线枚举 1平台 2职培 3考评 4创培
export enum BUSINESS_LINE_ENUM {
    /**  1平台  */
    PLATFORM = 1,
    /**  2职培  */
    VOCATIONAL = 2,
    /**  3考评  */
    EVALUATE = 3,
    /**  4创培  */
    CREATION = 4,
}

export const items = [
    {
        label: `报名设置`,
        key: 'basicInformation',
    },
    {
        label: '报名表单',
        key: 'enrollFormSetting',
    },
    {
        label: '报名详情页',
        key: 'enrollDetails',
    },
]

export const ENROLL_START_TIME_MAP: Record<string, string> = {
    2: '认定考试开始时间',
    3: '培训开始时间',
    4: '培训开始时间',
    6: '技能竞赛开始时间',
    8: '活动开始时间',
    9: '报名开始时间',
}
export const ENROLL_END_TIME_MAP: Record<string, string> = {
    2: '认定考试结束时间',
    3: '培训结束时间',
    4: '培训结束时间',
    6: '技能竞赛结束时间',
    8: '活动结束时间',
    9: '报名结束时间',
}

export enum SOURCE_MAP {
    /**  考评  */
    EVALUATE = 1,
    /**  2职培  */
    VOCATIONAL = 2,
}

// 封面图片
export const imgList = [
    {
        value: 'https://static.zpimg.cn/public/fe_saas_pc/image/bg1%402x_f20d83b8.png',
        label: 'https://static.zpimg.cn/public/fe_saas_pc/image/png_xiaotu1%402x_210a7ffa.png',
        color: '#fff',
    },
    {
        value: 'https://static.zpimg.cn/public/fe_saas_pc/image/bg2%402x_3f9f64c3.png',
        label: 'https://static.zpimg.cn/public/fe_saas_pc/image/png_xiaotu2%402x_e836e700.png',
        color: 'rgba(0,0,0,0.85)',
    },
    {
        value: 'https://static.zpimg.cn/public/fe_saas_pc/image/bg3%402x_d2a89467.png',
        label: 'https://static.zpimg.cn/public/fe_saas_pc/image/png_xiaotu3%402x_dbeaccaf.png',
        color: 'rgba(0,0,0,0.85)',
    },
    {
        value: 'https://static.zpimg.cn/public/fe_saas_pc/image/bg4%402x_f0d03aab.png',
        label: 'https://static.zpimg.cn/public/fe_saas_pc/image/png_xiaotu4%402x_495bd6d5.png',
        color: '#fff',
    },
]
