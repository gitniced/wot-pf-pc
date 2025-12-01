import { useEffect } from 'react'
import { inject, observer, useLocalObservable } from 'mobx-react'
import listHooks from './hooks'
import styles from './index.module.less'
import type { IRoute } from 'umi'
import { useHistory, history } from 'umi'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import { SuperTable } from '@wotu/wotu-components'
// import ListItem from './components/ListItem'
import { PTContentCard } from '@wotu/pt-components'

const List = (props: IRoute) => {
    const { siteStore } = props
    let { location } = useHistory()
    // 从路由中获取自定义域名
    const currentDomain = getPortalCodeFromUrl({ isGetDomain: true }) || ''
    // 根据自定义域名获取对应机构code
    let currentOrg = getPortalCodeFromUrl()
    const { portalData } = siteStore
    let currentPortalData = portalData?.[currentOrg] || {}

    const hooks = useLocalObservable(() => new listHooks())

    let { query } = location || {}
    let { code } = query || {}

    useEffect(() => {
        const { organizationName = '', shortName = '' } = currentPortalData || {}
        let orgName = shortName || organizationName
        orgName ? (document.title = `图文列表-${orgName}`) : (document.title = '图文列表')
    }, [currentPortalData, code])

    return (
        <div className={styles.page}>
            <div className={styles.global_padding}>
                <div className={styles.content}>
                    <SuperTable
                        className={styles.background}
                        headerItemRender={() => <></>}
                        request={hooks.getList}
                        params={{ categoryCodes: code ? [code] : '' }}
                        search={false}
                        rowKey={'code'}
                        rowItemRender={item => {
                            return (
                                <PTContentCard
                                    layoutStyle={1}
                                    item={item}
                                    mode="pc"
                                    onClick={() => {
                                        history.push(
                                            `/${currentDomain}/picture/detail?code=${item.code}`,
                                        )
                                    }}
                                />
                            )
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject('userStore', 'siteStore')(observer(List))
