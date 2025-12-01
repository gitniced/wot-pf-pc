// 预览弹窗

import { Modal, Form, Space, Button } from 'antd'
import styles from './index.module.less'
import { QUESTION_LEVEL_TEXT, QUESTION_TYPE_ENUM } from '../../constants'
import type { PreviewModalProps } from './interface'
import { isEmpty } from 'lodash'
import type { QuestionListItem } from '../../interface'

const PreviewModal = ({ previewData, onCancel }: PreviewModalProps) => {
    const [form] = Form.useForm()

    const { type: parentType, childList = [] } = previewData.data ?? {}

    const getAnswer = (questionItem: QuestionListItem) => {
        const { type, optionList = [] } = questionItem ?? {}
        if ([QUESTION_TYPE_ENUM.SINGLE, QUESTION_TYPE_ENUM.MULTIPLE].includes(type!)) {
            const result = optionList
                .map((item, index) => ({ ...item, displaySort: String.fromCharCode(index + 65) }))
                .filter(item => item.isAnswer)
                .map(item => item.displaySort)

            return result.join('、') || '无'
        } else {
            return optionList.find(item => item.isAnswer)?.answer
        }
    }

    // 只有单选题、多选题和判断题有选项
    const hasOption = (type: number) => {
        return [
            QUESTION_TYPE_ENUM.SINGLE,
            QUESTION_TYPE_ENUM.MULTIPLE,
            QUESTION_TYPE_ENUM.JUDGEMENT,
        ].includes(type)
    }

    const renderQuestionItem = (questionItem: QuestionListItem) => {
        const { optionList = [], analysis, title, level, type } = questionItem ?? {}
        return (
            <>
                <Form.Item label="题目" className="titleFormItem">
                    <Space direction="vertical" size={16}>
                        <div dangerouslySetInnerHTML={{ __html: title! }} />
                        {!isEmpty(optionList) && hasOption(type) && (
                            <div className={styles.options}>
                                {/* @ts-ignore */}
                                {optionList.map((option, index) => (
                                    <Space key={option.code} size={0} align="baseline">
                                        <span>{String.fromCharCode(index + 65)}、</span>
                                        <div dangerouslySetInnerHTML={{ __html: option.answer! }} />
                                    </Space>
                                ))}
                            </div>
                        )}
                    </Space>
                </Form.Item>
                {!isEmpty(optionList) && (
                    <Form.Item label="答案">
                        <div dangerouslySetInnerHTML={{ __html: getAnswer(questionItem)! }} />
                    </Form.Item>
                )}
                {!isEmpty(analysis) && (
                    <Form.Item label="解析">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: analysis!,
                            }}
                        />
                    </Form.Item>
                )}

                <Form.Item label="难易程度">{QUESTION_LEVEL_TEXT[level!]}</Form.Item>
            </>
        )
    }

    return (
        <Modal
            centered
            width={800}
            open={previewData.visible}
            onCancel={onCancel}
            title="预览"
            footer={
                <Button type="primary" onClick={onCancel}>
                    关闭
                </Button>
            }
            className={styles.question_preview_modal}
        >
            <Form form={form} labelCol={{ span: 3 }} colon={false}>
                {renderQuestionItem(previewData.data!)}
                {[QUESTION_TYPE_ENUM.COMPOSE, QUESTION_TYPE_ENUM.ANALYSIS].includes(
                    parentType!,
                ) && (
                    <div className={styles.child_list}>
                        {childList.map(item => (
                            <div className={styles.child_item} key={item.code}>
                                {renderQuestionItem(item)}
                            </div>
                        ))}
                    </div>
                )}
            </Form>
        </Modal>
    )
}

export default PreviewModal
