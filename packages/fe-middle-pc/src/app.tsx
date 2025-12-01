// import './plugins/sentry'
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
const { name: packageName } = packageInfo

const stores = mobxStores()

const MobxProvider = (props: any) => (
    <Provider {...stores} {...props}>
        <ConfigProvider locale={zhCN} renderEmpty={MyEmpty} {...props} prefixCls={packageName} />
    </Provider>
)

export function rootContainer(container: ReactNode[], opts: any) {
    return React.createElement(MobxProvider, opts, container)
}

const getApps = new Promise<void>(resolve => {
    resolve({
        // 注册子应用信息
        apps: [
            // {
            //     name: 'fe-enroll-pc',
            //     entry:
            //         RUN_ENV === 'local'
            //             ? 'http://localhost:8081'
            //             : `/subApp/enroll-center/index.html`, // html entry
            // },
            {
                name: 'fe-enroll-permission-pc',
                entry:
                    RUN_ENV === 'local'
                        ? 'http://localhost:8083'
                        : `/subApp/enroll-center/index.html`, // html entry
            },
            {
                name: 'fe-enroll-no-permission-pc',
                entry:
                    RUN_ENV === 'local'
                        ? 'http://localhost:8084'
                        : `/subApp/enroll-gateway/index.html`, // html entry
            },
            {
                name: 'fe-exam-pc',
                entry:
                    RUN_ENV === 'local'
                        ? 'http://localhost:8041'
                        : `/subApp/exam-center/index.html`, // html entry
            },
            {
                name: 'fe-job-pc',
                entry:
                    RUN_ENV === 'local' ? 'http://localhost:9015' : `/subApp/employment/index.html`, // html entry
            },
            {
                name: 'organization',
                entry:
                    RUN_ENV === 'local'
                        ? 'http://localhost:8061'
                        : `/subApp/organization/index.html`, // html entry
            },
            {
                name: 'transaction',
                entry:
                    RUN_ENV === 'local'
                        ? 'http://localhost:8071'
                        : `/subApp/trading-center/index.html`, // html entry
            },
            {
                name: 'fe-signin-pc',
                entry:
                    RUN_ENV === 'local'
                        ? 'http://localhost:8071'
                        : `/subApp/sign-center/index.html`, // html entry
            },
            {
                name: 'monitor-center',
                entry:
                    RUN_ENV === 'local'
                        ? 'http://localhost:9019'
                        : `/subApp/monitor-center/index.html`, // html entry
            },
            // {
            //     name: 'train-center',
            //     entry: '/subApp/career_fe_pc/index.html',
            // },
            {
                name: 'train-gateway',
                entry:
                    RUN_ENV === 'local'
                        ? 'http://localhost:7012'
                        : `/subApp/career_fe_pc_gateway/index.html`, // html entry
            },
        ],
        routes: [
            // {
            //     path: `/enroll-center`,
            //     microApp: 'fe-enroll-pc',
            // },
            {
                path: `/enroll-center`,
                microApp: 'fe-enroll-permission-pc',
            },
            {
                path: `/enroll-gateway`,
                microApp: 'fe-enroll-no-permission-pc',
            },
            {
                path: `/sign-center`,
                microApp: 'fe-signin-pc',
            },

            {
                path: `/exam-center`,
                microApp: 'fe-exam-pc',
            },
            {
                path: `/transaction`,
                microApp: 'transaction',
            },
            {
                path: `/organization`,
                microApp: 'organization',
            },
            {
                path: '/employment-center',
                microApp: 'fe-job-pc',
            },
            {
                path: '/job-center',
                microApp: 'fe-job-pc',
            },
            {
                path: '/monitor-center',
                microApp: 'monitor-center',
            },
            // {
            //     path: '/train-center',
            //     microApp: 'train-center',
            // },
            {
                path: '/engineer/train-gateway',
                microApp: 'train-gateway',
            },
            {
                path: '/train-gateway',
                microApp: 'train-gateway',
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

export function useQiankunStateForSlave(): any {
    const isEngineerTradingCenter = /^\/engineer\/train-gateway/.test(location.pathname)

    return {
        tag: isEngineerTradingCenter ? 'engineer' : 'middle',
        masterStore: stores,
    }
}

export function render(oldRender: () => void) {
    const siteStore = getLocalStorage('SITE_STORE') || {}
    const siteData = siteStore?.siteData?.data || {}
    if (siteData?.sid) {
        const baiduAnalytics = BaiduAnalytics.getInstance(siteData)
        baiduAnalytics.init()
    }
    oldRender()
}

export function onRouteChange({ location }: any) {
    const siteStore = getLocalStorage('SITE_STORE') || {}
    const siteData = siteStore?.siteData?.data || {}
    if (siteData?.sid) {
        const baiduAnalytics = BaiduAnalytics.getInstance(siteData)
        baiduAnalytics.trackPageview(location.pathname)
    }
}
