import Http from '@/servers/http'

// 分页查询求职意向列表
export const getJobExpectListApi = (params: { pageNo: number; pageSize: number }) => {
    return Http('/job/front/job_expect/list', 'POST', params)
}
