// 内容弹窗

import React, { useEffect, useState } from 'react'
import type { GroupListItem, GroupModalProps } from './interface'
import { Modal, message } from 'antd'
import { SuperTable } from '@wotu/wotu-components'

import styles from './index.module.less'
import { getGroupListApi } from './api'
import { getCookie } from '@/storage'
import { GROUP_COLUMNS, MAX_GROUP_COUNT } from './const'

const GroupCourseModal = ({
    open,
    onCancel,
    onOk,
    selectedGroup: prevSelectedGroup,
    type = 'checkbox',
    hasCourseSearch,
}: GroupModalProps) => {
    const [selectedGroup, setSelectedGroup] = useState<GroupListItem[]>([])

    useEffect(() => {
        if (open) {
            setSelectedGroup(prevSelectedGroup || [])
        }
    }, [open])

    const getGroupList = async (params: any) => {
        const { pageNo = 5 } = params
        let organizationCode = getCookie('SELECT_ORG_CODE')
        let res: any =
            (await getGroupListApi({
                ...params,
                organizationCode,
                pageSize: 5,
                pageNo,
            })) || []
        return res
    }

    // 添加计划
    const handleAddCourse = () => {
        let currentGroup = selectedGroup.filter(item => item?.id)
        const currentSelectedCount = currentGroup.length
        if (!currentSelectedCount) {
            message.info('未选中分组')
            return
        } else if (currentSelectedCount > MAX_GROUP_COUNT) {
            message.error(`最多可添加${MAX_GROUP_COUNT}个分组`)
            return
        }

        const tempCurrentGroup = currentGroup.map(item => {
            const { id, name } = item || {}
            return { key: id, label: name, ...item }
        })

        onOk(tempCurrentGroup)
    }

    return (
        <Modal
            open={open}
            title="选择分组"
            width={1000}
            onCancel={() => {
                setSelectedGroup([])
                onCancel()
            }}
            onOk={handleAddCourse}
            className={styles.plan_list_modal}
        >
            <SuperTable
                search={hasCourseSearch}
                rowKey="id"
                request={getGroupList}
                columns={GROUP_COLUMNS}
                pagination={{
                    showSizeChanger: false,
                    defaultPageSize: 5,
                    showTotal: () => ``,
                    showQuickJumper: false,
                    // onChange: onPageChange,
                }}
                formProps={{ labelCol: { span: 6 } }}
                rowSelection={{
                    type,
                    preserveSelectedRowKeys: true,
                    selectedRowKeys: selectedGroup.map((item: GroupListItem) => item?.id),
                    onChange: (_: string[], allSelectedRows: GroupListItem[]) => {
                        setSelectedGroup([...allSelectedRows])
                    },
                }}
            />
        </Modal>
    )
}

export default GroupCourseModal
