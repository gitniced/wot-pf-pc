import { CURRENT_LOGIN_URL_TYPE_ENUM } from "@/types"
import { MERCHANT_LOGIN_TYPE } from "@wotu/wotu-components/dist/esm/Types"

export const BASE_URL = 'https://static.zpimg.cn/public/fe_user_pc/images'


// 院校登录的中间部分的文案
export const SCHOOL_INTRODUCTION_NOTE_LIST = [
    {
        key: '1',
        title: "个性化职业发展路径",
        text: "辅助学生认知自我，个性化定制未来职业发展路径"
    }, {
        key: '2',
        title: "专业化就业指导",
        text: "多领域优质名师一对一辅导，就业不迷茫，找工作更容易"
    },
    {
        key: '3',
        title: "海量职位精准匹配",
        text: "各领域企业倾情加入，海量职位精准匹配"
    },
    {
        key: '4',
        title: "全路径掌握学生就业动向",
        text: "就业全路径服务，掌握学生就业动向，动态调整生涯课程教学内容"
    }, {
        key: '5',
        title: "全方位防护数据安全",
        text: "国密算法、ISO 27001:2013信息安全管理体系标准认证、公安部信息系统三级等级保护认证"
    },
]
// 企业登录的中间部分的文案
export const COMPANY_INTRODUCTION_NOTE_LIST = [
    {
        key: '1',
        title: "集合多渠道人才，扩大职位发布覆盖范围",
        text: "平台聚合院校大学生、培训机构学员等需要就业的人群，企业可一键发布职位信息，并依托平台互联互通的能力，使得职位信息可同时供不同人群进行查看。",
        img: `${BASE_URL}/company_banner1_blue.png`

    }, {
        key: '2',
        title: "精准人岗匹配，提高企业招聘效率",
        text: "基于毕业生求职意愿、求职期望、就业大数据等信息，依托平台完整畅通的工作链和大数据智能算法，精准标签化拆分简历内容，使毕业生和职位信息更加精准、高效匹配。",
        img: `${BASE_URL}/company_banner2_blue.png`
    },
    {
        key: '3',
        title: "个性化企业主页展示，提高企业形象",
        text: "企业可通过自主配置企业主页内容，并对外展示，更加丰富、直观的呈现企业文化、办公环境等，进一步提升企业形象。",
        img: `${BASE_URL}/company_banner3_blue.png`
    },

]


const renderRecommendImgList = (type: MERCHANT_LOGIN_TYPE | CURRENT_LOGIN_URL_TYPE_ENUM) => {
    // 图片已经按排列顺序上传至oss
    let recommendImgBaseUrl = BASE_URL + (type === MERCHANT_LOGIN_TYPE.COMPANY ? '/company_recommend' : '/school_recommend')
    let recommendImgList = []
    // 总共有8张图
    for (let i = 1; i < 9; i++) {
        recommendImgList.push({
            key: i,
            img: `${recommendImgBaseUrl}${i}.jpg`,
        })
    }

    return recommendImgList
}

export const RECOMMEND_DATA = {
    [CURRENT_LOGIN_URL_TYPE_ENUM.SCHOOL]: {
        title: '优质企业',
        content: renderRecommendImgList(MERCHANT_LOGIN_TYPE.COMPANY)
    },
    [MERCHANT_LOGIN_TYPE.COMPANY]: {
        title: '甄选高校',
        content: renderRecommendImgList(CURRENT_LOGIN_URL_TYPE_ENUM.SCHOOL)
    }
}