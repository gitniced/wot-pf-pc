import { history } from 'umi'
import type { ReactNode } from 'react'
import React from 'react'
import { Provider } from 'mobx-react'
import mobxStores from './stores/globalStore'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import MyEmpty from '@/components/Empty'
import { getPortalCodeFromUrl } from './utils/getPortalCodeFromUrl'
import { microLinkHandler } from './utils/microLink'
import { getLocalStorage } from './storage/localStorage'
import { BaiduAnalytics } from '@wotu/wotu-components'

const stores = mobxStores()


const MobxProvider = (props: any) => (
    <Provider {...stores} {...props}>
        <ConfigProvider locale={zhCN} renderEmpty={MyEmpty} {...props} />
    </Provider>
)

export function rootContainer(container: ReactNode[], opts: any) {
    return React.createElement(MobxProvider, opts, container)
}

const getApps = new Promise<void>(resolve => {
    let {
        location: { pathname },
    } = window
    pathname = pathname.trim().replace(/^(\s|\/)+|(\s|\/)+$/g, '')
    const pathnameArr = pathname.split('/')
    if (pathnameArr.length > 1) {
        resolve({
            // 注册子应用信息
            apps: [
                {
                    name: 'fe-user-pc',
                    entry:
                        RUN_ENV === 'local'
                            ? 'http://localhost:8011'
                            : `/subApp/user-center/index.html`, // html entry
                },
                {
                    name: 'train-center',
                    entry:
                        RUN_ENV === 'local'
                            ? 'http://localhost:9088'
                            : `/subApp/career_fe_pc/index.html`, // html entry
                },
                {
                    name: 'train-gateway',
                    entry:
                        RUN_ENV === 'local'
                            ? 'http://localhost:7012'
                            : `/subApp/career_fe_pc_gateway/index.html`, // html entry
                },
                // {
                //     name: 'enroll',
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
                    name: 'exam_fe_pc',
                    entry:
                        RUN_ENV === 'local'
                            ? 'http://localhost:9999'
                            : `/subApp/exam_fe_pc/index.html`, // html entry
                },
                {
                    name: 'fe-exam-pc',
                    entry:
                        RUN_ENV === 'local'
                            ? 'http://localhost:8041'
                            : `/subApp/exam-center/index.html`, // html entry
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
            ],
            routes: [
                {
                    path: `/:portalCode/user-center`,
                    microApp: 'fe-user-pc',
                },
                {
                    path: `/:portalCode/train-gateway`,
                    microApp: 'train-gateway',
                },
                {
                    path: `/:portalCode/mine/train-center`,
                    microApp: 'train-center',
                },
                // {
                //     path: `/:portalCode/mine/enroll-center`,
                //     microApp: 'enroll',
                // },
                // {
                //     path: `/:portalCode/enroll-center`,
                //     microApp: 'enroll',
                // },
                {
                    path: `/:portalCode/mine/enroll-center`,
                    microApp: 'fe-enroll-permission-pc',
                },
                {
                    path: `/:portalCode/enroll-gateway`,
                    microApp: 'fe-enroll-no-permission-pc',
                },
                {
                    path: `/:portalCode/exam`,
                    microApp: 'exam_fe_pc',
                },
                {
                    path: `/:portalCode/mine/exam`,
                    microApp: 'exam_fe_pc',
                },
                {
                    path: `/:portalCode/mine/exam-center`,
                    microApp: 'fe-exam-pc',
                },
                {
                    path: `/:portalCode/transaction`,
                    microApp: 'transaction',
                },
                {
                    path: `/:portalCode/mine/transaction`,
                    microApp: 'transaction',
                },
                {
                    path: `/:portalCode/organization`,
                    microApp: 'organization',
                },
                {
                    path: `/:portalCode/mine/organization`,
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
    } else {
        resolve({} as any)
    }
})

export const qiankun = getApps.then(res => res)

export function useQiankunStateForSlave() {
    return {
        tag: 'portal',
        getOrganizationCode: getPortalCodeFromUrl,
        gatewayUserStore: stores.userStore,
        gatewaySiteStore: stores.siteStore,
        masterHistory: history,
        portalData: stores.siteStore.portalData,
        microLinkHandler: microLinkHandler,
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
