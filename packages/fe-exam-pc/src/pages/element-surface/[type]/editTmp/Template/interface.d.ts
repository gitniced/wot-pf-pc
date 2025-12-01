export type recordType = {
    category_id?: string
    children?: recordType[]
    create_time?: string
    delete_status?: string | number
    id?: string | number
    important?: string | number
    is_last?: string | number
    level?: string | number
    name?: string | number
    pid?: string | number
    rate?: string | number
    sort?: string | number
    update_time?: string | number
    length?: number
    code?: string
    codeMark?: string
    point: recordType[]
    info?: { name: string, children: any[] }[]
    noPoint?: boolean
}
