import { Button, Modal } from 'antd'
import type { EXAM_REPORT_QUESTION_DETAIL_MOCK } from '../../constants'
import { EXAM_REPORT_QUESTION_OPTIONS_LABEL } from '../../constants'
import styles from './index.module.less'

interface IReportDetailModal {
    data: (typeof EXAM_REPORT_QUESTION_DETAIL_MOCK)[keyof typeof EXAM_REPORT_QUESTION_DETAIL_MOCK]
    visible: boolean
    onCancel: () => void
}

const ReportDetailModal = ({ data, visible, onCancel }: IReportDetailModal) => {
    return (
        <Modal
            title="试题详情"
            className={styles.report_detail_modal}
            open={visible}
            onCancel={onCancel}
            footer={
                <Button type="primary" onClick={onCancel}>
                    确定
                </Button>
            }
        >
            <div className={styles.report_detail_modal_content}>
                <div className={styles.content_info}>
                    <div className={styles.content_info_item}>
                        <span>职业/工种名称/等级</span>
                        <span>互联网营销师/直播销售员/五级</span>
                    </div>
                    <div className={styles.content_info_item}>
                        <span>鉴定点</span>
                        <span>--</span>
                    </div>
                    <div className={styles.content_info_item}>
                        <span>区分度</span>
                        <span>--</span>
                    </div>
                    <div className={styles.content_info_item}>
                        <span>难易程度</span>
                        <span>中等</span>
                    </div>
                </div>
                <div className={styles.content_detail}>
                    <div className={styles.content_detail_item}>
                        <span className={styles.GRADING_TYPE_tag}>{data.question_type}</span>
                        <div>
                            <div style={{ marginBottom: 12 }}>{data.question_stem}</div>
                            {data.question_options?.length
                                ? data.question_options.map((item, _index) => (
                                      <div key={item} className={styles.content_detail_item_option}>
                                          {EXAM_REPORT_QUESTION_OPTIONS_LABEL[_index]}、{item}
                                      </div>
                                  ))
                                : null}
                        </div>
                    </div>
                    <div className={styles.content_detail_item}>
                        <span>正确答案</span>
                        <span>{data.right_answers}</span>
                    </div>
                    <div className={styles.content_detail_item}>
                        <span>解析</span>
                        <span>{data.analysis}</span>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ReportDetailModal
