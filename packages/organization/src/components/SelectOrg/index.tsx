import React, { useEffect, useState, useMemo } from 'react'
import type SiteStore from '@/stores/siteStore'
import type UserStore from '@/stores/userStore'
import { inject, Observer } from 'mobx-react'
import { Popover, Button } from 'antd'
import styles from './index.module.less'
import classNames from 'classnames'
import { history, useModel } from 'umi'
import { findSiteData } from '@/utils/valueGet'
import { getSourceTypeByType } from '@/utils/urlUtil'
import { getLocalStorage, setCookie } from '@/storage'

const SelectOrg = (props: { userStore: UserStore; siteStore: SiteStore }) => {
    const { userStore, siteStore } = props || {}
    let { userType, userOrg, currentOrgCode, updateCurrentOrgCode, getUserPermissionList } =
        userStore
    let [isCreatOrg, setIsCreatOrg] = useState(false)

    const gotoPage = (url: string) => {
        history.push(url)
    }
    const masterStore = useModel('@@qiankunStateFromMaster')
    let { setSelectIdentity } = masterStore || {}

    useEffect(() => {
        // 是否可以创建机构
        let { siteData } = siteStore || {}

        const USER_MAP: Record<string, string> = {
            org: 'login_org_create_org',
            merchant: 'login_merchant_create_org',
        }
        const canCreateOrg = Number(findSiteData(siteData, USER_MAP[userType])?.value || 0)
        // 判断站点配置判断是否可以创建机构
        if (canCreateOrg === 1) {
            setIsCreatOrg(true)
        }
    }, [siteStore?.siteData])

    useEffect(() => {
        // 监听路由变化，更新机构列表
        userStore?.getUserOrganization?.()
    }, [location.pathname])

    // 监听userOrg获得机构详情
    const orgDetail = useMemo(() => {
        const loop = (data: any): any =>
            data.filter((item: any) => {
                if (item?.organizationCode === currentOrgCode) {
                    return item
                }
            })
        return loop(userOrg)
    }, [userOrg, currentOrgCode])

    // 切换机构
    const updateOrg = async (organizationCode: string) => {
        await updateCurrentOrgCode(organizationCode)
        await getUserPermissionList(organizationCode)
        let currentSourceType = getLocalStorage('SOURCE_TYPE')
        let identityCode = getSourceTypeByType(currentSourceType)
        if (!identityCode || !currentSourceType) return
        // 将工作台中的身份设置为当前选中机构的的身份
        identityCode && setCookie('SELECT_IDENTITY_CODE', identityCode)
        identityCode && setSelectIdentity?.(identityCode)
    }

    const content = (
        <div className={styles.popover}>
            <div className={styles.title}>机构切换</div>
            <div className={styles.list}>
                {userOrg.map(item => {
                    return (
                        <div
                            className={classNames(
                                styles.item,
                                item.organizationCode === currentOrgCode ? styles.active : null,
                            )}
                            key={item.organizationCode}
                            onClick={() => {
                                updateOrg(item?.organizationCode)
                            }}
                        >
                            <img
                                className={styles.item_logo}
                                src={item.logo || defaultOrgLogo}
                                alt=""
                            />
                            <div className={styles.item_name}>{item.name}</div>
                            <div
                                className={classNames(
                                    styles.item_icon,
                                    styles['item_icon' + String(item?.certifyStatus)],
                                )}
                            />
                        </div>
                    )
                })}
            </div>
            {isCreatOrg && <Button onClick={() => gotoPage('/create')}>+ 新建机构</Button>}
        </div>
    )

    let { certifyStatus, name, logo } = orgDetail?.[0] || {}

    return (
        <Observer>
            {() => {
                return (
                    <div className={styles.content}>
                        <Popover
                            placement="rightTop"
                            content={content}
                            trigger={['hover']}
                            style={{
                                borderRadius: '0.05rem',
                            }}
                        >
                            <div className={styles.box}>
                                <img className={styles.logo} src={logo || defaultOrgLogo} alt="" />
                                <div className={styles.center}>
                                    <div className={styles.center_name}>{name}</div>
                                    <div
                                        className={classNames(
                                            styles.center_img,
                                            styles['center_img' + String(certifyStatus)],
                                        )}
                                    />
                                </div>
                                <img
                                    className={styles.shrink}
                                    src="https://static.zpimg.cn/public/fe_user_pc/images/icon_shouqi@2x.png"
                                    alt=""
                                />
                            </div>
                        </Popover>
                    </div>
                )
            }}
        </Observer>
    )
}

export default inject('userStore', 'siteStore')(SelectOrg)
