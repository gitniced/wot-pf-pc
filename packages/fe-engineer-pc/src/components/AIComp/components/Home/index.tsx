import React from 'react'
import styles from './index.module.less'
import ChatInput from '../ChatInput'
import { ArrowRightOutlined } from '@ant-design/icons'
// import { ArrowRightOutlined } from '@ant-design/icons'

interface Props {
    recommendQuestions?: any[]
    value: string
    onChange: (val: string) => void
    onSend: () => void
    welcome?: string
    title?: string
}

export default function Home({
    recommendQuestions,
    value,
    onChange,
    onSend,
    welcome,
    title,
}: Props) {
    return (
        <div className={styles.home_wrapper}>
            <div className={styles.title}>
                <img
                    src="https://static.zpimg.cn/public/fe-engineer-pc/images/png_aizhushou%402x_96b38b91.png"
                    alt=""
                />
                <span>你好，我是你的{title || 'AI助教'}</span>
            </div>
            <div className={styles.tips}>
                {welcome ||
                    '不管是看不懂的知识点、课后任务的困惑，还是项目中的小难题，随时提问，我来帮你解答！'}
            </div>
            <div className={styles.input_wrapper}>
                <ChatInput value={value} onChange={onChange} onSend={onSend} />
            </div>
            <div className={styles.more_ques}>
                {recommendQuestions?.map(({ title: t, code }: any) => {
                    return (
                        <div
                            className={styles.ques_item}
                            onClick={() => {
                                onChange(t)
                                onSend()
                            }}
                            key={code}
                        >
                            <span>{t}</span>
                            <ArrowRightOutlined />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
