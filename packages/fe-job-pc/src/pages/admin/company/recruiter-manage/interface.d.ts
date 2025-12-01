import type { ModalProps } from 'antd'

export interface RecruiterItemProps {
    code: string
    companyCode: string // 招聘单位统一信用代码
    companyName: string // 招聘单位
    companyType: number // 招聘单位性质
    companyTypeName: string // 招聘单位性质名称
    provinceCode: string // 省份code
    cityCode: string // 城市code
    regionCode: string // 区域code
    province: string // 省份
    city: string // 省市
    region: string // 区域
    industryId: number // 行业ID
    parentIndustryId: number // 父级行业ID
    industryName: string // 行业名称
    parentIndustryName: string // 父级行业名称
}

export interface CreateRecruiterParams {
    companyName: string
    companyCode: string
    companyType: number
    provinceCode: string
    cityCode: string
    regionCode: string
    industryId: number
    organizationCode?: string
}

export type EditRecruiterParams = CreateRecruiterParams & { code?: string }

export interface RecruiterDetails {
    code: string
    organizationCode: string
    companyName: string
    companyCode: string
    companyType: number
    provinceCode: string
    cityCode: string
    regionCode: string
    parentIndustryId: number
    industryId: number
}
export interface CreateModalProps extends Omit<ModalProps, 'onCancel'> {
    code?: string
    onCancel: () => void
    onCreate?: (params: CreateRecruiterParams) => Promise<void>
    onEdit?: (params: EditRecruiterParams) => Promise<void>
}
