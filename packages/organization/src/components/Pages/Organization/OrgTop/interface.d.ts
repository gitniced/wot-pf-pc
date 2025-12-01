import type { ORG_CERTIFY_STATUS_TYPE } from '@wotu/wotu-components/dist/esm/Types'

interface PropsType {
    organizationDetail: OrganizationDetailType
}

interface industryListType {
    code: string
    id: number
    name: string
    parentCode: string
}

interface OrganizationDetailType {
    name: string
    industry: string
    provinceName: string
    cityName: string
    areaName: string
    createdAt: string
    code: string
    certifyStatus: ORG_CERTIFY_STATUS_TYPE
    logo?: string
    industryList?: industryListType[]
}
interface stateType {
    code: string
    name: string
}

export { PropsType, OrganizationDetailType, stateType }
