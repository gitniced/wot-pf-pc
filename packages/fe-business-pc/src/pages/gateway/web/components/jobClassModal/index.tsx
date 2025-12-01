import { Modal, message } from 'antd'
import { SuperTable } from '@wotu/wotu-components'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { getCookie } from '@/storage'
import Http from '@/servers/http'
import { useState, useEffect } from 'react'

interface ICheckedRows {
    id: number
    name: string
    workName: string
    levelName: string
    courseNum: number
    courseIds: string | number[]
}

interface IJobClassParam {
    closeDialog: () => void
    visible: boolean
    onChoiceComplete: (param: any) => void
    checkedRows?: ICheckedRows[]
    checkedRowKeys: any[]
}

const Index = ({
    visible,
    closeDialog,
    onChoiceComplete,
    checkedRowKeys,
    checkedRows,
}: IJobClassParam) => {
    const [selectedRow, setSelectedRow] = useState<any[]>([])
    const [selectedRowKey, setSelectedRowKey] = useState<any[]>([])

    const onComplete = () => {
        if (selectedRowKey.length > 10) {
            return message.warning('同时最多选择十个选项')
        }
        const validArr = [...selectedRow, ...(checkedRows as [])].filter(Boolean)
        const getCurrentRow = selectedRowKey.map(item => validArr.find(item1 => item1.id === item))
        onChoiceComplete({ selectedRow: getCurrentRow, selectedRowKey })
    }

    // 同步外部的删除操作
    useEffect(() => {
        setSelectedRowKey(checkedRowKeys)
        const validArr = [...selectedRow, ...(checkedRows as [])].filter(Boolean)
        const getCurrentRow = selectedRowKey.map(item => validArr.find(item1 => item1.id === item))
        setSelectedRow(getCurrentRow)
    }, [checkedRowKeys])

    /**  获取列表数据  */
    const getOrganizationJobList = async (params: any) => {
        const { pageNo = 1 } = params
        const res = await Http(`/career_main/job/organization_job_list`, 'post', {
            organizationCode: getCookie('SELECT_ORG_CODE'),
            pageNo,
            pageSize: 5,
        })
        return res
    }

    const columns = (): ColumnsType<any> => {
        return [
            {
                title: '职业',
                dataIndex: 'name',
                render: (_, { name }) => <>{name || '-'}</>,
            },
            {
                title: '工种',
                dataIndex: 'workName',
                render: (_, { workName }) => <>{workName || '-'}</>,
            },
            {
                title: '等级',
                dataIndex: 'levelName',
                render: (_, { levelName }) => <>{levelName || '-'}</>,
            },
            {
                title: '课程数量',
                dataIndex: 'courseNum',
                render: (_, { courseNum }) => <>{courseNum || '-'}</>,
            },
        ]
    }

    return (
        <Modal
            title={'选择职业工种等级'}
            open={visible}
            onCancel={closeDialog}
            width={1000}
            onOk={onComplete}
            destroyOnClose={true}
            // className={styles.choice_category_modal_props}
        >
            <SuperTable
                scroll={{ y: 300 }}
                indentSize={30}
                columns={columns()}
                search={false}
                params={{ organizationCode: getCookie('SELECT_ORG_CODE') || '' }}
                rowKey="id"
                pagination={{
                    showSizeChanger: false,
                    defaultPageSize: 5,
                    showTotal: () => ``,
                    showQuickJumper: false,
                }}
                rowSelection={
                    {
                        type: 'checkbox',
                        selectedRowKeys: selectedRowKey,
                        preserveSelectedRowKeys: true,
                        onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
                            console.log('🍊 selectedRows:', selectedRows)
                            setSelectedRowKey(selectedRowKeys)
                            setSelectedRow(selectedRows)
                        },
                    } as any
                }
                request={getOrganizationJobList as any}
            />
        </Modal>
    )
}

export default Index
