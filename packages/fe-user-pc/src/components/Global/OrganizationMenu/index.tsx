import { inject, Observer, observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import menuHooks from './hooks'
import { useEffect, useMemo } from 'react'
// @ts-ignore
import { history } from 'umi'
import type { MenuData, MenuDataItem } from './interface'
import type { PageProps } from '@/types'
import SelectOrg from '../SelectOrg'

const MyMenu = observer((props: PageProps) => {
    const { userStore, siteStore } = props
    const hooks = useLocalObservable(() => new menuHooks())

    // 是否可以创建机构
    let { siteData } = siteStore || {}
    let { data: detailData } = siteData || {}
    let { configList } = detailData || { configList: [] }

    useEffect(() => {
        const { location } = history || {}
        const { pathname, search } = location || {}
        hooks.matchRoute(pathname + search)
    }, [props.location?.pathname])

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
        hooks.fixMenu(userStore?.currentOrgCode, userStore?.userPermissionList)
    }, [userStore?.userPermissionList, userStore?.currentOrgCode])

    const MenuItem = ({ data }: { data: MenuData }) => {
        const toUrl = () => {
            const skipUrl = Array.isArray(data.url) ? data.url[0] : data.url
            history.push(skipUrl)
        }
        return (
            <div
                className={[styles.menu_item, data.active ? styles.active : ''].join(' ')}
                onClick={toUrl}
            >
                <svg className={[styles.icon, 'icon'].join(' ')} aria-hidden="true">
                    <use xlinkHref={`#${data.icon}`} />
                </svg>
                <div className={styles.name}>{data.name}</div>
            </div>
        )
    }

    return (
        <Observer>
            {() => {
                return (
                    <div className={styles.page}>
                        {(userStore?.userOrg?.length ?? 0) > 0 && (
                            <>
                                <div className={styles.user_org}>
                                    {/* @ts-ignore */}
                                    <SelectOrg />
                                </div>
                                <div className={styles.line} />
                            </>
                        )}
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
