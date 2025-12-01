// import HeaderUser from '@/components/HeaderUser'
import { getSessionStorage } from '@/storage'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import { PTSectionLayout } from '@wotu/pt-components'
import { findSiteData } from '@wotu/wotu-components'
import { Header, UserMenu } from '@wotu/wotu-pro-components'
import { inject, observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { history } from 'umi'

const MineLayout = props => {
    const [currentPortalCode, setCurrentPortalCode] = useState('')
    const { location, userStore, siteStore } = props || {}
    const { siteData = {}, portalData = {} } = siteStore || {}

    const getPortalCode = async () => {
        const tempCode = getPortalCodeFromUrl()
        setCurrentPortalCode(tempCode)
    }

    useEffect(() => {
        userStore.getUserPermissionList()
        getPortalCode()
    }, [])

    /** 回到首页 */
    const gotoHome = async () => {
        let linkUrl = ''
        const currentDomain = getPortalCodeFromUrl({ isGetDomain: true }) || ''
        const pcDomain = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) || ''
        const burl = findSiteData(siteData, 'burl', { findKey: 'baseInfo' }) || ''
        if (currentDomain) {
            linkUrl = `${burl}/${currentDomain}/home`
        } else {
            linkUrl = pcDomain
        }
        window.location.href = linkUrl
    }

    const getOrganizationLogo = () => {
        let linkUrl = ''
        const portalCode = getPortalCodeFromUrl()
        linkUrl = portalData?.[portalCode]?.naviLogo || ''
        return linkUrl
    }
    const currentPortalCodeObj = getSessionStorage('CURRENT_PORTAL_ALIAS_OBJ') || {}

    const currentAlias = location.pathname.split('/')?.[1] || ''

    const portalCode = getPortalCodeFromUrl()
    const getawayData = siteStore?.portalData?.[portalCode] || {}

    return (
        <PTSectionLayout
            routeConfig={{
                [location.pathname]: {
                    menu: true,
                    header: true,
                    layout: true,
                },
            }}
            section={
                <div>
                    <UserMenu
                        menuList={[
                            ...(userStore.permissionList?.[currentAlias] || []),
                            !currentPortalCode && {
                                title: '账号设置',
                                icon: 'https://img-test.zpimg.cn/public_read/menu_icon/16924601g8pjfvgg.svg',
                                route: `${
                                    findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) ||
                                    ''
                                }/account/account`,
                            },
                        ]}
                        masterHistory={history}
                        SaasPortalCode={currentPortalCode}
                    />
                </div>
            }
            header={
                <Header
                    userStore={userStore}
                    siteStore={siteStore}
                    logo={{ url: getOrganizationLogo(), onClick: gotoHome }}
                    title={
                        getawayData.navigationImgType === 0 &&
                        (getawayData.shortName || getawayData?.organizationName)
                    }
                    customerService={{
                        visible: true,
                    }}
                    accessPortal={{
                        visible: false,
                    }}
                    organization={{
                        visible: false,
                        isCreateOrganization: false,
                    }}
                    identify={{
                        visible: false,
                    }}
                    currentPortalCodeObj={currentPortalCodeObj}
                    homePage={{ visible: true, onClick: gotoHome }}
                />
            }
        >
            {props.children}
        </PTSectionLayout>
    )
}

const ObserverMineLayout = inject('userStore', 'siteStore')(observer(MineLayout))

export default ObserverMineLayout
