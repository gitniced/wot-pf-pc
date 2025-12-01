export interface ActivityData {
    code?: string
    sid?: number
    siteName?: string
    coverUrl?: string
    activityName?: string
    activityCatalogCode?: string
    activityCatalogName?: string
    activityForm?: number
    activityFormName?: string
    startTime?: string
    endTime?: string
    address?: string
    activityStatus?: number
    activityStatusName?: string
    cityCode?: string
    cityName?: string
    provinceCode?: string
    provinceName?: string
    longitude?: string
    latitude?: string
    activityIntroduce?: string
    relateProfessionStatus?: number
    professions?: Profession[]
    relateSignStatus?: number
    signBeforeMinute?: number
    signAfterMinute?: number
    locationStatus?: number
    signDistanceRange?: number
    signStartTime?: string
    signEndTime?: string
    signMaxPeople?: number
    signAuditStatus?: number
}

export interface Profession {
    professionCode?: string
    professionName?: string
    salaryDesc?: string
    recruitType?: string
    recruitTypeName?: string
    province?: string
    city?: string
    region?: string
    professionTypeId?: number
    professionTypeName?: number
    organizationCode?: string
    organizationName?: string
}
