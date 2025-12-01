import type { ReactNode } from 'react'
import React from 'react'
import { Provider } from 'mobx-react'
import mobxStores from './stores/globalStore'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import MyEmpty from '@/components/Empty'
import packageInfo from '../package.json'

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
