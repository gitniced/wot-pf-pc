import { Button, Col, Modal, Row, Table } from 'antd'
import React from 'react'
import styles from './index.module.less'

export default function AnswerOrbitModal(props: any) {
    const { code, ...rest } = props
    const data = [
        {
            dataSource: [
                { 作答时间: '2025-07-22 20:40:09~2025-07-22 20:41:45', 答案: 'B', 对错情况: '正确' }
            ],
            open: 1,
            during: '01:01'
        },
        {
            dataSource: [
                { 作答时间: '2025-07-22 20:41:46~2025-07-22 20:42:47', 答案: 'B', 对错情况: '正确' }
            ],
            open: 1,
            during: '01:36'
        },
        {
            dataSource: [
                { 作答时间: '2025-07-22 20:42:48~2025-07-22 20:44:57', 答案: 'D', 对错情况: '错误' }
            ],
            open: 1,
            during: '03:10'
        },
        {
            dataSource: [
                { 作答时间: '2025-07-22 20:44:58~2025-07-22 20:48:08', 答案: 'C', 对错情况: '正确' },
                { 作答时间: '2025-07-22 20:55:49~2025-07-22 20:56:21', 答案: 'C', 对错情况: '正确' }
            ],
            open: 2,
            during: '02:41'
        },
        {
            dataSource: [
                { 作答时间: '2025-07-22 20:48:09~2025-07-22 20:50:26', 答案: 'D', 对错情况: '正确' }
            ],
            open: 1,
            during: '02:18'
        },
        {
            dataSource: [
                { 作答时间: '2025-07-22 20:50:27~2025-07-22 20:53:42', 答案: 'A、C', 对错情况: '错误' }
            ],
            open: 1,
            during: '03:15'
        },
        {
            dataSource: [
                { 作答时间: '2025-07-22 50:54:16~2025-07-22 20:55:15', 答案: '×', 对错情况: '错误' }
            ],
            open: 1,
            during: '00:59'
        },
        {
            dataSource: [
                { 作答时间: '2025-07-22 20:55:16~2025-07-22 20:55:48', 答案: '√', 对错情况: '正确' }
            ],
            open: 1,
            during: '00:32'
        },
        {
            dataSource: [
                { 作答时间: '2025-07-22 20:56:22~2025-07-22 21:01:24', 答案: '查找知识库中关于交易处理延迟的常见原因，包括数据库性能瓶颈和网络延迟问题', 对错情况: '--' },
                { 作答时间: '2025-07-22 21:05:32~2025-07-22 21:11:36', 答案: '查找知识库中关于交易处理延迟的常见原因，包括数据库性能瓶颈和网络延迟问题', 对错情况: '--' }
            ],
            open: 2,
            during: '10:10'
        },
        {
            dataSource: [
                { 作答时间: '2025-07-22 21:01:25~2025-07-22 21:05:31', 答案: '详细描述系统架构，包括硬件和软件的配置要求。(2)列出关键业务流程和数据流', 对错情况: '--' }
            ],
            open: 1,
            during: '05:02'
        }
    ]
    const dataInfo = data[code] || {}
    return (
        <Modal
            title="答题轨迹"
            width={800}
            {...rest}
            footer={
                <Button type='ghost' onClick={rest?.onCancel}>关闭</Button>
            }
        >
            <div className={styles.header}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Row className={styles.row} justify="space-between" align="middle">
                            <Row>打开次数</Row>
                            <Row className={styles.value}>{dataInfo?.open}</Row>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row className={styles.row} justify="space-between" align="middle">
                            <Row>累计作答时长</Row>
                            <Row className={styles.value}>{dataInfo?.during}</Row>
                        </Row>
                    </Col>
                </Row>
            </div>
            <Table
                columns={[
                    { dataIndex: '作答时间', title: '作答时间', width: 400 },
                    { dataIndex: '答案', title: '答案', width: 200 },
                    { dataIndex: '对错情况', title: '对错情况', width: 200 },
                ]}
                dataSource={dataInfo?.dataSource || []}
                pagination={{ pageSize: 5, showSizeChanger: false }}
            />
        </Modal>
    )
}
