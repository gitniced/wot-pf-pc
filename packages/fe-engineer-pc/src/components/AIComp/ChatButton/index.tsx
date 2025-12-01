import React, { useState } from 'react'
import styles from './index.module.less'
import { ChatModal } from '../ChatModal'
import { observer } from 'mobx-react'

function ChatButton({ params }: { params: { courseCode?: string } }) {
    const [open, setOpen] = useState(false)
    console.log(params)

    return (
        <>
            <div className={styles.assistant_btn} onClick={() => setOpen(true)}>
                <img src="https://static.zpimg.cn/public/fe-engineer-pc/images/png_aizhushou%402x_96b38b91.png" />
                课程设计助手
            </div>
            {open && (
                <ChatModal
                    params={{ personType: '1' }}
                    open
                    streamUrl="/wil/ai/course_design_assistant"
                    onCancel={() => setOpen(false)}
                    title="AI课程设计助手"
                />
            )}
        </>
    )
}

export default observer(ChatButton)
