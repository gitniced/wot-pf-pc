export interface DataCardItem {
    accessUrl: string
    aliasCode: string
    code: string
    componentType: number
    relationUrl: string
    sid: number
    source: number
    targetCode: string
    targetType: number
}

export type RequestMapItem = Record<
    string,
    { aliasCode: string; redirectUrl: string; name: string }[]
>
