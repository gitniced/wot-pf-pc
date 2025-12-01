import type { FC } from 'react'
import PersonInfo from './PersonInfo'

import './index.module.less'
export interface PersonInfoProps {
    /** 头像 */
    avatar: string
    /** 名称 */
    name: string
    /** 是否有认证 */
    isAuthentication: boolean
    /** 点击退出登录事件 */
    onClickLogout?: () => void
    /** 点击账号中心事件 */
    onClickAccountCenter?: () => void
    /** 点击基础信息事件 */
    onClickBaseInfo?: () => void
    /** 点击认证绑定事件 */
    onClickAuthBinding?: () => void
    /** 点击账号设置事件 */
    onClickSetting?: () => void
}

const HeaderMenu: FC<PersonInfoProps> = (personInfoProps: PersonInfoProps) => {
    /** 点击账号中心 */
    const onClickAccountCenter = () => {
        personInfoProps?.onClickAccountCenter?.()
    }

    /** 基础信息 */
    const onClickBaseInfo = () => {
        personInfoProps?.onClickBaseInfo?.()
    }

    /** 认证绑定 */
    const onClickAuthBinding = () => {
        personInfoProps?.onClickAuthBinding?.()
    }

    /** 账号设置 */
    const onClickSetting = () => {
        personInfoProps?.onClickSetting?.()
    }
    /** 退出登录 */
    const onClickLogout = () => {
        personInfoProps?.onClickLogout?.()
    }

    return (
        <div className="wt_pt_header_role">
            <img
                src={personInfoProps?.avatar}
                onError={e => {
                    e.target.src = defaultAvatar
                }}
                alt=""
                className="icon icon_moren"
            />
            <PersonInfo
                onClickBaseInfo={onClickBaseInfo}
                onClickAccountCenter={onClickAccountCenter}
                onClickSetting={onClickSetting}
                onClickAuthBinding={onClickAuthBinding}
                onClickLogout={onClickLogout}
                {...personInfoProps}
            />
            <svg className="icon icon_zhankai" aria-hidden="true">
                <use xlinkHref="#icon_zhankai" />
            </svg>
        </div>
    )
}

export default HeaderMenu
