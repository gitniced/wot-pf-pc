import { ModalValueContext } from '@/components/ModalProvider'
import { Table } from 'antd'
import { useContext } from 'react'

const PublishModal = () => {
    const { dataSource } = useContext(ModalValueContext)

    return (
        <>
            <Table
                columns={[
                    {
                        title: '失败原因',
                        dataIndex: 'reason',
                        key: 'reason',
                        width: 200,
                    },
                ]}
                dataSource={dataSource}
            />
        </>
    )
}

export default PublishModal
