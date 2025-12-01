import { inject, observer } from 'mobx-react'
import { Popover, Button, message } from 'antd'
import type UserStore from '@/stores/userStore'
import style from './index.module.less'
import type SiteStore from '@/stores/siteStore'
import { history } from 'umi'
import { setCookie } from '@/storage'
import { findSiteData } from '@wotu/wotu-components'

interface LayoutHeaderType {
    userStore?: UserStore
    siteStore?: SiteStore
    rightRender?: React.ReactNode
    type: 'assistant' | 'teacher'
}
interface PopoverItemProps {
    onLogOut: () => void
    onToUserCenter: () => void
}

const PopoverItem = ({ onLogOut, onToUserCenter }: PopoverItemProps) => (
    <div className={style.user_popover}>
        <Button type="text" className={style.user_popover_user} onClick={() => onToUserCenter?.()}>
            <svg className={style.user_popover_icon}>
                <use xlinkHref="#USER">{/*  */}</use>
            </svg>
            <div>用户中心</div>
        </Button>
        <Button type="text" className={style.user_popover_user} onClick={() => onLogOut?.()}>
            <svg className={style.user_popover_icon}>
                <use xlinkHref="#icon_tuichu">{/*  */}</use>
            </svg>
            <div>退出登录</div>
        </Button>
    </div>
)

function LayoutHeader({ siteStore, userStore, rightRender, type }: LayoutHeaderType) {
    // 站点名称
    // const name = siteStore?.siteData?.data?.baseInfo?.name || ''
    // 站点logo
    const logoUrl =
        siteStore?.siteData?.data?.configList?.find?.(
            (i: { key: string }) => i.key === 'pc_logo',
        ) || {}
    // 名称
    // const orgUserName = userStore?.userData?.name || ''
    // 用户名称
    // const userName = userStore?.userData?.nickname || ''
    //用户头像
    // const avatar = userStore?.userData?.avatar || ''
    // 用户中心地址
    // let loginPath = siteStore?.siteData?.data?.baseInfo?.pcDomian || ''
    // loginPath = loginPath ? `${loginPath}/account` : loginPath
    // 获取用户信息
    const getUserName = () => userStore?.userData?.nickname
    // 获取用户头像
    const getUserAvatar = () => userStore?.userData?.avatar || ''
    // 获取现在的org 数据
    // const getNowOrgData = () => {
    //     // 最后更改的 orgCode
    //     const selectOrgCode = userStore?.userData?.lastOrganizationCode
    //     // org list
    //     const orgList = userStore?.userOrg || []

    //     const matchOrg = orgList?.filter(
    //         (item: { organizationCode: string }) => item?.organizationCode === selectOrgCode,
    //     )

    //     if (matchOrg.length > 0) {
    //         setCookie('ORG_NAME', matchOrg[0]?.organizationName)
    //         return matchOrg[0]?.organizationName
    //     } else {
    //         return ''
    //     }
    // }

    const onToUserCenter = () => {
        const siteData = siteStore?.siteData?.data

        console.log('siteData', siteData)

        let userCenterUrl = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) + '/account'

        console.log('userCenterUrl1', userCenterUrl)

        userCenterUrl = RUN_ENV === 'local' ? 'http://localhost:8011/account' : userCenterUrl

        console.log('userCenterUrl2', userCenterUrl)

        if (userCenterUrl) {
            window.location.href = userCenterUrl
        } else {
            message.error('站点信息暂无用户中心地址', 3)
        }

        setCookie('FROM_URL', `${location.href}`)
    }

    return (
        <div className={style.layout_header_warp} id="layout_popver">
            <div className={style.layout_header}>
                <div className={style.layout_header_left}>
                    <img
                        // @ts-ignore
                        src={logoUrl.value || defaultLogo}
                        alt=""
                        className={style.layout_header_logo}
                    />
                    <div
                        className={style.layout_header_identity}
                        onClick={() => {
                            if (type === 'assistant') {
                                history.push('/mine-class')
                            } else {
                                history.push('/assistant/home')
                            }
                        }}
                    >
                        {type === 'assistant' ? '教师端' : '教研端'}
                    </div>
                </div>
                <div className={style.layout_header_right}>
                    {rightRender}

                    <Popover
                        getPopupContainer={() =>
                            document.getElementById('layout_popver') as HTMLElement
                        }
                        content={
                            <PopoverItem
                                onToUserCenter={onToUserCenter}
                                onLogOut={() => userStore?.loginOut()}
                            />
                        }
                    >
                        <div className={style.layout_header_right_user}>
                            <img
                                src={getUserAvatar() || defaultAvatar}
                                alt=""
                                className={style.layout_header_right_user_logo}
                            />
                            <div className={style.layout_header_right_uer_content}>
                                {/* <div className={style.layout_header_right_uer_content_org_name}>
                                    {getNowOrgData()}
                                </div> */}
                                <div className={style.layout_header_right_uer_content_name}>
                                    {getUserName() || userStore?.userData?.nickname}
                                </div>
                            </div>

                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#Down" />
                            </svg>
                        </div>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default inject('userStore', 'siteStore')(observer(LayoutHeader))
