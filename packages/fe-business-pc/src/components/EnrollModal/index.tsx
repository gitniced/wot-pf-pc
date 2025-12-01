import { SuperTable } from '@wotu/wotu-components'
import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'
import { hooks } from './hooks'

interface IEnrollModalProps {
    type?: 'radio' | 'checkbox'
    visible: boolean
    contentType?: 'project' | 'details' //打开modal展示的内容  报名项目 | 报名详情
    onCancel: () => void
    onOk: (e: any[]) => void
    choiceData?: any
    statusList?: number[]
}

/**  报名modal   */
const EnrollModal: React.FC<IEnrollModalProps> = ({
    visible,
    onCancel,
    type = 'checkbox',
    onOk,
    contentType = 'details',
    choiceData,
    statusList = [1, 2],
}) => {
    const [selectedEnroll, setSelectedEnroll] = useState<any>([])
    const { getEnrollDetailsList, detailsColumns, getEnrollProjectList, projectColumns } =
        hooks(statusList)

    const titleProps = contentType === 'details' ? '选择报名' : '选择报名项目'
    const columnsProps = contentType === 'details' ? detailsColumns : projectColumns
    const requestProps = contentType === 'details' ? getEnrollDetailsList : getEnrollProjectList
    const searchProps = contentType === 'details'
    const rowKeyProps = contentType === 'details' ? 'code' : 'name'
    const paginationProps = contentType === 'details'

    useEffect(() => {
        if (type === 'checkbox') {
            choiceData?.length && setSelectedEnroll(choiceData)
        }
    }, [])

    const onOkSubmit = () => {
        let selected = cloneDeep(selectedEnroll)
        onOk(selected)
    }

    return (
        <Modal
            open={visible}
            title={titleProps}
            width={1000}
            onCancel={() => {
                setSelectedEnroll([])
                onCancel()
            }}
            onOk={onOkSubmit}
            okButtonProps={{
                disabled: !selectedEnroll?.length,
            }}
        >
            <SuperTable
                search={searchProps}
                scroll={{ y: 300 }}
                rowKey={rowKeyProps}
                request={requestProps}
                formProps={{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
                columns={columnsProps}
                pagination={paginationProps}
                rowSelection={{
                    type,
                    preserveSelectedRowKeys: true,
                    selectedRowKeys: selectedEnroll.map(item => item?.code || item?.name),
                    onChange: (_: string[], allSelectedRows: any) => {
                        setSelectedEnroll([...allSelectedRows])
                    },
                    getCheckboxProps: (record: any) => ({
                        disabled: record.value === 0,
                    }),
                }}
            />
        </Modal>
    )
}

export default EnrollModal
