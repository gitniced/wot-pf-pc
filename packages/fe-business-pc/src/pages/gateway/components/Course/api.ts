import Http from '@/servers/http'

//获取课程列表
export const getCourseListApi = (params: any) => {
    return Http(`/career_main/course/organization_course_list`, 'post', params)
    // return Http('/search/front/login/auth_list/2', 'post', params)
}

//获取课程列表
export const getGroupListApi = (params: any) => {
    return Http(`/career_main/course/organization_course_group_list`, 'post', params)
}

//获取默认课程列表
export const getDefaultCourseListApi = (params: any) => {
    return Http(`/career_main/course/batch_detail_by_organization`, 'post', params, {
        repeatFilter: false,
    })
}
