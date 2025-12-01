// 考试基础信息
import { Col, Row, Tooltip } from 'antd'
import styles from './index.module.less'
import { SIGN_TYPE_TEXT, EXAM_STATE_TEXT } from './constants'
import dayjs from 'dayjs'
import type { ExamDetail } from './interface'

const FORMAT = 'YYYY-MM-DD HH:mm:ss'

const ExamDetailComp = (data: Partial<ExamDetail>) => {
    const renderToolTip = (title?: string) => {
        return (
            <Tooltip
                placement="topLeft"
                title={title}
                overlayClassName={styles.exam_detail_tooltip}
            >
                {title}
            </Tooltip>
        )
    }
    const dataList = [
        {
            label: '职业/工种/等级：',
            value: renderToolTip(data?.jobStr),
        },
        {
            label: '考试时间：',
            value: renderToolTip(
                `${dayjs(data?.startTime).format(FORMAT)} 至 ${dayjs(data?.endTime).format(
                    FORMAT,
                )}`,
            ),
        },
        {
            label: '考点-考场：',
            value: renderToolTip(data?.address),
        },
        {
            label: '签到方式：',
            value: SIGN_TYPE_TEXT[data?.needSign || 0],
        },
        {
            label: '考试状态：',
            value: EXAM_STATE_TEXT[data?.examState || 0],
        },
    ]
    return (
        <div className={styles.component_base_info}>
            <div className={styles.title}>{data.title}</div>
            <Row gutter={[32, 24]}>
                {dataList.map(item => (
                    <Col span={8} key={item.label}>
                        <span className={styles.label}>{item.label}</span>
                        <span className={styles.value}>{item.value}</span>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default ExamDetailComp
