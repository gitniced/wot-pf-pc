import React from 'react'
import type SiteStore from '@/stores/siteStore'
import type UserStore from '@/stores/userStore'
import { inject, observer } from 'mobx-react'
// @ts-ignore
import { useModel } from 'umi'
import styles from './index.module.less'
import { Tooltip, Button } from 'antd'
import { WORKBENCH_BTN_TEXT } from '@/types'
import { USER_TYPE_NUM } from '@wotu/wotu-components/dist/esm/Types/user'
import { getDecodeInfo, SuperLink } from '@wotu/wotu-components'

const UserInformation = observer((props: { userStore: UserStore; siteStore: SiteStore }) => {
    const { getOrganizationCode } = useModel('@@qiankunStateFromMaster') || {}
    const { userStore, siteStore } = props || {}

    const { tag, userData, userType, workBench } = userStore || {}
    const { name, mobile, nickname, avatar, isValidateIdCard } = userData || {}

    let secretMobile = getDecodeInfo(mobile!, '2')
    let secretName = getDecodeInfo(name!, '1')

    //@ts-ignore
    let currentWorkBenchUrl = workBench[USER_TYPE_NUM[userType]]

    const getWorkBtn = () => {
        if (tag === 'portal') {
            return (
                <SuperLink href={`/${getOrganizationCode({ isGetDomain: true })}/mine/`}>
                    <Button type="primary">个人中心</Button>
                </SuperLink>
            )
        } else {
            return (
                <>
                    {currentWorkBenchUrl && (
                        <SuperLink href={currentWorkBenchUrl}>
                            <Button type="primary">{WORKBENCH_BTN_TEXT?.[userType!]}</Button>
                        </SuperLink>
                    )}
                </>
            )
        }
    }

    return (
        <div className={styles.right_content}>
            <SuperLink href="/baseinfo">
                <div
                    className={styles.avatar}
                    style={{
                        background: `url('${avatar || siteStore?.siteAvatar || defaultAvatar}')
                no-repeat center / cover`,
                    }}
                />
            </SuperLink>
            <div className={styles.wellcome}>
                <Tooltip title={nickname || secretName || secretMobile}>
                    <div>
                        欢迎，
                        {nickname || secretName || secretMobile}
                    </div>
                </Tooltip>
                <SuperLink href="/baseinfo">
                    <svg className={[styles.icon].join(' ')} aria-hidden="true">
                        <use xlinkHref={`#icon-pingjia`} />
                    </svg>
                </SuperLink>
            </div>
            {isValidateIdCard && (
                <div className={styles.account_info}>
                    <span>{secretName}</span>
                    <span className={styles.validate}>
                        <svg
                            className={[styles.validate_icon, 'icon'].join(' ')}
                            aria-hidden="true"
                        >
                            <use xlinkHref={`#icon_yirenzheng`} />
                        </svg>
                        <span>已认证</span>
                    </span>
                </div>
            )}

            {getWorkBtn()}
            <div className={styles.line} />
        </div>
    )
})

export default inject('userStore', 'siteStore')(UserInformation)
