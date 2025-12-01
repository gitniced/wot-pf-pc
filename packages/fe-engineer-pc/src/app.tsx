// import './plugins/sentry'
import type { ReactNode } from 'react'
import React from 'react'
import { Provider } from 'mobx-react'
import mobxStores from './stores/globalStore'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import MyEmpty from '@/components/Empty'
import { umiStyleHMR } from '@wotu/wotu-components'
import packageInfo from '../package.json'

// HMR CSS 修复 - 自动适配独立应用和 qiankun 子应用
umiStyleHMR()

const stores = mobxStores()

const MobxProvider = (props: any) => (
    <Provider {...stores}>
        <ConfigProvider prefixCls={packageInfo.name} locale={zhCN} renderEmpty={MyEmpty as any}>
            {props.children}
        </ConfigProvider>
    </Provider>
)

export function rootContainer(container: ReactNode[], opts: any) {
    return React.createElement(MobxProvider, opts, container)
}
