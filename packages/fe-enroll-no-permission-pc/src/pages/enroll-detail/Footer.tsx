/* eslint-disable no-case-declarations */
import React, { useMemo } from 'react'
import { inject, observer } from 'mobx-react'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Modal, Typography } from 'antd'
import { history } from 'umi'

import { judegTimeInDay } from '@/types/enroll-const'
import { getCookie, setCookie } from '@/storage/cookie'

import { REGISTERED_STATUS, ACTIVITY_STATUS } from './const'
import { setRedColor } from '../enroll-list/components/TimeTips'
import type EnrollDetailsStore from './store'

import styles from './Footer.module.less'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import { getSessionStorage } from '@/storage'
// @ts-ignore
import { findSiteData, useCountDown, PTHistory } from '@wotu/wotu-components'

interface EnrollFooterProps {
    store: EnrollDetailsStore
    enrollCode: string
}
export const TimeTips = ({
    time,
    label = '开始报名',
    interval = 0,
    forceUpdate,
}: {
    time: number
    label?: string
    interval?: number
    forceUpdate?: () => void
}) => {
    const [timeInfo] = useCountDown({
        time,
        interval,
    })
    const { day, min, hour, seconds, isOver } = timeInfo

    if (isOver) {
        forceUpdate?.()
        // 防止时间误差
        setTimeout(() => {
            forceUpdate?.()
        }, 500)
    }
    return (
        <span className={styles.tips}>
            {!isOver ? (
                <>
                    {setRedColor(day)}天{setRedColor(hour)}时{setRedColor(min)}分
                    {setRedColor(seconds)}秒{label}
                </>
            ) : null}
        </span>
    )
}
const Footer = (props: EnrollFooterProps) => {
    //@ts-ignore
    const { store, enrollCode, siteStore } = props
    const { siteData } = siteStore
    const { activityDetails } = store
    const {
        quota,
        openPay,
        code,
        status,
        remainNum,
        applyStartTime,
        price,
        payEndTime,
        applyEndTime,
        recordCode,
        ndVerify,
    } = activityDetails

    const forceUpdate = async () => {
        await store.getActivityDetail(enrollCode!)
    }

    const getBindUrl = () => {
        const platform = getSessionStorage('PLATFORM')
        const alias = getPortalCodeFromUrl({ isGetDomain: true })
        const loginUrl = findSiteData(siteStore?.siteData || {}, 'pcDomain', {
            findKey: 'baseInfo',
        })
        switch (platform) {
            case 'portal':
                return `${window.location.origin}/${alias}/user-center/bind/idcard`
            default:
                return `${loginUrl}/account/bind/idcard`
        }
    }

    /**前往认证 */
    const toAudit = () => {
        Modal.warning({
            width: 480,
            title: '温馨提示',
            content: '您报名的活动需要完成实名认证，请点击【前往处理】联系客服完成实名认证',
            okText: '前往处理',
            closable: true,
            onOk: () => {
                window.open(getBindUrl())
                return Promise.reject()
            },
        })
    }

    // 立即报名 single 个人报名 group 批量报名
    const onEnroll = async (type: 'single' | 'group') => {
        const enrollUrl =
            type === 'single'
                ? `/enroll-information?activityCode=${code}`
                : `/group-enroll?activityCode=${code}`
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        if (isLogin()) {
            // 校验个人报名年龄限制
            if (type === 'single') {
                const result: any = await store.checkEnrollDetails()
                if (!result) {
                    return
                }
            }
            if (ndVerify) {
                if (store?.activityDetails?.verify) {
                    history.push(enrollUrl)
                } else {
                    toAudit()
                }
            } else {
                history.push(enrollUrl)
            }
        } else {
            const currentAlias = location.pathname.split('/')?.[1] || ''
            const portalCode = getPortalCodeFromUrl()
            // 门户报名
            if (portalCode) {
                setCookie(
                    'FROM_URL',
                    `${window.location.origin}/${currentAlias}/enroll-gateway${enrollUrl}`,
                )
                location.href = `/${currentAlias}/user-center/user/login`
            } else {
                setCookie('FROM_URL', `${window.location.origin}/enroll-gateway${enrollUrl}`)
                const loginUrl = findSiteData(siteData || {}, 'pcDomain', {
                    findKey: 'baseInfo',
                })
                location.href = `${loginUrl}/account/user/login`
            }
        }
    }
    const gotoPay = () => {
        // 跳转到收银台
        store.gotoPay(recordCode!)
    }
    // 查看报名
    const openMyApply = () => {
        const platform = getSessionStorage('PLATFORM')
        switch (platform) {
            case 'portal':
                PTHistory.push('location', '/mine/enroll-center/my-enrollment')
                break
            default:
                // PTHistory.push('history', '/my-enrollment')
                const personalDomain = findSiteData(siteStore?.siteData || {}, 'personalDomain', {
                    findKey: 'baseInfo',
                })
                window.location.href = `${personalDomain}/enroll-center/my-enrollment`
                break
        }
    }

    // 判读是否登录
    const isLogin = () => {
        let token = getCookie('TOKEN')
        return !!token
    }

    /** 判断用户是否未报名
     * 未报名、报名失败、已取消
     */
    const isUserNotRegister = () => {
        // return activityDetails.recordStatus === REGISTERED_STATUS.NOT_REGISTERED
        return [
            REGISTERED_STATUS.NOT_REGISTERED,
            REGISTERED_STATUS.CANCEL,
            REGISTERED_STATUS.FAIL,
        ].includes(activityDetails.recordStatus as number)
    }
    /** 判断用户是否已报名（待审核、过期未缴费、已退费、报名成功） */
    const isUserRegistered = () => {
        return [
            REGISTERED_STATUS.PENDING_REVIEW,
            REGISTERED_STATUS.OVERDUE_UNPAID,
            REGISTERED_STATUS.REFUNDED,
            REGISTERED_STATUS.SUCCESS,
        ].includes(activityDetails.recordStatus as number)
    }
    /** 判断用户是否已报名但未缴费 */
    const isUserUnpaid = () => {
        return activityDetails.recordStatus === REGISTERED_STATUS.UNPAID
    }

    // 渲染个人报名和批量报名的dropdown的menu
    const items: MenuProps['items'] = [
        {
            key: 'single',
            label: <Typography.Text>个人报名</Typography.Text>,
            onClick: () => onEnroll('single'),
        },
        {
            key: 'group',
            label: <Typography.Text>批量报名</Typography.Text>,
            onClick: () => onEnroll('group'),
        },
    ]

    // 如果开启了批量报名，渲染dropdown，否则渲染按钮
    const renderDropdown = () => {
        const batch_registration = findSiteData(siteData, 'batch_registration')

        if (batch_registration?.value === '1') {
            return (
                <Dropdown
                    menu={{ items }}
                    placement="bottom"
                    overlayClassName="enroll_detail_dropdown"
                >
                    <Button type="primary">立即报名</Button>
                </Dropdown>
            )
        }

        // 个人
        return (
            <Button type="primary" onClick={() => onEnroll('single')}>
                立即报名
            </Button>
        )
    }

    const renderTips = useMemo(() => {
        let footer: string | React.ReactNode = ''
        let priceContent: string | React.ReactNode = ''
        // 如果开启了缴费
        if (openPay) {
            priceContent = <div className={styles.price}>¥{price}</div>
        }
        // else {
        //     priceContent = (
        //         <div className={styles.price} style={{ fontSize: 32 }}>
        //             免费
        //         </div>
        //     )
        // }

        if (status === ACTIVITY_STATUS.NOT_START) {
            // 未到达报名开始时间
            // !isArrivedApplyStartTime()
            const isInFourDay = judegTimeInDay(applyStartTime!) // 当0<距离报名开始时间<=4天时，展示tips
            footer = (
                <>
                    {priceContent}
                    <div className={styles.enroll_footer_info}>
                        {isInFourDay && (
                            <TimeTips forceUpdate={forceUpdate} time={applyStartTime!} />
                        )}
                        <Button className={styles.enroll_footer_btn} disabled type="primary">
                            报名未开始
                        </Button>
                    </div>
                </>
            )
        } else if (status === ACTIVITY_STATUS.REGISTERING && remainNum === 0) {
            // 未到达报名结束时间 且 已报人数=最大报名人数
            if (isLogin()) {
                // 未报名
                if (isUserNotRegister()) {
                    footer = (
                        <>
                            {priceContent}
                            <div className={styles.enroll_footer_info}>
                                <Button disabled type="primary">
                                    已满员
                                </Button>
                            </div>
                        </>
                    )
                }
                // 已报名(待审核、过期未缴费、已退费、报名失败、报名成功)
                if (isUserRegistered()) {
                    footer = (
                        <>
                            {priceContent}
                            <div className={styles.enroll_footer_info}>
                                <Button onClick={() => openMyApply()} type="primary">
                                    查看报名
                                </Button>
                            </div>
                        </>
                    )
                }
                // 已报名-未缴费
                if (isUserUnpaid()) {
                    // tips判断
                    let tips: React.ReactNode | string = ''
                    // 当0<缴费截止时间-当前时间<=3天时，展示倒计时
                    const isThreeDay = judegTimeInDay(payEndTime!, new Date().getTime(), 3)
                    // payEndTime
                    if (isThreeDay) {
                        tips = (
                            <TimeTips
                                forceUpdate={forceUpdate}
                                label="结束缴费"
                                time={payEndTime!}
                            />
                        )
                    }
                    footer = (
                        <div className={styles.enroll_footer_info}>
                            {priceContent}
                            <div className={styles.enroll_footer_info}>
                                {tips}
                                <Button onClick={gotoPay} type="primary">
                                    去支付
                                </Button>
                            </div>
                        </div>
                    )
                }
            } else {
                footer = (
                    <>
                        {priceContent}
                        <div className={styles.enroll_footer_info}>
                            <Button disabled type="primary">
                                已满员
                            </Button>
                        </div>
                    </>
                )
            }
        } else if (status === ACTIVITY_STATUS.REGISTERING) {
            // 到达报名开始时间 且 未达到报名结束时间
            let tips: React.ReactNode | string = ''
            if (remainNum! <= 10 && remainNum! > 0) {
                tips = <>剩余名额{setRedColor(remainNum)}</>
            }
            const isInFourDay = judegTimeInDay(applyEndTime!)
            // 当0<距离报名结束时间<=4天且剩余名额>10名时
            if (isInFourDay && (quota === -1 || remainNum! > 10)) {
                tips = (
                    <TimeTips forceUpdate={forceUpdate} time={applyEndTime!} label={'结束报名'} />
                )
            }
            if (isLogin()) {
                // 已登录
                // 未报名
                if (isUserNotRegister()) {
                    footer = (
                        <>
                            {priceContent}
                            <div className={styles.enroll_footer_info}>
                                {tips}
                                {renderDropdown()}
                            </div>
                        </>
                    )
                }
                // 已报名(待审核、过期未缴费、已退费、报名失败、报名成功、已取消)
                if (isUserRegistered()) {
                    footer = (
                        <>
                            {priceContent}
                            <div className={styles.enroll_footer_info}>
                                <Button onClick={() => openMyApply()} type="primary">
                                    查看报名
                                </Button>
                            </div>
                        </>
                    )
                }
                // 已报名-未缴费
                if (isUserUnpaid()) {
                    // 当0<缴费截止时间-当前时间<=3天时，展示倒计时
                    const isThreeDay = judegTimeInDay(payEndTime!, new Date().getTime(), 3)
                    if (isThreeDay) {
                        tips = (
                            <TimeTips
                                forceUpdate={forceUpdate}
                                label="结束缴费"
                                time={payEndTime!}
                            />
                        )
                    }
                    footer = (
                        <>
                            {priceContent}
                            <div className={styles.enroll_footer_info}>
                                {tips}
                                <Button onClick={gotoPay} type="primary">
                                    去支付
                                </Button>
                            </div>
                        </>
                    )
                }
            } else {
                // 未登录（游客）
                footer = (
                    <>
                        {priceContent}
                        <div className={styles.enroll_footer_info}>
                            {tips}
                            {renderDropdown()}
                        </div>
                    </>
                )
            }
        } else if (status === ACTIVITY_STATUS.END) {
            if (isLogin()) {
                // 未报名
                if (isUserNotRegister()) {
                    footer = (
                        <>
                            {priceContent}
                            <div className={styles.enroll_footer_info}>
                                <Button disabled type="primary">
                                    报名已结束
                                </Button>
                            </div>
                        </>
                    )
                }
                // 已报名(待审核、过期未缴费、已退费、报名失败、报名成功)
                if (isUserRegistered()) {
                    footer = (
                        <>
                            {priceContent}
                            <div className={styles.enroll_footer_info}>
                                <Button onClick={() => openMyApply()} type="primary">
                                    查看报名
                                </Button>
                            </div>
                        </>
                    )
                }
                // 已报名-未缴费
                if (isUserUnpaid()) {
                    // tips判断
                    let tips: React.ReactNode | string = ''
                    // 当0<缴费截止时间-当前时间<=3天时，展示倒计时
                    const isThreeDay = judegTimeInDay(payEndTime!, new Date().getTime(), 3)
                    if (isThreeDay) {
                        tips = (
                            <TimeTips
                                forceUpdate={forceUpdate}
                                label="结束缴费"
                                time={payEndTime!}
                            />
                        )
                    }
                    footer = (
                        <>
                            {priceContent}
                            <div className={styles.enroll_footer_info}>
                                {tips}
                                <Button onClick={gotoPay} type="primary">
                                    去支付
                                </Button>
                            </div>
                        </>
                    )
                }
            } else {
                footer = (
                    <>
                        {priceContent}
                        <div className={styles.enroll_footer_info}>
                            <Button disabled type="primary">
                                报名已结束
                            </Button>
                        </div>
                    </>
                )
            }
        }
        return footer
    }, [activityDetails.status, activityDetails.recordStatus])
    return <div className={styles.enroll_footer}>{renderTips}</div>
}

export default inject('siteStore', 'userStore')(observer(Footer))
