import { Button, Form, Input, message, Space } from 'antd'
import { QRCodeSVG } from 'qrcode.react'
import styles from './index.module.less'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { domToPng } from 'modern-screenshot'
import { getDetailData } from './api'
import { useLocation } from 'umi'
import { findSiteData } from '@wotu/wotu-components'
import { inject, observer } from 'mobx-react'
import { getLocalStorage } from '@/storage'

const Share = (props: any) => {
    const [form] = Form.useForm()

    const { siteStore } = props
    const [shareUrl, setShareUrl] = useState<string>('')
    const [shareH5Url, setShareH5Url] = useState<string>('')
    const [current, setCurrent] = useState<number>(0)
    const [activityData, setActivityData] = useState<any>({})
    const { selectedOrganizationDetail } = getLocalStorage('USER_STORE') || {}

    let { query }: any = useLocation()
    let { code } = query || {}

    useEffect(() => {
        const { name: organizationName } = selectedOrganizationDetail || {}
        setTimeout(() => {
            document.title = organizationName ? `活动分享-${organizationName}` : '活动分享'
        }, 1000)
    }, [selectedOrganizationDetail])

    useEffect(() => {
        getDetailData({ code }).then((res: any) => {
            let midDomain =
                findSiteData(siteStore?.siteData, 'midDomain', { findKey: 'baseInfo' }) || ''
            let midMobileDomain =
                findSiteData(siteStore?.siteData, 'midMobileDomain', { findKey: 'baseInfo' }) || ''
            setActivityData(res)
            setShareUrl(`${midDomain}/enroll-gateway/event-detail?code=${code}&applyChannel=link`)
            setShareH5Url(
                `${midMobileDomain}/enroll-center/event-detail?code=${code}&applyChannel=link`,
            )
        })
    }, [])

    const TemplateOne = (
        <div className={styles.first_poster_wrapper}>
            <div className={styles.first_poster_inner}>
                <img className={styles.poster_cover} src={activityData?.coverUrl} />
                <div className={styles.name}>{activityData?.activityName}</div>
                <div className={styles.time}>活动时间：{activityData?.dateDesc}</div>
                <div className={styles.divider} />
                <div className={styles.qrcode_wrapper}>
                    <QRCodeSVG value={shareH5Url!} width={80} height={80} />
                    <img
                        src="https://static.zpimg.cn/public/fe-admin-pc/png_zhiwen.png"
                        width={80}
                        height={80}
                    />
                </div>
                <div className={styles.qrcode_text}>扫码参加活动！长按识别二维码</div>
            </div>
            <div className={styles.site_wrapper}>
                <img
                    className={styles.site_logo}
                    src={
                        selectedOrganizationDetail?.logo ||
                        'https://i.zpimg.cn/public_read/22102410qdkcjk.png'
                    }
                    width={20}
                    height={20}
                />
                <div className={styles.site_name}>{selectedOrganizationDetail?.name}</div>
            </div>
        </div>
    )
    const TemplateTwo = (
        <div className={styles.second_poster_wrapper}>
            <div className={styles.second_poster_top}>
                <div className={styles.second_poster_title}>{activityData?.activityName}</div>
                <div className={styles.second_poster_time}>活动时间：{activityData?.dateDesc}</div>
            </div>
            <div className={styles.second_poster_bottom}>
                <div className={styles.second_poster_qr_code}>
                    <QRCodeSVG
                        id="QR-code"
                        value={shareH5Url!}
                        size={64}
                        fgColor="#000000"
                        className={styles.second_poster_qrCode_img}
                    />
                    <div className={styles.second_poster_bottom_right}>
                        <div>扫码参加活动！</div>
                        <div>长按识别二维码</div>
                    </div>
                </div>
                <div className={styles.second_poster_sid}>
                    <img
                        className={styles.second_poster_sid_logo}
                        src={
                            selectedOrganizationDetail?.logo ||
                            'https://i.zpimg.cn/public_read/22102410qdkcjk.png'
                        }
                        width={20}
                        height={20}
                    />
                    <div className={styles.second_poster_sid_name}>
                        {selectedOrganizationDetail?.name}
                    </div>
                </div>
            </div>
        </div>
    )

    const TemplateThree = (
        <div className={styles.third_poster_wrapper}>
            <div className={styles.third_poster_inner}>
                <div className={styles.third_poster_inner_top}>
                    <img className={styles.poster_cover} src={activityData?.coverUrl} />
                    <div className={styles.name}>{activityData?.activityName}</div>
                    <div className={styles.time}>活动时间：{activityData?.dateDesc}</div>
                </div>
                <div className={styles.third_poster_inner_bottom}>
                    <div className={styles.qr_code_wrapper}>
                        <QRCodeSVG id="QR-code" value={shareH5Url!} size={64} fgColor="#000000" />
                        <div className={styles.qr_code_wrapper_right}>
                            <div className={styles.first_child}>扫码参加活动！</div>
                            <div className={styles.second_child}>长按识别二维码</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.site_wrapper}>
                <img
                    className={styles.site_logo}
                    src={
                        selectedOrganizationDetail?.logo ||
                        'https://i.zpimg.cn/public_read/22102410qdkcjk.png'
                    }
                    width={20}
                    height={20}
                />
                <div className={styles.site_name}>{selectedOrganizationDetail?.name}</div>
            </div>
        </div>
    )

    const TemplateFour = (
        <div className={styles.fourth_poster_wrapper}>
            <div className={styles.fourth_poster_inner}>
                <div className={styles.fourth_poster_inner_top}>
                    <img className={styles.poster_cover} src={activityData?.coverUrl} />
                    <div className={styles.name}>{activityData?.activityName}</div>
                    <div className={styles.time}>活动时间：{activityData?.dateDesc}</div>
                </div>
                <div className={styles.fourth_poster_inner_bottom}>
                    <div className={styles.qr_code_wrapper}>
                        <QRCodeSVG id="QR-code" value={shareH5Url!} size={64} fgColor="#000000" />
                        <div className={styles.qr_code_wrapper_right}>
                            <div className={styles.first_child}>扫码参加活动！</div>
                            <div className={styles.second_child}>长按识别二维码</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.site_wrapper}>
                <img
                    className={styles.site_logo}
                    src={
                        selectedOrganizationDetail?.logo ||
                        'https://i.zpimg.cn/public_read/22102410qdkcjk.png'
                    }
                    width={20}
                    height={20}
                />
                <div className={styles.site_name}>{selectedOrganizationDetail?.name}</div>
            </div>
        </div>
    )

    const renderPoster = () => {
        switch (current) {
            case 0:
                return TemplateOne
            case 1:
                return TemplateTwo
            case 2:
                return TemplateThree
            default:
                return TemplateFour
        }
    }

    const base64ToBlob = (urlData: any, _type: any) => {
        const arr = urlData.split(',')
        const mime = arr[0].match(/:(.*?);/)[1] || _type
        // 去掉url的头，并转化为byte
        const bytes = window.atob(arr[1])
        // 处理异常,将ascii码小于0的转换为大于0
        const ab = new ArrayBuffer(bytes.length)
        // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
        const ia = new Uint8Array(ab)
        for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i)
        }
        return new Blob([ab], {
            type: mime,
        })
    }

    // 复制地址
    const copy = () => {
        navigator.clipboard
            .writeText(shareUrl)
            .then(() => {
                message.success('链接已复制到剪贴板')
            })
            .catch(() => {
                message.error('复制失败，请手动复制')
            })
    }

    /**
     * 复制二维码图片
     */
    const clickCopyImgCode = async () => {
        const canvasImg: any = document.getElementById('QR-code')
        domToPng(canvasImg!, {
            backgroundColor: null,
            scale: 4,
        })
            .then(async (dataUrl: any) => {
                // eslint-disable-next-line @typescript-eslint/no-shadow
                const type = 'image/png'
                const conversions = base64ToBlob(dataUrl, type)
                try {
                    await navigator.clipboard.write([
                        // eslint-disable-next-line no-undef
                        new ClipboardItem({
                            [conversions.type]: conversions,
                        }),
                    ])
                    message.success('复制二维码成功')
                } catch (error) {
                    message.error('请在https协议下操作')
                }
            })
            .catch(() => {
                message.error('二维码复制失败')
            })
    }

    const handleDownload = () => {
        const posterDom = document.getElementById('poster')
        domToPng(posterDom!, {
            backgroundColor: null,
            scale: 4,
        })
            .then(async (dataUrl: any) => {
                const link = document.createElement('a')
                link.href = dataUrl
                link.download = `.png`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            })
            .catch(() => {
                message.error('海报生成失败')
            })
    }

    return (
        <div className={styles.page_activity_share}>
            <Form form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
                <Form.Item label="活动链接">
                    <Space size={8}>
                        <Input disabled value={shareUrl} />
                        <Button type="primary" onClick={copy}>
                            复制
                        </Button>
                    </Space>
                </Form.Item>
                <Form.Item label="活动二维码">
                    <Space align="start" size={8}>
                        <div className={styles.qrCode_wrapper}>
                            <QRCodeSVG id="QR-code" width={112} height={112} value={shareH5Url!} />
                        </div>
                        <Button type="primary" onClick={clickCopyImgCode}>
                            复制
                        </Button>
                    </Space>
                </Form.Item>
                <Form.Item label="活动海报">
                    <div className={styles.poster_bg_wrapper}>
                        <Space className={styles.poster_img_list} size={24}>
                            {[
                                'https://static.zpimg.cn/public/fe-admin-pc/png_xiaotu1.png',
                                'https://static.zpimg.cn/public/fe-admin-pc/png_xiaotu2.png',
                                'https://static.zpimg.cn/public/fe-admin-pc/png_xiaotu3.png',
                                'https://static.zpimg.cn/public/fe-admin-pc/png_xiaotu4.png',
                            ].map((url, index) => (
                                <div
                                    className={classNames(styles.poster_img_item, {
                                        [styles.active]: current === index,
                                    })}
                                    key={url}
                                    onClick={() => setCurrent(index)}
                                >
                                    <img
                                        height={72}
                                        width={72}
                                        src={url}
                                        style={styles.poster_img}
                                    />
                                    <div className={styles.text}>{`样式${index + 1}`}</div>
                                    <div className={styles.icon_wrapper}>
                                        <img src="https://static.zpimg.cn/public/fe-admin-pc/dagou.svg" />
                                    </div>
                                </div>
                            ))}
                        </Space>
                    </div>
                    <div className={styles.poster_wrapper}>
                        <div id="poster">{renderPoster()}</div>
                        <Button onClick={handleDownload}>下载</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default inject('userStore', 'siteStore')(observer(Share))
