import type { TabsProps } from 'antd'

/**  活动状态，0:未发布，1:未开始，2:进行中，3:已结束  */
export enum ACTIVITY_STATUS_ENUM {
    UNPUBLISHED = 0,
    UNSTARTED = 1,
    PROCESSING = 2,
    ENDED = 3,
}

export const tabsItems: TabsProps['items'] = [
    {
        key: 'all',
        label: '全部',
    },
    {
        key: '0',
        label: '未发布',
    },
    {
        key: '1',
        label: '未开始',
    },
    {
        key: '2',
        label: '进行中',
    },
    {
        key: '3',
        label: '已结束',
    },
]

/**
 * province 省
 * city     市
 * region   区
 */
export const renderLocation = ({
    province,
    city,
    region,
}: {
    province: string
    city: string
    region: string
}) => {
    if (!province && !city && !region) {
        return '-'
    }

    return [province, city, region].filter(Boolean).join('/')
}
