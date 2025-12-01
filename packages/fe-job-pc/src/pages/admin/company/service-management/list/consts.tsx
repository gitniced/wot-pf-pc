import { Typography } from 'antd'
import type { ReactNode } from 'react'

export const IMPORT_DESCRIPTION: Record<string, ReactNode> = {
    image: (
        <>
            <Typography>1、此功能将批量导入/更新就业服务人员的电子照片</Typography>
            <Typography>2、请选择就业服务人员本人近照，格式支持.jpg/.jpeg/.png；</Typography>
            <Typography>
                3、需要导入的照片，请以【姓名_证件号码】或【证件号码】命名。（例：张三_000000000000000000.jpg或000000000000000000.jpeg）
            </Typography>
            <Typography>
                4、请将全部图片直接打包生成zip压缩包（不含文件夹），再选择上传。
            </Typography>
        </>
    ),
    excel: (
        <>
            <Typography>1. 请按照模板文件内的相关说明，进行内容填写。</Typography>
            <Typography>
                2.
                将填写好的导入文件上传，系统会校验导入内容是否符合规定的数据格式。校验通过，会入库保存。如未通过，则会反馈提示
            </Typography>
            <Typography>3. 请勿对模版已有内容做改动，否则可能无法导入。</Typography>
        </>
    ),
}

export const IMPORT_TEMPLATE: Record<string, string> = {
    excel: 'https://i.zpimg.cn/public_read/contract_attachment/174905228lsvf5ds.xlsx', // 就业服务人员名单
}

export const IMPORT_API: Record<string, string> = {
    image: '/job/organization/assistance/service_staff/import_photo', // 电子照片
    excel: '/job/organization/assistance/service_staff/import', // 就业服务人员名单
}
