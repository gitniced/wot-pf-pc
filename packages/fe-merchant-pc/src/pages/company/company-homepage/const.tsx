import type { CompanyInfoList } from "./interface.d"
import { COMPANY_INFO_ITEM } from './interface.d'

import BasicInfo from './formList/BasicInfo'
import WelfareInfo from "./formList/WelfareInfo"
import IntroductionInfo from "./formList/IntroductionInfo"
import MainBusinessInfo from "./formList/MainBusinessInfo"
import PhotoInfo from "./formList/PhotoInfo"
import TalentDevelopmentInfo from "./formList/TalentDevelopmentInfo"
import ProductIntroductionInfo from "./formList/ProductIntroductionInfo"
import ExecutiveIntroductionInfo from "./formList/ExecutiveIntroductionInfo"
import BusinessIntroductionInfo from "./formList/BusinessIntroductionInfo"

/** 公司信息列表 */
export const companyInfoList: CompanyInfoList[] = [
    {
        tab: COMPANY_INFO_ITEM.BASIC_INFO,
        name: '公司基本信息',
        render: BasicInfo
    },
    {
        tab: COMPANY_INFO_ITEM.WELFARE_INFO,
        name: '公司福利',
        render: WelfareInfo
    },
    {
        tab: COMPANY_INFO_ITEM.INTRODUCTION_INFO,
        name: '公司介绍',
        render: IntroductionInfo
    },
    {
        tab: COMPANY_INFO_ITEM.MAIN_BUSINESS_INFO,
        name: '主营业务',
        render: MainBusinessInfo
    },
    {
        tab: COMPANY_INFO_ITEM.PHOTO_INFO,
        name: '公司相册',
        render: PhotoInfo
    },
    {
        tab: COMPANY_INFO_ITEM.TALENT_DEVELOPMENT_INFO,
        name: '人才发展',
        render: TalentDevelopmentInfo
    },
    {
        tab: COMPANY_INFO_ITEM.PRODUCT_INTRODUCTION_INFO,
        name: '产品介绍',
        render: ProductIntroductionInfo
    },
    {
        tab: COMPANY_INFO_ITEM.EXECUTIVE_INTRODUCTION_INFO,
        name: '高管介绍',
        render: ExecutiveIntroductionInfo
    },
    {
        tab: COMPANY_INFO_ITEM.BUSINESS_INTRODUCTION_INFO,
        name: '工商信息',
        render: BusinessIntroductionInfo
    },
]