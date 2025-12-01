// 选题题目

import type { RadioChangeEvent} from 'antd';
import { Button, Radio, Space } from 'antd'
import styles from './index.module.less'
import { QUESTION_COUNT_LIST, QUESTION_SELECT_TYPE } from '../constants'
import type { SelectQuestionProps } from './interface'
import { useState } from 'react'
import SelectByWork from './SelectByWork'
import SelectByKnowledge from './SelectByKnowledge'
import type { SelectQuestionDto } from '../../interface'

const SelectQuestion: React.FC<SelectQuestionProps> = ({
    questionType,
    selectQuestionDto,
    hasSelectQuestion,
    onSelect,
    onChange,
}) => {
    // 选题题目弹窗的显示/隐藏
    const [visible, setVisible] = useState<boolean>(false)

    // 按职业工种等级/知识点分类选择题目
    const handleOk = (currSelectQuestionDto: SelectQuestionDto) => {
        onSelect(currSelectQuestionDto)
        setVisible(false)
    }

    // 取消选择
    const handleCancel = () => {
        setVisible(false)
    }

    const handleChangeType = (e: RadioChangeEvent) => {
        onChange(e.target.value)
        setVisible(false)
    }

    return (
        <div className={styles.component_select_question}>
            <Radio.Group
                className={styles.select_type_group}
                value={questionType}
                onChange={handleChangeType}
            >
                <Radio value={QUESTION_SELECT_TYPE.KNOWLEDGE}>按分类（知识点）选题</Radio>
                <Radio value={QUESTION_SELECT_TYPE.WORK}>按职业目录选题</Radio>
            </Radio.Group>

            <div className={styles.select_wrapper}>
                <Button onClick={() => setVisible(true)}>
                    {hasSelectQuestion ? '重新选择' : '手动选择'}
                </Button>

                {hasSelectQuestion && (
                    <div className={styles.question_count}>
                        <div className={`${styles.question_count_item} ${styles.total_count}`}>
                            <span className={styles.label}>已选择模拟题总数：</span>
                            <span className={styles.value}>{selectQuestionDto?.totalCount}题</span>
                        </div>

                        <Space align="center" size={32}>
                            {QUESTION_COUNT_LIST.map(item => (
                                <div className={styles.question_count_item} key={item.key}>
                                    <span className={styles.label}>{item.label}</span>
                                    <span className={styles.value}>
                                        {/* @ts-ignore */}
                                        {selectQuestionDto?.[item.key]}题
                                    </span>
                                </div>
                            ))}
                        </Space>
                    </div>
                )}
            </div>

            {questionType === QUESTION_SELECT_TYPE.WORK && (
                <SelectByWork
                    onOk={handleOk}
                    onCancel={handleCancel}
                    open={visible}
                    commonJobList={selectQuestionDto?.commonJobCustomDtoList}
                />
            )}

            {questionType === QUESTION_SELECT_TYPE.KNOWLEDGE && (
                <SelectByKnowledge
                    onOk={handleOk}
                    onCancel={handleCancel}
                    open={visible}
                    knowledgePointInfoList={selectQuestionDto?.knowledgePointInfoList}
                />
            )}
        </div>
    )
}

export default SelectQuestion
