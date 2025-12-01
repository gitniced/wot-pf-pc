import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import styles from './index.module.less'
import CourseListModal from '@/pages/gateway/components/Course/courseListModal'
import type { CourseListItem } from './interface'
import MoveContainer from '../MoveContainer'
import { cloneDeep, isEqual } from 'lodash'
import { MAX_COUNT } from './const'
import { PTCourseView } from '@wotu/pt-components'
import { MOBILE_LAYOUT_ENUM } from '../../web/create/components/ActionBar/Course/const'

export default function AddByLesson({
    value = [],
    onChange,
}: {
    value?: CourseListItem[]
    onChange?: (value: CourseListItem[]) => void
}) {
    const [courseModalOpen, setCourseModalOpen] = useState(false)
    const [selectedCourses, setSelectedCourses] = useState<CourseListItem[]>([])

    useEffect(() => {
        if (Array.isArray(value) && !isEqual(selectedCourses, value)) {
            setSelectedCourses(value)
        }
    }, [value])

    const onAddBtnChange = () => {
        if (!courseModalOpen) {
            setCourseModalOpen(true)
        }
    }

    // 更新选中的课程
    const updateCourseList = (courseList: CourseListItem[]) => {
        setSelectedCourses(courseList)
        onChange?.(courseList)
    }

    // 确认选择内容
    const handleSelectCourseDone = (courseList: CourseListItem[]) => {
        updateCourseList(courseList)
        setCourseModalOpen(false)
    }

    // 内容排序
    const handleSortItem = (from: number, to: number) => {
        const content = cloneDeep(selectedCourses || [])
        const [removed] = content.splice(from, 1)
        content.splice(to, 0, removed)
        updateCourseList(content)
    }

    // 删除内容
    const handleDeleteItem = (content: CourseListItem) => {
        const contentList = cloneDeep(selectedCourses || [])
        const _contentList = contentList?.filter?.(item => item.id !== content.id)
        updateCourseList(_contentList)
    }

    return (
        <div className={styles.by_lesson}>
            <div className={styles.add_card_wap}>
                <MoveContainer datasource={selectedCourses ?? []} onDragEnd={handleSortItem}>
                    {item => (
                        <PTCourseView
                            type="mobile"
                            {...item}
                            allowDelete={true}
                            onDelete={() => handleDeleteItem(item)}
                            layoutStyle={MOBILE_LAYOUT_ENUM.VIEW}
                        />
                    )}
                </MoveContainer>
                <Button
                    disabled={selectedCourses.length >= MAX_COUNT}
                    type={'dashed'}
                    className={styles.add_button}
                    onClick={onAddBtnChange}
                >
                    <PlusOutlined className={styles.add_icon} />
                    添加课程
                </Button>
            </div>
            <CourseListModal
                // hasCourseSearch={false}
                open={courseModalOpen}
                onCancel={() => setCourseModalOpen(false)}
                onOk={handleSelectCourseDone}
                selectedCourses={selectedCourses}
            />
        </div>
    )
}
