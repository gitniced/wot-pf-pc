import { EXAMINE_COMMENT_TYPE } from '../../../student/const'
import { getCriteriaTableColumns } from '../../const'
import { history, Link, useParams, useLocation } from 'umi'
import { Button, Table, Input } from 'antd'
import { observer } from 'mobx-react'
import styles from './index.module.less'
import type { CommentItemProps } from './interface'
import { downloadFileByUrl } from '@/utils/file'

const Index: React.FC<CommentItemProps> = observer(props => {
    const { scheduleCode } = useParams<{ scheduleCode: string }>() || {}
    const { query } = useLocation() || {}
    const { type } = query || {}
    const {
        outcomeList,
        currentEvaluation,
        isPendingSubmitEvaluation,
        updateComment,
        submitEvaluation,
        updateCriteria,
    } = props

    const { criteria, evaluationTask = '', comment = '', status = false } = currentEvaluation || {}
    const { criteriaList = [] } = criteria || {}

    const criteriaTableColumns = getCriteriaTableColumns(evaluationTask, updateCriteria)
    // 渲染
    return (
        <div className={styles.comment_item}>
            <div className={styles.task_outcome}>
                <span>
                    {type !== EXAMINE_COMMENT_TYPE.selfEvaluationCount ? 'Ta' : '我'}的学习成果：
                </span>
                <div className={styles.task_outcome_content}>
                    {outcomeList.map(item => (
                        <div key={item.outcomeCode} className={styles.task_outcome_item}>
                            <span>{item.outcomeName}</span>
                            {String(item.editFormat) === '1' ? (
                                <div className={styles.task_outcome_item_btn}>
                                    <Link
                                        className={styles.text_btn}
                                        to={`/office/${item.fileFormat}/${
                                            item.contentUrl || item.templateInfo
                                        }?preview=true`}
                                        target={'_blank'}
                                    >
                                        查看
                                    </Link>
                                </div>
                            ) : null}
                            {String(item.editFormat) === '2' ? (
                                <div className={styles.task_outcome_item_btn}>
                                    {/* <Button
                                        type="link"
                                        onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation()
                                            message.warning('该格式不支持在线预览')
                                        }}
                                    >
                                        查看
                                    </Button> */}
                                    <Button
                                        type="link"
                                        onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation()
                                            if (item.contentUrl) {
                                                downloadFileByUrl(
                                                    item.contentUrl,
                                                    item.outcomeName || '文件',
                                                )
                                            }
                                        }}
                                    >
                                        下载
                                    </Button>
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>

            {/* 评价标准表格 */}
            <Table
                className={styles.task_table}
                columns={criteriaTableColumns as any}
                dataSource={criteriaList}
                pagination={false}
                bordered
            />

            {type !== EXAMINE_COMMENT_TYPE.selfEvaluationCount && (
                <div className={styles.task_comment}>
                    <div className={styles.task_comment_title}>
                        <span className={styles.task_comment_title_required}>*</span>
                        评语：
                    </div>
                    <div className={styles.task_comment_content}>
                        <Input.TextArea
                            rows={4}
                            placeholder="请填写评价内容，指出亮点并提出可改进建议"
                            value={comment}
                            onChange={e => updateComment(evaluationTask, e.target.value)}
                        />
                    </div>
                </div>
            )}

            <div className={styles.task_operation}>
                <Button
                    className={styles.task_operation_cancel}
                    ghost
                    onClick={() => {
                        history.replace(
                            `/mine-lesson/${scheduleCode}/examine/comment?type=${
                                type as unknown as keyof typeof EXAMINE_COMMENT_TYPE
                            }`,
                        )
                    }}
                >
                    取消
                </Button>
                <Button
                    loading={isPendingSubmitEvaluation}
                    disabled={!!status}
                    type="primary"
                    onClick={() => submitEvaluation(scheduleCode, type, currentEvaluation)}
                >
                    提交
                </Button>
            </div>
        </div>
    )
})

export default Index
