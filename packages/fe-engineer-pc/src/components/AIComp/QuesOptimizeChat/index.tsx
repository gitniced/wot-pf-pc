import React, { useRef, useEffect } from 'react'
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    LeftOutlined,
    SyncOutlined,
} from '@ant-design/icons'
import './index.less'
import ChatInput from '../components/ChatInput'
import { observer, useLocalObservable } from 'mobx-react'
import type { OptimizeResult } from './store'
import { Store } from './store'
import { CustomMarkdown } from '../components/CustomMarkdown'
import { useDeepCompareEffect } from 'ahooks'
import DotLoading from '../components/DotLoading'
import { Button, Dropdown, Form, InputNumber, message as antMessage, Spin } from 'antd'
import { QUESTION_TYPE, QUESTION_TYPE_LABEL } from '@/modules/question/const'
import { sortBy } from '../../../utils/questionSort'
import { useSmartScroll } from '../hooks/useSmartScroll'
interface QuesOptimizeChatProps {
    params: any
    onOptionsClick: (type: string, values: any) => void
    defaultContent?: string
}

export const QuesOptimizeChat = observer(function (props: QuesOptimizeChatProps) {
    const { params, onOptionsClick, defaultContent } = props
    const store = useLocalObservable(() => new Store())
    const { step, setStep } = store
    const contentRef = useRef<HTMLDivElement>(null)
    const [form] = Form.useForm()

    const handleUse = (msg: OptimizeResult) => {
        if (Number(msg.finishStatus) === 3) {
            onOptionsClick?.('use_ques', msg)
        }
    }

    const handleAdd = (msg: OptimizeResult) => {
        if (Number(msg.finishStatus) === 3) {
            onOptionsClick?.('add_ques', msg)
        }
    }

    useDeepCompareEffect(() => {
        store.setParams(params)
    }, [params])

    useSmartScroll(contentRef, store.messages?.[1]?.content, [store.currentOptimizeResult])

    useEffect(() => {
        if (defaultContent) {
            store.setInput(defaultContent)
        }
    }, [defaultContent])

    useEffect(() => {
        store.getHistoryData()
    }, [])

    return (
        <div className="ques_optimize_container">
            {step === 0 ? (
                <div className="optimize_container_title">
                    <img src="https://static.zpimg.cn/public/fe-engineer-pc/images/ai_small_icon_c47234e4.png" />
                    <span>出题</span>
                </div>
            ) : (
                <div
                    className="optimize_container_title"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        setStep(0)
                        store.closeStream()
                        store.setMessages([])
                        store.setInput(defaultContent)
                    }}
                >
                    <LeftOutlined />
                    <span>出题记录</span>
                </div>
            )}
            <div
                className="question_optimize_wrapper"
                style={{ display: step === 0 ? 'flex' : 'none' }}
            >
                <Spin spinning={store.streaming}>
                    <div className="question_wrapper">
                        <div className="question_tips">按专业信息/知识点/学习活动等生成题目</div>
                        <ChatInput
                            placeholder="请输入专业信息/知识点/学习活动等描述内容"
                            value={store.inputText}
                            onChange={store.setInput}
                            disabled={store.streaming}
                            showSend={false}
                            onClose={store.closeStream}
                        />
                        <div className="question_tips">出题数量</div>
                        <div>
                            <Form className="ques_form_wrap" layout="inline" form={form}>
                                <Form.Item name={QUESTION_TYPE.single} label="单选题">
                                    <InputNumber min={1} max={10} precision={0} />
                                </Form.Item>
                                <Form.Item name={QUESTION_TYPE.multiple} label="多选题">
                                    <InputNumber min={1} max={10} precision={0} />
                                </Form.Item>
                                <Form.Item name={QUESTION_TYPE.judgment} label="判断题">
                                    <InputNumber min={1} max={10} precision={0} />
                                </Form.Item>
                                <Form.Item name={QUESTION_TYPE.fill} label="填空题">
                                    <InputNumber min={1} max={10} precision={0} />
                                </Form.Item>
                                <Form.Item name={QUESTION_TYPE.essay} label="简答题">
                                    <InputNumber min={1} max={10} precision={0} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Spin>
                <div className="question_options_bar">
                    <div>
                        {store.historyList.length > 0 ? (
                            <Dropdown
                                menu={{
                                    items: store.historyList.map(item => ({
                                        key: item.code,
                                        label: item.title,
                                    })),
                                    onClick: item => {
                                        store.getAnswerData(item.key)
                                    },
                                }}
                                placement="top"
                                overlayClassName="history_dropdown"
                                getPopupContainer={() =>
                                    document.querySelector('.question_options_bar') as HTMLElement
                                }
                            >
                                <div className="">出题记录({store.historyList.length})</div>
                            </Dropdown>
                        ) : (
                            <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>出题记录(0)</div>
                        )}
                    </div>
                    <Button
                        className="generate_btn"
                        type="primary"
                        disabled={!store.inputText}
                        onClick={() =>
                            form.validateFields().then((val: any) => {
                                // 计算所有题型数量的总和
                                const total: number = Object.values(val).reduce(
                                    (acc, curr) => Number(acc) + Number(curr || 0),
                                    0,
                                ) as number
                                if (total <= 0) {
                                    antMessage.error('请输入出题数量')
                                    return
                                }

                                store.sendMessage(val)
                                form.resetFields()
                            })
                        }
                    >
                        生成题目
                    </Button>
                </div>
            </div>
            <div
                className="optimize_container_content"
                ref={contentRef}
                style={{ display: step === 0 ? 'none' : 'flex' }}
            >
                {/* 对话历史记录 */}
                {store?.messages?.map((message, index) => (
                    <div
                        key={message.code}
                        className={
                            message.messageRole === 'user'
                                ? 'optimize_right_block'
                                : 'optimize_left_block'
                        }
                    >
                        {message.messageRole === 'user' ? (
                            <div>
                                <div className="message_content">
                                    {message.content}
                                    <div className="question_config">
                                        {sortBy
                                            .filter(
                                                key =>
                                                    message?.actionJson?.extra?.questionConfig[
                                                        key
                                                    ] > 0,
                                            )
                                            .map(
                                                key =>
                                                    `${
                                                        QUESTION_TYPE_LABEL[
                                                            Number(key) as QUESTION_TYPE
                                                        ]
                                                    }: ${
                                                        message?.actionJson?.extra?.questionConfig[
                                                            key
                                                        ]
                                                    }`,
                                            )
                                            .join(' | ')}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <CustomMarkdown>{message.content}</CustomMarkdown>
                                {store.streaming && index === store.messages.length - 1 && (
                                    <DotLoading style={{ marginBotton: 10 }} />
                                )}
                                {/* 每条 AI 助手消息都显示操作按钮 */}
                                {(!store.streaming || index !== store.messages.length - 1) && (
                                    <div className="options_bar">
                                        <div
                                            className={`blank_btn ${
                                                store.streaming && 'disabled_btn'
                                            }`}
                                            onClick={() =>
                                                !store.streaming &&
                                                store.regenerate({
                                                    ...message,
                                                    userPrompt:
                                                        store.messages?.[index - 1]?.content ||
                                                        '重新生成',
                                                })
                                            }
                                        >
                                            <SyncOutlined />
                                            重新生成
                                        </div>

                                        <div
                                            className={`blank_btn ${
                                                (message?.finishStatus || 0) !== 3 && 'disabled_btn'
                                            }`}
                                            onClick={() => {
                                                handleUse(message)
                                            }}
                                        >
                                            {message?.finishStatus === 2 && <Spin size="small" />}
                                            {message?.finishStatus === 3 && <CheckCircleOutlined />}
                                            {message?.finishStatus === 4 && <CloseCircleOutlined />}
                                            替换现有题目
                                        </div>
                                        <div
                                            className={`blank_btn ${
                                                (message?.finishStatus || 0) !== 3 && 'disabled_btn'
                                            }`}
                                            onClick={() => {
                                                handleAdd(message)
                                            }}
                                        >
                                            {message?.finishStatus === 2 && <Spin size="small" />}
                                            {message?.finishStatus === 3 && <CheckCircleOutlined />}
                                            {message?.finishStatus === 4 && <CloseCircleOutlined />}
                                            追加题目
                                        </div>
                                        <div
                                            className={`solid_btn ${
                                                message.likeState === 1 ? 'liked' : ''
                                            }`}
                                            onClick={() =>
                                                store.toggleMessageLike(
                                                    message.code,
                                                    message.likeState === 1 ? 0 : 1,
                                                )
                                            }
                                        >
                                            <svg className="icon" aria-hidden="true">
                                                {/* dianzan_mian */}
                                                <use
                                                    xlinkHref={
                                                        message.likeState === 1
                                                            ? '#dianzan_mian'
                                                            : `#dianzan`
                                                    }
                                                />
                                            </svg>
                                        </div>
                                        <div
                                            className={`solid_btn ${
                                                message.likeState === -1 ? 'disliked' : ''
                                            }`}
                                            onClick={() =>
                                                store.toggleMessageLike(
                                                    message.code,
                                                    message.likeState === -1 ? 0 : -1,
                                                )
                                            }
                                        >
                                            <svg className="icon" aria-hidden="true">
                                                <use
                                                    xlinkHref={
                                                        message.likeState === -1
                                                            ? `#cai_mian`
                                                            : '#cai'
                                                    }
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
})
