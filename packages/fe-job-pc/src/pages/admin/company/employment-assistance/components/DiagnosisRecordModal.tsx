import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { Modal, Table } from 'antd'
import dayjs from 'dayjs'

const DiagnosisRecordModal = ({ open, onCancel, dataSource = [] }: any) => {
    const columns: ColumnsTypeItem<any>[] = [
        {
            title: '操作内容',
            dataIndex: 'content',
        },
        {
            title: '操作时间',
            dataIndex: 'actionAt',
            render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '服务人员',
            dataIndex: 'userName',
        },
    ]
    return (
        <Modal
            centered
            open={open}
            width={764}
            title="诊断记录"
            onCancel={onCancel}
            onOk={onCancel}
            footer={null}
        >
            <Table rowKey={'actionAt'} columns={columns} dataSource={dataSource} />
        </Modal>
    )
}

export default DiagnosisRecordModal
