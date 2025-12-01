import HeaderUser from '@/components/HeaderUser'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import { PTPcNav, PTPcFooter, PTPcFloatingWindow } from '@wotu/pt-components'
import { linkHandler } from '@/utils/microLink'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import styles from './index.module.less'
import { findSiteData } from '@wotu/wotu-components'
import { getLocalStorage } from '@/storage'

const NormalLayout = props => {
    const alias = getLocalStorage('ALIAS')
    const { header, footer, userStore, siteStore } = props || {}
    let portalCode = getPortalCodeFromUrl()
    const currentDomain = getPortalCodeFromUrl({ isGetDomain: true }) || ''

    const [minHeight, setMinHeight] = useState(0)
    const getMinHeight = () => {
        const headerHeight = header ? 176 : 0
        const footerHeight = footer ? 44 : 0
        return headerHeight + footerHeight
    }

    useEffect(() => {
        let temp = getMinHeight()
        setMinHeight(temp)
    }, [header, footer])

    // 公安备案号
    const PoliceObj = {
        // 备案号
        policeCode: findSiteData(siteStore!.siteData, 'icp_code')?.value,
        // 备案号链接
        linkPoliceCode: findSiteData(siteStore!.siteData, 'link_police_code')?.value,
    }
    const getawayData = siteStore?.portalData?.[portalCode] || {}

    return (
        <>
            {/* 导航 */}
            {header ? (
                <PTPcNav
                    logo={getawayData?.naviLogo}
                    title={
                        getawayData.navigationImgType === 0 &&
                        (getawayData.shortName || getawayData?.organizationName)
                    }
                    dataList={userStore.microNav}
                    onItemClick={item => {
                        linkHandler(item, userStore)
                    }}
                    rightNode={<HeaderUser />}
                    portalCode={currentDomain}
                />
            ) : null}
            <div style={{ minHeight: `calc(100vh - ${minHeight}px)` }}>{props.children}</div>
            {/*   页脚  */}
            {footer ? (
                <PTPcFooter
                    selectTemplate={userStore?.portalFooterConfig?.type}
                    navigationLinksList={userStore?.portalFooterConfig?.navigationLinks}
                    friendshipLinksList={userStore?.portalFooterConfig?.friendshipLinks}
                    marketingLinksList={userStore?.portalFooterConfig?.marketingLinks}
                    onItemClick={linkHandler}
                    wtVisible={alias !== 'szrc'}
                    {...PoliceObj}
                />
            ) : null}
            {/* <PTFooter police={policeCode} icp={icpCode} linkPolice={linkPoliceCode} /> */}

            {/* 悬浮窗 */}
            <div className={styles.floating_window}>
                <PTPcFloatingWindow
                    checklist={userStore?.floatWindowConfig}
                    onLinkCLickGoToUrl={item => {
                        linkHandler({
                            linkUrl: item.actionUrl,
                            linkType: item.actionUrlType,
                        })
                    }}
                />
            </div>
        </>
    )
}
export default observer(NormalLayout)
