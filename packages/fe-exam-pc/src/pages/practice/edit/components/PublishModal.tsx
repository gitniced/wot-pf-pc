// 发布弹窗
import { QRCodeSVG } from 'qrcode.react'
import { Button, Modal, Space, Typography, message, Spin } from 'antd'
import Clipboard from 'clipboard'
import html2canvas from 'html2canvas'
import type { PublishModalProps } from './interface'

import styles from './index.module.less'
import { useEffect, useRef, useState } from 'react'

import { findSiteData } from '@/utils/valueGet'
import { observer, useLocalObservable } from 'mobx-react'

import PracticeStore from '../../store'

import dayjs from 'dayjs'
import type ClipboardJS from 'clipboard'
import useSiteStore from '@/hooks/useSiteStore'
import useUserStore from '@/hooks/useUserStore'

const PublishContent = ({ practiceCode }: { practiceCode?: string }) => {
    const siteStore = useSiteStore()
    const userStore = useUserStore()
    const store = useLocalObservable(() => PracticeStore)

    const { shareDetail, practiceDetail } = store
    const [practiceUrl, setPracticeUrl] = useState<string>()
    const [linkCopy, setLinkCopy] = useState<ClipboardJS | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const posterRef = useRef<HTMLDivElement>(null)

    const getPracticeUrl = () => {
        const { siteData } = siteStore
        const portalH5Url = findSiteData(siteData, 'portalH5Url', { findKey: 'baseInfo' })
        setLoading(true)

        userStore
            ?.getPortalData?.()
            .then((portalInfo: any) => {
                const _practiceUrl = `${portalH5Url}/${
                    portalInfo.customDomain
                }/exam-center/detail/${practiceCode || practiceDetail.code}?type=mine`
                setPracticeUrl(_practiceUrl)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    // 获取分享刷题详情`
    useEffect(() => {
        if (practiceCode) {
            getPracticeUrl()
            store.getPracticeShareDetail(practiceCode)
        }
    }, [practiceCode])

    // 复制刷题链接
    useEffect(() => {
        linkCopy?.destroy()
        const singleInstance = new Clipboard('.link_copy_btn')
        setLinkCopy(singleInstance)

        linkCopy?.on('success', e => {
            message.success('复制成功')
            e.clearSelection()
            linkCopy?.destroy()
        })

        linkCopy?.on('error', () => {
            message.error('复制失败')
        })

        return () => {
            linkCopy?.destroy()
        }
    }, [])

    // 保存刷题海报
    const handleSavePoster = () => {
        if (posterRef) {
            html2canvas(posterRef.current!, {
                useCORS: true,
                scrollY: 0,
                scrollX: 0,
            }).then(canvas => {
                // 将画布转化为图像 URL
                const imgURL = canvas.toDataURL()
                // 创建一个 a 标签用于下载图片
                const linkDOM = document.createElement('a')
                linkDOM.href = imgURL
                linkDOM.download = '练习海报.png'

                // 将标签添加到页面
                document.body.appendChild(linkDOM)

                linkDOM.click()
                document.body.removeChild(linkDOM)
            })
        }
    }

    return (
        <Spin spinning={loading}>
            <div className={styles.component_publish_content}>
                <div className={styles.practice_url}>
                    <Space size={16} align="center">
                        <span className={styles.text}>移动端练习地址</span>
                        <div className={styles.link} id="h5-copy-link">
                            <Typography.Link>{practiceUrl}</Typography.Link>
                        </div>
                        <Button
                            type="primary"
                            className="link_copy_btn"
                            data-clipboard-target="#h5-copy-link"
                        >
                            复制
                        </Button>
                    </Space>
                </div>

                <div className={styles.practice_code}>
                    <Space size={16} align="start">
                        <span className={styles.text}>移动端练习码</span>
                        <div className={styles.poster_wrapper} ref={posterRef}>
                            <div className={styles.org_name}>{shareDetail?.organizationName}</div>

                            <div className={styles.invite_text}>邀请您参加练习</div>

                            <div className={styles.practice_title}>{shareDetail?.title}</div>
                            <div className={styles.total_question}>
                                -共{shareDetail?.questionCount}题-
                            </div>
                            <div className={styles.start_time}>
                                {shareDetail?.startTime
                                    ? `开始时间：${dayjs(shareDetail?.startTime).format(
                                          'YYYY-MM-DD',
                                      )}`
                                    : null}
                            </div>

                            <div className={styles.qr_code_wrapper}>
                                <div className={styles.qr_code}>
                                    <QRCodeSVG width={128} height={128} value={practiceUrl!} />
                                </div>
                                <div className={styles.tips}>扫码参与练习</div>
                            </div>
                        </div>
                        <Button type="primary" onClick={handleSavePoster}>
                            保存
                        </Button>
                    </Space>
                </div>
            </div>
        </Spin>
    )
}

export const ObserverPublishContent = observer(PublishContent)

const PublishModal = ({ open, onCancel, practiceCode }: PublishModalProps) => {
    return (
        <Modal
            width={650}
            title="分享"
            open={open}
            onCancel={onCancel}
            footer={
                <Button type="primary" onClick={onCancel}>
                    关闭
                </Button>
            }
        >
            <ObserverPublishContent practiceCode={practiceCode} />
        </Modal>
    )
}

export default observer(PublishModal)
