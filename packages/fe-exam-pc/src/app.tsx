import type { ReactNode } from 'react'
import React from 'react'

import zhCN from 'antd/es/locale/zh_CN'

import type { IRoute } from 'umi'
import { ConfigProvider } from 'antd'
import MyEmpty from '@/components/MyEmpty'
import { BaiduAnalytics, findSiteData } from '@wotu/wotu-components'
import { getLocalStorage } from './storage'

export const qiankun = {
    // 应用加载之前
    async bootstrap(props: any) {
        console.log('fe-exam-pc-qiankun bootstrap', props)
    },
    // 应用每次进入会调用的方法
    async mount(props: any) {
        console.log('fe-exam-pc-qiankun mount', props)
    },
    // 应用卸载之前
    async unmount(props: any) {
        console.log('fe-exam-pc-qiankun unmount', props)
    },
}

const MobxProvider = (props: IRoute) => {
    return <ConfigProvider locale={zhCN} renderEmpty={MyEmpty} prefixCls="exam-center" {...props} />
}

export function rootContainer(container: ReactNode[], opts: any) {
    return React.createElement(MobxProvider, opts, container)
}

export function render(oldRender: () => void) {
    // @ts-ignore
    const baiduAnalytics = BaiduAnalytics.getInstance()
    baiduAnalytics.init()
    oldRender()
}

export function onRouteChange({ location }: any) {
    const siteStore = getLocalStorage('WORK_SITE_STORE') || {}
    const siteData = siteStore?.siteData?.data || {}
    const statisticId = findSiteData(siteData, 'statistics_id', {
        findKey: 'configList',
    })?.value
    const baiduAnalytics = BaiduAnalytics.getInstance(statisticId)
    baiduAnalytics.trackPageview(location.pathname)
}
