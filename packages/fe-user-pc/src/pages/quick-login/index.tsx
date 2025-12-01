import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import { useEffect, useLayoutEffect, useState } from 'react'
import type { IRoute } from 'umi'
import type { PageProps } from '@/types'
import hooks from './hooks'
import Login from './components/Login'
import Seat from './components/Seat'
import { findSiteData } from '@wotu/wotu-components'
import type { QuickLogin } from './interface'
import { setCookie } from '@/storage'

/**
 * @params businessType 业务类型
 * @params businessId 业务id
 * @params backUrl 指定返回的地址，使用前需要先进行decodeURIComponent解码
 */

const Quick = observer((props: PageProps) => {
    const {
        siteStore,
        userStore,
        location: { query },
    } = props

    const [onConfig, setOnConfig] = useState(false)

    const { businessType, businessId, backUrl } = query

    const quickHooks = useLocalObservable(() => new hooks())

    useLayoutEffect(() => {
        if (window?.dyRem) {
            window?.dyRem?.()
        }
    }, [])

    useEffect(() => {
        if (backUrl) quickHooks.bindBackUrl(backUrl)
        if (businessType && businessId) {
            quickHooks.getConfig(businessType, businessId)
            setCookie('QUICK_LOGIN_TYPE', 1)
        } else {
            setOnConfig(true)
            setCookie('QUICK_LOGIN_TYPE', 2)
        }
    }, [])

    // 配置数据获取后 更新title 展示表单
    useEffect(() => {
        const { title, sid } = quickHooks.pageConfig
        title ? (document.title = `登录-${title}`) : (document.title = '登录')
        if (sid) {
            setOnConfig(true)
        }
    }, [quickHooks.pageConfig])

    useEffect(() => {
        const { siteData = {} } = siteStore || {}
        const padDomain = findSiteData(siteData, 'padDomain', { findKey: 'baseInfo' })
        quickHooks.bindPad(padDomain)
    }, [siteStore?.siteData])

    const enterFullPage = () => {
        if (document.fullscreenElement) return
        document.body.requestFullscreen()
    }

    // 全屏
    useEffect(() => {
        document.onkeydown = () => {
            enterFullPage()
        }
    }, [])

    // 根据文本长度 修改座位号字体
    const getSeatNumberCss = () => {
        const seatLength = quickHooks.seat?.toString().trim().length
        return seatLength! > 2 ? styles.seat_number_more : ''
    }

    // 根据文本长度 修改座位号字体
    const getSeatUnitCss = () => {
        const seatLength = quickHooks.seat?.toString().trim().length
        return seatLength! > 2 ? styles.seat_unit_more : ''
    }

    return (
        <div className={styles.page} onClick={enterFullPage}>
            <div className={styles.content}>
                {!!quickHooks.pageConfig?.title && (
                    <div className={styles.logo_content}>
                        <img
                            className={styles.logo}
                            src={quickHooks.pageConfig.logoUrl || defaultLogo}
                        />
                        {quickHooks.pageConfig?.isShowLogoName && <div className={styles.logo_title}>{quickHooks.pageConfig?.logoName}</div>}
                    </div>
                )}
                <div className={styles.title_content}>
                    <div className={styles.title}>{quickHooks.pageConfig.title}</div>
                </div>
                <div className={styles.main}>
                    <div className={styles.left}>
                        {quickHooks.seat ? (
                            <div className={styles.seat_bg}>
                                <div className={styles.seat_content}>
                                    <div
                                        className={[styles.seat_number, getSeatNumberCss()].join(
                                            ' ',
                                        )}
                                    >
                                        {quickHooks.seat}
                                    </div>
                                    <div className={[styles.seat_unit, getSeatUnitCss()].join(' ')}>
                                        号
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.image} />
                        )}
                    </div>
                    {onConfig ? (
                        <div className={styles.right}>
                            {/* 是否开启了座位号 */}
                            {quickHooks.pageConfig.enterSeat && !quickHooks.seat ? (
                                <Seat nextHandler={quickHooks.nextHandler} />
                            ) : null}
                            {/* 输入座位号之后输入证件号码 */}
                            {!quickHooks.pageConfig.enterSeat || quickHooks.seat ? (
                                <Login
                                    quick={quickHooks.quick}
                                    loginHandler={(params: QuickLogin) =>
                                        quickHooks.loginHandler(params, userStore)
                                    }
                                />
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
})

const ObserverLogin: IRoute = inject('userStore', 'siteStore')(Quick)

ObserverLogin.title = '登录'

export default ObserverLogin
