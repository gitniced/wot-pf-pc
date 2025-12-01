import Http from '@/servers/http'

// 获取要素细目表详情
export const getAuthenticasDetailApi = (code: string) => {
    return Http(`/question/front/authenticate/detail/${code}`, 'GET', {})
}

export const batchImportApi = '/question/front/authenticate/import_range_point'
export const importsGetRate = '/imports/get-rate' // 学员导入获取导入进度

export const importsUpdateStatus = '/imports/update-status' // 再次导入调用接口
export const errorExport = '/questions/error-export' // 错误列表导出
