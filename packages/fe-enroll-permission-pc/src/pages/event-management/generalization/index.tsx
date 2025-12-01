import styles from './index.modules.less'
import CustomTitle from '@/components/CustomTitle'
import { Button, Form, message, Image, Space, Col, Row } from 'antd'
import QRCode from 'qrcode.react'
import Clipboard from 'clipboard'
import { useEffect, useState } from 'react'
import { DownloadOutlined } from '@ant-design/icons'
import html2canvas from 'html2canvas'
import { useLocation, useModel } from 'umi'
import type { IRoute } from 'umi'
const itemLayout = {
    labelCol: { span: 5 },
}
import { findSiteData } from '@wotu/wotu-components'
import { inject, observer, useLocalObservable } from 'mobx-react'
// import type UserStore from '@/stores/userStore'
// import type SiteStore from '@/stores/siteStore'
import { getCookie, getLocalStorage } from '@/storage'
import GeneralizationStore from './store'
import { QRCodeSVG } from 'qrcode.react'
import {
    // COLOR_ARR,
    // COLOR_ENUM,
    colorList,
    ENROLL_CHANNEL,
    ENROLL_CHANNEL_ENUM,
    // getClassNames,
    // getClassNames_introduction,
    // getClassNames_phone,
    // getClassNames_scan,
    // getClassNames_topBox,
    // imageBackground,
    // scan_enroll_bgc,
} from './const'

import { ReactSVG } from 'react-svg'
import classNames from 'classnames'
import dayjs from 'dayjs'
import Cover from '@/components/Cover'
import { imgList } from '@/components/Cover/const'
import { TYPE_ENUM } from '@/types'

// interface IProps {
//     userStore: any
//     siteStore: SiteStore
// }

/** 推广 */
const EnrollSetting = () => {
    const store = useLocalObservable(() => new GeneralizationStore())

    const masterModel = useModel('@@qiankunStateFromMaster') || {}
    const { masterStore } = masterModel || {}
    const { userStore } = masterStore || {}

    /**  海报主题色  */
    const [current, setCurrent] = useState(0)
    /**   自定义域名 没有就默认用机构code */
    const [custDomain, setCustomDomain] = useState(getCookie('SELECT_ORG_CODE'))

    useEffect(() => {
        ;(async () => {
            let domainInfo = await userStore?.getPortalData?.()
            let { customDomain = '' } = domainInfo || {}
            customDomain && setCustomDomain(customDomain)
        })()
    }, [])

    let workSiteStore = getLocalStorage('SITE_STORE')
    const { siteData } = workSiteStore || {}

    /**  报名活动的codE,    type  1机构 2评价  3培训  4培训班级*/
    const { code, type } = useLocation()?.query || {}

    useEffect(() => {
        /**  获取详情  */
        store.getGeneralizationDetail(code, type)
        document.title = '推广'
    }, [])

    /** 获取pc saas的基础地址 */
    const pcDomain = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) || ''
    /** 获取h5 saas的基础地址 */
    const portalH5Url = findSiteData(siteData, 'portalH5Url', { findKey: 'baseInfo' }) || ''
    /**  获取url  */
    const getEnrollPath = (isMobile = false) => {
        const { code: itemCode } = store.generalizationDetail || {}

        enum ENROLL_TYPE_ENUM {
            ORG = 'org', //机构报名
            PLAN = 'plan', //计划报名
        }
        /**  计划报名为 2或者3   机构是1  */
        let enrollType = ''
        if (Number(type) === Number(TYPE_ENUM.ORG)) {
            enrollType = ENROLL_TYPE_ENUM.ORG //org
        } else {
            enrollType = ENROLL_TYPE_ENUM.PLAN //plan
        }

        const baseUrl = isMobile ? portalH5Url : pcDomain
        const path = `/enroll-center/enroll-center?type=${enrollType}&code=${itemCode}`
        /**
         *   pc 没做详情页 所以先跳转在线报名页
         *   移动  机构跳转在线报名页  评价和培训跳转详情页
         */
        const detailPath =
            isMobile && Number(type) !== Number(TYPE_ENUM.ORG)
                ? `/enroll-center/details?code=${itemCode}`
                : path

        return `${baseUrl}${isMobile ? `/${custDomain}` : ''}${detailPath}`
    }

    // /**  获取PC地址  下版本做pc地址  */
    /**  获取移动端地址  */
    const getEnrollMobilePath = () => {
        return getEnrollPath(true)
    }

    /**
     *  复制报名链接
     */
    const copy = new Clipboard('.copy-btn')
    copy.on('success', function (e) {
        message.success('复制链接成功')
        e.clearSelection()
    })
    copy.on('error', function (e) {
        message.error('复制失败')
        console.error('Action:', e.action)
        console.error('Trigger:', e.trigger)
    })

    /**
     *  销毁实例
     *  */
    useEffect(() => {
        return () => {
            copy.destroy()
        }
    }, [copy])

    /**
     * 优化后的复制二维码图片   //注:此方法只能在localhost跟https协议下可用,http协议下不存在此方法
     * 将base64转成blob格式
     * @returns {*}
     */
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

    /**
     * 复制二维码图片\
     */
    const clickCopyImgCode = async () => {
        // 将 qrcode 生成的二维码利用canvas自带的 toDataURL 转成base64 格式 然后再转成 Blob格式 使用 clipboard.write 复制
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

    /**
     * 下载海报
     */
    const downloadScreenshot = () => {
        const element = document.querySelector('#div_to_capture') as HTMLElement

        // 获取所有的图片元素
        const images = element?.querySelectorAll('img')
        let loadedCount = 0

        // 监听图片加载完成事件
        images?.forEach(image => {
            if (image.complete) {
                // 图片已经加载完成
                handleImageLoad()
            } else {
                // 图片未加载完成，绑定load事件监听
                image.addEventListener('load', handleImageLoad)
            }
        })

        function handleImageLoad() {
            loadedCount++
            if (loadedCount === images?.length) {
                // 使用 HTML2Canvas 创建画布并截取 div
                html2canvas(element, {
                    useCORS: true,
                    scrollY: 0,
                    scrollX: 0,
                    backgroundColor: null,
                    logging: false,
                }).then(canvas => {
                    // 将画布转化为图像 URL
                    const imgURL = canvas.toDataURL()
                    // 创建一个 a 标签用于下载图片
                    const link = document.createElement('a')
                    link.href = imgURL
                    link.download = '报名海报.png'

                    // 将标签添加到页面
                    document.body.appendChild(link)

                    link.click()
                    document.body.removeChild(link)
                })
            }
        }
    }

    // const renderTime = (applyStartTime: number, applyEndTime: number, createdAt: number) => {
    //     /**  未填不展示  */
    //     if (!applyStartTime && !applyEndTime) return <div style={{ height: '16px' }} />
    //     /**  都填展示  */
    //     if (applyStartTime && applyEndTime) {
    //         return (
    //             <div className={styles.time}>
    //                 <span>报名时间</span>
    //                 <span>
    //                     {dayjs(applyStartTime).format('YYYY-MM-DD HH:mm')} 至{' '}
    //                     {dayjs(applyEndTime).format('YYYY-MM-DD HH:mm')}
    //                 </span>
    //             </div>
    //         )
    //     }
    //     /**  开始未填展示创建时间  */
    //     if (!applyStartTime && applyEndTime && createdAt) {
    //         return (
    //             <div className={styles.time}>
    //                 <span>报名时间</span>
    //                 <span>
    //                     {dayjs(createdAt).format('YYYY-MM-DD HH:mm')} 至{' '}
    //                     {dayjs(applyEndTime).format('YYYY-MM-DD HH:mm')}
    //                 </span>
    //             </div>
    //         )
    //     }
    //     /**  结束时间未填展示开始时间  */
    //     if (applyStartTime && !applyEndTime) {
    //         return (
    //             <div className={styles.time}>
    //                 <span>报名开始时间</span>
    //                 <span>{dayjs(createdAt).format('YYYY-MM-DD HH:mm')}</span>
    //             </div>
    //         )
    //     }
    // }

    /**
     * 评价计划 班级报名 的报名海报
     */
    const planPoster = () => {
        const {
            cover = '',
            name = '',
            applyStartTime = '',
            applyEndTime = '',
            organizationName = '',
            organizationLogo = '',
            contract = '',
        } = store.generalizationDetail || {}
        const timeRender = () => {
            if (!applyStartTime && !applyEndTime) {
                return <Col flex={1}>不限</Col>
            }
            return (
                <Col flex={1}>
                    {applyStartTime
                        ? dayjs(applyStartTime).format('YYYY-MM-DD HH:mm')
                        : '开始时间不限，'}
                    {applyEndTime ? ' 至 ' : ''}
                    {applyStartTime && applyEndTime ? <br /> : ''}
                    {applyEndTime
                        ? dayjs(applyEndTime).format('YYYY-MM-DD HH:mm')
                        : ' 开始，结束时间不限'}
                    {applyStartTime ? '' : ' 结束'}
                </Col>
            )
        }

        const selectCover = imgList.filter(i => i.value === cover)?.[0]

        const TemplateOne = (
            <div className={styles.first_poster_wrapper}>
                <div className={styles.first_poster_inner}>
                    <Cover
                        cover={cover}
                        text={selectCover?.color ? name : ''}
                        color={selectCover?.color}
                    />
                    <div className={styles.name}>{name}</div>
                    <Row wrap={false} className={styles.time}>
                        <Col style={{ flexShrink: 0 }}>报名时间：</Col>
                        {timeRender()}
                    </Row>
                    <div className={styles.divider} />
                    <div className={styles.qrcode_text}>手机扫码报名！长按识别二维码</div>
                    <div className={styles.qrcode_wrapper}>
                        <QRCodeSVG
                            value={
                                `${getEnrollMobilePath()}&applyChannel=${
                                    ENROLL_CHANNEL_ENUM[ENROLL_CHANNEL.POSTER]
                                }`!
                            }
                            width={80}
                            height={80}
                        />
                        <img
                            src="https://static.zpimg.cn/public/fe-admin-pc/png_zhiwen.png"
                            width={80}
                            height={80}
                        />
                    </div>
                    <div className={styles.contract}>{contract ? `联系方式：${contract}` : ''}</div>
                </div>
                <div className={styles.site_wrapper}>
                    <img
                        className={styles.site_logo}
                        src={
                            organizationLogo || 'https://i.zpimg.cn/public_read/22102410qdkcjk.png'
                        }
                        width={20}
                        height={20}
                    />
                    <div className={styles.site_name}>{organizationName}</div>
                </div>
            </div>
        )
        const TemplateTwo = (
            <div className={styles.second_poster_wrapper}>
                <div className={styles.second_poster_inner}>
                    <div className={styles.poster_cover_wrapper}>
                        <Cover
                            cover={cover}
                            text={selectCover?.color ? name : ''}
                            color={selectCover?.color}
                        />
                    </div>
                    <div className={styles.poster_inner_top_wrapper}>
                        <div className={styles.second_poster_inner_top}>
                            <div className={styles.name}>{name}</div>
                            <Row wrap={false} className={styles.time}>
                                <Col style={{ flexShrink: 0 }}>报名时间：</Col>
                                {timeRender()}
                            </Row>
                        </div>
                        <div className={styles.divider} />
                        <div className={styles.second_poster_inner_bottom}>
                            <div className={styles.qr_code_wrapper}>
                                <QRCodeSVG
                                    id="QR-code"
                                    value={
                                        `${getEnrollMobilePath()}&applyChannel=${
                                            ENROLL_CHANNEL_ENUM[ENROLL_CHANNEL.POSTER]
                                        }`!
                                    }
                                    size={64}
                                    fgColor="#000000"
                                />
                                <div className={styles.qr_code_wrapper_right}>
                                    <div className={styles.first_child}>扫码参加活动！</div>
                                    <div className={styles.second_child}>长按识别二维码</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {contract && <div className={styles.contract}>联系方式：{contract}</div>}
                <div className={styles.site_wrapper}>
                    <img
                        className={styles.site_logo}
                        src={
                            organizationLogo || 'https://i.zpimg.cn/public_read/22102410qdkcjk.png'
                        }
                        width={20}
                        height={20}
                    />
                    <div className={styles.site_name}>{organizationName}</div>
                </div>
            </div>
        )

        const TemplateThree = (
            <div className={styles.third_poster_wrapper}>
                <img
                    className={styles.header_top}
                    src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_saas_pc/image/png1%402x_811a2da8.png"
                />
                <div className={styles.third_poster_inner}>
                    <div className={styles.third_poster_inner_top}>
                        <Cover
                            cover={cover}
                            text={selectCover?.color ? name : ''}
                            color={selectCover?.color}
                        />
                        <div className={styles.name}>{name}</div>
                        <Row wrap={false} className={styles.time}>
                            <Col style={{ flexShrink: 0 }}>报名时间：</Col>
                            {timeRender()}
                        </Row>
                        {contract && (
                            <Row wrap={false} className={styles.time}>
                                <Col style={{ flexShrink: 0 }}>联系方式：</Col>
                                {contract}
                            </Row>
                        )}
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.third_poster_inner_bottom}>
                        <div className={styles.qr_code_wrapper}>
                            <QRCodeSVG
                                id="QR-code"
                                value={
                                    `${getEnrollMobilePath()}&applyChannel=${
                                        ENROLL_CHANNEL_ENUM[ENROLL_CHANNEL.POSTER]
                                    }`!
                                }
                                size={64}
                                fgColor="#000000"
                            />
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
                            organizationLogo || 'https://i.zpimg.cn/public_read/22102410qdkcjk.png'
                        }
                        width={20}
                        height={20}
                    />
                    <div className={styles.site_name}>{organizationName}</div>
                </div>
            </div>
        )

        const TemplateFour = (
            <div className={styles.fourth_poster_wrapper}>
                <div className={styles.fourth_poster_inner}>
                    <div className={styles.fourth_poster_inner_top}>
                        <Cover
                            cover={cover}
                            text={selectCover?.color ? name : ''}
                            color={selectCover?.color}
                        />
                        <div className={styles.name}>{name}</div>
                        <Row wrap={false} className={styles.time}>
                            <Col style={{ flexShrink: 0 }}>报名时间：</Col>
                            {timeRender()}
                        </Row>
                    </div>
                    <div className={styles.fourth_poster_inner_bottom}>
                        <div className={styles.qr_code_wrapper}>
                            <QRCodeSVG
                                id="QR-code"
                                value={
                                    `${getEnrollMobilePath()}&applyChannel=${
                                        ENROLL_CHANNEL_ENUM[ENROLL_CHANNEL.POSTER]
                                    }`!
                                }
                                size={64}
                                fgColor="#000000"
                            />
                            <div className={styles.qr_code_wrapper_right}>
                                <div className={styles.first_child}>扫码参加活动！</div>
                                <div className={styles.second_child}>长按识别二维码</div>
                            </div>
                        </div>
                        {contract && <div className={styles.contract}>联系方式：{contract}</div>}
                    </div>
                </div>
                <div className={styles.site_wrapper}>
                    <img
                        className={styles.site_logo}
                        src={
                            organizationLogo || 'https://i.zpimg.cn/public_read/22102410qdkcjk.png'
                        }
                        width={20}
                        height={20}
                    />
                    <div className={styles.site_name}>{organizationName}</div>
                </div>
            </div>
        )

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
    /**
     * 机构报名海报
     */
    const orgPoster = () => {
        const { name = '', mobile = '', address = '', logo = '' } = store.generalizationDetail || {}
        return (
            <>
                <div className={classNames(styles.top_box, colorList?.[current])}>
                    <div className={styles.scan_imgs}>
                        <Image
                            src={logo}
                            preview={false}
                            className={styles.scan_imgage}
                            crossOrigin="anonymous"
                        />
                    </div>
                    <div className={styles.title_name}>{name}</div>
                    <div className={styles.tel}>
                        <div className={styles.img_tel}>
                            <img
                                src="https://static.zpimg.cn/public/business_pc/icon_phone%402x.png"
                                alt=""
                            />
                        </div>
                        <span>{mobile}</span>
                    </div>
                    <div className={styles.adress}>
                        <div className={styles.img_tel}>
                            <img
                                src="https://static.zpimg.cn/public/business_pc/icon_address%402x.png"
                                alt=""
                            />
                        </div>
                        <span>{address}</span>
                    </div>
                </div>
                <div className={styles.bottom_box}>
                    <div className={styles.qr_code}>
                        <ReactSVG
                            src={
                                'https://img-test.zpimg.cn/public_read/menu_icon/17011871dgydqf40.svg'
                            }
                            beforeInjection={svg => {
                                svg.setAttribute(
                                    'style',
                                    `fill: ${current}; width: 160px; height: 160px;`,
                                )
                            }}
                        />
                        <QRCode
                            id="QR-code1"
                            value={`${getEnrollMobilePath()}&applyChannel=${
                                ENROLL_CHANNEL_ENUM[ENROLL_CHANNEL.POSTER]
                            }`}
                            size={140}
                            fgColor="#000000"
                            className={styles.qrcode_scan_org}
                        />
                    </div>
                    <div className={styles.scan_title}>手机扫码二维码，快来预约报名吧~</div>
                </div>
            </>
        )
    }

    /**
     *  Form.Item 的配置
     *  @type {*} */
    const serachList = [
        {
            attr: {
                label: '报名链接',
                name: 'link',
            },
            render: () => {
                return (
                    <div className={styles.link}>
                        <span className={styles.enroll_link} id="copy_content">
                            {`${getEnrollMobilePath()}&applyChannel=${
                                ENROLL_CHANNEL_ENUM[ENROLL_CHANNEL.LINK]
                            }`}
                        </span>
                        <Button
                            data-clipboard-target="#copy_content"
                            type="primary"
                            className={'copy-btn'}
                        >
                            复制
                        </Button>
                    </div>
                )
            },
            isShow: true,
        },
        {
            attr: {
                label: '报名二维码',
                name: 'qrcode',
            },
            render: () => {
                return (
                    <Space className={styles.qrcode}>
                        <QRCode
                            id="QR-code"
                            value={`${getEnrollMobilePath()}&applyChannel=${
                                ENROLL_CHANNEL_ENUM[ENROLL_CHANNEL.QRCODE]
                            }`}
                            size={112}
                            fgColor="#000000"
                            className={styles.qrcode_img}
                        />
                        <Button type="primary" onClick={() => clickCopyImgCode()}>
                            复制
                        </Button>
                    </Space>
                )
            },
            isShow: !(type === TYPE_ENUM.ORG),
        },
        {
            attr: {
                label: '报名海报',
                name: 'haibao',
            },
            render: () => {
                return (
                    <div className={styles.poster_div}>
                        <Space direction="vertical">
                            <div className={styles.color_arr}>
                                <div className={styles.poster_bg_wrapper}>
                                    <Space className={styles.poster_img_list} size={24}>
                                        {[
                                            'https://static.zpimg.cn/public/fe_saas_pc/image/share_bg1%402x_0ef61e68.png',
                                            'https://static.zpimg.cn/public/fe_saas_pc/image/share_bg2%402x_7a977f3b.png',
                                            'https://static.zpimg.cn/public/fe_saas_pc/image/share_bg3%402x_71a0d0b6.png',
                                            'https://static.zpimg.cn/public/fe_saas_pc/image/share_bg4%402x_9a944eea.png',
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
                                                    className={styles.poster_img}
                                                />
                                                <div className={styles.text}>{`样式${
                                                    index + 1
                                                }`}</div>
                                                <div className={styles.icon_wrapper}>
                                                    <img src="https://static.zpimg.cn/public/fe-admin-pc/dagou.svg" />
                                                </div>
                                            </div>
                                        ))}
                                    </Space>
                                </div>
                            </div>
                            <div
                                className={styles.poster}
                                id="div_to_capture"
                                style={{ background: current }}
                            >
                                {Number(type) === Number(TYPE_ENUM.ORG)
                                    ? orgPoster()
                                    : planPoster()}
                            </div>
                        </Space>
                        <div className={styles.right}>
                            <div>
                                <Button onClick={downloadScreenshot} icon={<DownloadOutlined />}>
                                    下载
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            },
            isShow: true,
        },
    ]
    /**
     * 获取表单的配置
     * @returns {*}
     */
    const getFields = () => {
        return (
            <>
                {serachList.map(({ attr, render, isShow }) => {
                    if (!isShow) return null
                    return (
                        <div key={attr.name}>
                            <Form.Item {...attr} {...itemLayout}>
                                {render()}
                            </Form.Item>
                        </div>
                    )
                })}
            </>
        )
    }

    return (
        <div className={styles.enrollSetting}>
            <div className={styles.main}>
                <CustomTitle title="推广" />
                <Form className={styles.form} name="password" validateTrigger={'onBlur'}>
                    {getFields()}
                </Form>
            </div>
        </div>
    )
}
const EnrollSettingPage: IRoute = inject('siteStore', 'userStore')(observer(EnrollSetting))
EnrollSettingPage.title = '推广'
export default EnrollSettingPage
