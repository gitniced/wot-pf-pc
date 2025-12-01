import { getCookie } from '@/storage'
import { Typography } from 'antd'
import type { ReactNode } from 'react'

// 导入模板说明
export const TEMPLATE_DESCRIPTION: Record<string, ReactNode> = {
    default: (
        <>
            <Typography>Excel导入要素细目表（系统标准模板）：</Typography>
            <Typography>1.请按照模板文件内的相关说明，进行内容填写；</Typography>
            <Typography>
                2.将填写好的导入文件上传，系统会校验导入内容是否符合规定的数据格式。校验通过，会入库保存。如未通过，则会反馈提示。
            </Typography>
        </>
    ),
    authenticates: (
        <>
            <Typography>Excel导入要素细目表（鉴定中心指定模板）：</Typography>
            <Typography>1.请按照模板文件内的相关说明，进行内容填写；</Typography>
            <Typography>
                2.将填写好的导入文件上传，系统会校验导入内容是否符合规定的数据格式。校验通过，会入库保存。如未通过，则会反馈提示。
            </Typography>
        </>
    ),
}

export const TEMPLATE_TITLE: Record<string, string> = {
    default: '批量导入（系统标准模板）',
    authenticates: '批量导入（鉴定中心指定模板）',
}

export const IMPORT_TEMPLATE: Record<string, string> = {
    default:
        'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-exam-pc/import_template/202508/%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86%E7%BB%86%E7%9B%AE%E8%A1%A8%E5%AF%BC%E5%85%A5%EF%BC%88%E7%B3%BB%E7%BB%9F%E6%A0%87%E5%87%86%E6%A8%A1%E6%9D%BF%EF%BC%89.xlsx',
    authenticates:
        getCookie('ALIAS') === 'esh'
            ? 'https://static.zpimg.cn/public/fe-exam-pc/import_template/sh/%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86%E7%BB%86%E7%9B%AE%E8%A1%A8%E5%AF%BC%E5%85%A5%EF%BC%88%E9%89%B4%E5%AE%9A%E4%B8%AD%E5%BF%83%E6%8C%87%E5%AE%9A%E6%A8%A1%E6%9D%BF%EF%BC%89.xlsx'
            : 'https://static.zpimg.cn/public/fe-exam-pc/import_template/%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86%E7%BB%86%E7%9B%AE%E8%A1%A8%E5%AF%BC%E5%85%A5%EF%BC%88%E9%89%B4%E5%AE%9A%E4%B8%AD%E5%BF%83%E6%8C%87%E5%AE%9A%E6%A8%A1%E6%9D%BF%EF%BC%89.xlsx',
}
