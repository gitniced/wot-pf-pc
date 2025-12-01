import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { Button, Space } from 'antd'
import { OptimizeChat } from '@/components/AIComp'
import { LeftOutlined } from '@ant-design/icons'
import type { IFullScreenContentRenderRef } from '../FullScreenContentHOC'
import type { ICourseDataItem } from '../../types'
import type { ChatMessageDto } from '@/components/AIComp/service/types'
import aiStore from '@/modules/ai/store'
import { QuesOptimizeChat } from '@/components/AIComp/QuesOptimizeChat'
import http from '@/servers/http'
import api from './api'

interface IFullScreenEditBtnProps {
    ContentRender: React.ForwardRefExoticComponent<React.RefAttributes<IFullScreenContentRenderRef>>
    title: string
    subTitle: string
    items: ICourseDataItem<any>[]
    type?: 'question' | string
    onOpen?: () => void
    onClose?: () => void
    aiTitle?: string
    activityCode?: string
    transformValue?: (
        value: any,
        setValue: (value: any) => void,
        prevValue: ICourseDataItem<any>[],
    ) => any
    showFooter?: boolean
    aiState?: Record<string, any>
}

export default function FullScreenEditBtn(props: IFullScreenEditBtnProps) {
    const {
        ContentRender,
        title,
        subTitle,
        items,
        type,
        onClose,
        onOpen,
        aiTitle,
        activityCode,
        transformValue,
        showFooter = true,
        aiState,
    } = props
    const [open, setOpen] = useState(false)
    const contentRef = useRef<IFullScreenContentRenderRef>(null)
    const [loading, setLoading] = useState(false)
    const [aiPrompt, setAiPrompt] = useState('')
    const handleOpen = () => {
        setOpen(true)
        onOpen?.()
    }

    const handleCancel = () => {
        setOpen(false)
        onClose?.()
    }

    const handleSave = async () => {
        setLoading(true)
        try {
            const result = await contentRef.current?.save()
            if (result) {
                setLoading(false)
                handleCancel()
            } else {
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
        }
    }

    const handleClick = (clickType: string, values: ChatMessageDto) => {
        switch (clickType) {
            case 'use':
                if (values?.actionJson) {
                    if (transformValue) {
                        const prevValue = contentRef.current?.getValue()
                        transformValue?.(
                            values?.actionJson,
                            contentRef.current?.setValue,
                            prevValue,
                        )
                        return
                    }

                    const newItems = items.map(item => {
                        if (values?.actionJson?.[item.key]) {
                            item.value = values?.actionJson?.[item.key]
                        }
                        return item
                    })
                    console.log('newItems', newItems)
                    contentRef.current?.setValue(newItems)
                }
                break
            // ai出题
            case 'add_ques':
                if (values?.actionJson) {
                    const newItems = items.map(item => {
                        if (values?.actionJson?.questions) {
                            item.value = [
                                ...(item.value ? JSON.parse(item.value) : []),
                                ...(values?.actionJson?.questions.map((i: any, index: number) => ({
                                    ...i,
                                    serialNumber: index + 1,
                                    code: `code_${new Date().getTime()}_${index}`,
                                })) || []),
                            ]
                        }
                        return item
                    })
                    contentRef.current?.setValue(newItems)
                }
                break
            case 'use_ques':
                if (values?.actionJson) {
                    const newItems = items.map(item => {
                        if (values?.actionJson?.questions) {
                            item.value = values?.actionJson?.questions.map(
                                (i: any, index: number) => ({
                                    ...i,
                                    serialNumber: index + 1,
                                    code: `code_${new Date().getTime()}_${index}`,
                                }),
                            )
                        }
                        return item
                    })
                    contentRef.current?.setValue(newItems)
                }
                break
            default:
                break
        }
    }

    useEffect(() => {
        if (activityCode) {
            http<any, string>(api.getQuestionPrompt, 'GET', { code: activityCode }).then(res => {
                setAiPrompt(res)
            })
        }
    }, [activityCode])

    return (
        <>
            <div className={styles.full_screen_edit_btn} onClick={handleOpen}>
                <img src="https://static.zpimg.cn/public/fe-engineer-pc/images/button_ai_small.png" />
                <span>{aiTitle || '优化'}</span>
            </div>
            {open && (
                <div className={styles.full_screen_end_container}>
                    <div className={styles.header_wrapper}>
                        <div className={styles.back_btn} onClick={handleCancel}>
                            <LeftOutlined />
                            返回
                        </div>
                        <div className={styles.header_title}>{title}</div>
                    </div>
                    <div className={styles.content_wrapper}>
                        <div className={styles.left_content}>
                            <div className={styles.title}>{subTitle}</div>
                            <div
                                className={styles.main}
                                style={{ overflow: type === 'question' ? 'visible' : 'auto' }}
                            >
                                <ContentRender ref={contentRef} />
                            </div>
                            <div
                                className={styles.left_content_footer}
                                style={{ display: showFooter ? 'block' : 'none' }}
                            >
                                <Space>
                                    <Button onClick={handleCancel}>取消</Button>
                                    <Button type="primary" onClick={handleSave} loading={loading}>
                                        保存
                                    </Button>
                                </Space>
                            </div>
                        </div>
                        <div className={styles.right_content}>
                            {type !== 'question' ? (
                                <OptimizeChat
                                    params={{
                                        fieldTable: items,
                                        ...aiStore.exchangeData,
                                        ...(aiState || {}),
                                    }}
                                    onOptionsClick={handleClick}
                                />
                            ) : (
                                <QuesOptimizeChat
                                    params={{ ...aiStore.exchangeData, bizType: 'question' }}
                                    defaultContent={aiPrompt}
                                    onOptionsClick={handleClick}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
