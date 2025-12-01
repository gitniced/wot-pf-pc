/**
 * 试题总结
 */
import { useContext, useEffect, useState } from 'react'
import { Anchor, Button, Collapse } from 'antd'
import { PlusOutlined, SettingOutlined } from '@ant-design/icons'
import styles from '../../index.modules.less'
import {
    ExamineEditCallbackContext,
    ExamineEditValueContext,
    ExamineTmpWrapperContext,
} from '../../context'
import { ModalType, questionTypeEnum } from '../../enums'
import type { QuestionDetailType } from '../../../list/interface'

interface CustomQuestionType extends QuestionDetailType {
    activeKey: boolean
}

const QuestionList = () => {
    const { openModal } = useContext(ExamineEditCallbackContext)
    const { questionList, examDetail } = useContext(ExamineEditValueContext)
    // 当前页面是否为详情页
    const { isDetail } = useContext(ExamineTmpWrapperContext)

    // 重新维护考题列表
    const [customQuestion, setCustomQuestion] = useState<CustomQuestionType[]>([])

    // 添加试题
    const handleAddExamine = () => {
        return openModal?.(ModalType.ADD_REQUESTION, {})
    }
    // 批量设置分值
    const handleBatchSetScore = () => {
        const list = customQuestion.map(v => ({
            questionType: v.questionType,
            needNumber: v.totalQuestion,
            unificationScore: undefined,
            totalScore: undefined,
        }))
        return openModal?.(ModalType.BATCH_SET_SCORE, list)
    }

    useEffect(() => {
        const list = questionList?.map(v => ({ ...v, activeKey: false })) || []
        setCustomQuestion(list)
    }, [questionList])

    // 渲染考题的数量及数量限制
    const renderHeader = (data: QuestionDetailType) => {
        // 【组卷方式】为【套题组卷】\【题型结构】为【按规则随机抽取】 不限制题目数量
        if (examDetail?.composition === 'fromfile' || examDetail?.questionStructure === 'rules') {
            return data?.questionList?.length
        }
        return (
            <span>
                <span
                    className={
                        data?.questionList?.length !== data.needNumber ? styles.error : undefined
                    }
                >
                    {data?.questionList?.length}
                </span>
                /{data.needNumber}
            </span>
        )
    }

    return (
        <div className={styles.question_list}>
            {!isDetail && (
                <>
                    <Button
                        type="dashed"
                        className={styles.create_question}
                        icon={<PlusOutlined />}
                        onClick={handleAddExamine}
                    >
                        添加试题
                    </Button>
                    {/* 若试卷中【分值设置】选择了【单题独立设置】，则需展示【批量设置分值】按钮 */}
                    {examDetail?.scoreType === 'single' && (
                        <Button
                            type="dashed"
                            className={styles.create_question}
                            icon={<SettingOutlined />}
                            onClick={handleBatchSetScore}
                        >
                            批量设置分值
                        </Button>
                    )}
                </>
            )}
            <Anchor
                affix={false}
                onClick={e => e.preventDefault()}
                offsetTop={50}
                className={styles.anchor}
                style={{ maxHeight: 'auto' }}
                getContainer={() => document.getElementById('examine_edit') as HTMLElement}
            >
                {customQuestion && customQuestion.length > 0 && (
                    <Collapse
                        defaultActiveKey={customQuestion.map(ele => ele?.questionType)}
                        bordered={false}
                        expandIconPosition="end"
                    >
                        {(customQuestion || []).map(item => (
                            <Collapse.Panel
                                header={
                                    <p>
                                        {item?.logicSort}、
                                        {(questionTypeEnum as any)[item?.questionType]}（
                                        {renderHeader(item)}）
                                    </p>
                                }
                                key={item?.questionType}
                            >
                                <div className={styles.serial_box}>
                                    {(item?.questionList || []).map(v => (
                                        <Anchor.Link
                                            href={`#${v.questionCode}`}
                                            title={v.logicSort}
                                            key={v.questionCode}
                                            className={styles.serial_number}
                                        />
                                    ))}
                                </div>
                            </Collapse.Panel>
                        ))}
                    </Collapse>
                )}
            </Anchor>
        </div>
    )
}

export default QuestionList
