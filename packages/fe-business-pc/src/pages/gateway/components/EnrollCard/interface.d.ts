import type { ModalProps } from 'antd'
import type { LAYOUT_ENUM } from '@/pages/gateway/web/create/components/ActionBar/Course/const'

export interface CourseListModalProps extends Omit<ModalProps, 'onCancel' | 'onOk'> {
    type?: 'checkbox' | 'radio'
    selectedCourses?: CourseListItem[]
    onOk: (planList: CourseListItem[]) => void // 所选择的课程codes
    onCancel: () => void
    // 表格中是否有课程搜索
    hasCourseSearch?: false
}

export interface CourseListItem {
    id?: string
    title?: string
    image?: string
    price?: string
    totalPeriod?: number
}

export interface CourseCardProps {
    data: CourseListItem
    allowDelete?: boolean // 是否允许删除
    onDelete?: () => void
    layoutStyle?: LAYOUT_ENUM
}
