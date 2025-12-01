import Http from '@/servers/http'
import type { FileUpload, ImportParams, ResultParams } from './interface'

// 上传试题模板
export const fileUpload = (params: FileUpload) => {
    return Http('/auth/resource/file/upload', 'POST', params, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        delayTime: 60000,
    })
}

// 开始批量导入
export const getImportCode = (url: string, params: ImportParams) => {
    return Http(url, 'POST', params)
}

// 获取导入结果
export const getImportResult = (params: ResultParams) => {
    return Http(`/question/front/excel/result`, 'POST', params)
}

export const getImportAuthenticateResult = (importCode?: string) => {
    return Http(`/question/front/authenticate/get_import_status/${importCode}`, 'GET', {})
}
