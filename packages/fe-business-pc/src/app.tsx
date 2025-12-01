import type { ReactNode } from 'react'
import React from 'react'
import { observe } from 'mobx'
import { Provider } from 'mobx-react'
import mobxStores from './stores/globalStore'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import MyEmpty from '@/components/Empty'
import { history, useModel } from 'umi'
import { getPortalCodeFromUrl } from './utils/getPortalCodeFromUrl'
import { BaiduAnalytics } from '@wotu/wotu-components'
import { getLocalStorage } from './storage'
import { APP_TYPE } from './types'
import http from './servers/http'

const stores = mobxStores()

const MobxProvider = (props: any) => (
    <Provider {...stores} {...props}>
        <ConfigProvider locale={zhCN} renderEmpty={MyEmpty} {...props} />
    </Provider>
)

export function rootContainer(container: ReactNode[], opts: any) {
    return React.createElement(MobxProvider, opts, container)
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

const APP_URL: Record<string, any> = {
    local: {
        [APP_TYPE.EXAM]: 'http://localhost:9999',
        [APP_TYPE.EXAM_CENTER]: 'http://localhost:8041',
        [APP_TYPE.ORGANIZATION]: 'http://localhost:8061',
        // [APP_TYPE.ENROLL_CENTER]: 'http://localhost:8081',
        [APP_TYPE.ENROLL_CENTER]: 'http://localhost:8083',
        [APP_TYPE.ENROLL_GATEWAY]: 'http://localhost:8084',
        [APP_TYPE.TRAINING_CENTER]: 'http://localhost:10003',
        [APP_TYPE.STUDENT_CENTER]: 'http://localhost:10001',
        [APP_TYPE.MERCHANT_CENTER]: 'http://localhost:9031',
        [APP_TYPE.SIGN]: 'http://localhost:9011',
        [APP_TYPE.EXAM_SELLER]: 'http://localhost:8888',
        [APP_TYPE.EMPLOYMENT]: 'http://localhost:9015',
        [APP_TYPE.MONITOR_CENTER]: 'http://localhost:9019',
        [APP_TYPE.EXAM_GRID_PAPER]: 'http://localhost:4567',
        [APP_TYPE.TRADING_CENTER]: 'http://localhost:8071',
        [APP_TYPE.ENGINEER_CENTER]: 'http://localhost:9022',
    },
    default: {
        [APP_TYPE.EXAM]: '/subApp/exam_fe_pc/index.html',
        [APP_TYPE.EXAM_CENTER]: '/subApp/exam-center/index.html',
        [APP_TYPE.ORGANIZATION]: '/subApp/organization/index.html',
        // [APP_TYPE.ENROLL_CENTER]: '/subApp/enroll-center/index.html',
        [APP_TYPE.ENROLL_CENTER]: '/subApp/enroll-center/index.html',
        [APP_TYPE.ENROLL_GATEWAY]: '/subApp/enroll-gateway/index.html',
        [APP_TYPE.MERCHANT_CENTER]: '/subApp/merchant-center/index.html',
        [APP_TYPE.TRAIN_CENTER]: '/subApp/career_fe_pc/index.html',
        [APP_TYPE.TRAINING_CENTER]: '/subApp/training-center/index.html',
        [APP_TYPE.STUDENT_CENTER]: '/subApp/student-center/index.html',
        [APP_TYPE.SIGN]: '/subApp/sign-center/index.html',
        [APP_TYPE.EXAM_SELLER]: '/subApp/exam_seller/index.html',
        [APP_TYPE.EMPLOYMENT]: '/subApp/employment/index.html',
        [APP_TYPE.MONITOR_CENTER]: '/subApp/monitor-center/index.html',
        [APP_TYPE.EXAM_GRID_PAPER]: '/subApp/exam-grid-paper/index.html',
        [APP_TYPE.TRADING_CENTER]: '/subApp/trading-center/index.html',
        [APP_TYPE.ENGINEER_CENTER]: '/subApp/engineer-center/index.html',
    },
}

let appLoadStatus: Record<string, Record<string, any>> = {
    'engineer-center': { path: '/engineer-center', mounted: false },
    exam: { path: '/exam', mounted: false },
    'exam-center': { path: '/exam-center', mounted: false },
    organization: { path: '/organization', mounted: false },
    'fe-enroll-permission-pc': { path: '/enroll-center', mounted: false },
    'fe-enroll-no-permission-pc': { path: '/enroll-gateway', mounted: false },
    'merchant-center': { path: '/merchant-center', mounted: false },
    'train-center': { path: '/engineer/train-center', mounted: false },
    'training-center': { path: '/training-center', mounted: false },
    'sign-center': { path: '/sign-center', mounted: false },
    'exam-seller': { path: '/exam-seller', mounted: false },
    'fe-job-pc': { path: '/employment-center', mounted: false },
    'monitor-center': { path: '/monitor-center', mounted: false },
    'exam-grid-paper': { path: '/exam-grid-paper', mounted: false },
    'trading-center': { path: '/trading-center', mounted: false },
    'student-center': { path: '/student-center', mounted: false },
}

const getAppUrl = (name: APP_TYPE) => {
    switch (RUN_ENV) {
        case 'local':
            return APP_URL.local[name]
        default:
            return APP_URL.default[name]
    }
}

const getApps = new Promise<void>(resolve => {
    const apps = [
        {
            name: 'exam',
            entry: getAppUrl(APP_TYPE.EXAM),
        },
        {
            name: 'exam-center',
            entry: getAppUrl(APP_TYPE.EXAM_CENTER),
        },
        {
            name: 'organization',
            entry: getAppUrl(APP_TYPE.ORGANIZATION),
        },
        {
            name: 'fe-enroll-permission-pc',
            entry: getAppUrl(APP_TYPE.ENROLL_CENTER),
        },
        {
            name: 'fe-enroll-no-permission-pc',
            entry: getAppUrl(APP_TYPE.ENROLL_GATEWAY),
        },
        {
            name: 'merchant-center',
            entry: getAppUrl(APP_TYPE.MERCHANT_CENTER),
        },
        {
            name: 'train-center',
            entry: getAppUrl(APP_TYPE.TRAIN_CENTER),
        },
        {
            name: 'sign-center',
            entry: getAppUrl(APP_TYPE.SIGN),
        },
        {
            name: 'exam-seller',
            entry: getAppUrl(APP_TYPE.EXAM_SELLER),
        },
        {
            name: 'fe-job-pc',
            entry: getAppUrl(APP_TYPE.EMPLOYMENT),
        },
        {
            name: 'monitor-center',
            entry: getAppUrl(APP_TYPE.MONITOR_CENTER),
        },
        {
            name: 'exam-grid-paper',
            entry: getAppUrl(APP_TYPE.EXAM_GRID_PAPER),
        },
        {
            name: 'training-center',
            entry: getAppUrl(APP_TYPE.TRAINING_CENTER),
        },
        {
            name: 'trading-center',
            entry: getAppUrl(APP_TYPE.TRADING_CENTER),
        },
        {
            name: 'student-center',
            entry: getAppUrl(APP_TYPE.STUDENT_CENTER),
        },
        {
            name: 'engineer-center',
            entry: getAppUrl(APP_TYPE.ENGINEER_CENTER),
        },
    ]

    const routes = [
        {
            path: '/engineer-center',
            microApp: 'engineer-center',
        },
        {
            path: '/exam',
            microApp: 'exam',
        },
        {
            path: '/exam-center',
            microApp: 'exam-center',
        },
        {
            path: '/organization',
            microApp: 'organization',
        },
        {
            path: '/enroll-center',
            microApp: 'fe-enroll-permission-pc',
        },
        {
            path: '/enroll-gateway',
            microApp: 'fe-enroll-no-permission-pc',
        },
        {
            path: '/merchant-center',
            microApp: 'merchant-center',
        },
        {
            path: '/train-center',
            microApp: 'train-center',
        },
        {
            path: '/engineer/train-center',
            microApp: 'train-center',
        },
        {
            path: '/training-center',
            microApp: 'training-center',
        },
        {
            path: '/sign-center',
            microApp: 'sign-center',
        },
        {
            path: '/exam-seller',
            microApp: 'exam-seller',
        },
        {
            path: '/employment-center',
            microApp: 'fe-job-pc',
        },
        {
            path: '/monitor-center',
            microApp: 'monitor-center',
        },
        {
            path: '/exam-grid-paper',
            microApp: 'exam-grid-paper',
        },
        {
            path: '/trading-center',
            microApp: 'trading-center',
        },
        {
            path: '/student-center',
            microApp: 'student-center',
        },
    ]

    // const microAppMap = routes.reduce((acc, cur) => {
    //     if (cur.microApp) {
    //         acc[cur.microApp] = {
    //             path: cur.path,
    //             mounted: false,
    //         }
    //     }
    //     return acc
    // }, {})

    // console.log(JSON.stringify(microAppMap))

    const appsObj = {
        // 注册子应用信息
        apps,
        routes,
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
        }, // 完整生命周期钩子请看 https://qiankun.umijs.org/zh/api/#registermicroapps-apps-lifecycles
        lifeCycles: {
            beforeLoad: props => {
                const { name } = props || {}
                appLoadStatus = {
                    ...appLoadStatus,
                    [name]: { ...appLoadStatus[name], mounted: false },
                }
                // console.log('appLoadStatus----beforeLoad', appLoadStatus)
                stores.userStore.setAppLoadStatus(appLoadStatus)
            },
            afterMount: props => {
                const { name } = props || {}
                appLoadStatus = {
                    ...appLoadStatus,
                    [name]: { ...appLoadStatus[name], mounted: true },
                }
                // console.log('appLoadStatus----afterMount', appLoadStatus)
                stores.userStore.setAppLoadStatus(appLoadStatus)
            },
        },
    } as any
    if (RUN_ENV === 'local') {
        resolve(appsObj)
    } else {
        http('/auth/backend/site/check_is_engineer_site', 'post', {}, { repeatFilter: false })
            .then(res => {
                if (res) {
                    resolve({
                        // 注册子应用信息
                        apps: [
                            {
                                name: 'organization',
                                entry: getAppUrl(APP_TYPE.ORGANIZATION),
                            },
                            {
                                name: 'train-center',
                                entry: getAppUrl(APP_TYPE.TRAIN_CENTER),
                            },
                            {
                                name: 'engineer-center',
                                entry: getAppUrl(APP_TYPE.ENGINEER_CENTER),
                            },
                        ],
                        routes: [
                            {
                                path: '/engineer-center',
                                microApp: 'engineer-center',
                            },
                            {
                                path: '/train-center',
                                microApp: 'train-center',
                            },
                            {
                                path: '/engineer/train-center',
                                microApp: 'train-center',
                            },
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
                        }, // 完整生命周期钩子请看 https://qiankun.umijs.org/zh/api/#registermicroapps-apps-lifecycles
                        lifeCycles: {
                            beforeLoad: props => {
                                const { name } = props || {}
                                appLoadStatus = {
                                    ...appLoadStatus,
                                    [name]: { ...appLoadStatus[name], mounted: false },
                                }
                                stores.userStore.setAppLoadStatus(appLoadStatus)
                            },
                            afterMount: props => {
                                const { name } = props || {}
                                appLoadStatus = {
                                    ...appLoadStatus,
                                    [name]: { ...appLoadStatus[name], mounted: true },
                                }
                                stores.userStore.setAppLoadStatus(appLoadStatus)
                            },
                        },
                    } as any)
                } else {
                    resolve(appsObj)
                }
            })
            .catch(() => {
                resolve(appsObj)
            })
    }
})

// const isEngineerSite = () => {
//     http('/backend/site/check_is_engineer_site', 'post', {}, { repeatFilter: false })
// }

export const qiankun = getApps.then(res => res)

export function useQiankunStateForSlave(): any {
    const {
        userStore: {
            onEngineerDesignAIClick,
            getOrganizationList,
            setSelectOrganization,
            selectedOrganization,
            setSelectIdentity,
            bindMenuRouteChangeCallback,
            bindChildCallback,
            dispatchChildCallback,
        },
    } = stores || {}

    // @ts-ignore
    const masterModel = useModel('@@qiankunStateFromMaster')
    const { gatewaySiteStore } = masterModel || {}
    const { portalData } = gatewaySiteStore || {}

    const getCurrentOrganization = () => {
        const {
            userStore: { selectedOrganization: selectedOrganizationCode },
        } = stores || {}
        return selectedOrganizationCode
    }

    // TODO 兼容用户中心的机构中心
    const updateCurrentOrganization = (code: string) => {
        getOrganizationList().then(() => {
            code ? setSelectOrganization(code) : ''
        })
    }

    const isEngineerTradingCenter = /^\/engineer\/train-center/.test(location.pathname)

    return {
        tag: isEngineerTradingCenter ? 'engineer' : 'workbench',
        onEngineerDesignAIClick,
        // TODO 兼容用户中心的机构中心
        currentOrganization: selectedOrganization,
        // TODO 兼容用户中心的机构中心
        getCurrentOrganization: getCurrentOrganization,
        // TODO 兼容用户中心的机构中心
        updateCurrentOrganization,
        masterStore: stores,
        masterHistory: history,
        getOrganizationCode: getPortalCodeFromUrl,
        portalData: portalData,
        // 选中当前身份，给用户中心专题登录页使用
        setSelectIdentity,
        //订阅的入口
        bindMenuRouteChangeCallback,
        bindChildCallback,
        dispatchChildCallback,
        //mobx数据监听方法
        observe,
    }
}
