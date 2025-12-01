import type { QuickEntryItem } from '../../../interface'

export const quickEntryItems: QuickEntryItem[] = [
    {
        name: '个人登录',
        key: 'loginUrl',
        info: '个人登录完成简历投递，面试沟通',
        link: '/user/login',
        image: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/dev/fe_job_pc/img/ic_%E4%B8%AA%E4%BA%BA%E7%99%BB%E5%BD%95_%E8%93%9D%402x.png',
    },
    {
        name: '院校管理后台',
        info: '学校辅导员进入后台查看学生就业情况',
        link: '/user/school/login',
        key: 'loginUrl',
        image: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/dev/fe_job_pc/img/ic_%E4%BC%81%E4%B8%9A%E7%99%BB%E5%BD%95_%E8%93%9D%402x.png',
    },
    {
        name: '企业登录',
        info: '用人单位进入后台进行职位发布、沟通等操作',
        link: '/seller/login?sourceType=company',
        key: 'merchantUserDomain',
        image: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/dev/fe_job_pc/img/ic_%E9%99%A2%E6%A0%A1%E7%99%BB%E5%BD%95_%E8%93%9D%402x.png',
    },
]
