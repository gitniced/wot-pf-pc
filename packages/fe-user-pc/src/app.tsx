import { history } from 'umi'
import type { ReactNode } from 'react'
import React from 'react'
import { Provider } from 'mobx-react'
import mobxStores from './stores/globalStore'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import MyEmpty from '@/components/Global/Empty'
import '@/utils/os'
import { BaiduAnalytics } from '@wotu/wotu-components'
import { getLocalStorage } from './storage'

type routerItem = {
    path: string
    breadcrumb: string
}

const stores = mobxStores()

const getApps = new Promise<void>(resolve => {
    resolve({
        // 注册子应用信息
        apps: [
            {
                name: 'organization',
                entry:
                    RUN_ENV === 'local'
                        ? 'http://localhost:8061'
                        : `/subApp/organization/index.html`, // html entry
            },
        ],
        routes: [
            {
                path: '/organization',
                microApp: 'organization',
            },
        ],
        sandbox: true, //是否启用沙箱
        prefetch: 'all', //是否启用预加载
        excludeAssetFilter: (url: string) => {
            const microAppAssetFilterWhiteWords = [
                'map.qq.com',
                'turing.captcha.gtimg.com',
                'turing.captcha.qcloud.com',
                'qiyukf.com',
            ]
            return microAppAssetFilterWhiteWords.some(word => {
                return url.includes(word)
            })
        },
    } as any)
})

export const qiankun = getApps.then(res => res)

export function render(oldRender: () => void) {
    const siteStore = getLocalStorage('SITE_STORE') || {}
    const siteData = siteStore?.siteData?.data || {}
    if (siteData?.sid) {
        const baiduAnalytics = BaiduAnalytics.getInstance(siteData)
        baiduAnalytics.init()
    }
    oldRender()
}

export function onRouteChange({ routes, matchedRoutes, location }: any) {
    const siteStore = getLocalStorage('SITE_STORE') || {}
    const siteData = siteStore?.siteData?.data || {}
    if (siteData?.sid) {
        const baiduAnalytics = BaiduAnalytics.getInstance(siteData)
        baiduAnalytics.trackPageview(location.pathname)
    }
    if (matchedRoutes.length > 1) {
        if (matchedRoutes[1].match.path === '/' && location.pathname !== '/') {
            history.replace('/404')
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

const MobxProvider = (props: any) => (
    <Provider {...stores} {...props}>
        <ConfigProvider locale={zhCN} renderEmpty={MyEmpty} {...props} />
    </Provider>
)

export function rootContainer(container: ReactNode[], opts: any) {
    return React.createElement(MobxProvider, opts, container)
}

export function useQiankunStateForSlave() {
    const {
        userStore: {
            currentOrgCode,
            getUserGroup,
            updateCurrentOrgCode,
            getUserOrganization,
            children_store_clean,
            login_out,
            getUserPermissionList,
            getOrganizationDetail,
        },
    } = stores || {}

    const updateCurrentOrganization = (code: string) => {
        getUserOrganization()
        getUserGroup()
        console.log('子应用更新机构信息', code)
        if (!code) return

        updateCurrentOrgCode(code)
        getOrganizationDetail(code)
        getUserPermissionList(code)
    }

    const getCurrentOrganization = () => {
        const { userStore } = stores || {}
        return userStore?.currentOrgCode
    }

    return {
        tag: 'user-center',
        currentOrganization: currentOrgCode,
        getCurrentOrganization,
        updateCurrentOrganization,
        children_store_clean,
        masterStore: stores,
        masterHistory: history,
        loginOut: login_out,
    }
}
