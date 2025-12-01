import { inject, observer } from 'mobx-react'
import type SiteStore from '@/stores/siteStore'
import styles from './index.less'
import { Image } from 'antd'
import { history, useModel } from 'umi'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import { findSiteData } from '@wotu/wotu-components'

const HeaderBar = (props: { siteStore?: SiteStore }) => {
    const masterModel = useModel('@@qiankunStateFromMaster')
    const { gatewaySiteStore } = masterModel || {}
    const { portalData } = gatewaySiteStore || {}

    const { siteStore } = props || {}
    const { siteData = {} } = siteStore || {}
    // 从路由中获取自定义域名
    let portalDomain = getPortalCodeFromUrl({ isGetDomain: true })
    // 根据自定义域名获取对应机构code
    const portalCode = getPortalCodeFromUrl()

    const logo = () => {
        if (portalCode) {
            const currentPortalData = portalData?.[portalCode] || {}
            const currentPortalLogo = currentPortalData?.organizationLogo || ''
            return currentPortalLogo
        } else {
            return findSiteData(siteData, 'wap_logo')?.value || ''
        }
    }

    const name = () => {
        if (portalCode) {
            const currentPortalData = portalData?.[portalCode] || {}
            const currentPortalName = currentPortalData?.organizationName || ''
            return currentPortalName
        } else {
            return findSiteData(siteData, 'name', { findKey: 'baseInfo' }) || ''
        }
    }

    const backHandler = () => {
        if (portalDomain) {
            window.location.href = `/${portalDomain}/home`
        } else {
            history.goBack()
        }
    }

    return (
        <div className={styles.header_bar}>
            <div className={styles.title}>
                <Image className={styles.image} src={logo() || defaultLogo} preview={false} />
                <span className={styles.name}>{'报名中心' || name()}</span>
            </div>
            <div className={styles.go_back} onClick={() => backHandler()}>
                <svg className="icon" aria-hidden="true" style={{ marginRight: '4px' }}>
                    <use xlinkHref={`#icon_back`} />
                </svg>
                <span>返回</span>
            </div>
        </div>
    )
}

export default inject('siteStore')(observer(HeaderBar))
