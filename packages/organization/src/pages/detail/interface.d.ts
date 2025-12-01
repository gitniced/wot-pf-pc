import type { ORG_CERTIFY_STATUS_TYPE } from '@wotu/wotu-components/dist/esm/Types'

interface QueryType {
    code: React.Key
}

interface industryListType {
    code: string
    id: number
    name: string
    parentCode: string
}

type DetailType = {
    certifyStatus?: ORG_CERTIFY_STATUS_TYPE
    area: number
    city: number
    province: number
    cityName?: string
    code?: React.Key
    companyCode?: string
    createdAt?: number
    createdBy?: string
    creditImage?: string
    deleted?: number
    dissolveStatus?: number
    industry?: number[]
    industryId?: number
    logo?: string
    name?: string
    provinceName?: string
    scale?: string | number
    sid?: number
    siteName?: string
    staffCount?: number
    status?: number
    updatedAt?: number
    updatedBy?: string
    userCode?: string
    userName?: string
    address?: number[]
    industryList: industryListType[]
    certifyCompanyType: number
    certifyDocumentType: number
}

type FormValuesType = {
    address?: string
    addressList?: string | number[]
    industry?: number[] | industryListType[]
    industryId?: number
    code?: string
    logo?: string
    name?: string
    scale?: string | number
    certifyStatus?: ORG_CERTIFY_STATUS_TYPE
    province?: number
    city?: number
    area?: number
    certifyCompanyType: number
    certifyDocumentType: number
    creditImage?: string
    companyCode?: string
}

interface UploadImage {
    uid: string
    name: string
    status: string
    url: string
    thumbUrl: string
}

export { QueryType, FormValuesType, DetailType, UploadImage }
