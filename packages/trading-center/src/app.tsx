import type { ReactNode } from 'react'
import React from 'react'
import { Provider } from 'mobx-react'
import mobxStores from './stores/globalStore'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import MyEmpty from '@/components/Empty'
import packageInfo from '../package.json'
import { getLocalStorage } from './storage'
import { BaiduAnalytics } from '@wotu/wotu-components'

export function render(oldRender: () => void) {
    const siteStore = getLocalStorage('SITE_STORE') || {}
    const siteData = siteStore?.siteData?.data || {}
    if(siteData?.sid){
        const baiduAnalytics = BaiduAnalytics.getInstance(siteData);
        baiduAnalytics.init();
    }
    oldRender();
}

type routerItem = {
    path: string
    breadcrumb: string
}
export function onRouteChange({ routes, matchedRoutes, location }) {
    
    const siteStore = getLocalStorage('SITE_STORE') || {}
    const siteData = siteStore?.siteData?.data || {}
    if(siteData?.sid){
        const baiduAnalytics = BaiduAnalytics.getInstance(siteData);
        baiduAnalytics.trackPageview(location.pathname);
    }

    if (matchedRoutes.length > 1) {
        if (matchedRoutes[1].match.path === '/' && location.pathname !== '/') {
            // history.replace('/500')
        }
    }
    const routesData: routerItem[] = []
    let { routes: appRouter } = routes[0]
    appRouter = appRouter || []
    appRouter.map((item: any) => {
        const { path, title: breadcrumb } = item
        if (path) {
            routesData.push({
                path,
                breadcrumb,
            })
        }
    })
    if (window) {
        window.appRouter = routesData
    }
}

const stores = mobxStores()

const MobxProvider = (props: any) => (
    <Provider {...stores} {...props}>
        <ConfigProvider
            prefixCls={packageInfo.name}
            locale={zhCN}
            renderEmpty={MyEmpty}
            {...props}
        />
    </Provider>
)

export function rootContainer(container: ReactNode[], opts: any) {
    return React.createElement(MobxProvider, opts, container)
}
