import { useEffect, useRef, useState } from 'react'
import Http from '@/servers/http'
import styles from './index.module.less'
import { Button, Space, Typography, message } from 'antd'
import dayjs from 'dayjs'
import Clipboard from 'clipboard'
import { QRCodeSVG } from 'qrcode.react'
import html2canvas from 'html2canvas'

interface IBrushQstDetailsProps {
    practiceCode: string
    midMobileDomain: string
}

const Api = {
    // 获取练习详情
    getDetails: '/question/front/practice/share/detail',
}

/**  练习详情   */
const BrushQstDetails: React.FC<IBrushQstDetailsProps> = ({
    practiceCode,
    midMobileDomain = '-',
}) => {
    const [brushQstInfo, setBrushQstInfo] = useState<any>({})
    const posterRef = useRef<HTMLDivElement>(null)

    const getBrushQstDetails = async (code: string) => {
        let res = await Http(`${Api.getDetails}/${code}`, 'get', {})
        setBrushQstInfo(res)
    }
    useEffect(() => {
        if (practiceCode) {
            getBrushQstDetails(practiceCode)
        }
    }, [practiceCode])

    useEffect(() => {
        const linkCopyInstance = new Clipboard('.link_copy_btn')

        linkCopyInstance.on('success', e => {
            message.success('复制成功')
            e.clearSelection()
        })

        linkCopyInstance.on('error', () => {
            message.error('复制失败')
        })

        return () => {
            linkCopyInstance.destroy()
        }
    }, [])

    /**  点击保存海报  */
    const onSavePoster = () => {
        if (posterRef) {
            html2canvas(posterRef.current!, {
                useCORS: true,
                scrollY: 0,
                scrollX: 0,
                backgroundColor: null,
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

    /**  url   */
    const getUrl = () => {
        return `${midMobileDomain}/exam-center/detail/${practiceCode}`
    }

    return (
        <div className={styles.component_brush_questions}>
            <div className={styles.practice_url}>
                <Space size={16} align="center">
                    <span className={styles.text}>移动端练习地址</span>
                    <div className={styles.link} id="h5-copy-link">
                        <Typography.Link>{getUrl()}</Typography.Link>
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
                        <div className={styles.org_name}>{brushQstInfo?.organizationName}</div>

                        <div className={styles.invite_text}>邀请您参加练习</div>

                        <div className={styles.practice_title}>{brushQstInfo?.title}</div>

                        <div className={styles.practice_number}>
                            {brushQstInfo?.questionCount
                                ? `共${brushQstInfo?.questionCount}题`
                                : `共0题`}
                        </div>

                        <div className={styles.start_time}>
                            {brushQstInfo?.startTime
                                ? `开始时间：${dayjs(brushQstInfo?.startTime).format('YYYY-MM-DD')}`
                                : null}
                        </div>
                        <div className={styles.qr_code_wrapper}>
                            <div className={styles.qr_code}>
                                <QRCodeSVG width={128} height={128} value={getUrl()} />
                            </div>
                            <div className={styles.tips}>扫码参与练习</div>
                        </div>
                    </div>
                    <Button type="primary" onClick={onSavePoster}>
                        保存
                    </Button>
                </Space>
            </div>
        </div>
    )
}

export default BrushQstDetails
