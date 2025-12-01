// styles
import '@/styles/modified.css'
import '@/styles/global.css'
import styles from './index.module.less'

// components
import { ConfigProvider } from 'antd'
import { Provider } from 'mobx-react'
import { history } from 'umi'
import getMasterProps from '@/stores/masterStore'
import { getCookie, setLocalStorage } from '@/storage'
import type { ThemeObj } from '@/utils/changeTheme';
import { setRootVarStyleColor } from '@/utils/changeTheme'

// locale
import zhCN from 'antd/es/locale/zh_CN'
import 'dayjs/locale/zh-cn'

// type
import type { IRoute } from 'umi'
import { useEffect, useState } from 'react'
import { findSiteData } from '@/utils/valueGet'
import { Empty, SuperProvider } from '@wotu/wotu-components'
import useSiteStore from '@/hooks/useSiteStore'

const GlobalLayout = (props: IRoute) => {
    const { masterStore } = getMasterProps() || {}
    const siteStore = useSiteStore()

    const { sourceType: querySourceType } = history.location.query as any
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        const sourceType = querySourceType || getCookie('SOURCE_TYPE')
        if (sourceType) {
            setLocalStorage('SOURCE_TYPE', sourceType)
        }

        // 资源方为company的话直接跳转职位管理页面
        if (sourceType === 'company') {
            if (!/\/(invite|company)\//.test(window.location.pathname)) {
                history.push('/company/position-manage')
            }
        }
    }, [getCookie('SOURCE_TYPE'), querySourceType])

    const getThemeColor = () => {
        const themeColor = findSiteData(siteStore?.siteData, 'theme_color')?.value

        return themeColor
    }

    useEffect(() => {
        let themeConfig: Partial<ThemeObj> & Record<string, string> = {}
        const { configList = [] } = siteStore?.siteData.data ?? {}
        configList?.map((item: any) => {
            if (item.key.includes('theme_color')) {
                themeConfig[item.key] = item?.value
            }
        })

        setRootVarStyleColor(themeConfig as any, () => {})

        ConfigProvider.config({
            prefixCls: 'merchant-center',
            theme: {
                primaryColor: getThemeColor(),
            },
        })
    }, [])

    if (/\/admin|\/invite/.test(location.pathname)) {
        if (/\/invite\/apply/.test(window.location.pathname)) {
            return isShow && props.children
        } else {
            return props.children
        }
    }

    return (
        <div className={styles.page}>
            <Provider {...masterStore}>
                {/* @ts-ignore */}
                <ConfigProvider locale={zhCN} renderEmpty={Empty} prefixCls="merchant-center">
                    <SuperProvider
                        value={{
                            prefixCls: 'merchant-center',
                            theme: {
                                primaryColor: getThemeColor(),
                            },
                        }}
                    >
                        {props.children}
                    </SuperProvider>
                </ConfigProvider>
            </Provider>
        </div>
    )
}

export default GlobalLayout
