import { inject, Observer, observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import menuHooks from './hooks'
import { useEffect } from 'react'
import { history } from 'umi'
import type { MenuData, MenuDataItem } from './interface'

const TransactionMenu = observer(() => {
    const hooks = useLocalObservable(() => new menuHooks())

    useEffect(() => {
        const { location } = history || {}
        const { pathname, search } = location || {}
        hooks.matchRoute(pathname + search)
    }, [history.location?.pathname])

    const MenuItem = ({ data }: { data: MenuData }) => {
        const toUrl = () => {
            const skipUrl = Array.isArray(data.url) ? data.url[0] : data.url
            console.log(skipUrl)
            // debugger
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
                        {hooks.menuData.map((itemGroup: MenuDataItem) => {
                            return (
                                <div
                                    className={styles.menu_item_group}
                                    key={JSON.stringify(itemGroup)}
                                >
                                    {itemGroup.map((item: MenuData) => {
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

export default inject('userStore', 'siteStore')(TransactionMenu)
