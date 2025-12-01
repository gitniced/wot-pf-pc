import http from '@/servers/http'

export default {
    questionPage: '/question/front/page',
    downloadTemplate: '/question/front/excel/template',
    excelImport: '/auth/import/import',
    excelResult: '/auth/batch_operate/detail',
    deleteTableItem: '/question/front/delete',
    batchDelete: '/question/front/batch/delete',
    getSiteDetails: '/auth/backend/site/detail',
}

// 更新题目开启状态
export const updateStatusApi = (code: string) => {
    return http('/question/front/update_enable_status', 'POST', { code })
}
