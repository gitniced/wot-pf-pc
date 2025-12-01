import { inject, observer } from 'mobx-react'
import { findSiteLData } from '@/utils/valueGet'
import styles from './index.modules.less'
import { navItems } from '../const'
import { Image } from 'antd'
import { useLocation } from 'umi'
// @ts-ignore
import { history } from 'umi'
import { getCookie } from '@/storage'
import { Header } from '@wotu/wotu-pro-components'

const Index: React.FC = ({ siteStore, userStore }: any) => {
    const pathname: string = useLocation().pathname
    const loginUrl = findSiteLData(siteStore?.siteData, 'pcDomain', { findKey: 'baseInfo' })
    const logo = findSiteLData(siteStore?.siteData, 'pc_logo', { findKey: 'configList' })?.value

    return (
        <div className={styles.container}>
            <div className={styles.header_wrap}>
                <div className={styles.header_content}>
                    <div className={styles.header_left}>
                        <Image
                            preview={false}
                            fallback={defaultLogo}
                            src="https://static.zpimg.cn/public/career/wo/wxz_image_x2.png"
                        />
                        <span>终身学习智能服务</span>
                    </div>

                    <div className={styles.header_right}>
                        {getCookie('TOKEN') ? (
                            <Header
                                userStore={userStore}
                                siteStore={siteStore}
                                // @ts-ignore
                                isOrganization={false}
                                customerService={{
                                    visible: true,
                                }}
                                accessPortal={{
                                    visible: false,
                                }}
                                organization={{
                                    visible: false,
                                    isCreateOrganization: false,
                                }}
                                identify={{
                                    visible: false,
                                }}
                            />
                        ) : (
                            <span
                                className={styles.login_text}
                                onClick={() => (location.href = `${loginUrl}/account/user/login`)}
                            >
                                请登录
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.site}>
                <img className={styles.image} src={logo || defaultLogo} />
            </div>
            <div className={styles.nav_box}>
                <div className={styles.nav}>
                    {navItems.map(item => (
                        <a
                            className={`${styles.item} ${
                                item.linkArray.includes(pathname) && styles.active
                            }`}
                            onClick={() => history.push(item.link)}
                            key={item.link}
                        >
                            <div>{item.name}</div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default inject('userStore', 'siteStore')(observer(Index))
