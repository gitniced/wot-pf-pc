import { Empty, Modal } from 'antd'
import React, { useEffect, useRef } from 'react'
import './index.less'
import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons'
import type { GenerateInterface } from './types'
import { observer, useLocalObservable } from 'mobx-react'
import { Store } from './store'
import { useDeepCompareEffect } from 'ahooks'
import classNames from 'classnames'
import DotLoading from '../components/DotLoading'
import { CustomMarkdown } from '../components/CustomMarkdown'
import { useSmartScroll } from '../hooks/useSmartScroll'

export const GenerateModal = observer((props: GenerateInterface) => {
    const { open, onCancel, historyList, title, getHistory, params, onOptionsClick, sseData } =
        props
    const store = useLocalObservable(() => new Store())
    const { currentData } = store
    const contentRef = useRef<HTMLDivElement>(null)

    useDeepCompareEffect(() => {
        store.setParams(params)
    }, [params])

    useEffect(() => {
        if (sseData.sessionCode && store.currentCode === sseData.sessionCode) {
            store.setCurrentData(sseData)
        }
    }, [sseData, store.currentCode])

    useSmartScroll(contentRef, store.currentData?.content, [store.isGenerating])

    useEffect(() => {
        if (historyList?.[0]?.code) {
            store.getAnswerData(historyList?.[0]?.code)
        } else {
            store.setCurrentData(null)
            store.setCurrentCode('')
        }
    }, [historyList])

    useEffect(() => {
        return () => {
            clearTimeout(store.timer)
        }
    }, [])

    return (
        <Modal
            open={open}
            footer={false}
            wrapClassName="pt_ai_modal__container"
            className="pt_ai_modal__wrapper"
            mask={false}
            style={{
                top: 0,
                paddingBottom: 0,
                marginRight: 0,
                minWidth: 700,
            }}
            width={960}
            onCancel={onCancel}
            maskClosable={false}
        >
            <div className="pt_ai_modal__body">
                <div className="pt_ai_modal__left">
                    <div className="pt_ai_modal__title_text">
                        <span>AI一键生成</span>
                    </div>
                    <div className="pt_ai_modal__history">
                        <span className="pt_ai_modal__history_subtitle">
                            生成记录({historyList.length || 0})
                        </span>
                        <div className="pt_ai_modal__history_wrapper">
                            {historyList.map(({ title: t, code }) => {
                                return (
                                    <div
                                        className={classNames('history_item', {
                                            selected: code === store.currentCode,
                                        })}
                                        key={code}
                                        onClick={() => store.getAnswerData(code)}
                                    >
                                        <div className="icon_wrapper">
                                            <svg className="icon" aria-hidden="true">
                                                <use xlinkHref={`#message1`} />
                                            </svg>
                                        </div>
                                        <span>{t}</span>
                                    </div>
                                )
                            })}
                            {!historyList?.length && <Empty className="pt_ai_modal__empty" />}
                        </div>
                    </div>
                </div>
                <div className="pt_ai_modal__right">
                    <div className="pt_ai_modal__right_title">{title}</div>
                    <div className="pt_ai_modal__right_content" ref={contentRef}>
                        {/* 显示流式更新状态 */}
                        {store.isGenerating && !store.currentData?.code && (
                            <div className="streaming_indicator">
                                内容生成中 <DotLoading />
                            </div>
                        )}
                        {store.currentData?.code && (
                            <div className="answer_wrapper">
                                <CustomMarkdown>{store.currentData?.content || ''}</CustomMarkdown>
                                {/* 显示流式更新状态 */}
                                {store.isGenerating && (
                                    <div
                                        className="streaming_indicator"
                                        style={{ marginBottom: 40 }}
                                    >
                                        {store.currentData?.content ? '' : '内容生成中'}{' '}
                                        <DotLoading />
                                    </div>
                                )}
                                {!store.isGenerating && (
                                    <div className="options_bar">
                                        <div
                                            className={classNames('blank_btn', {
                                                disabled: store.isGenerating,
                                            })}
                                            onClick={() => store.generate(getHistory)}
                                        >
                                            <SyncOutlined />
                                            重新生成
                                        </div>

                                        <div
                                            className={classNames('blank_btn', {
                                                disabled: store.isGenerating,
                                            })}
                                            onClick={() => {
                                                store.converterContent().then(() => {
                                                    onOptionsClick?.('use')
                                                })
                                            }}
                                        >
                                            <CheckCircleOutlined />
                                            使用
                                        </div>

                                        <div
                                            className={`solid_btn ${
                                                currentData.likeState === 1 ? 'selected' : ''
                                            }`}
                                            onClick={() =>
                                                store.toggleMessageLike(
                                                    currentData.code!,
                                                    currentData.likeState === 1 ? 0 : 1,
                                                )
                                            }
                                        >
                                            <svg className="icon" aria-hidden="true">
                                                {/* dianzan_mian */}
                                                <use
                                                    xlinkHref={
                                                        currentData.likeState === 1
                                                            ? '#dianzan_mian'
                                                            : `#dianzan`
                                                    }
                                                />
                                            </svg>
                                        </div>
                                        <div
                                            className={`solid_btn ${
                                                currentData.likeState === -1 ? 'selected' : ''
                                            }`}
                                            onClick={() =>
                                                store.toggleMessageLike(
                                                    currentData.code!,
                                                    currentData.likeState === -1 ? 0 : -1,
                                                )
                                            }
                                        >
                                            <svg className="icon" aria-hidden="true">
                                                <use
                                                    xlinkHref={
                                                        currentData.likeState === -1
                                                            ? `#cai_mian`
                                                            : '#cai'
                                                    }
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {!store.isGenerating && !store.currentData?.code && (
                            <Empty className="pt_ai_modal__empty" />
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    )
})
