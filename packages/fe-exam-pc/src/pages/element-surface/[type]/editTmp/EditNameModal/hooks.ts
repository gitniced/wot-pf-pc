import { editAuthenticateNameApi, getExamProgramApi } from './api'

export default () => {
    // 修改要素细目表名称
    const editAuthenticateName = (data: any) => {
        // 请求接口
        return editAuthenticateNameApi(data)
    }


    // 获取评价方案
    const getExamPrograms = (params: any) => {
        // 请求接口
        return getExamProgramApi(params)
    }

    return {
        editAuthenticateName,
        getExamPrograms
    }
}
