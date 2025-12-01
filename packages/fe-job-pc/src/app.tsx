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

const stores = mobxStores()

export function render(oldRender: () => void) {
    const siteStore = getLocalStorage('SITE_STORE') || {}
    const siteData = siteStore?.siteData?.data || {}
    if(siteData?.sid){
        const baiduAnalytics = BaiduAnalytics.getInstance(siteData);
        baiduAnalytics.init();
    }
    oldRender();
}

export function onRouteChange({ location }: any) {
    const siteStore = getLocalStorage('SITE_STORE') || {}
    const siteData = siteStore?.siteData?.data || {}
    if(siteData?.sid){
        const baiduAnalytics = BaiduAnalytics.getInstance(siteData);
        baiduAnalytics.trackPageview(location.pathname);
    }
}

const MobxProvider = (props: any) => (
    <Provider {...stores} {...props}>
        <ConfigProvider
            locale={zhCN}
            renderEmpty={MyEmpty}
            prefixCls={packageInfo.name}
            {...props}
        />
    </Provider>
)

export function rootContainer(container: ReactNode[], opts: any) {
    return React.createElement(MobxProvider, opts, container)
}
