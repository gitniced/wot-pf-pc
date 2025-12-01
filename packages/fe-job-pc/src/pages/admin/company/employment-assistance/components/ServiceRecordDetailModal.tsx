import { Col, Modal, Row } from 'antd'

import styles from './index.module.less'
import dayjs from 'dayjs'

const ServiceRecordDetailModal = ({ open, onCancel, record = {} }: any) => {
    return (
        <Modal
            centered
            title="服务记录详情"
            open={open}
            onCancel={onCancel}
            footer={null}
            className={styles.service_record_detail_modal}
        >
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <span className={styles.label}>关联措施：</span>
                    <span className={styles.value}>{record.measure}</span>
                </Col>
                <Col span={24}>
                    <span className={styles.label}>服务日期：</span>
                    <span className={styles.value}>
                        {dayjs(record.serverAt).format('YYYY年MM月DD日')}
                    </span>
                </Col>
                <Col span={24}>
                    <span className={styles.label}>服务记录：</span>
                    <span className={styles.value}>{record.content}</span>
                </Col>
            </Row>
        </Modal>
    )
}

export default ServiceRecordDetailModal
