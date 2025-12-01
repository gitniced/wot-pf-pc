/**
 * 试题卡片 item
 */
import { InputNumber, Space, Image } from 'antd'
import type { QuestionDetailType } from '../../interface'
import React, { useState } from 'react'
import type { ReactNode } from 'react'
import { oneDecimal } from '@/utils/numberTransform'
import styles from '../../index.module.less'
import { QUESTION_TYPE_ENUM } from '@/pages/question/[type]/constants'
import { getCookie } from '@wotu/wotu-components'
import useCommonParams from '@/hooks/useCommonParams'
import dayjs from 'dayjs'

interface ExamineItemCardType {
    // 试题列表数据
    data: QuestionDetailType
    // 改变分值数据回调
    changeScoreCallback?: (value: string, item: QuestionDetailType['questionList'][0]) => void
    // 分值是否可编辑
    editable?: boolean
    // 头部子内容
    children?: ReactNode | ((data: QuestionDetailType['questionList'][0]) => ReactNode)

    showVersion?: boolean
}
interface OptionType {
    answer: string
    isAnswer: number
    sort: number
}

const formatData = (v: string) => {
    if (!v) return v
    return oneDecimal(v)
}

const ExamineItemCard = ({
    data,
    editable,
    changeScoreCallback,
    children,
    showVersion
}: ExamineItemCardType) => {
    const [src, setSrc] = useState<string>('')
    const { skill } = useCommonParams()
    const previewImg = (node: any) => {
        setSrc(node?.target?.src)
    }
    /**
     * 题目组件
     * @param props { logicSort: 序号; title: 题目 }
     * @returns
     */
    const TitleItem = (props: { logicSort: number | string; title: string }) => {
        const { logicSort, title } = props || {}
        return (
            <div className={styles.topic}>
                <div className={styles.serial}>{logicSort}</div>
                <div
                    onClick={previewImg}
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: title || '-' }}
                />
            </div>
        )
    }
    /**
     * 选项组件展示
     * @param props {type: 题目类型, optionList: 选项列表}
     * @returns
     */
    const OptionItems = (props: { type: number; optionList: OptionType[] }) => {
        const { type, optionList = [] } = props || {}
        optionList.sort((a, b) => Number(a.sort) - Number(b.sort))

        return (
            <div className={styles.option_items}>
                {optionList.map((value, index) => {
                    return (
                        <React.Fragment key={value.sort}>
                            {/* 判断，单选，多选展示选项 */}
                            {[10, 20, 30].includes(type) && (
                                <div className={styles.examine_item_option}>
                                    <div className={styles.key}>
                                        {String.fromCharCode(65 + Number(index))}
                                    </div>
                                    <div
                                        onClick={previewImg}
                                        className={styles.content}
                                        dangerouslySetInnerHTML={{ __html: value.answer || '-' }}
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    )
                })}
            </div>
        )
    }
    /**
     * 答案解析组件
     * @param props {type: 题目类型; analysis: 解析; optionList: 选项列表}
     * @returns
     */
    const AnswerItem = (props: { type: number; analysis: string; optionList: OptionType[] }) => {
        const { type, analysis, optionList = [] } = props || {}
        const _options = optionList
            .sort((a, b) => Number(a.sort) - Number(b.sort))
            .map((option, index) => ({
                ...option,
                sort: index,
            }))
        const answerList = _options.filter(ele => ele.isAnswer === 1)

        return (
            <div className={styles.examine_item_answer}>
                <div className={styles.item}>
                    <div className={styles.name}>正确答案</div>
                    <div className={styles.value}>
                        <span className={styles.gray}>：</span>
                        {[20, 30].includes(type) ? (
                            <span>
                                {answerList
                                    .map(item => String.fromCharCode(65 + Number(item.sort)))
                                    .join(' ') || '-'}
                            </span>
                        ) : (
                            <span
                                onClick={previewImg}
                                className={styles.content}
                                dangerouslySetInnerHTML={{
                                    __html: answerList.map(item => item.answer).join('；') || '-',
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.name}>解析</div>
                    <div className={styles.value}>
                        <span className={styles.gray}>：</span>
                        <span
                            onClick={previewImg}
                            className={styles.content}
                            dangerouslySetInnerHTML={{
                                __html: analysis || '-',
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
    /**
     * 小题组件
     * @param props {questionDetail：题目详情}
     * @returns
     */
    const QuestionCard = (props: {
        index: number
        questionDetail: QuestionDetailType['questionList'][0]
        parentQuestionCode?: string
    }) => {
        const { questionDetail, parentQuestionCode, index } = props || {}
        const { title, questionType, options, analysis, score } = questionDetail || {}
        return (
            <div className={styles.examine_item_card}>
                <div className={styles.examine_item_title}>
                    <TitleItem logicSort={`【小题${index + 1}】`} title={title} />

                    {editable ? (
                        <Space style={{ flexShrink: 0 }}>
                            <label>分值:</label>
                            <InputNumber
                                size="small"
                                placeholder="请输入"
                                // @ts-ignore
                                value={score || undefined}
                                onBlur={e =>
                                    // @ts-ignore
                                    changeScoreCallback?.(oneDecimal(e.target.value), {
                                        ...data,
                                        ...questionDetail,
                                        parentQuestionCode,
                                    })
                                }
                                // @ts-ignore
                                formatter={formatData}
                                // @ts-ignore
                                parser={formatData}
                                style={{ width: '88px' }}
                            />
                            分
                        </Space>
                    ) : (
                        <div className={styles.score}>{score} 分</div>
                    )}
                </div>
                <div className={styles.pl80}>
                    <OptionItems type={questionType} optionList={options || []} />
                    {options && options.length > 0 && (
                        <AnswerItem
                            type={questionType}
                            analysis={analysis}
                            optionList={options || []}
                        />
                    )}
                </div>
            </div>
        )
    }
    return (
        <>
            {(data?.questionList || []).map(item => {
                return (
                    <div
                        className={styles.examine_item}
                        key={item.questionCode}
                        id={item.questionCode}
                    >
                        {typeof children === 'function' ? children(item) : children}

                        <div className={styles.examine_item_content}>
                            <div className={styles.examine_item_title}>
                                <TitleItem logicSort={`${item?.logicSort}、`} title={item?.title} />
                                {editable ? (
                                    <Space style={{ flexShrink: 0 }}>
                                        <label>分值:</label>
                                        <InputNumber
                                            size="small"
                                            placeholder="请输入"
                                            // @ts-ignore
                                            value={item?.score || undefined}
                                            onBlur={e =>
                                                // @ts-ignore
                                                changeScoreCallback?.(oneDecimal(e.target.value), {
                                                    ...data,
                                                    ...item,
                                                })
                                            }
                                            // @ts-ignore
                                            formatter={formatData}
                                            // @ts-ignore
                                            parser={formatData}
                                            style={{ width: '88px' }}
                                            disabled={[
                                                QUESTION_TYPE_ENUM.COMPOSE,
                                                QUESTION_TYPE_ENUM.ANALYSIS,
                                            ].includes(item.questionType)}
                                        />
                                        分
                                    </Space>
                                ) : (
                                    <div className={styles.score}>
                                        {getCookie('ALIAS') === 'esh' && skill === 20 && showVersion ? <span style={{ margin: '0 10px' }}>
                                            版本号: {item?.version || '-'}{item?.version ? `(${dayjs(item?.storageTime).format('YYYY-MM-DD HH:mm:ss')})` : ''}</span> : null}
                                        {item.score} 分
                                    </div>
                                )}
                            </div>
                            <OptionItems
                                type={data?.questionType}
                                optionList={item?.options || []}
                            />
                            {item?.options && item?.options.length > 0 && (
                                <AnswerItem
                                    type={data?.questionType}
                                    analysis={item?.analysis}
                                    optionList={item?.options || []}
                                />
                            )}
                            {(item?.childList || []).map((ele, index) => (
                                <React.Fragment key={ele.questionCode}>
                                    <QuestionCard
                                        index={index}
                                        questionDetail={ele}
                                        parentQuestionCode={item.questionCode}
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )
            })}
            {!!src && (
                <Image
                    style={{ display: 'none', position: 'absolute' }}
                    preview={{
                        visible: !!src,
                        src,
                        onVisibleChange: value => {
                            if (!value) {
                                setSrc('')
                            }
                        },
                    }}
                />
            )}
        </>
    )
}

export default ExamineItemCard
