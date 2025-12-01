// 考试基础信息

import { Col, Row, Tooltip } from 'antd'
import styles from './index.module.less'
import { PROJECT_TYPE_TEXT } from '../grading-manage/constants'
import dayjs from 'dayjs'
import type { GradingDetail } from '../grading-settings/interface'

const FORMAT = 'YYYY-MM-DD HH:mm:ss'

const GradingDetailComp = (data: Partial<Omit<GradingDetail, 'teacherDetails'>>) => {
    const renderToolTip = (title?: string) => {
        return (
            <Tooltip
                placement="topLeft"
                title={title}
                overlayClassName={styles.grading_detail_tooltip}
            >
                {title}
            </Tooltip>
        )
    }
    const dataList = [
        {
            label: '考试名称：',
            value: renderToolTip(data?.examTitle),
        },
        {
            label: '关联项目：',
            value: data?.projectTitle ? renderToolTip(data?.projectTitle) : '无',
        },
        {
            label: '项目类型：',
            // @ts-ignore
            value: PROJECT_TYPE_TEXT[data?.projectType] || '--',
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
            label: '试卷数：',
            value: `${data?.paperCount}套，随机${data?.randomPaperNumber}套`,
        },
        {
            label: '考生数：',
            value: data?.stuCount,
        },
    ]
    return (
        <div className={styles.component_base_info}>
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

export default GradingDetailComp
