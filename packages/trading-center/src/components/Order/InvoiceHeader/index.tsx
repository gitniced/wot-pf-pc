import type SiteStore from '@/stores/siteStore'
import { inject, observer } from 'mobx-react'
import styles from './index.module.less'
import headerHooks from './hooks'
import { useEffect, useState } from 'react'
import { history } from 'umi'
import * as Storage from '@/storage'
import type UserStore from '@/stores/userStore'

const Header = observer(
    (props: { userStore?: UserStore; siteStore?: SiteStore; noUser: boolean }) => {
        const { siteStore } = props || {}
        const userToken = Storage.getCookie('TOKEN')

        let { siteData } = siteStore
        let { data } = siteData
        data = data || {}

        const hooks = headerHooks()
        const [logo, setLogo] = useState('')

        useEffect(() => {
            let { configList } = data
            configList = configList || []
            configList.map(item => {
                switch (item.key) {
                    case 'wap_logo':
                        setLogo(item.value)
                        break
                }
            })
        }, [data])

        const gotoPcDomain = () => {
            let { baseInfo } = data || {}
            let { pcDomain } = baseInfo || {}
            if (pcDomain) {
                window.location.href = pcDomain
            } else {
                if (userToken) {
                    history.push('/order')
                } else {
                    location.replace(`${pcDomain}/account`)
                }
            }
        }

        return (
            <div className={styles.page}>
                <div className={styles.logo_content} onClick={hooks.backToHome}>
                    <div
                        className={styles.logo}
                        style={{
                            background: `url(${logo || defaultLogo}) no-repeat center / cover`,
                        }}
                    />

                    <div className={styles.site_name}>交易中心</div>
                </div>

                <div className={styles.setting}>
                    <div className={styles.back} onClick={gotoPcDomain}>
                        <svg className={[styles.icon, 'icon'].join(' ')} aria-hidden="true">
                            <use xlinkHref={`#icon_tuichu`} />
                        </svg>
                        <span>退出登录</span>
                    </div>
                </div>
            </div>
        )
    },
)

export default inject('siteStore')(Header)
