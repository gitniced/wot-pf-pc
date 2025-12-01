import { Modal } from 'antd'
import React, { useEffect } from 'react'
import './index.less'
import ChatContent from '../components/ChatContent'
import { Store } from './store'
import { observer, useLocalObservable } from 'mobx-react'
import type { TaskGuideModalInterface } from './types'

export const TaskGuideModal = observer((props: TaskGuideModalInterface) => {
    const { open, onCancel, streamUrl, params, preprocess } = props
    const store = useLocalObservable(() => new Store())

    useEffect(() => {
        if (streamUrl) store.streamUrl = streamUrl
    }, [streamUrl])

    useEffect(() => {
        if (!open) {
            store.closeModal()
        } else {
            store.setParams(params)
            store.loadMessages(params.sessionCode)
        }
    }, [open])

    useEffect(() => {
        preprocess?.(store.sendMessage)
    }, [preprocess])

    return (
        <Modal
            open={open}
            footer={false}
            wrapClassName="pt_ai_task_modal__container"
            className="pt_ai_task_modal__wrapper"
            mask={false}
            style={{
                top: 0,
                paddingBottom: 0,
                marginRight: 0,
                minWidth: 700,
            }}
            width={700}
            onCancel={onCancel}
        >
            <div className="pt_ai_task_modal__body">
                <div className="pt_ai_task_modal__right">
                    <div className="pt_ai_task_modal__title">
                        <img
                            src="https://static.zpimg.cn/public/fe-engineer-pc/images/png_aizhushou%402x_96b38b91.png"
                            alt=""
                        />
                        <span>AI助教</span>
                    </div>
                    <div className="pt_ai_task_modal__content">
                        <ChatContent store={store} style={{ paddingTop: 16 }} />
                    </div>
                </div>
            </div>
        </Modal>
    )
})
