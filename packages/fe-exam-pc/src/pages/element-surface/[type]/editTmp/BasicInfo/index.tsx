// 基础信息

import { Descriptions, Space, Tag, Tooltip, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import type { Props } from './interface'

const BasicInfo = ({ setEditNameVisible, isDetail, detail }: Props) => {
    const renderTitle = () => {
        return (
            <Space>
                <Typography.Title level={5}>基本信息</Typography.Title>
                <Tag color="blue">理论</Tag>
            </Space>
        )
    }

    return (
        <Descriptions title={renderTitle()} column={4}>
            <Descriptions.Item label="要素细目表名称">
                <Space align="start">
                    <Typography>
                        <Tooltip title={detail?.name}>{detail?.name}</Tooltip>
                    </Typography>
                    {!isDetail && <FormOutlined onClick={() => setEditNameVisible(true)} />}
                </Space>
            </Descriptions.Item>
            <Descriptions.Item label="职业">{detail?.jobName}</Descriptions.Item>
            <Descriptions.Item label="工种">{detail?.workName}</Descriptions.Item>
            <Descriptions.Item label="等级">{detail?.levelName || '--'}</Descriptions.Item>
        </Descriptions>
    )
}
export default BasicInfo
