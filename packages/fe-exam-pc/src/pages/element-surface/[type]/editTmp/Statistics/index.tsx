import { Button, Descriptions, Modal, Space, Tag, Typography } from 'antd'
import type { Props } from './interface'

const Statistics = ({ statisticsVisible, setStatisticsVisible, detail }: Props) => {
    const renderTitle = () => {
        return (
            <Space>
                <Typography.Title level={5}>统计信息</Typography.Title>
                <Tag
                    color="blue"
                    onClick={() => {
                        setStatisticsVisible(true)
                    }}
                >
                    考评点指南
                </Tag>
            </Space>
        )
    }

    return (
        <>
            <Descriptions title={renderTitle()} column={4}>
                <Descriptions.Item label="考评点数量">{detail?.pointCount}个</Descriptions.Item>
                <Descriptions.Item label="X">
                    {detail?.xcount}个（{detail?.xrate}%）
                </Descriptions.Item>
                <Descriptions.Item label="Y">
                    {detail?.ycount}个（{detail?.yrate}%）
                </Descriptions.Item>
                <Descriptions.Item label="Z">
                    {detail?.zcount}个（{detail?.zrate}%）
                </Descriptions.Item>
            </Descriptions>
            <Modal
                centered
                title="考评点指南"
                open={statisticsVisible}
                onCancel={() => {
                    setStatisticsVisible(false)
                }}
                footer={[<Button onClick={() => setStatisticsVisible(false)}>关闭</Button>]}
            >
                <Space direction="vertical" size={24}>
                    <Typography>
                        1、考评点的重要程度是指每个考评点在整个考评点集合中的相对重要性水平，它反映了每个考评点与其他考评点相对重要程度。专家可根据经验确定各考评点的重要程度，并分别用“X、Y、Z”表示，X为最重要的核心要素，一般为职业活动必备的知识点；Y为一般要素；Z为辅助性要素。在鉴定要素细目表中，重要程度的数量分布一般是X占80%以上，Y不超过15%，Z不超过5%。
                    </Typography>
                    <Typography>
                        2、考评点数量根据实际情况确定。理论知识考评点数量一般为权重的2倍以上，每个等级的考评点总量最少为200个
                    </Typography>
                    <Typography>
                        3、精品题库的考评点数量至少为权重的3倍以上，每个等级的考评点总量最少为300个。如有特殊情况，个别职业考评点数量可视具体情况而定。
                    </Typography>
                </Space>
            </Modal>
        </>
    )
}
export default Statistics
