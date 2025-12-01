// styles
import '@/styles/antd.variable.css'
// import 'antd/dist/antd.less'
import '@/styles/global.css'
import styles from './index.module.less'

// components
import { ConfigProvider, Layout } from 'antd'
import { Provider } from 'mobx-react'
import { Empty } from '@wotu/wotu-components'
import { useModel } from 'umi'
import { useThemeByMaster } from '@/components/MasterPlugins'
import packageInfo from '../../package.json'
import hook from './hook'
import { getMasterHistory } from '@/utils/masterHistoryVO'
import Header from '@/components/Header'

// locale
import zhCN from 'antd/es/locale/zh_CN'
import 'dayjs/locale/zh-cn'

// type
import type { IRoute } from 'umi'
import { useEffect } from 'react'
import { MICRO_APP_TYPE } from '@/types'
import type { MasterProps } from '@/types'
import OrganizationMenu from '@/components/OrganizationMenu'
import { SuperProvider } from '@wotu/wotu-components'

const GlobalLayout = (props: IRoute) => {
    const { name: packageName } = packageInfo
    const hooks = hook()
    const masterProps: MasterProps = useModel('@@qiankunStateFromMaster')
    let { tag } = masterProps || ''
    const masterHistoryVO = getMasterHistory()

    const themeChanged = useThemeByMaster()

    const orgLayout = ['/create']

    const getLayout = () => {
        const {
            location: { pathname },
        } = props
        if (tag === MICRO_APP_TYPE.WORK_BENCH) {
            // 工作台中直接加载layout
            return props.children
        }
        if (orgLayout.includes(pathname)) {
            return (
                <Layout
                    className={styles.page}
                    style={{
                        backgroundImage: `url(https://static.zpimg.cn/public/fe_user_pc/theme/prev_gray_bg.png)`,
                    }}
                >
                    <Header noUser={false} noBack={true} />
                    <div className={styles.org_layout}>
                        <div className={styles.org_content}>
                            <div className={styles.org_title}>创建机构</div>
                            {props.children}
                        </div>
                    </div>
                </Layout>
            )
        } else {
            return (
                <Layout className={styles.page}>
                    <Header noUser={false} />
                    <div className={styles.layout}>
                        <OrganizationMenu {...props} />
                        <div className={styles.content}>
                            <div className={styles.children}>{props.children}</div>
                        </div>
                    </div>
                </Layout>
            )
        }
    }

    useEffect(() => {
        if (masterProps?.masterHistory) {
            masterHistoryVO.initMasterHistory(masterProps?.masterHistory)
        }
        hooks.redirectLogin(masterProps?.masterHistory)
    }, [])

    // 获取项目所有页面路由 提供给主应用 用作面包屑数据源
    useEffect(() => {
        let titleRoutes = props?.routes?.[0]?.routes || []
        const usefullyRoutes = titleRoutes
            .filter((item: any) => item.title)
            .map(({ path, title }: any) => {
                return { path, title }
            })
        let is404 =
            usefullyRoutes?.filter((item: string) => item.path === props?.location?.pathname)
                .length === 0
        if (is404 && props?.location?.pathname !== '/') {
            if (masterProps?.masterHistory) {
                masterProps?.masterHistory.push('/404')
            }
        }
    }, [props?.routes?.[0]?.routes])

    // 监听masterHistory存在时 绑定到masterHistoryVO单例中
    // useEffect(() => {
    //     console.log('masterProps?.masterHistory')
    //     console.log(masterProps?.masterHistory)
    //     if (!masterProps?.masterHistory) {
    //         masterHistoryVO.initMasterHistory(masterProps?.masterHistory)
    //     }
    // }, [masterProps?.masterHistory])

    return (
        <Provider {...(masterProps?.masterStore ?? { userStore: {}, siteStore: {} })}>
            <ConfigProvider prefixCls={packageName} locale={zhCN} renderEmpty={Empty}>
                <SuperProvider
                    value={{
                        prefixCls: packageName,
                    }}
                >
                    {themeChanged && getLayout()}
                </SuperProvider>
            </ConfigProvider>
        </Provider>
    )
}

export default GlobalLayout
