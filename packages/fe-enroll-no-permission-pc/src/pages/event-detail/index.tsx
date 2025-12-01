import React, { useEffect } from 'react'
import type { IRoute } from 'umi'
import { inject, observer, useLocalObservable } from 'mobx-react'
import classNames from 'classnames'
import styles from './index.module.less'
import { Button, message, Popover, Image } from 'antd'
import EnrollBtn from './components/EnrollBtn'
import QRCode from 'qrcode.react'
import EventDetailStore from './store'
// @ts-ignore
import { findSiteData, PTHistory } from '@wotu/wotu-components'
import { getCookie } from '@/storage'
import { useDocTitle } from '@/hooks/useDocTitle'

/**
 * @query code 活动id
 */
const EventDetail = (props: any) => {
    const store = useLocalObservable(() => new EventDetailStore())
    const { activeDetail, getActiveDetail, checkJoin, getActiveReview, reviewInfo } = store || {}
    const {
        location: { query },
        siteStore: { siteData },
    } = props || {}
    const { code } = query || {}
    let midMobileDomain = findSiteData(siteData, 'midMobileDomain', { findKey: 'baseInfo' }) || ''
    const getQrCode = () => {
        return (
            <div className={classNames(styles.qrcode_content)}>
                <QRCode
                    id="QR-code"
                    className={classNames(styles.event_qrcode)}
                    value={
                        `${midMobileDomain}/enroll-center/event-detail?code=${code}&applyChannel=link` ||
                        ''
                    }
                    size={104}
                    fgColor="#000000"
                />
                <div className={classNames(styles.qrcode_content_text)}>微信扫一扫</div>
            </div>
        )
    }

    const imgLoaded = (e: any) => {
        const { target } = e || {}
        if (target.width > target.height) {
            target.setAttribute('width', 'auto')
            target.setAttribute('height', '100%')
        } else {
            target.setAttribute('width', '100%')
            target.setAttribute('height', 'auto')
        }
    }

    useEffect(() => {
        /** 获取h5 saas的基础地址 */
        const qrcodeUrl = `${midMobileDomain}/enroll-center/event-detail?code=${code}`
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
        )
        const isSmallScreen = window.innerWidth < 1200
        if (isMobile || isSmallScreen) {
            window.location.href = qrcodeUrl
            return
        }
        getActiveDetail(code)
        getActiveReview(code)
        if (getCookie('TOKEN')) {
            checkJoin(code)
        }
    }, [])

    useDocTitle(activeDetail.activityName || '')

    const toJobPart = async () => {
        const hasCheck = await checkJoin(activeDetail.code!)
        if (hasCheck) {
            PTHistory.push(
                'location',
                `/job-center/square/job-part?activityCode=${activeDetail.code}`,
                'middle',
            )
        } else {
            message.error({ content: '您还未报名成功，请先完成报名' })
        }
    }

    return (
        <div className={classNames(styles.page)}>
            <div className={classNames(styles.event_top)}>
                <div className={classNames(styles.event_top_info)}>
                    <div className={classNames(styles.event_img)}>
                        <img onLoad={imgLoaded} src={activeDetail.coverUrl || ''} />
                    </div>
                    <div className={classNames(styles.event_info)}>
                        <div className={classNames(styles.event_info_name)}>
                            <div className={classNames(styles.event_name)}>
                                {activeDetail.activityName}
                            </div>
                            <div className={classNames(styles.event_share)}>
                                分享至
                                <Popover
                                    placement="bottom"
                                    title={null}
                                    content={getQrCode()}
                                    getPopupContainer={triggerNode =>
                                        triggerNode.parentElement as HTMLElement
                                    }
                                >
                                    <svg className={['icon'].join(' ')} aria-hidden="true">
                                        <use xlinkHref="#icon_wechat" />
                                    </svg>
                                </Popover>
                            </div>
                        </div>

                        <div className={classNames(styles.event_info_watch)}>
                            <svg className={['icon'].join(' ')} aria-hidden="true">
                                <use xlinkHref="#Eye-open" />
                            </svg>
                            <div className={styles.event_watch_text}>
                                {activeDetail.pvStr}人浏览
                            </div>
                        </div>

                        <div className={classNames(styles.event_info_line)}>
                            <div className={classNames(styles.event_info_line_label)}>主办方：</div>
                            <div className={classNames(styles.event_info_line_value)}>
                                {activeDetail.sponsorName ? activeDetail.sponsorName : '-'}
                            </div>
                        </div>

                        <div className={classNames(styles.event_info_line)}>
                            <div className={classNames(styles.event_info_line_label)}>形式：</div>
                            <div className={classNames(styles.event_info_line_value)}>
                                {activeDetail.activityFormName}
                            </div>
                        </div>

                        <div className={classNames(styles.event_info_line)}>
                            <div className={classNames(styles.event_info_line_label)}>时间：</div>
                            <div className={classNames(styles.event_info_line_value)}>
                                {activeDetail.dateDesc}
                            </div>
                        </div>

                        {activeDetail.activityForm?.toString?.() === '1' ||
                        activeDetail.activityForm?.toString?.() === '2' ? (
                            <div className={classNames(styles.event_info_line)}>
                                <div className={classNames(styles.event_info_line_label)}>
                                    地址：
                                </div>
                                <div className={classNames(styles.event_info_line_value)}>
                                    {activeDetail.address}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className={classNames(styles.event_top_enroll)}>
                    <div className={classNames(styles.event_top_enroll_price)}>免费</div>
                    <EnrollBtn enrollCode={activeDetail.applyCode} />
                </div>
            </div>

            <div className={classNames(styles.event_bottom)}>
                {activeDetail.relateProfessionStatus?.toString?.() === '1' ? (
                    <div className={classNames(styles.event_job_part)}>
                        <div className={classNames(styles.event_job_part_info)}>
                            <svg
                                className={classNames('icon', styles.event_job_part_info_sign)}
                                aria-hidden="true"
                            >
                                <defs>
                                    <linearGradient
                                        id="huichang"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop
                                            offset="0%"
                                            style={{
                                                stopColor: 'var(--primary-color-065)',
                                                stopOpacity: '1',
                                            }}
                                        />
                                        <stop
                                            offset="100%"
                                            style={{
                                                stopColor: 'var(--primary-color)',
                                                stopOpacity: '1',
                                            }}
                                        />
                                    </linearGradient>
                                </defs>
                                <use xlinkHref={`#xianshanghuichang`} />
                            </svg>

                            <div className={classNames(styles.event_job_part_info_num)}>
                                {activeDetail.organizationNum}家
                            </div>
                            <div className={classNames(styles.event_job_part_info_unit)}>
                                招聘企业
                            </div>
                            <div className={classNames(styles.event_job_part_info_split)} />
                            <div className={classNames(styles.event_job_part_info_num)}>
                                {activeDetail.professionNum}个
                            </div>
                            <div className={classNames(styles.event_job_part_info_unit)}>
                                招聘岗位
                            </div>
                        </div>
                        <Button
                            type={'primary'}
                            className={classNames(styles.event_job_part_btn)}
                            onClick={toJobPart}
                            // disabled={!hasCheck}
                        >
                            进入会场
                        </Button>
                    </div>
                ) : null}

                <div className={classNames(styles.event_bottom_title)}>活动介绍</div>

                <div
                    className={classNames(styles.event_bottom_rich)}
                    dangerouslySetInnerHTML={{ __html: activeDetail.activityIntroduce || '' }}
                />

                {reviewInfo?.attachment && reviewInfo?.summary && (
                    <div className={styles.review_wrapper}>
                        <div className={classNames(styles.event_bottom_title)}>活动回顾</div>
                        <div className={styles.img_wrapper}>
                            <Image.PreviewGroup>
                                {reviewInfo?.attachment?.split(',')?.map((url: string) => {
                                    return (
                                        <Image
                                            className={styles.img}
                                            height={120}
                                            width={213}
                                            src={url}
                                        />
                                    )
                                })}
                            </Image.PreviewGroup>
                        </div>
                        <div className={styles.summary}>{reviewInfo?.summary}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

const ObserverEnrollList: IRoute = inject('userStore', 'siteStore')(observer(EventDetail))
ObserverEnrollList.title = '活动详情'
export default ObserverEnrollList
