import Footer from '@/components/Global/Footer'
import Header from '@/components/Global/Header'
import { Layout } from 'antd'
import type { IRoute } from 'umi'
import { useLocation } from 'umi'
import styles from './index.module.less'
import { useEffect, useState } from 'react'

import { findSiteData } from '@wotu/wotu-components'
import type { THEME_ENUM } from '../const'
import { THEME_IMG_MAP } from '../const'
import classNames from 'classnames'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
// import { inject, observer } from 'mobx-react'

const UserLayout = (props: IRoute) => {
    const [bg, setBg] = useState('')
    const [center, setCenter] = useState(false)
    const [imgUrl, setImgUrl] = useState('')
    const { siteData, portalData } = props.siteStore || {}

    const alias = findSiteData(siteData, 'alias', { findKey: 'baseInfo' }) || ''

    const { pathname } = useLocation()
    const isFacePage = pathname.includes('/user/face-login')

    // 不依据站点配置渲染content的 动态路由 的集合
    const NO_CONTENT_CURRENT_URL_LIST = ['/school']
    // 判断当前路由是否在 NO_CONTENT_CURRENT_URL_LIST 中，是的话不展示默认layout
    let isBlankLayout = NO_CONTENT_CURRENT_URL_LIST.find(item => location.pathname.includes(item))

    useEffect(() => {
        let loginTheme: THEME_ENUM = Number(findSiteData(siteData, 'login_theme')?.value || '1')
        let loginBackend = findSiteData(siteData, 'login_backend')?.value || ''
        let loginFormPosition = Number(findSiteData(siteData, 'login_form_position')?.value || '1')
        // 是否居中 center、背景图片路径 bg、img路径 imgUrl、
        // 只有自定义right的时候，才使用right，其他的情况都是用center
        if (loginTheme !== 4) {
            setBg(THEME_IMG_MAP[loginTheme]?.bg)
            setCenter(true)
            setImgUrl(THEME_IMG_MAP[loginTheme]?.img)
        } else {
            setBg(loginBackend)
            setCenter(loginFormPosition === 1)
        }
    }, [props.siteStore.siteData])

    /** 是否展示回到首页*/
    const getHomeVisible = () => {
        const portalCode = getPortalCodeFromUrl()
        const noHomeList = ['szrc', 'szrcsz']
        if (portalCode) {
            const currentPortalCode = getPortalCodeFromUrl()
            const currentPortalData = portalData?.[currentPortalCode] || {}
            const { privacyPortalFlag } = currentPortalData as any
            if (!isNaN(privacyPortalFlag)) {
                if (Number(privacyPortalFlag) === 0) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } else {
            return !noHomeList.includes(alias)
        }
    }

    /** 是否展示提示文案*/
    const getMessageVisible = () => {
        const showMessageList = ['gyxx']
        return showMessageList.includes(alias)
    }

    return (
        <>
            {isBlankLayout ? (
                props.children
            ) : (
                <Layout className={styles.page} style={{ backgroundImage: `url(${bg})` }}>
                    <Header
                        noUser={false}
                        noBg={true}
                        padding={false}
                        showGoToHome={getHomeVisible()}
                    />

                    {getMessageVisible() ? (
                        <div className={styles.user_message}>
                            <svg
                                className={['icon', styles.user_message_left].join(' ')}
                                aria-hidden="true"
                            >
                                <use xlinkHref={`#icon_tips`} />
                            </svg>
                            <div className={styles.user_message_right}>
                                <div className={styles.user_message_right_title}>重要提示</div>
                                <div className={styles.user_message_right_text}>
                                    为了保障您的账号安全，本次平台系统升级，密码规则也同步升级，请您按以下密码规则进行登录：
                                    【方法1】请您使用身份证号后六位登录；【方法2】您的密码同登录账号一致；
                                    若按以上2种方法仍不能登录，请联系平台客服为您解决。
                                    {alias === 'gyxx'
                                        ? '请联系平台客服为您解决：4000123571 。'
                                        : '请联系平台客服为您解决。'}
                                </div>
                            </div>
                        </div>
                    ) : null}
                    <div
                        className={classNames([
                            styles.content,
                            getMessageVisible() ? styles.no_height : '',
                            isBlankLayout ? styles.blank_content : null,
                            center ? styles.center : styles.right,
                        ])}
                    >
                        {imgUrl && !isFacePage && (
                            <img style={{ marginRight: '0.86rem' }} src={imgUrl} />
                        )}
                        <div className={styles.user_content}>{props.children}</div>
                    </div>

                    <Footer noBg={true} />
                </Layout>
            )}
        </>
    )
}

// export default inject('siteStore')(observer(UserLayout))
export default UserLayout
