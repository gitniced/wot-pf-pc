export enum SERVICE_INIT {
    CompetentAuthority = 1,
    Organization,
}
export const ServiceUnitOptions = [
    { label: '主管部门', value: 1 },
    { label: '机构', value: 2 },
]

export const StatusOptions = [
    { label: '全部', value: null },
    { label: '已就业', value: 1 },
    { label: '持续求职中', value: 2 },
    { label: '暂无求职意向', value: 3 },
    { label: '其他', value: 4 },
]

export const JobStateOptions = [
    { label: '全部', value: null },
    { label: '已就业', value: 1 },
    { label: '持续求职中', value: 2 },
    { label: '暂无求职意向', value: 3 },
    { label: '其他', value: 4 },
]