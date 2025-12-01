import { Col, Modal, Row, Space } from 'antd'
import styles from './index.module.less'
import TitleAdvance from '@/components/TitleAdvance'
import dayjs from 'dayjs'
import type { SignDetailProps } from './interface'
import {
    CERTIFICATE_TYPE_TEXT,
    CHECK_TYPE,
    CHECK_TYPE_TEXT,
    RULE_TYPE,
    RULE_TYPE_TEXT,
    SING_TYPE_TEXT,
} from './consts'
import { DesensitizationItem } from '@wotu/wotu-pro-components'

const SignDetail = ({ open, onCancel, onOk, signDetailData }: SignDetailProps) => {
    const {
        userName,
        mobile,
        certificate,
        type,
        ruleType,
        checkType,
        arrive,
        checkFace,
        signTime,
        distance,
        outwork,
        signLocation,
        signImageList,
        signRemark,
        LocalDateTime,
        certificateType = 1,
    } = signDetailData ?? {}

    return (
        <Modal
            open={open}
            title="详情"
            className={styles.sign_detail_modal}
            onCancel={onCancel}
            onOk={onOk}
            destroyOnClose
        >
            <div className={styles.header}>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        姓名：
                        <div className={styles.value}>
                            <DesensitizationItem preStr={userName || ''} type="1" />
                        </div>
                    </Col>
                    <Col span={12}>
                        手机号：
                        <div className={styles.value}>
                            <DesensitizationItem preStr={mobile || ''} type="2" />
                        </div>
                    </Col>
                    <Col span={12}>
                        证件类型：
                        <div className={styles.value}>{CERTIFICATE_TYPE_TEXT[certificateType]}</div>
                    </Col>
                    <Col span={12}>
                        证件号码：
                        <div className={styles.value}>
                            <DesensitizationItem preStr={certificate || ''} type="2" />
                        </div>
                    </Col>
                </Row>
            </div>

            <TitleAdvance title="打卡详情" />

            <div className={styles.content}>
                <Row gutter={[12, 12]}>
                    <Col span={24} className={styles.col}>
                        <div className={styles.label}>打卡类型：</div>
                        <div className={styles.value_wrapper}>
                            <span className={styles.value}>{SING_TYPE_TEXT[type!]}</span>
                            <span className={styles.tag_1}>{RULE_TYPE_TEXT[ruleType!]}</span>
                            {/* 如果是外勤打卡 显示外勤标签 */}
                            {signTime && (!arrive || (distance === 0 && outwork)) && (
                                <span className={styles.tag_2}>外勤</span>
                            )}
                            {/* 集中打卡显示手动/自动 */}
                            {ruleType === RULE_TYPE.CONCENTRATED && (
                                <span className={styles.tag_2}>{CHECK_TYPE_TEXT[checkType!]}</span>
                            )}
                        </div>
                    </Col>
                    {/* 未开启人脸识别，不显示该字段 */}
                    {checkFace === 1 && (
                        <Col span={24} className={styles.col}>
                            <div className={styles.label}>人脸核验：</div>
                            <div className={styles.value_wrapper}>
                                <span className={styles.value}>
                                    {dayjs(LocalDateTime).format('YYYY-MM-DD HH:mm:ss')}
                                </span>
                                {ruleType === RULE_TYPE.DISPERSION ||
                                (ruleType === RULE_TYPE.CONCENTRATED &&
                                    checkType === CHECK_TYPE.AUTOMATIC) ? (
                                    <span className={styles.tag_2}>已通过</span>
                                ) : (
                                    <span className={styles.tag_2}>未通过</span>
                                )}
                            </div>
                        </Col>
                    )}

                    <Col span={24} className={styles.col}>
                        <div className={styles.label}>打卡时间：</div>
                        <div className={styles.value_wrapper}>
                            <span className={styles.value}>
                                {dayjs(signTime).format('YYYY-MM-DD HH:mm:ss')}
                            </span>
                        </div>
                    </Col>
                    <Col span={24} className={styles.col}>
                        <div className={styles.label}>打卡位置：</div>
                        <div className={styles.value_wrapper}>
                            <div className={styles.value}>{signLocation || '-'}</div>
                        </div>
                    </Col>
                    <Col span={24} className={styles.col}>
                        <div className={styles.label}>打卡图片：</div>
                        {signImageList?.length ? (
                            <Space size={8} wrap>
                                {signImageList?.map(item => (
                                    <div className={styles.image_item} key={item}>
                                        <img src={item} />
                                    </div>
                                ))}
                            </Space>
                        ) : (
                            '-'
                        )}
                    </Col>
                    <Col span={24} className={styles.col}>
                        <div className={styles.label}>打卡备注：</div>
                        <div className={styles.value_wrapper}>
                            <div className={styles.value}>{signRemark || '-'}</div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}

export default SignDetail
