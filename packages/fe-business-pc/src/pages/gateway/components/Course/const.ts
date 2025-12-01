import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { CourseListItem, GroupListItem } from './interface'

// 最多选择10个课程
export const MAX_COUNT = 50
// 按课程选择课程的modal的columns
export const COURSE_COLUMNS: ColumnsTypeItem<CourseListItem>[] = [
    {
        title: '课程名称',
        dataIndex: 'title',
        key: 'title',
        search: true,
    },
    {
        title: '课时',
        dataIndex: 'totalPeriod',
    },
    {
        title: '价格',
        dataIndex: 'price',
    },
]

// 最多选择15个分组
export const MAX_GROUP_COUNT = 15

// 按课程选择课程的modal的columns
export const GROUP_COLUMNS: ColumnsTypeItem<GroupListItem>[] = [
    {
        title: '分组名称',
        dataIndex: 'name',
        key: 'name',
        search: true,
    },
]
