import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import styles from './index.module.less'
import type { GroupListItem } from './interface'
import MoveContainer from '../MoveContainer'
import { cloneDeep, isEqual } from 'lodash'
import { MAX_COUNT } from './const'
import GroupCourseModal from './GroupCourseModal'
import GroupItem from './GroupItem'

const LessonGroup = ({
    value = [],
    onChange,
}: {
    value?: GroupListItem[]
    onChange?: (value: GroupListItem[]) => void
}) => {
    const [courseModalOpen, setGroupModalOpen] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState<GroupListItem[]>([])

    useEffect(() => {
        if (Array.isArray(value) && !isEqual(selectedGroup, value)) {
            setSelectedGroup(value)
        }
    }, [value])

    const onAddBtnChange = () => {
        if (!courseModalOpen) {
            setGroupModalOpen(true)
        }
    }

    // 更新选中的课程
    const updateGroupList = (courseList: GroupListItem[]) => {
        setSelectedGroup(courseList)
        onChange?.(courseList)
    }

    // 确认选择内容
    const handleSelectGroupDone = (courseList: GroupListItem[]) => {
        updateGroupList(courseList)
        setGroupModalOpen(false)
    }

    // 内容排序
    const handleSortItem = (from: number, to: number) => {
        const content = cloneDeep(selectedGroup || [])
        const [removed] = content.splice(from, 1)
        content.splice(to, 0, removed)
        updateGroupList(content)
    }

    // 删除内容
    const handleDeleteItem = (content: GroupListItem) => {
        const contentList = cloneDeep(selectedGroup || [])
        const _contentList = contentList?.filter?.(item => item.id !== content.id)
        updateGroupList(_contentList)
    }

    return (
        <div className={styles.by_lesson}>
            <div className={styles.add_card_wap}>
                <MoveContainer datasource={selectedGroup ?? []} onDragEnd={handleSortItem}>
                    {item => (
                        <GroupItem
                            {...item}
                            allowDelete={true}
                            onDelete={() => handleDeleteItem(item)}
                        />
                    )}
                </MoveContainer>
                <Button
                    disabled={selectedGroup.length >= MAX_COUNT}
                    type={'dashed'}
                    className={styles.add_button}
                    onClick={onAddBtnChange}
                >
                    <PlusOutlined className={styles.add_icon} />
                    添加分组
                </Button>
            </div>
            <GroupCourseModal
                // hasGroupSearch={false}
                open={courseModalOpen}
                onCancel={() => setGroupModalOpen(false)}
                onOk={handleSelectGroupDone}
                selectedGroup={selectedGroup}
            />
        </div>
    )
}
export default LessonGroup
