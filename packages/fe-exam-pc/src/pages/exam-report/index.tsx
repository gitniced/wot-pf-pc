import { observer } from 'mobx-react'
import styles from './index.module.less'
import { Button, Space, Table } from 'antd'
import {
    EXAM_REPORT_PAPER_MOCK,
    EXAM_REPORT_PAPER_COLUMNS,
    EXAM_REPORT_QUESTION_COLUMNS,
    EXAM_REPORT_QUESTION_MOCK,
    EXAM_REPORT_QUESTION_DETAIL_MOCK,
} from './constants'
import RingProgress from './components/RingProgress'
import { useCallback, useMemo, useState } from 'react'
import ReportDetailModal from './components/ReportDetailModal'

type ReportDetailModalData =
    (typeof EXAM_REPORT_QUESTION_DETAIL_MOCK)[keyof typeof EXAM_REPORT_QUESTION_DETAIL_MOCK]

const ExamReport = () => {
    const [reportDetailModalVisible, setReportDetailModalVisible] = useState(false)
    const [reportDetailModalData, setReportDetailModalData] = useState<ReportDetailModalData>(
        EXAM_REPORT_QUESTION_DETAIL_MOCK[1],
    )

    const onOpenReportDetailModal = useCallback((index: number) => {
        setReportDetailModalData(
            EXAM_REPORT_QUESTION_DETAIL_MOCK[
                index as keyof typeof EXAM_REPORT_QUESTION_DETAIL_MOCK
            ],
        )
        setReportDetailModalVisible(true)
    }, [])

    const questionItem = useMemo(() => {
        return {
            title: '试题序号',
            dataIndex: 'question_index',
            key: 'question_index',
            render: (_text: string, _: any, index: number) => {
                return (
                    <div>
                        <span className={styles.question_index_text}>{index + 1}</span>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => onOpenReportDetailModal(index + 1)}
                        >
                            详情
                        </Button>
                    </div>
                )
            },
        }
    }, [onOpenReportDetailModal])

    const paperColumns = useMemo(() => {
        return [questionItem, ...EXAM_REPORT_PAPER_COLUMNS]
    }, [questionItem])

    const questionColumns = useMemo(() => {
        return [questionItem, ...EXAM_REPORT_QUESTION_COLUMNS]
    }, [questionItem])

    return (
        <div className={styles.page_exam_report}>
            <div className={styles.report_header}>
                <div className={styles.report_header_wrapper}>
                    <Space size={16}>
                        <div className={styles.GRADING_TYPE_tag}>考试报告</div>
                        <div className={styles.exam_info}>
                            <div className={styles.paper_name}>互联网营销师认定</div>
                            <div className={styles.exam_name}>
                                <span>业务编号：2025072200000000568</span>
                            </div>
                        </div>
                    </Space>
                </div>
            </div>

            <div className={styles.content_wrapper}>
                <div className={styles.data_view}>
                    <div className={styles.data_view_item}>
                        <div className={styles.item_content}>
                            <div className={styles.item_content_label}>报考人数</div>
                            <div className={styles.item_content_text}>3</div>
                        </div>
                    </div>
                    <div className={styles.data_view_item}>
                        <div className={styles.item_chart}>
                            <RingProgress progress={1} />
                        </div>
                        <div className={styles.item_content}>
                            <div className={styles.item_content_label}>实考 / 缺考</div>
                            <div className={styles.item_content_text}>3 / 0</div>
                        </div>
                    </div>
                    <div className={styles.data_view_item}>
                        <div className={styles.item_chart}>
                            <RingProgress progress={0.66} fgColor="#5AD8A6" />
                        </div>
                        <div className={styles.item_content}>
                            <div className={styles.item_content_label}>合格 / 不合格</div>
                            <div className={styles.item_content_text}>2 / 1</div>
                        </div>
                    </div>
                </div>
                <div className={styles.analysis_paper}>
                    <div className={styles.analysis_paper_title}>试卷分析</div>
                    <div className={styles.analysis_paper_table}>
                        <Table
                            className={styles.report_table}
                            columns={paperColumns}
                            dataSource={EXAM_REPORT_PAPER_MOCK}
                            // pagination={false}
                            // scroll={{ y: 300 }}
                        />
                    </div>
                </div>
                <div className={styles.analysis_question}>
                    <div className={styles.analysis_question_title}>试题分析</div>
                    <div className={styles.analysis_question_table}>
                        <Table
                            className={styles.report_table}
                            columns={questionColumns}
                            dataSource={EXAM_REPORT_QUESTION_MOCK}
                            // pagination={false}
                            // scroll={{ y: 300 }}
                        />
                    </div>
                </div>
            </div>
            <ReportDetailModal
                data={reportDetailModalData}
                visible={reportDetailModalVisible}
                onCancel={() => setReportDetailModalVisible(false)}
            />
        </div>
    )
}

export default observer(ExamReport)
