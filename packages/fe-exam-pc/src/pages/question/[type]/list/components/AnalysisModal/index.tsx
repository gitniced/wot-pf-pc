import { Button, Col, Row } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { getQuestionAnalyze } from '../../../api'

export default function AnalysisModal(props: any) {
    const { code, ...rest } = props
    const [resData, setResData] = useState<any>({})

    useEffect(() => {
        code && getQuestionAnalyze(code).then(res => {
            setResData(res)
        })
    }, [code])

    // 将秒数格式化为 mm:ss 格式
    function formatSeconds(seconds: number) {
        if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) return '-'
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        const mm = m < 10 ? `0${m}` : `${m}`
        const ss = s < 10 ? `0${s}` : `${s}`
        return `${mm}:${ss}`
    }


    return (
        <Modal
            title="试题分析"
            footer={
                <Button type="primary" onClick={props?.onCancel}>关闭</Button>
            }
            width={600}
            {...rest}
        >
            <Row justify="start" align="top" wrap={false}>
                <Col flex="none">题目/题干：</Col>
                <Col className={styles.question} flex={1}> <div dangerouslySetInnerHTML={{ __html: resData?.title }} /></Col>
            </Row>
            <Row wrap justify="start" gutter={[16, 16]}>
                <Col span={12}>
                    <div className={styles.item}>
                        <div>引用次数</div>
                        <div className={styles.weight6}>{resData?.referenceCount || '-'}</div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className={styles.item}>
                        <div>答题人次 / 考试人次</div>
                        <div className={styles.weight6}>{resData?.answerNumber || '-'}/{resData?.examNumber || '-'}</div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className={styles.item}>
                        <div>平均答题时长</div>
                        <div className={styles.weight6}>{resData?.averageAnswerTime ? formatSeconds(resData?.averageAnswerTime) : '-'}</div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className={styles.item}>
                        <div>试题难度系数</div>
                        <div className={styles.weight6}>{resData?.difficultyCoefficient || '-'}</div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className={styles.item}>
                        <div>试题区分度</div>
                        <div className={styles.weight6}>{resData?.distinguishingDegree || '-'}</div>
                    </div>
                </Col>
            </Row>
        </Modal>
    )
}
