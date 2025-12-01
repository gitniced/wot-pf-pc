import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import { PTPcFooter } from '@wotu/pt-components'
import { linkHandler } from '@/utils/microLink'
import { observer } from 'mobx-react'
import styles from './index.module.less'
import { findSiteData } from '@wotu/wotu-components'
import { getLocalStorage } from '@/storage'

const BaseLayout = (props: any) => {
    const alias = getLocalStorage('ALIAS')
    const { userStore, siteStore } = props || {}
    let portalCode = getPortalCodeFromUrl()

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
            <div className={styles.pc_nav_view_warp}>
                <div className="pc_nav_view">
                    <div className="pc_nav_view_left">
                        {getawayData?.naviLogo ? (
                            <img
                                src={getawayData?.naviLogo}
                                alt=""
                                className="pc_nav_view_logo_img"
                            />
                        ) : (
                            <img
                                src="https://static.zpimg.cn/public/fe_organization_pc/default_logo.png"
                                alt=""
                                className="pc_nav_view_logo_img"
                            />
                        )}
                        <div className='pc_nav_view_logo_text'>{getawayData.navigationImgType === 0 ? (getawayData.shortName || getawayData?.organizationName) : null}</div>
                    </div>
                </div>
            </div>
            <div style={{ minHeight: `calc(100vh - 164px)` }}>{props.children}</div>
            {/*   页脚  */}
            <PTPcFooter
                selectTemplate={userStore?.portalFooterConfig?.type}
                navigationLinksList={userStore?.portalFooterConfig?.navigationLinks}
                friendshipLinksList={userStore?.portalFooterConfig?.friendshipLinks}
                marketingLinksList={userStore?.portalFooterConfig?.marketingLinks}
                onItemClick={linkHandler}
                wtVisible={alias !== 'szrc'}
                {...PoliceObj}
            />

        </>
    )
}
export default observer(BaseLayout) as any
