import type { ModalProps} from 'antd';
import { Button, Col, Modal, Row, Spin, Tooltip, Typography } from 'antd'
import { useEffect, useMemo, useState } from 'react'

import styles from './index.module.less'
import { getPropositionInformation } from '../../api'
import type { PropositionInformation } from '../../interface'
import { publishMap, referenceStateMap } from '../../enums'

interface InformationProps extends ModalProps {
    code?: string
}

const Information = (props: InformationProps) => {
    const { code, open, onCancel } = props

    const [loading, setLoading] = useState<boolean>(true)
    const [propositionInformation, setPropositionInformation] =
        useState<Partial<PropositionInformation>>()

    useEffect(() => {
        if (open && code) {
            getPropositionInformation(code)
                .then((res: any) => {
                    setPropositionInformation(res)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [open, code])

    const showPropositionInfo = useMemo(() => {
        const { expertReviewMaterials, examinationCommitmentLetter, questionSourceType } =
            propositionInformation ?? {}

        return (
            Boolean(expertReviewMaterials?.url) ||
            Boolean(examinationCommitmentLetter?.url) ||
            Boolean(questionSourceType)
        )
    }, [propositionInformation])

    return (
        <Modal
            title="命题信息（套题组卷）"
            open={open}
            width={800}
            onCancel={onCancel}
            className={styles.information_modal}
            footer={
                <Button type="primary" onClick={onCancel}>
                    关闭
                </Button>
            }
        >
            <Spin spinning={loading}>
                <div className={styles.content}>
                    <div className={styles.basic_info}>
                        <div className={styles.title}>基础信息</div>
                        <Row gutter={[24, 24]}>
                            <Col span={12}>
                                <Typography>职业/工种/等级：</Typography>
                                <Tooltip title={propositionInformation?.jobStr}>
                                    <Typography.Text type="secondary">
                                        {propositionInformation?.jobStr}
                                    </Typography.Text>
                                </Tooltip>
                            </Col>
                            <Col span={12}>
                                <Typography>试卷名称：</Typography>
                                <Tooltip title={propositionInformation?.title}>
                                    <Typography.Text type="secondary">
                                        {propositionInformation?.title}
                                    </Typography.Text>
                                </Tooltip>
                            </Col>
                            <Col span={12}>
                                <Typography>来源机构：</Typography>
                                <Tooltip title={propositionInformation?.organizationName}>
                                    <Typography.Text type="secondary">
                                        {propositionInformation?.organizationName}
                                    </Typography.Text>
                                </Tooltip>
                            </Col>
                            <Col span={12}>
                                <Typography>来源用户：</Typography>
                                <Typography.Text type="secondary">
                                    {propositionInformation?.createUserName}
                                </Typography.Text>
                            </Col>
                            <Col span={12}>
                                <Typography>引用状态：</Typography>
                                <Typography.Text type="secondary">
                                    {referenceStateMap[propositionInformation?.referenceState!]}
                                </Typography.Text>
                            </Col>
                            <Col span={12}>
                                <Typography>实际引用次数：</Typography>
                                <Typography.Text type="secondary">
                                    {propositionInformation?.actualReferenceNum}
                                </Typography.Text>
                            </Col>
                            <Col span={12}>
                                <Typography>发布状态：</Typography>
                                <Typography.Text type="secondary">
                                    {publishMap[propositionInformation?.publishState!]}
                                </Typography.Text>
                            </Col>
                            <Col span={12}>
                                <Typography>创建时间：</Typography>
                                <Typography.Text type="secondary">
                                    {propositionInformation?.createdAt}
                                </Typography.Text>
                            </Col>
                        </Row>
                    </div>
                    <div className={styles.propositional_info}>
                        <div className={styles.title}>命题信息</div>
                        {showPropositionInfo ? (
                            <Row gutter={[24, 24]}>
                                <Col span={12}>
                                    <Typography>专家审核材料：</Typography>
                                    {propositionInformation?.expertReviewMaterials?.url ? (
                                        <Typography.Link
                                            onClick={() =>
                                                window.open(
                                                    propositionInformation.expertReviewMaterials
                                                        ?.url,
                                                )
                                            }
                                        >
                                            {propositionInformation?.expertReviewMaterials.name}
                                        </Typography.Link>
                                    ) : (
                                        <Typography.Text type="secondary">无</Typography.Text>
                                    )}
                                </Col>
                                <Col span={12}>
                                    <Typography>诚信考务承诺书：</Typography>
                                    {propositionInformation?.examinationCommitmentLetter?.url ? (
                                        <Typography.Link
                                            onClick={() =>
                                                window.open(
                                                    propositionInformation
                                                        .examinationCommitmentLetter?.url,
                                                )
                                            }
                                        >
                                            {
                                                propositionInformation?.examinationCommitmentLetter
                                                    .name
                                            }
                                        </Typography.Link>
                                    ) : (
                                        <Typography.Text type="secondary">无</Typography.Text>
                                    )}
                                </Col>

                                <Col span={12}>
                                    <Typography>试卷命题类型：</Typography>
                                    <Typography.Text type="secondary">
                                        {propositionInformation?.questionSourceType === 0
                                            ? '无'
                                            : propositionInformation?.questionSourceType === 1
                                            ? '参考国家题库命题'
                                            : '机构自主命题'}
                                    </Typography.Text>
                                </Col>
                            </Row>
                        ) : (
                            <Typography.Text type="secondary">暂无内容</Typography.Text>
                        )}
                    </div>
                </div>
            </Spin>
        </Modal>
    )
}

export default Information
