// 内容弹窗

import React, { useEffect, useState } from 'react'
import type { CourseListItem, CourseListModalProps } from './interface'
import { Modal, message } from 'antd'
import { SuperTable } from '@wotu/wotu-components'

import styles from './index.module.less'
import { getCourseListApi } from './api'
import { getCookie } from '@/storage'
import { COURSE_COLUMNS, MAX_COUNT } from './const'

const CourseListModal = ({
    open,
    onCancel,
    onOk,
    selectedCourses: prevSelectedCourses,
    type = 'checkbox',
    hasCourseSearch,
}: CourseListModalProps) => {
    const [selectedCourses, setSelectedCourses] = useState<CourseListItem[]>([])

    useEffect(() => {
        if (open) {
            setSelectedCourses(prevSelectedCourses || [])
        }
    }, [open])

    const getCourseList = async (params: any) => {
        const { pageNo = 5 } = params
        let organizationCode = getCookie('SELECT_ORG_CODE')
        const res: any = await getCourseListApi({
            ...params,
            organizationCode,
            pageSize: 5,
            pageNo,
        })
        return res

        // return mockCourseList
    }

    // 添加计划
    const handleAddCourse = () => {
        let currentCourses = selectedCourses.filter(item => item?.id)
        console.log('currentCourses', currentCourses)
        console.log('selectedCourses', selectedCourses)

        const currentSelectedCount = currentCourses.length
        if (!currentSelectedCount) {
            message.info('未选中课程')
            return
        } else if (currentSelectedCount > MAX_COUNT) {
            message.error(`最多可添加${MAX_COUNT}个课程`)
            return
        }

        onOk(currentCourses)
    }

    return (
        <Modal
            open={open}
            title="选择课程"
            width={1000}
            onCancel={() => {
                setSelectedCourses([])
                onCancel()
            }}
            onOk={handleAddCourse}
            className={styles.plan_list_modal}
        >
            <SuperTable
                search={hasCourseSearch}
                rowKey="id"
                request={getCourseList}
                columns={COURSE_COLUMNS}
                pagination={{
                    showSizeChanger: false,
                    defaultPageSize: 5,
                    pageSize: 5,
                    showTotal: () => ``,
                    showQuickJumper: false,
                    // onChange: onPageChange,
                }}
                formProps={{ labelCol: { span: 6 } }}
                rowSelection={{
                    type,
                    preserveSelectedRowKeys: true,
                    selectedRowKeys: selectedCourses.map((item: CourseListItem) => item?.id),
                    onChange: (_: string[], allSelectedRows: CourseListItem[]) => {
                        setSelectedCourses([...allSelectedRows])
                    },
                }}
            />
        </Modal>
    )
}

export default CourseListModal
