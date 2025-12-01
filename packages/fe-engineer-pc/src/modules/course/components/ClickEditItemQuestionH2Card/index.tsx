import styles from './index.module.less'
import { useCallback, useRef, useState, useMemo } from 'react'
import classNames from 'classnames'
import React from 'react'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import useComponentValue from '@/hooks/useComponentValue'
import type { ICourseDataItem } from '../../types'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import QuestionAddModal from '@/modules/question/modal/QuestionAddModal'
import type { IQuestion } from '@/modules/question/types'
import type { QUESTION_TYPE } from '@/modules/question/const'
import { QUESTION_TYPE_ORDER, QUESTION_TYPE_SIMPLE_LABEL } from '@/modules/question/const'
import FullScreenEditBtn from '../FullScreenEditBtn'
import { createFullScreenContentRender } from '../FullScreenContentHOC'
import QuestionContent from './QuestionContent'
import ClickEditActiveContainer from '@/components/ClickEditActiveContainer'

interface IClickEditItemQuestionH2CardProps extends IUseComponentValueProps<IQuestion[]> {
    title: string
    dataTitle: string
    className?: string
    style?: React.CSSProperties
    items: Omit<ICourseDataItem<IQuestion[]>, 'value'>[]
    activityCode: string
}

/**
 * 随堂测验
 */
const ClickEditItemQuestionH2Card: React.FC<IClickEditItemQuestionH2CardProps> = props => {
    const [active, setActive] = useState(false)
    const [questionAddModalVisible, setQuestionAddModalVisible] = useState(false)
    const fullScreenStateRef = useRef(false)
    const [innerItems, setInnerItems] = useState<ICourseDataItem<IQuestion[]>[]>(
        props.items.map(item => ({
            ...item,
            value: props.value,
        })),
    )
    const [innerValue, setInnerValue] = useState<IQuestion[]>([])
    const {
        value: values,
        onChange,
        onChangeBlur,
    } = useComponentValue({
        value: props.value,
        defaultValue: props.defaultValue || [],
        refreshKey: props.refreshKey,
        onChange: props.onChange,
        onChangeBlur: props.onChangeBlur,
    })

    const renderQuestion = useCallback(
        (_props: IUseComponentValueProps<IQuestion[]>) => {
            return <QuestionContent {..._props} />
        },
        [active, setActive],
    )

    const ContentRender = useMemo(
        () =>
            createFullScreenContentRender(
                _p => {
                    setInnerValue(_p.value)
                    return <div className={styles.fullscreen_content}>{renderQuestion(_p)}</div>
                },
                {
                    save: async (value: IQuestion[]) => {
                        let newValue = value.map(item => {
                            if (item.code?.startsWith('code_')) {
                                return { subQuestions: [], ...item, code: '', belongType: 10 }
                            }
                            return { subQuestions: [], ...item, belongType: 10 }
                        })
                        const res = await (props.onChangeBlur as any)?.(newValue, true)
                        onChange(newValue)
                        return res || false
                    },
                    items: props.items,
                    isMulti: false,
                    onUpdateItems: items => {
                        setInnerItems(items)
                    },
                },
                values || [],
            ),
        [props.items, props.onChangeBlur, onChange, values, renderQuestion],
    )

    const questionTypeStats = useMemo(() => {
        const stats: { [key in QUESTION_TYPE]?: number } = {}
        ;(values || []).forEach(question => {
            const currentCount = stats[question.type] || 0
            stats[question.type] = currentCount + 1
        })
        return Object.entries(stats)
            .map(([questionType, count]) => ({
                questionType: questionType as unknown as QUESTION_TYPE,
                count: count as number,
            }))
            .sort(
                (a, b) =>
                    QUESTION_TYPE_ORDER.indexOf(a.questionType) -
                    QUESTION_TYPE_ORDER.indexOf(b.questionType),
            )
    }, [values])

    const handleBlur = useCallback(() => {
        if (!active || fullScreenStateRef?.current) return
        setActive(false)
        onChangeBlur()
    }, [active, onChangeBlur])

    return (
        <ClickEditActiveContainer
            active={active}
            setActive={setActive}
            onBlur={handleBlur}
            className={classNames(styles.item_question, {
                [styles.active]: active,
                [props.className as string]: props.className,
            })}
            style={props.style}
        >
            <div className={styles.card_header}>
                <div className={styles.card_title}>{props.title}</div>
                {active && (
                    <FullScreenEditBtn
                        type="question"
                        aiTitle="管理试题 & AI出题"
                        ContentRender={ContentRender}
                        title={props.dataTitle}
                        subTitle={props.title}
                        items={innerItems}
                        onOpen={() => (fullScreenStateRef.current = true)}
                        onClose={() => {
                            fullScreenStateRef.current = false
                        }}
                        activityCode={props.activityCode}
                        showFooter={innerValue?.length > 0}
                    />
                )}
            </div>

            <div className={styles.card_content}>
                <div className={styles.question_content}>
                    <div className={styles.question_content_total}>
                        <span>总题数：</span>
                        <span>{(values || []).length}</span>
                    </div>

                    {questionTypeStats.length > 0 && (
                        <div className={styles.question_content_classify}>
                            {questionTypeStats.map(item => (
                                <div
                                    className={styles.question_content_classify_item}
                                    key={item.questionType}
                                >
                                    <span>{QUESTION_TYPE_SIMPLE_LABEL[item.questionType]}：</span>
                                    <span>{item.count}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.card_footer}>
                <Button
                    type="ghost"
                    onClick={() => {
                        setQuestionAddModalVisible(true)
                    }}
                    icon={<PlusOutlined />}
                >
                    手动添加
                </Button>
            </div>

            <QuestionAddModal
                visible={questionAddModalVisible}
                onCancel={() => {
                    setQuestionAddModalVisible(false)
                }}
                onSubmit={async v => {
                    const newValues = [...(values || []), v]
                    onChange(newValues)
                    if (!fullScreenStateRef.current) {
                        const res = await onChangeBlur()
                        if (!res) {
                            return
                        }
                    }
                    setQuestionAddModalVisible(false)
                }}
            />
        </ClickEditActiveContainer>
    )
}

export default React.memo(ClickEditItemQuestionH2Card)
