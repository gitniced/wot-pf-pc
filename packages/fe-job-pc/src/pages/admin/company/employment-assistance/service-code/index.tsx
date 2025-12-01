import { Button, Form, Input, message, Space } from 'antd'
import QRCode from 'qrcode.react'
import styles from './index.module.less'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import Store from './store'
import { inject, observer, useLocalObservable } from 'mobx-react'
import { domToPng } from 'modern-screenshot'
import TitleBlock from '@/components/TitleBlock'
import { setDocTitle } from '@/utils/setDocTitle'
import { getCookie } from '@/storage'
import { findSiteData } from '@wotu/wotu-components'

const Share = (props: any) => {
    const store = useLocalObservable(() => Store)
    const { siteStore } = props;
    const { siteData } = siteStore
    const [form] = Form.useForm()

    const [qrcodePath, setQrcodePath] = useState<string>()

    const [current, setCurrent] = useState<number>(0)
    const { sourceType, serviceUnit } = store.shareCodeParams

    useEffect(() => {
        setDocTitle('服务码')
        const organizationCode = getCookie('SELECT_ORG_CODE')
        store.getShareCodeByUser(organizationCode)
    }, [])

    useEffect(() => {
        const midMobileDomain = findSiteData(siteData, 'midMobileDomain', { findKey: 'baseInfo' })
        const organizationCode = getCookie('SELECT_ORG_CODE')
        setQrcodePath(`${midMobileDomain}/job-center/assistance?organizationCode=${organizationCode}&sourceType=${sourceType}`)
    }, [store.shareCodeParams])

    const TemplateOne = (
        <div className={styles.first_poster_wrapper} id="poster_bg_wrapper">
            <div className={styles.first_poster_inner}>
                <div className={styles.welcome_text}>
                    <img src="https://static.zpimg.cn/public/job-fe-pc/images/title%402x_d184ee29.png" className={styles.title_img} />
                </div>
                {/* 单位信息 */}
                <div className={styles.unit_information}>
                    <svg className={`icon ${styles.icon}`}>
                        <use xlinkHref={'#fangzi'} />
                    </svg>
                    <span className={styles.unit}>{serviceUnit}</span>
                </div>
                <div className={styles.cover}>
                    <img
                        src="https://static.zpimg.cn/public/fe-admin-pc/service_code_png1.png"
                        alt="service_code_png1"
                        width={263}
                        height={148}
                    />
                </div>

                <div className={styles.divider} />

                <div className={styles.first_poster_bottom}>
                    <div className={styles.left}>
                        <div className={styles.join_type_text1}>参与方式</div>
                        <div className={styles.join_type_text2}>
                            <span>1. 手机扫码</span>
                            <span>2. 长按识别</span>
                        </div>
                    </div>
                    <div className={styles.qrCode_wrapper}>
                        <svg className={`icon ${styles.icon}`}>
                            <use xlinkHref={'#erweima'} />
                        </svg>
                        <QRCode id="QR-code" value={qrcodePath!} size={84} />
                    </div>
                </div>
            </div>
        </div>
    )
    const TemplateTwo = (
        <div className={styles.second_poster_wrapper} id="poster_bg_wrapper">
            <div className={styles.second_poster_top}>
                <div className={styles.cover}>
                    <img
                        src="https://static.zpimg.cn/public/fe-admin-pc/service_code_png2.png"
                        alt="service_code_png1"
                        width={263}
                        height={148}
                    />
                </div>
                <div className={styles.welcome_text}>
                    <img src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job-fe-pc/images/title%402x_d184ee29.png" className={styles.title_img} />
                </div>
                {/* 单位信息 */}
                <div className={styles.unit_information}>
                    <svg className={`icon ${styles.icon}`}>
                        <use xlinkHref={'#fangzi'} />
                    </svg>
                    <span className={styles.unit}>{serviceUnit}</span>
                </div>
            </div>
            <div className={styles.second_poster_bottom}>
                <div className={styles.second_poster_bottom_inner}>
                    <div className={styles.left}>
                        <div className={styles.join_type_text1}>参与方式</div>
                        <div className={styles.join_type_text2}>
                            <span>1. 手机扫码</span>
                            <span>2. 长按识别</span>
                        </div>
                    </div>
                    <div className={styles.qrCode_wrapper}>
                        <svg className={`icon ${styles.icon}`}>
                            <use xlinkHref={'#erweima'} />
                        </svg>
                        <QRCode id="QR-code" value={qrcodePath!} size={84} />
                    </div>
                </div>
            </div>
        </div>
    )
    const TemplateThree = (
        <div className={styles.third_poster_wrapper} id="poster_bg_wrapper">
            <div className={styles.third_poster_inner}>
                <div className={styles.third_poster_inner_top}>
                    <div className={styles.welcome_text}>
                        <img src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job-fe-pc/images/title%402x_d184ee29.png" className={styles.title_img} />
                    </div>
                    {/* 单位信息 */}
                    <div className={styles.unit_information}>
                    <svg className={`icon ${styles.icon}`}>
                        <use xlinkHref={'#fangzi'} />
                    </svg>
                        <span className={styles.unit}>{serviceUnit}</span>
                    </div>
                    <div className={styles.cover}>
                        <img
                            src="https://static.zpimg.cn/public/fe-admin-pc/service_code_png3.png"
                            alt="service_code_png1"
                            width={263}
                            height={148}
                        />
                    </div>
                </div>
                <div className={styles.third_poster_inner_bottom}>
                    <div className={styles.left}>
                        <div className={styles.join_type_text1}>参与方式</div>
                        <div className={styles.join_type_text2}>
                            <span>1. 手机扫码</span>
                            <span>2. 长按识别</span>
                        </div>
                    </div>
                    <div className={styles.qrCode_wrapper}>
                        <svg className={`icon ${styles.icon}`}>
                            <use xlinkHref={'#erweima'} />
                        </svg>
                        <QRCode id="QR-code" value={qrcodePath!} size={84} />
                    </div>
                </div>
            </div>
        </div>
    )
    const TemplateFour = (
        <div className={styles.fourth_poster_wrapper} id="poster_bg_wrapper">
            <div className={styles.fourth_poster_top}>
                <div className={styles.welcome_text}>
                    <img src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job-fe-pc/images/title%402x_d184ee29.png" className={styles.title_img} />
                </div>
                {/* 单位信息 */}
                <div className={styles.unit_information}>
                    <svg className={`icon ${styles.icon}`}>
                        <use xlinkHref={'#fangzi'} />
                    </svg>
                    <span className={styles.unit}>{serviceUnit}</span>
                </div>
                <div className={styles.cover}>
                    <img
                        src="https://static.zpimg.cn/public/fe-admin-pc/service_code_png4.png"
                        alt="service_code_png1"
                        width={263}
                        height={148}
                    />
                </div>
            </div>
            <div className={styles.fourth_poster_bottom}>
                <div className={styles.left}>
                    <div className={styles.join_type_text1}>参与方式</div>
                    <div className={styles.join_type_text2}>
                        <span>1. 手机扫码</span>
                        <span>2. 长按识别</span>
                    </div>
                </div>
                <div className={styles.qrCode_wrapper}>
                    <svg className={`icon ${styles.icon}`}>
                        <use xlinkHref={'#erweima'} />
                    </svg>
                    <QRCode id="QR-code" value={qrcodePath!} size={84} />
                </div>
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
    const handleCopy = () => {
        navigator.clipboard
            .writeText(qrcodePath!)
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
        const canvasImg: any = document.getElementById('QR-code') // 获取canvas类型的二维码
        const file = canvasImg?.toDataURL('image/jpg')
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const type = 'image/png'
        const conversions = base64ToBlob(file, type)
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
    }

    const handleDownload = () => {
        const posterDom = document.getElementById('poster_bg_wrapper')
        domToPng(posterDom!, {
            backgroundColor: null,
            scale: 4,
        })
            .then(async (dataUrl: any) => {
                const link = document.createElement('a')
                link.href = dataUrl
                link.download = `服务海报.png`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            })
            .catch(e => {
                console.log(e)
                message.error('海报生成失败')
            })
    }

    return (
        <div className={styles.page_activity_share}>
            <TitleBlock title="服务码" />
            <Form form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
                <Form.Item label="服务链接">
                    <Space size={8}>
                        <Input disabled value={qrcodePath!} style={{ width: 376 }} />
                        <Button type="primary" onClick={handleCopy}>
                            复制
                        </Button>
                    </Space>
                </Form.Item>
                <Form.Item label="服务二维码">
                    <Space align="start" size={8}>
                        <div className={styles.qr_code_wrapper}>
                            <QRCode id="QR-code" size={112} value={qrcodePath!} />
                        </div>
                        <Button type="primary" onClick={clickCopyImgCode}>
                            复制
                        </Button>
                    </Space>
                </Form.Item>
                <Form.Item label="服务海报">
                    <div className={styles.poster_bg_wrapper}>
                        <Space className={styles.poster_img_list} size={24}>
                            {[
                                'https://static.zpimg.cn/public/fe-admin-pc/service_code_1.png',
                                'https://static.zpimg.cn/public/fe-admin-pc/service_code_2.png',
                                'https://static.zpimg.cn/public/fe-admin-pc/service_code_3.png',
                                'https://static.zpimg.cn/public/fe-admin-pc/service_code_4.png',
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
                        {renderPoster()}
                        <Button onClick={handleDownload}>下载</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default inject('siteStore')(observer(Share))
