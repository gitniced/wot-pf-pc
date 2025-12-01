import { RESOURCE_FORMAT } from '@/modules/resource/const'
import type { MenuProps } from 'antd'

export const resourceCreateMenuItems: MenuProps['items'] = [
    {
        key: '1',
        type: 'group' as const,
        label: '在线文档',
        children: [
            {
                key: RESOURCE_FORMAT.word,
                label: '文档',
            },
            {
                key: RESOURCE_FORMAT.excel,
                label: '表格',
            },
            {
                key: RESOURCE_FORMAT.mind,
                label: '脑图',
            },
        ],
    },
    {
        key: '2',
        type: 'group' as const,
        label: '其他',
        children: [
            {
                key: RESOURCE_FORMAT.drawing,
                label: '图纸',
            },
            {
                key: RESOURCE_FORMAT.attachment,
                label: '附件',
            },
            {
                key: RESOURCE_FORMAT.demand,
                label: '点播课',
            },
        ],
    },
]
