import styles from './index.module.less'
import { Modal, message, Spin } from 'antd'
import { useEffect, useState, useCallback } from 'react'
import { CaretRightOutlined } from '@ant-design/icons'
import MdViewer from '@/components/MdViewer'
import { isArray } from 'lodash'

const Index = ({
    name,
    setField,
    getField,
    ws,
    getAIChat,
    recall,
    prev = '',
    next = '',
    master,
    remoteFunc,
    moduleName = '',
    warn = '',
    mode = 'modal',
    maxLength = 300,
}: any) => {
    const [open, setOpen] = useState(false)
    const [desc, setDesc] = useState('')
    const [isEnd, setIsEnd] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (desc && desc.length > 0 && loading) {
            setLoading(false)
        }
    }, [desc, loading])

    const openAiChat = async () => {
        // 兴趣爱好、志愿者经历、个人优势、专业技能
        const title = getField(name)
        const _title = isArray(title) ? title[0] : title
        let keyWord = _title

        // 实习经历、工作经历
        if (moduleName === 'intern' || moduleName === 'work') {
            const field = getField(master)
            if (Array.isArray(field) && field.length > 0) {
                const [{ name: key }] = await remoteFunc(field.slice(-1))
                keyWord = key
            } else if (typeof field === 'string') {
                keyWord = field
            }
            // 教育经历
        } else if (moduleName === 'edu') {
            const field = getField(master)
            if (field) {
                const [{ name: key }] = await remoteFunc([field])
                keyWord = key
            }
            // 社团和组织经历、学术经历、项目经历
        } else if (moduleName === 'societies' || moduleName === 'project') {
            const [name, job] = master
            if (getField(job)) {
                keyWord = getField(name) + getField(job)
            }
        }

        if (moduleName === 'personal' && keyWord.length < 10) {
            return message.warning(warn)
        }

        if (!keyWord) {
            return message.warning(warn)
        }

        const content = prev + keyWord + next
        const sessionCode = await getAIChat(content, _title)

        if (!ws || ws.readyState !== 1) {
            return message.warning('AI续写正在连接, 请稍后重试')
        }

        setLoading(true)

        let timer: any = null
        if (ws.readyState === 1) {
            setDesc(() => '')
            ws.send(JSON.stringify({ cmd: 'select', sessionCode }))
            ws.onerror = () => {
                setLoading(false)
                setIsEnd(true)
                clearTimeout(timer)
            }
            ws.onclose = () => {
                setLoading(false)
                setIsEnd(true)
                clearTimeout(timer)
            }
            ws.onmessage = (e: any) => {
                loading && setLoading(false)
                if (
                    e?.data &&
                    Object.prototype.toString.call(JSON.parse(e.data)) === '[object Object]' &&
                    Object.keys(JSON.parse(e.data)).length > 0
                ) {
                    setIsEnd(() => JSON.parse(e.data).isEnd)
                    setDesc(() => (desc || '') + (JSON.parse(e.data).content || ''))
                }
                clearTimeout(timer)
                // 万一websocket没有返回isEnd, 3秒后自动结束
                timer = setTimeout(() => {
                    setIsEnd(true)
                    clearTimeout(timer)
                }, 8000)
            }
        } else {
            setIsEnd(true)
            setLoading(false)
            recall()
            message.warning('AI续写失败, 请稍后重试')
        }

        setOpen(true)
    }

    // modal确定的回调
    const handleOk = () => {
        if (!isEnd) {
            message.warning('AI回复中, 请耐心等待回复结束')
        } else {
            setDesc('')
            setField(name, desc?.slice(0, maxLength)?.trim())
            setOpen(false)
        }
    }

    // modal窗关闭的回调
    const handleCancel = useCallback(() => {
        if (!isEnd || loading) {
            message.warning('AI回复中, 请耐心等待回复结束')
        } else {
            setOpen(false)
            setDesc('')
        }
    }, [isEnd, loading])

    return (
        <>
            <Modal
                width={1000}
                title="AI职灵"
                open={open}
                onOk={handleOk}
                okText="使用此描述"
                onCancel={handleCancel}
            >
                <Spin spinning={loading} tip="AI加载中..." size="large">
                    <div style={{ height: 300, overflowY: 'scroll' }}>
                        <MdViewer content={desc?.trim?.()} />
                    </div>
                </Spin>
            </Modal>
            {mode === 'modal' && (
                <div onClick={openAiChat} className={styles.ai_container}>
                    <div className={styles.ai_wrap}>
                        <div className={styles.content}>
                            <img
                                style={{ width: 40, height: 40 }}
                                src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/dev/fe_job_pc/img/png_jiqiren@2x.png"
                                alt=""
                            />
                            <div className={styles.ai_text}>AI职灵</div>
                            <span>给你灵感</span>
                        </div>
                        <CaretRightOutlined style={{ color: '#A0ADBE' }} />
                    </div>
                </div>
            )}
        </>
    )
}

export default Index
