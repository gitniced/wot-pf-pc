import Http from '@/servers/http'
import type { FileUpload, ImportParams } from './interface'

// 上传试题模板
export const fileUpload = (params: FileUpload) => {
    return Http('/auth/resource/file/upload', 'post', params, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        delayTime: 60000,
    })
}

// 开始批量导入
export const getImportCode = (params: ImportParams) => {
    return Http('/apply/front/batch/import', 'post', params)
}

// 获取导入结果
export const getImportResult = (importCode: string) => {
    return Http(`/apply/front/batch/import_status`, 'POST', { importCode })
}

// 获取导入模板
export const getExportTemplate = (activityCode: string) => {
    return Http(`/apply/front/batch/export_template/${activityCode}`, 'GET', {})
}
