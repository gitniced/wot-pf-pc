import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { Popover, message, Button } from 'antd'

import PortalModal from '@/components/accessPortalModal'
import style from './index.module.less'
import { getCookie, setCookie } from '@/storage'
import API from '@/components/accessPortalModal/api'
import Http from '@/servers/http'
import type { InfoType } from '@/components/accessPortalModal/interface'
// import type UserStore from '@/stores/userStore'
import type SiteStore from '@/stores/siteStore'
// import { getLastPath } from '@/utils/pathUtils'

interface LayoutHeaderType {
    onBack?: () => void
    onLogOut?: () => void
    onToUserCenter?: () => void
    userStore: UserStore
    siteStore: SiteStore
}
interface PopoverItemProps {
    onLogOut: LayoutHeaderType['onLogOut']
    onToUserCenter: LayoutHeaderType['onToUserCenter']
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
function LayoutHeader({ onBack, onLogOut, siteStore, userStore }: LayoutHeaderType) {
    const [visible, setVisible] = useState<boolean>(false) //控制显示隐藏
    const [portalDetail, setPortalDetail] = useState<InfoType>() // 弹窗内容
    const [linkUrl, setLinkUrl] = useState<string>() // 是否有门户信息
    // const [storeName, setStoreName] = useState<string>()

    useEffect(() => {
        // const res = getLocalStorage('USER_STORE')
        // setStoreName(res.userData.nickname)
    }, [])

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
    let loginPath = siteStore?.siteData?.data?.baseInfo?.pcDomian || ''
    loginPath = loginPath ? `${loginPath}/account` : loginPath
    // 获取用户信息
    const getUserName = () => userStore?.userData?.nickname
    // 获取用户头像
    const getUserAvatar = () => userStore?.userData?.avatar || ''
    // 获取现在的org 数据
    const getNowOrgData = () => {
        // 最后更改的 orgCode
        const selectOrgCode = userStore?.userData?.lastOrganizationCode
        //org list
        const orgList = userStore?.userOrg

        const matchOrg = orgList.filter(
            (item: { organizationCode: string }) => item?.organizationCode === selectOrgCode,
        )

        if (matchOrg.length > 0) {
            setCookie('ORG_NAME', matchOrg[0]?.organizationName)
            return matchOrg[0]?.organizationName
        } else {
            return ''
        }
    }

    const onToUserCenter = () => {
        window.location.href = loginPath
    }

    const orgCode = getCookie('SELECT_ORG_CODE')
    const onCancel = () => {
        setVisible(false)
    }

    // 获取门户信息
    const getLinkUrl = async (organizationCode: string) => {
        if (orgCode) {
            const res: any = (await Http(`${API.getInfo}`, 'get', { organizationCode })) || {}
            setLinkUrl(res.linkUrl)
        }
    }

    //点击访问门户获取信息  //linkUrl不存在不显示按钮  先去访问门户信息的linkUrl
    const getPortalInfo = (org: string) => {
        linkUrl
            ? Http(`${API.getPortalInfo}/${org}`, 'get', {}).then((res: any) => {
                  setVisible(true)
                  setPortalDetail({ ...res })
              })
            : message.error('门户链接不存在')
    }
    useEffect(() => {
        getLinkUrl(orgCode)
    }, [])
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
                    {/* <div className={style.layout_header_name}>{name}</div> */}
                </div>
                <div className={style.layout_header_rigth}>
                    {linkUrl && (
                        <Button
                            className={style.layout_header_rigth_visit}
                            onClick={() => {
                                onBack?.()
                                getPortalInfo(orgCode)
                            }}
                        >
                            访问门户
                        </Button>
                    )}
                    <Popover
                        getPopupContainer={() =>
                            document.getElementById('layout_popver') as HTMLElement
                        }
                        content={
                            <PopoverItem onToUserCenter={onToUserCenter} onLogOut={onLogOut} />
                        }
                    >
                        <div className={style.layout_header_rigth_user}>
                            <img
                                // @ts-ignore
                                src={getUserAvatar() || defaultAvatar}
                                alt=""
                                className={style.layout_header_rigth_user_logo}
                            />
                            <div className={style.layout_header_rigth_uer_content}>
                                <div className={style.layout_header_rigth_uer_content_org_name}>
                                    {getNowOrgData()}
                                </div>
                                <div className={style.layout_header_rigth_uer_content_name}>
                                    {getUserName() || userStore?.userData?.nickname}
                                </div>
                            </div>
                            <div className={style.layout_header_rigth_uer_content_arrow}>
                                {/*  */}
                            </div>
                        </div>
                    </Popover>
                </div>
                <PortalModal visible={visible} onCancel={onCancel} portalDetail={portalDetail} />
            </div>
        </div>
    )
}

export default inject('userStore', 'siteStore')(observer(LayoutHeader))
