import { inject, Observer, observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import menuHooks from './hooks'
import { useEffect, useMemo } from 'react'
import { history } from 'umi'
import type { MenuData, MenuDataItem } from './interface'
import type { PageProps } from '@/types'
import UserInformation from '../UserInformation'
import { findSiteData, SuperLink } from '@wotu/wotu-components'
// import SelectOrg from '../SelectOrg'

const MyMenu = observer((props: PageProps) => {
    const { userStore, siteStore } = props
    const hooks = useLocalObservable(() => new menuHooks())

    // 是否可以创建机构
    let { siteData } = siteStore || {}
    let { data: detailData } = siteData || {}
    let { configList } = detailData || { configList: [] }

    // 根据currentOrgCode 判断是否展示角色管理 批量操作

    useMemo(() => {
        configList?.map(item => {
            if (item?.key === 'isCreateOrg') {
                if (item?.value === 'true') {
                    hooks.setIsCreateOrg(true)
                } else {
                    hooks.setIsCreateOrg(false)
                }
            }
        })
        let hasFace = false
        if (userStore?.userType === 'user') {
            hasFace = Boolean(
                findSiteData(detailData || {}, 'login_personal_method_face')?.value || 0,
            )
        }

        console.log(hasFace)

        hooks.fixMenu(userStore!.currentOrgCode, userStore!.userPermissionList, hasFace)
    }, [userStore?.currentOrgCode, userStore?.userPermissionList])
    // useEffect(() => {

    // }, [userStore?.currentOrgCode])

    useEffect(() => {
        const { location } = history || {}
        const { pathname } = location || {}
        hooks.matchRoute(pathname)
    }, [props.location?.pathname])

    const MenuItem = ({ data }: { data: MenuData }) => {
        const toUrl = () => {
            const skipUrl = Array.isArray(data.url) ? data.url[0] : data.url
            return skipUrl
        }
        return (
            <SuperLink
                href={toUrl()}
                className={[styles.menu_item, data.active ? styles.active : ''].join(' ')}
            >
                <svg className={[styles.icon, 'icon'].join(' ')} aria-hidden="true">
                    <use xlinkHref={`#${data.icon}`} />
                </svg>
                <div className={styles.name}>{data.name}</div>
            </SuperLink>
        )
    }

    return (
        <Observer>
            {() => {
                return (
                    <div className={styles.page}>
                        <div className={styles.user_info}>
                            {/* @ts-ignore */}
                            <UserInformation {...props} />
                        </div>

                        {hooks.menuData.map((itemGroup: MenuDataItem) => {
                            return (
                                <div
                                    className={styles.menu_item_group}
                                    key={JSON.stringify(itemGroup)}
                                >
                                    {itemGroup.map((item: MenuData) => {
                                        // @ts-ignore
                                        return <MenuItem key={item.url} data={item} />
                                    })}
                                </div>
                            )
                        })}
                    </div>
                )
            }}
        </Observer>
    )
})

export default inject('userStore', 'siteStore')(MyMenu)
