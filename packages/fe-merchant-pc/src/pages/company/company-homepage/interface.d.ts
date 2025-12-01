import type { FC } from "react"

export enum COMPANY_INFO_ITEM {
    /** 公司基本信息 */
    BASIC_INFO = 'baseInfo',
    /** 公司福利信息 */
    WELFARE_INFO = 'welfareInfo',
    /** 公司介绍信息 */
    INTRODUCTION_INFO = 'introductionInfo',
    /** 主营业务信息 */
    MAIN_BUSINESS_INFO = 'mainBusinessInfo',
    /** 公司相册信息 */
    PHOTO_INFO = 'photoInfo',
    /** 人才发展信息 */
    TALENT_DEVELOPMENT_INFO = 'talentDevelopmentInfo',
    /** 产品介绍信息 */
    PRODUCT_INTRODUCTION_INFO = 'productIntroductionInfo',
    /** 高管介绍信息 */
    EXECUTIVE_INTRODUCTION_INFO = 'executiveIntroductionInfo',
    /** 工商信息 */
    BUSINESS_INTRODUCTION_INFO = 'businessIntroductionInfo'
}

export interface CompanyInfoList {
    tab: COMPANY_INFO_ITEM
    name: string
    render: FC<FormComponentProps>
}

export interface FormComponentProps {
    onRef: any,
    setBtnLoading: (e: boolean) => void,
    getRate: () => void
}

interface Scale {
    key: string | number
    name: string
}