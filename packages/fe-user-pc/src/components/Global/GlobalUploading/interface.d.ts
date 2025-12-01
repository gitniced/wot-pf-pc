import type { UploadProps } from 'antd'
import type React from 'react'
import type { ReactNode } from 'react'

export interface FileProps {
    onChange?: (file: any) => void
    beforeFile?: (file: File | string, filelist: { current: any[] }) => void
    onDddFeil?: (file: any) => void
    onRemoveFeil?: () => void
    value?: any[]
    // 子组件
    children?: ReactNode
    // 限制数量
    amount?: number
    // 限制大小 单位 M
    size?: number
    // 限制上传类型
    accept?:
        | 'zip'
        | 'excel'
        | 'pdf'
        | 'image'
        | 'word'
        | 'csv'
        | 'svg'
        | 'normal'
        | 'normalAndSvg'
        | Partial<'zip' | 'excel' | 'pdf' | 'image' | 'word' | 'csv'>[]
    // 是否开启拖拽  目前暂时不支持
    drag?: boolean
    // upload样式
    className?: string
    // 同upload参数
    otherProps?: UploadProps
    // 多个占位符 暂时不支持多个占位符多个上传 如有需要可以自信开发
    mode?: 'many'
    // 多个占位符的时候的数量
    manyCount?: number
    // 多个占位符的时候的配置
    manyConfig?: {
        desc: string
        key: React.Key
    }[]
    // 样式类型
    cardStyles?: 'card'
    // 	业务类型 1导入机构成员 2用户头像 3合同附件 4客户附件 5站点图片 6机构认证图片 7 二要素认证图片 8商品图片 9机构头像 10推荐位上传 11财务凭证 ,12菜单icon
    type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}
