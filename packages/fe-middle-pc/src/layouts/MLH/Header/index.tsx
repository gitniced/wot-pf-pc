import { findSiteData, getCookie } from '@wotu/wotu-components'
import styles from './index.module.less'
import { inject, observer } from 'mobx-react'
import { history } from 'umi'
import { Base64 } from 'js-base64'

const getNavList = () => {
    const commonNavList = [
        {
            id: 'home',
            name: '首页',
        },
        {
            id: 'zxbm',
            name: '在线报名',
        },
        {
            id: 'zczx',
            name: '政策资讯',
        },
        {
            id: 'cyzx',
            name: '创业之星',
            hidden: getCookie('ALIAS') !== 'henan',
        },
        {
            id: 'yxjs',
            name: '优秀讲师',
        },
        {
            id: 'jchd',
            name: '精彩活动',
        },
        {
            id: 'kczy',
            name: '课程资源',
        },
        {
            id: 'cyfw',
            name: '创业服务',
        },
        {
            id: 'supervise',
            name: '培训监管',
            hidden: getCookie('ALIAS') === 'henan',
        },
    ]

    const sortedIdList = (() => {
        // 通用导航配置
        let commonSort = ['home', 'zxbm', 'zczx', 'cyzx', 'yxjs', 'jchd', 'kczy', 'cyfw']

        // 后台配置
        // if (this.systemData.is_show_fine_cases !== "1") {
        //     commonSort = commonSort.filter((it) => it !== "cyzx");
        // }

        // if (this.$isHeNan) {
        //     return [...commonSort, "supervise"].filter((it) => !["cyzx"].includes(it));
        // }

        return commonSort
    })()

    return sortedIdList.map(it => commonNavList.find(nav => nav.id === it))
}

const Header = ({ siteStore, userStore, data }: any) => {
    const { siteData = {} } = siteStore
    const { userData = {} } = userStore
    const pcDomain = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) || ''
    const loginUrl = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) || ''
    const orgDomain = findSiteData(siteData, 'orgDomain', { findKey: 'baseInfo' }) || ''
    const personalDomain = findSiteData(siteData, 'personalDomain', { findKey: 'baseInfo' }) || ''
    const merchantUserDomain =
        findSiteData(siteData, 'merchantUserDomain', { findKey: 'baseInfo' }) || ''
    const { websiteData, header } = data || {}
    const { service_domain, domain } = websiteData || {}

    const linkFun = (path: string) => {
        if (path === '/app/train' && window.location.origin === 'https://www.busionline.com') {
            window.location.href = 'https://kczy.busionline.com/lesson'
            return
        }
        let url = Base64.encode(path)
        const token = getCookie('TOKEN')
        if (token) {
            let tokenKey = token.split(' ')[1]
            window.location.href = service_domain + '/#/malanlogin/' + tokenKey + '/' + url
        } else {
            window.location.href = service_domain + '/#/malanlogout/' + url
        }
    }

    const linkHandle = (val: string) => {
        switch (val) {
            case 'home':
                window.open(`${domain}/portal`, '_self')
                break
            case 'kczy':
                linkFun('/app/train')
                break
            case 'cyds':
                linkFun('/app/mentors')
                break
            case 'zxbm':
                history.push('/enroll-gateway/enroll-online-topic')
                break
            case 'jchd':
                linkFun('/app/activity')
                break
            case 'zczx':
                window.open(`${domain}/policyList`, '_self')
                break
            case 'cyzx':
                window.open(`${domain}/excellentCase`, '_self')
                break
            case 'yxjs':
                window.open(`${domain}/excellentLecturer`, '_self')
                break
            case 'cyfw':
                linkFun('/app/innovation-service')
                break

            case 'supervise':
                window.open(`${domain}/supervise`, '_self')
                break
        }
    }

    return (
        <div className={styles.header}>
            <div className={styles.portal_header}>
                <div className={styles.header_content}>
                    <div className={styles.logo_box}>
                        <img src={header?.logo} className={styles.sidebar_logo} />
                        <h1 className={styles.sidebar_title}>{header?.title}</h1>
                        {/* {systems.logo && <img src="https://cp-oss.busionline.com/attachment/2023022417590163f88a6589bc8.png" className={styles.sidebar_logo} />}
                        <h1 className={styles.sidebar_title}>{{ systems.website }}{{ systems.website_subtitle }}</h1> */}
                    </div>

                    <div className={styles.login_area}>
                        {!getCookie('TOKEN') ? (
                            <div className={styles.login_btn}>
                                <span className={styles.base_bnt}>请登录</span>

                                <div
                                    className={[
                                        styles.login_dropdown,
                                        styles.hide_login_dropdown,
                                    ].join(' ')}
                                >
                                    <div
                                        onClick={() =>
                                            window.open(
                                                `${loginUrl}/account/user/login?logintype=1&extraTimeStatus=1&backUrl=${personalDomain}`,
                                                '_self',
                                            )
                                        }
                                    >
                                        <img
                                            src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/career/qz/icon_xueyuan.png"
                                            alt=""
                                        />
                                        我是学员
                                    </div>
                                    <div
                                        onClick={() =>
                                            window.open(
                                                `${merchantUserDomain}/teacher/mlh/login`,
                                                '_self',
                                            )
                                        }
                                    >
                                        <img
                                            src="https://static.zpimg.cn/public/career/qz/icon_jiangshi.png"
                                            alt=""
                                        />
                                        我是讲师
                                    </div>
                                    <div
                                        onClick={() =>
                                            window.open(
                                                `${loginUrl}/account/user/login?logintype=2&extraTimeStatus=1&backUrl=${orgDomain}`,
                                                '_self',
                                            )
                                        }
                                    >
                                        <img
                                            src="https://static.zpimg.cn/public/career/qz/icon_jigou.png"
                                            alt=""
                                        />
                                        我是机构
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.headerAvatar}>
                                <div className={styles.block}>
                                    <img
                                        className={styles.avatar}
                                        src={
                                            userData?.avatar ||
                                            'https://i.busionline.com/default_avatar.png'
                                        }
                                    />
                                    <div className={styles.flex}>
                                        <span className={styles.name}>{userData?.name}</span>
                                        {/* <span className={styles.nickname}>欧阳雨蒙</span> */}
                                    </div>
                                    {/* <i class="iconfont iconRight" /> */}
                                </div>

                                <div className={styles.card}>
                                    <div className={styles.userInfo}>
                                        <img
                                            className={styles.avatar}
                                            src={
                                                userData?.avatar ||
                                                'https://i.busionline.com/default_avatar.png'
                                            }
                                        />
                                        <span className={styles.name}>{userData?.name}</span>
                                    </div>

                                    <div className={styles.line} />

                                    <div className={styles.menuList}>
                                        <div
                                            className={styles.menu}
                                            onClick={() =>
                                                window.open(`${orgDomain}/workbench`, '_self')
                                            }
                                        >
                                            <div>
                                                <svg
                                                    className="icon"
                                                    viewBox="0 0 1024 1024"
                                                    version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    p-id="36723"
                                                    width="256"
                                                    height="256"
                                                >
                                                    <path
                                                        d="M748.8 53.333333c170.666667 0 221.44 51.626667 221.44 221.44v274.773334a20.906667 20.906667 0 0 1 0 5.12 24.32 24.32 0 0 1 0 5.546666c-2.986667 157.866667-56.32 206.506667-221.013333 206.506667h-205.226667v139.946667h160a32 32 0 0 1 0 64h-384a32 32 0 0 1 0-64h160V768H274.773333c-166.4 0-219.306667-50.773333-221.44-213.333333V274.773333c0-170.666667 51.626667-221.44 221.44-221.44z m156.586667 533.333334H118.186667c5.973333 94.72 36.266667 114.773333 147.626666 115.626666h482.986667c118.613333 0 150.613333-19.626667 156.586667-115.626666z m-147.626667-469.333334H274.773333c-130.986667 0-156.16 22.186667-157.44 148.48v256h788.906667v-256c-1.28-123.306667-25.173333-147.2-148.48-148.48z"
                                                        p-id="36724"
                                                    />
                                                </svg>
                                                <span>工作台</span>
                                            </div>
                                            <svg className={`icon`} aria-hidden="true">
                                                <use xlinkHref="#right" />
                                            </svg>
                                        </div>
                                        <div
                                            className={styles.menu}
                                            onClick={() =>
                                                window.open(`${pcDomain}/account`, '_self')
                                            }
                                        >
                                            <div>
                                                <svg className={`icon`} aria-hidden="true">
                                                    <use xlinkHref="#icon_zhanghaozhongxin" />
                                                </svg>
                                                {/* <i class="iconfont iconicon_user_gerenzhongxin" /> */}
                                                <span>账号设置</span>
                                            </div>

                                            <svg className={`icon`} aria-hidden="true">
                                                <use xlinkHref="#right" />
                                            </svg>
                                        </div>
                                        <div
                                            className={styles.menu}
                                            onClick={() => userStore.loginOut()}
                                        >
                                            <div>
                                                <svg className={`icon`} aria-hidden="true">
                                                    <use xlinkHref="#icon_tuichu" />
                                                </svg>
                                                <span>退出登录</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.nav}>
                <ul className={styles.nav_list}>
                    {getNavList().map(item => {
                        return (
                            <li
                                className={`${styles.nav_item} ${
                                    'zxbm' === item?.id ? styles.active : ''
                                }`}
                                key={item?.id}
                                onClick={() => {
                                    linkHandle(item?.id)
                                }}
                            >
                                <span>{item?.name}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default inject('siteStore', 'userStore')(observer(Header))
