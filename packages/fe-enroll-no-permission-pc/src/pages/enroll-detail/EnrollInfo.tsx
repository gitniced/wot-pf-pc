import React, { useEffect, useMemo, useState } from 'react'
import styles from './index.module.less'
import { inject, observer } from 'mobx-react'
import dayjs from 'dayjs'
// import _ from 'lodash'
import type EnrollDetailsStore from './store'
import { ENROLL_CHANNEL, ENROLL_CHANNEL_ENUM, getDate } from '@/types/enroll-const'
import { Col, message, Row, Space, Tooltip } from 'antd'
import Cover from '@/components/Cover'
import { imgList } from '@/components/Cover/const'
import { QRCodeSVG } from 'qrcode.react'
import html2canvas from 'html2canvas'
import { findSiteData } from '@wotu/wotu-components'
import { useModel } from 'umi'

const EnrollInfo = (props: { store: EnrollDetailsStore; siteStore: any }) => {
    const masterModel = useModel('@@qiankunStateFromMaster') || {}
    const { store, siteStore } = props
    const { activityDetails = {} } = store
    const [shareH5Url, setShareH5Url] = useState<string>()
    const isCover = useMemo(() => {
        return !!activityDetails?.cover
    }, [activityDetails?.cover])

    const {
        name = '',
        applyStartTime = '',
        applyEndTime = '',
        organizationName = '',
        organizationLogo = '',
        contract = '',
        // code
    } = activityDetails || {}

    const renderEnrollTime = () => {
        const timeRender = () => {
            if (!applyStartTime && !applyEndTime) {
                return <>不限</>
            }
            return (
                <>
                    {applyStartTime
                        ? dayjs(applyStartTime).format('YYYY-MM-DD HH:mm')
                        : '开始时间不限，'}
                    {applyEndTime ? ' 至 ' : ''}
                    {applyEndTime
                        ? dayjs(applyEndTime).format('YYYY-MM-DD HH:mm')
                        : ' 开始，结束时间不限'}
                    {applyStartTime ? '' : ' 结束'}
                </>
            )
        }
        return (
            <div className={styles.enroll_info_particulars_item}>
                <div className={styles.label}>报名时间：</div>
                <div className={styles.value}>{timeRender()}</div>
            </div>
        )
    }

    const renderEnrollAddress = () => {
        const { address } = activityDetails
        if (!address) return
        return (
            <div className={styles.enroll_info_particulars_item}>
                <div className={styles.label}>地址：</div>
                <div className={styles.value}>{address}</div>
            </div>
        )
    }

    const selectCover = imgList.filter(i => i.value === activityDetails?.cover)?.[0]

    const handleCopy = () => {
        // 复制当前页面地址到剪贴板
        const url = window.location.href
        if (navigator && navigator.clipboard) {
            navigator.clipboard
                .writeText(url)
                .then(() => {
                    message.success('链接已复制')
                })
                .catch(() => {
                    message.error('复制失败，请手动复制')
                })
        } else {
            // 兼容不支持 clipboard API 的浏览器
            const input = document.createElement('input')
            input.value = url
            document.body.appendChild(input)
            input.select()
            try {
                document.execCommand('copy')
                message.success('链接已复制')
            } catch (e) {
                message.error('复制失败，请手动复制')
            }
            document.body.removeChild(input)
        }
    }

    /**
     * 下载海报
     */
    const handleDownPoster = () => {
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

    const getEnrollMobilePath = async () => {
        const { masterStore } = masterModel || {}
        const { userStore } = masterStore || {}
        let domainInfo = await userStore?.getPortalData?.()
        let { customDomain = '' } = domainInfo || {}
        /** 获取h5 saas的基础地址 */
        const portalH5Url =
            findSiteData(siteStore?.siteData, 'portalH5Url', { findKey: 'baseInfo' }) || ''
        setShareH5Url(`${portalH5Url}/${customDomain}/enroll-center/details`)
        return `${portalH5Url}/${customDomain}/enroll-center/details`
    }

    const TemplateOne = () => (
        <div className={styles.first_poster_wrapper}>
            <div className={styles.first_poster_inner}>
                <Cover
                    cover={activityDetails?.cover}
                    text={selectCover?.color ? activityDetails?.name : ''}
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
                            `${shareH5Url}?code=${activityDetails?.code}&applyChannel=${
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
                    src={organizationLogo || 'https://i.zpimg.cn/public_read/22102410qdkcjk.png'}
                    width={20}
                    height={20}
                />
                <div className={styles.site_name}>{organizationName}</div>
            </div>
        </div>
    )

    useEffect(() => {
        getEnrollMobilePath()
    }, [])

    return (
        <div className={styles.enroll_info}>
            {isCover && (
                <Cover
                    cover={activityDetails?.cover}
                    text={selectCover?.color ? activityDetails?.name : ''}
                    color={selectCover?.color}
                    width={320}
                />
            )}

            <div
                className={[styles.enroll_info_particulars, isCover ? '' : styles.no_image].join(
                    ' ',
                )}
            >
                <div className={styles.enroll_info_particulars_title}>
                    <span>{activityDetails.name}</span>
                    <div className={styles.share_wrapper}>
                        <span className={styles.share_text}>分享</span>
                        <Tooltip title="点击分享">
                            <svg
                                className={styles.link_icon}
                                aria-hidden="true"
                                onClick={handleCopy}
                            >
                                <use xlinkHref={`#icon_share_lianjie`} />
                            </svg>
                        </Tooltip>
                        <svg
                            className={styles.poster_icon}
                            aria-hidden="true"
                            onClick={handleDownPoster}
                        >
                            <use xlinkHref={`#icon_share_haibao`} />
                        </svg>
                    </div>
                </div>
                <Space size={16}>
                    {activityDetails?.courseName ? (
                        <div className={styles.enroll_info_particulars_course}>
                            {activityDetails.courseName}
                        </div>
                    ) : (
                        activityDetails.categoryName?.map((categoryName: string) => (
                            <div
                                className={styles.enroll_info_particulars_category}
                                key={categoryName}
                            >
                                {categoryName}
                            </div>
                        ))
                    )}
                </Space>
                <div className={styles.enroll_info_particulars_list}>
                    {/* <div className={styles.enroll_info_particulars_item}>
                        <div className={styles.label}>
                            {_.get(PLAY_TYPE, `${activityDetails?.entryCode}.TIME`, '')}：
                        </div>
                        <div className={styles.value}>{renderTime()}</div>
                    </div> */}
                    {renderEnrollTime()}
                    {renderEnrollAddress()}
                    {activityDetails.quota! > 0 && (
                        <div className={styles.enroll_info_particulars_item}>
                            <div className={styles.label}>报名人数：</div>
                            <div className={styles.value}>
                                {activityDetails.appliedNum}
                                {activityDetails.quota && activityDetails.quota !== -1
                                    ? `/${activityDetails.quota}`
                                    : ''}
                            </div>
                        </div>
                    )}

                    {activityDetails.payEndTime! > 0 && (
                        <div className={styles.enroll_info_particulars_item}>
                            <div className={styles.label}>缴费截止时间：</div>
                            <div className={styles.value}>
                                {getDate(activityDetails.payEndTime!)}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.poster_wrapper} id="div_to_capture">
                {TemplateOne()}
            </div>
        </div>
    )
}

export default inject('siteStore')(observer(EnrollInfo))
