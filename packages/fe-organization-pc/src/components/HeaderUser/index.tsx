import { Button, Space } from 'antd'
import styles from './index.module.less'
import { getCookie } from '@/storage'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import HeaderMenu from '@/components/HeaderMenu'
import type { IRoute } from 'umi'
// import { history } from 'umi'
import { findSiteData } from '@wotu/wotu-components'
import { inject, observer } from 'mobx-react'
const HeaderUser: React.FC = (props: IRoute) => {
    const { userStore, siteStore } = props
    const { siteData, portalData } = siteStore

    const userToken = getCookie('TOKEN')
    const siteDefaultAvatar = findSiteData(siteData, 'avatar')?.value || ''
    const portalDomain = getPortalCodeFromUrl({ isGetDomain: true })
    const portalCode = getPortalCodeFromUrl()
    const userBaseUrl = `/${portalDomain}/user-center`
    const currentPortalData = portalData?.[portalCode] || {}
    const { privacyPortalFlag } = currentPortalData as any

    // 前往用户中心对应页面
    const goToUserPage = (url: string) => {
        location.href = `${userBaseUrl}${url}`
    }
    const getUserData = () => {
        const { userData } = userStore
        return userData
    }

    const getMobile = () =>
        userStore?.userData?.mobile &&
        `${userStore.userData.mobile.slice(0, 3)}****${userStore.userData.mobile.slice(-4)}`

    const getUserName = () => {
        const { userData } = userStore
        return userData?.nickname || getMobile() || ''
    }

    // const getRegisterRender = () => {
    //     if (!isNaN(privacyPortalFlag)) {
    //         if (Number(privacyPortalFlag) === 0) {
    //             return (
    //                 <Button
    //                     type="text"
    //                     className={styles.registry}
    //                     onClick={() => {
    //                         goToUserPage('/user/register?type=1')
    //                     }}
    //                 >
    //                     注册
    //                 </Button>
    //             )
    //         } else {
    //             return null
    //         }
    //     } else {
    //         return null
    //     }
    // }

    return userToken ? (
        <div className={styles.header_btn_con}>
            <Button
                className={styles.center_btn}
                type={'text'}
                onClick={async () => {
                    if (portalDomain) {
                        location.href = `/${portalDomain}/mine`
                    }
                }}
            >
                个人中心
            </Button>
            <HeaderMenu
                avatar={getUserData()?.avatar || siteDefaultAvatar}
                // name={getUserData()?.nickname || ''}
                name={getUserName()}
                isAuthentication={getUserData()?.isValidateIdCard || false}
                onClickAccountCenter={() => {
                    goToUserPage('/account')
                }}
                onClickAuthBinding={() => {
                    goToUserPage('/bind')
                }}
                onClickBaseInfo={() => {
                    goToUserPage('/baseinfo')
                }}
                onClickSetting={() => {
                    goToUserPage('/password')
                }}
                onClickLogout={() => {
                    userStore?.loginOut(privacyPortalFlag && Number(privacyPortalFlag) === 1)
                }}
            />
        </div>
    ) : (
        <Space>
            {/* <Button
                type="text"
                className={styles.registry}
                onClick={() => {
                    goToUserPage('/user/register?type=1')
                }}
            >
                注册
            </Button> */}
            {/* {getRegisterRender()} */}
            <Button
                type="primary"
                className={styles.login}
                onClick={async () => {
                    goToUserPage('/user/login')
                }}
            >
                登录
            </Button>
        </Space>
    )
}

const ObserverHeaderUser: IRoute = inject('userStore', 'siteStore')(observer(HeaderUser))

export default ObserverHeaderUser
