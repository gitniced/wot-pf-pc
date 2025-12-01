import React from 'react'
import { Table } from 'antd'

const BusinessInfo = props => {
    const { orderDetail } = props
    const columns = [
        {
            title: '编号',
            dataIndex: 'reservedCode',
            key: 'reservedCode',
        },
        {
            title: '名称',
            dataIndex: 'bizName',
            key: 'bizName',
        },
        {
            title: '数量',
            dataIndex: 'bizCount',
            key: 'bizCount',
        },
    ]
    return (
        <div style={{ marginBottom: '36px' }}>
            <Table
                columns={columns}
                dataSource={orderDetail?.reservedInfoList || []}
                pagination={false}
            />
        </div>
    )
}

export default BusinessInfo
