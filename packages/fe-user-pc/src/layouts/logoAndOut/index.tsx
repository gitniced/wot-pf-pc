import Footer from '@/components/Global/Footer'
import Header from '@/components/Global/Header'
import { Layout } from 'antd'
import type { IRoute } from 'umi'
import styles from './index.module.less'
import { useEffect, useState } from 'react'

import { findSiteData } from '@wotu/wotu-components'
import type { THEME_ENUM } from '../const'
import { THEME_IMG_MAP } from '../const'

export default (props: IRoute) => {
    const [bg, setBg] = useState('')
    const [center, setCenter] = useState(false)
    const [imgUrl, setImgUrl] = useState('')
    useEffect(() => {
        const { siteData } = props.siteStore || {}
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
    }, [props.siteStore])

    return (
        <Layout className={styles.page} style={{ backgroundImage: `url(${bg})` }}>
            <Header noUser={false} noBg={true} padding={true} noBack={true} />
            <div className={[styles.content, center ? styles.center : styles.right].join(' ')}>
                {imgUrl && <img style={{ marginRight: '130px' }} src={imgUrl} />}
                <div className={styles.user_content}>{props.children}</div>
            </div>
            <Footer noBg={true} />
        </Layout>
    )
}
