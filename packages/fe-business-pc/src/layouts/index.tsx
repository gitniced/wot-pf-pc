import React, { useMemo } from 'react'
import { inject, observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import 'dayjs/locale/zh-cn'
import themeChange from '@/utils/themeChange'
import type { IRoute } from 'umi'
import { history, Link } from 'umi'
import '@/styles/antd.variable.css'
import '@/styles/global.css'
import Hooks from './hook'
import { findConfigValueToBoolean, findSiteData } from '@wotu/wotu-components'
// @ts-ignore
import { PTSectionLayout } from '@wotu/pt-components'
import { Header, OrgMenu, UserMenu } from '@wotu/wotu-pro-components'
import changeIco from '@/utils/changeIco'
import { getLocalPaths } from '@/utils/getPortalCodeFromUrl'
import { getDomain, goHomeByEnv } from '@/utils/urlUtils'
import { getCookie, getSessionStorage, setLocalStorage, setSessionStorage } from '@/storage'
import needLoaderUtils from '@/utils/needLoaderUtils'
import { routeJudge } from '@/utils/routePermissionJudge'
import { USER_TYPE, USER_TYPE_MAP } from '@/types'
// import doToLogin from '@/utils/doToLogin'
import { Dropdown, message } from 'antd'
import Service from '../components/Service'
import classNames from 'classnames'
import styles from './index.module.less'
import PageLoading from '../components/PageLoading'
import { getFirstMenuRoute } from '../utils/routeAnalysis'

const GlobalLayout = observer((props: IRoute) => {
    const { userStore, siteStore } = props || {}
    const { examIdentity } = history.location.query as any
    /**根据权限数据产生的路由布局配置 */
    const {
        appLoadStatus,
        type,
        routeConfig,
        selectedOrganization,
        selectedIdentity,
        engineerDesignAIVisible,
        afterEngineerDesignAIClick,
    } = userStore
    const { siteData } = siteStore
    /**当前站点sid */
    const sid = findSiteData(siteData, 'sid')
    /**当前站点别名 */
    const alias = findSiteData(siteData, 'alias', { findKey: 'baseInfo' }) || ''
    /** 当前选中的机构code */
    const organizationCode = getCookie('SELECT_ORG_CODE') || ''
    /**当前站点域名列表 */
    const domainList = findSiteData(siteData, 'domainList', { findKey: 'baseInfo' }) || []
    /**获取站点业务线 */
    const tags =
        findSiteData(siteStore, 'tagIdList', {
            findKey: 'baseInfo',
        }) || []
    /* 站点是否属于创培业务线 */
    const isTrain = tags.includes(1)
    /* 是否不是学员 */
    // const isNotPersonal = getCookie('SELECT_USER_TYPE') !== 'user'
    /* 是否是机构用户 */
    const isOrg = getCookie('SELECT_USER_TYPE') === 'org'
    // 登录信息
    const userToken = getCookie('TOKEN')

    /**菜单宽度 默认132 */
    // const [menuWidth, setMenuWidth] = useState(132)

    /**判断当前站点信息是否属于当前域名 */
    let getIsCurrentOriginInfoBool = () => {
        const { time: oldTime } = siteData || {}
        if (new Date().getTime() - oldTime > 60000) {
            return false
        } else {
            const currentDomain = RUN_ENV === 'local' ? getDomain() : window.origin
            if (domainList.includes(currentDomain)) {
                return true
            } else {
                return false
            }
        }
    }

    /**当前站点信息是否属于当前域名 */
    const isCurrentOriginInfoBool: boolean = getIsCurrentOriginInfoBool()

    const {
        location: { pathname },
    } = props

    const { addOnlineListen, removeOnlineListen } = Hooks()
    /** 是否已获取站点设置*/
    const [onSiteConfig, setOnSiteConfig] = useState<boolean>(false)
    /** 修改主题色*/
    const doChangeTheme = () => {
        // 当存在门户主应用信息时 使用门户主应用的主题色
        const themeColor = findSiteData(props.siteStore.siteData, 'theme_color')?.value || ''
        themeChange(themeColor, () => {
            setOnSiteConfig(true)
        })
    }

    const avatar =
        userStore?.userData?.avatar || siteStore.siteAvatar || 'https://zpimg.cn/a/img/avatar.png'

    /** 获取用户名*/
    const getMobile = () =>
        userStore?.userData?.mobile &&
        `${userStore.userData.mobile.slice(0, 3)}****${userStore.userData.mobile.slice(-4)}`
    const getUserName = () => userStore?.userData?.nickname || getMobile()

    const getCurrentApp = () => {
        const currentAppKey = Object.keys(appLoadStatus).find(item => {
            const firstPath = '/' + pathname.split('/')[1] || ''
            return firstPath === appLoadStatus[item].path
        })
        return currentAppKey ? appLoadStatus[currentAppKey] : null
    }

    // 当前身份为教师
    const isTeacher = getCookie('SELECT_IDENTITY_CODE')?.toString() === '14'

    const isStudent = getCookie('SELECT_IDENTITY_CODE')?.toString() === '15'

    // 当前为教研端
    const isAssistant =
        userStore?.selectedIdentity?.toString?.() === '14' &&
        (/engineer-center\/assistant\/.*/.test(location.pathname) ||
            /engineer-center\/office\/.*/.test(location.pathname))

    // 课程设计页面
    // const isDesign = /engineer-center\/assistant\/course\/.*\/design\/.*/.test(location.pathname)

    /** 页面初始化处理 */
    useEffect(() => {
        if (pathname === '/faceRecognition') {
            location.href = '/student-center/faceRecognition'
        }
        setSessionStorage('PLATFORM', 'workbench')
        getLocalPaths(props)
        needLoaderUtils()
        addOnlineListen()
        // siteStore.getSiteConfigByDebounce()
        return removeOnlineListen
    }, [])

    /** 工学站点监听当前选中的机构code 获取机构详情 */
    useEffect(() => {
        if (alias === 'engineer' && organizationCode) {
            userStore.getSelectedOrganizationDetail(organizationCode)
        }
    }, [organizationCode, alias])

    /** 保存来源类型*/
    useEffect(() => {
        setLocalStorage('SOURCE_TYPE', getCookie('SOURCE_TYPE'))
    }, [getCookie('SOURCE_TYPE')])

    /**  监听选择的组织 获取到该组织的自定义域名 存到session  */
    const getDomainAlias = async () => {
        const selectCode = getCookie('SELECT_ORG_CODE') || ''
        const currentPortalCodeObj = getSessionStorage('CURRENT_PORTAL_ALIAS_OBJ') || {}
        if (selectCode) {
            // eslint-disable-next-line no-unsafe-optional-chaining
            const { customDomain = '' } = await userStore?.getPortalData(selectCode)
            if (customDomain) {
                setSessionStorage('CURRENT_PORTAL_ALIAS_OBJ', {
                    ...currentPortalCodeObj,
                    [selectCode]: customDomain,
                })
            }
        }
    }
    useEffect(() => {
        getDomainAlias()
    }, [getCookie('SELECT_ORG_CODE')])

    /**
     * 监听isCurrentOriginInfoBool
     * 当站点信息正确时 进行主题色设置
     * 当站点信息正确时 请求用户信息
     * 当站点信息正确时 请求站点全量权限页面
     *
     * 当站点信息错误时 请求站点信息
     */
    useEffect(() => {
        if (isCurrentOriginInfoBool) {
            doChangeTheme()
            changeIco(siteData)
            if (userToken) {
                userStore.getUserData()
                userStore.getSitePermissionList(sid)
            } else {
                // 没有登陆，回到对应首页/登录页
                goHomeByEnv()
            }
        } else {
            siteStore.getSiteConfigByDebounce()
        }
    }, [isCurrentOriginInfoBool])

    let selectIdentityCode = getCookie('SELECT_IDENTITY_CODE')

    // 监听cookie中的身份，更新当前userStore的身份
    useEffect(() => {
        if (selectIdentityCode) {
            userStore.setSelectIdentity(selectIdentityCode)
        }
    }, [selectIdentityCode])

    /** 当选中的身份code变化 且站点信息及身份code不为空时
     * 个人拥有多种身份
     * 机构目前只有机构身份
     * 资源方目前拥有多种身份
     * 讲师个人资源方  4
     */
    useEffect(() => {
        if (isCurrentOriginInfoBool) {
            if (userStore.type?.toString?.() === '1' || userStore.type?.toString?.() === '4') {
                if (siteData?.data?.sid && selectedIdentity && !examIdentity) {
                    userStore.dyGetPermissionList()
                }
            } else {
                if (siteData?.data?.sid && selectedIdentity && selectedOrganization) {
                    userStore.dyGetPermissionList()
                }
            }
        }
    }, [selectedOrganization, selectedIdentity, isCurrentOriginInfoBool])

    /** 当选中的机构code变化时 更新机构信息*/
    useEffect(() => {
        if (isCurrentOriginInfoBool) {
            if (userStore.selectedOrganization && getCookie('SELECT_USER_TYPE') === 'org') {
                const hasShopping =
                    Number(findSiteData(siteData, 'shopping_cart_switch')?.value || 0) === 1
                hasShopping ? userStore.getShoppingCar() : ''
                userStore.selectedOrganization
                    ? userStore.getSelectedOrganizationDetail(userStore.selectedOrganization)
                    : ''
            }
        }
    }, [userStore.selectedOrganization, isCurrentOriginInfoBool])

    /** 当选中的身份code变化 且站点信息及身份code不为空时*/
    useEffect(() => {
        if (sid) {
            userStore.updateUserType()
            userStore.updateSiteSid(sid)
            userStore.updateSiteAlias(alias)
            setLocalStorage('SID', sid)
        }
    }, [sid])

    /** 判断当前路由 是否为合法路由 如果为无权访问 前往403 */
    useEffect(() => {
        if (
            userStore.requestMenu &&
            userStore.userPermissionRouteList.length > 0
            // &&
            // userStore.sitePermissionRouteList.length > 0
        ) {
            routeJudge()
        }
    }, [
        pathname,
        userStore.requestMenu,
        userStore.userPermissionRouteList,
        // userStore.sitePermissionRouteList,
    ])

    /** 根据身份策略后续执行业务 */
    useEffect(() => {
        /** 当前站点信息匹配前提下 */
        if (isCurrentOriginInfoBool) {
            /** 根据身份策略后续执行业务 */
            const typeMapFn: Record<string, () => void> = {
                /** 用户身份下的接口调用行为 */
                user: () => {
                    // 用户
                    userStore.getUserIdentityList()
                    userStore.getUserDefaultIdentity(examIdentity).then(() => {
                        // return userStore.dyGetPermissionList()
                    })
                },

                /** 机构身份下的 接口调用行为 */
                org: async () => {
                    await userStore.getOrganizationList()
                    /** 当机构用户下的机构为空时 前往锁定页 */
                    if (userStore.organizationList.length === 0) {
                        const loginUrl =
                            findSiteData(siteData, 'pcDomain', {
                                findKey: 'baseInfo',
                            }) || ''
                        message.error('机构不存在')
                        location.href = `${loginUrl}/account/lock/person`
                        return
                    }
                    userStore
                        .getDefaultOrganization(USER_TYPE_MAP[USER_TYPE.ORG])
                        .then(() =>
                            Promise.all([
                                userStore.getOrganizationIdentityList(
                                    userStore.selectedOrganization,
                                ),
                                userStore.getDefaultOrganizationIdentity(
                                    userStore.selectedOrganization,
                                ),
                            ]),
                        )
                        .then(() => {
                            // return userStore.dyGetPermissionList()
                        })
                },

                /** 资源方 下的接口调用行为 */
                merchant: () => {
                    userStore.getOrganizationList()
                    userStore
                        .getDefaultOrganization(3)
                        .then(() =>
                            Promise.all([
                                userStore.getOrganizationIdentityList(
                                    userStore.selectedOrganization,
                                ),
                                userStore.getDefaultOrganizationIdentity(
                                    userStore.selectedOrganization,
                                ),
                            ]),
                        )
                        .then(() => {
                            // return userStore.dyGetPermissionList()
                        })
                },
                person_teacher: () => {
                    //当前只有讲师身份
                },
            }
            typeMapFn[getCookie('SELECT_USER_TYPE')]?.()
        }
    }, [type, isCurrentOriginInfoBool])

    /** 回到首页 */
    const gotoHome = () => {
        const pcDomain = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) || ''
        window.location.href = pcDomain
    }
    const getHomeUrl = () => {
        const pcDomain = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) || ''
        return `${pcDomain}`
    }

    /** 前往购物车 */
    const gotoBuy = () => {
        const pcDomain = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) || ''
        window.open(`${pcDomain}/shopping/cart`)
    }
    const getBuyUrl = () => {
        const pcDomain = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) || ''
        return `${pcDomain}/shopping/cart`
    }

    /** 当站点配置的购物车按钮打开且用户类型为机构时显示购物车按钮 */
    const getBuyVisible = () => {
        if (alias === 'engineer') return false
        const isOpen = Number(findSiteData(siteData, 'shopping_cart_switch')?.value || 0) === 1
        const isPersonOpen = Number(findSiteData(siteData, 'individual_purchase')?.value || 0) === 1
        return (
            (isOpen && getCookie('SELECT_USER_TYPE') === 'org') ||
            (isPersonOpen && getCookie('SELECT_USER_TYPE') === 'user')
        )
    }

    /** 有些站点不能展示home按钮 */
    const getHomeVisible = () => {
        const noHomeAlias = ['szrc', 'szrcsz', 'engineer']
        const kp_org_login_theme = findSiteData(siteStore, 'kp_org_login_theme')?.value
        const currentAlias = findSiteData(siteData, 'alias', { findKey: 'baseInfo' }) || ''
        return (
            !noHomeAlias.includes(currentAlias) &&
            kp_org_login_theme !== '/sclogin' &&
            kp_org_login_theme !== '/egzlogin'
        )
    }

    const engineerFooter = useMemo(() => {
        const icpCode = findSiteData(siteData, 'icp_code')?.value || ''
        if (isTeacher) {
            if (pathname.startsWith('/engineer-center/assistant')) {
                if (pathname === '/engineer-center/assistant/home') {
                    return (
                        <div className={styles.engineer_footer}>
                            © 2025 杭州沃土教育科技股份有限公司 版权所有 |{' '}
                            <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">
                                {icpCode}
                            </a>
                        </div>
                    )
                } else {
                    return null
                }
            } else {
                return (
                    <div className={styles.engineer_footer}>
                        © 2025 杭州沃土教育科技股份有限公司 版权所有 |{' '}
                        <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">
                            {icpCode}
                        </a>
                    </div>
                )
            }
        } else {
            return (
                <div className={styles.engineer_footer}>
                    © 2025 杭州沃土教育科技股份有限公司 版权所有 |{' '}
                    <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">
                        {icpCode}
                    </a>
                </div>
            )
        }
    }, [pathname, isTeacher, alias === 'engineer'])

    /** 处理当初始化时 错误展示404 */
    const getReactChild = () => {
        if (pathname !== '' && pathname !== '/') {
            const currentApp = getCurrentApp()
            if (currentApp) {
                return (
                    <>
                        {!currentApp.mounted ? <PageLoading /> : null}
                        {React.cloneElement(props.children, {
                            organizationCode: userStore.selectedOrganization,
                            identityCode: userStore.selectedIdentity,
                        })}
                        {currentApp.mounted ? engineerFooter : null}
                    </>
                )
            } else {
                return React.cloneElement(props.children, {
                    organizationCode: userStore.selectedOrganization,
                    identityCode: userStore.selectedIdentity,
                })
            }
        } else {
            return <></>
        }
    }

    /**
     * 获取logo规则：
     * 当前站点是多家考务或者独家考务
     * ----独家考务：1
     * -------1、个人用户 获取PC端LOGO正常色
     * -------2、机构及资源方用户 获取移动端LOGO正常色logo使用移动端LOGO正常色
     * ----多家考务：2 logo使用指定图片
     */
    const getCustomLogo = () => {
        const isEngineer = alias === 'engineer'
        const { selectedOrganizationDetail = {} } = userStore || {}
        const engineerLogo = selectedOrganizationDetail?.logo || defaultOrgLogo
        if (isEngineer) {
            return engineerLogo
        }
        const isMoreExam = Number(findSiteData(siteData, 'kp_business_setting')?.value || 0)
        const kp_org_login_theme = findSiteData(siteStore, 'kp_org_login_theme')?.value
        switch (isMoreExam) {
            case 1:
                return getCookie('SELECT_USER_TYPE') === 'user'
                    ? findSiteData(siteData, 'pc_logo')?.value
                    : findSiteData(siteData, 'wap_logo')?.value
            case 2:
                if (kp_org_login_theme === '/egzlogin') {
                    return 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/nx_wap.jpg'
                } else {
                    return 'https://static.zpimg.cn/public/sclogin/sc_rect_logo_1.png'
                }
            default:
                return getCookie('SELECT_USER_TYPE') === 'user'
                    ? findSiteData(siteData, 'pc_logo')?.value
                    : findSiteData(siteData, 'wap_logo')?.value
        }
    }

    /** 获取教研端LOGO右侧内容 */
    const getAfterDom = () => {
        if (alias === 'engineer' && isAssistant) {
            return (
                <div className={styles.logo_assistant_btn}>
                    <span />
                    <img src="https://static.zpimg.cn/public/fe-engineer-pc/images/icon_jiaoyan%402x.png" />
                    <div>AI教研</div>
                </div>
            )
        } else {
            return null
        }
    }

    /** 点击访问门户时 填充token */
    const fillToken = () => {
        // const token = getCookie('TOKEN')
        // const userCode = getCookie('USER_CODE')
        // // const userType = getCookie('SELECT_USER_TYPE')
        // const _selectIdentityCode = getCookie('SELECT_IDENTITY_CODE')
        // setPortalCookie('TOKEN', token, userStore.selectedOrganization)
        // setPortalCookie('RANDOM_CODE', getCookie('RANDOM_CODE'), userStore.selectedOrganization)
        // setPortalCookie('USER_CODE', userCode, userStore.selectedOrganization)
        // setPortalCookie('SELECT_USER_TYPE', 'user', userStore.selectedOrganization)
        // setPortalCookie('SELECT_IDENTITY_CODE', _selectIdentityCode, userStore.selectedOrganization)
        // setCookie('TOKEN', token, userStore.selectedOrganization)
        // setCookie('RANDOM_CODE', getCookie('RANDOM_CODE'), userStore.selectedOrganization)
        // setCookie('USER_CODE', userCode, userStore.selectedOrganization)
        // setCookie('SELECT_USER_TYPE', 'user', userStore.selectedOrganization)
        // setCookie('SELECT_IDENTITY_CODE', _selectIdentityCode, userStore.selectedOrganization)
    }

    /** 点击访问门户时 填充token */
    const onTrainNotificationBtnClick = () => {
        window.open('/training-center/feature?isHideGoBack=true')
    }
    const getTrainNotificationUrl = () => {
        return '/training-center/feature?isHideGoBack=true'
    }

    /** 当用户有门户权限时 展示访问门户按钮 */
    const getAccessPortalVisible = () => {
        const { permissionIdList } = userStore
        const accessPortalVisible = permissionIdList.some(
            (item: string) => item.toString() === '10156',
        )
        return accessPortalVisible
    }

    /** 当前为创培业务线，且用户为机构时展示功能上新按钮 */
    const getTrainNotificationBtnVisible = () => {
        return isTrain && isOrg
    }

    /**
     * 新干线：个人中心都要、账号设置学员不要、右上角学员不要
     * 河北：个人中心都要、账号设置学员不要、右上角学员不要
     */
    const personalSSO = findSiteData(siteStore?.siteData || {}, 'login_personal_sso')?.value
    const orgSSO = findSiteData(siteStore?.siteData || {}, 'login_org_sso')?.value
    const specialMenuItem = () => {
        // if (userStore.alias === 'hzxgx' || userStore.alias === 'hb') {
        //     if (Number(userStore.type) === 1) {
        //         return {}
        //     } else {
        //         return {
        //             title: '账号设置',
        //             icon: 'https://img-test.zpimg.cn/public_read/menu_icon/16924601g8pjfvgg.svg',
        //             route: `${
        //                 findSiteData(siteData, 'pcDomain', {
        //                     findKey: 'baseInfo',
        //                 }) || ''
        //             }/account/account`,
        //         }
        //     }
        // } else {
        // 用户角色开启单点登录不展示账号设置
        if (Number(userStore.type) === 1 && personalSSO === '1') {
            return {}
        }
        return {
            title: '账号设置',
            icon: 'https://img-test.zpimg.cn/public_read/menu_icon/16924601g8pjfvgg.svg',
            route: `${
                findSiteData(siteData, 'pcDomain', {
                    findKey: 'baseInfo',
                }) || ''
            }/account/account`,
        }
        // }
    }

    /** 当站点设置未获取到时 不展示页面 */
    // if (!onSiteConfig || !isLoadSiteConfig) return null
    /** 当站点设置未获取到时 不展示页面 */
    if (!onSiteConfig) return null

    /** 当不存在token时 调用回到登录方法 */
    // if (!userToken) {
    //     doToLogin()
    //     return null
    // }

    // 站点是否打开客服按钮
    let customerServiceVisible = findConfigValueToBoolean(
        siteStore?.siteData,
        'enable_customer_service',
    )
    // // 是否打开消息按钮
    let informationVisible =
        alias === 'engineer'
            ? false
            : (siteStore.businessOpenList?.includes('career') && alias !== 'gyxx') ||
              (isTrain && getCookie('SELECT_USER_TYPE') !== 'user')

    // 消息按钮的点击事件
    const onInformationClick = () => {
        if (siteStore.businessOpenList?.includes('career') && alias !== 'gyxx') {
            let informationUrl =
                getCookie('SELECT_USER_TYPE') === 'user'
                    ? '/train-center/mine/student/message'
                    : '/train-center/mine/company/message'
            history.push(informationUrl)
        }

        if (isTrain && getCookie('SELECT_USER_TYPE') !== 'user') {
            history.push('/training-center/message/myMessage')
        }
    }
    const getInformationUrl = () => {
        if (siteStore.businessOpenList?.includes('career') && alias !== 'gyxx') {
            let informationUrl =
                getCookie('SELECT_USER_TYPE') === 'user'
                    ? '/train-center/mine/student/message'
                    : '/train-center/mine/company/message'
            return informationUrl
        }
        if (isTrain && getCookie('SELECT_USER_TYPE') !== 'user') {
            return '/training-center/message/myMessage'
        }
        return ''
    }

    /**  抽离判断  */
    const judgeIsUser = (flag: boolean) => {
        if (flag) {
            return (
                getCookie('SELECT_USER_TYPE') === 'user' ||
                getCookie('SELECT_USER_TYPE') === 'person_teacher'
            )
        } else {
            return (
                getCookie('SELECT_USER_TYPE') !== 'user' &&
                getCookie('SELECT_USER_TYPE') !== 'person_teacher'
            )
        }
    }

    const getDefaultSelectedUrl = () => {
        return '/workbench'
    }

    const onClickLogout = () => {
        userStore.loginOut()
    }

    return (
        <>
            <PTSectionLayout
                routeConfig={routeConfig}
                sectionVisible={alias === 'engineer' ? !isStudent : true}
                section={
                    judgeIsUser(true) ? (
                        <UserMenu
                            menuList={[...userStore.permissionList, specialMenuItem()]}
                            masterHistory={history}
                            defaultSelectedUrl={getDefaultSelectedUrl()}
                        />
                    ) : (
                        <OrgMenu
                            menu={userStore.permissionList}
                            masterHistory={history}
                            onMenuRouteChange={userStore.onRouteChange}
                        />
                    )
                }
                header={
                    <Header
                        {...userStore.userData}
                        userStore={userStore}
                        siteStore={siteStore}
                        personInfo={
                            (Number(userStore.type) === 1 && personalSSO === '1') ||
                            (Number(userStore.type) === 2 && orgSSO === '1')
                                ? {
                                      render: () => {
                                          return (
                                              <Dropdown
                                                  overlayStyle={{ width: '220px' }}
                                                  getPopupContainer={triggerNode =>
                                                      triggerNode.parentElement as HTMLElement
                                                  }
                                                  overlayClassName={classNames(
                                                      'person_info_dropdown',
                                                      styles.dropdown_wrapper,
                                                  )}
                                                  // open={true}
                                                  dropdownRender={() => {
                                                      return (
                                                          <div className="person_info_dropdown_content">
                                                              <div
                                                                  className={
                                                                      styles.person_info_dropdown_menu
                                                                  }
                                                              >
                                                                  <div
                                                                      className={
                                                                          styles.person_info_item
                                                                      }
                                                                      onClick={onClickLogout}
                                                                  >
                                                                      <svg
                                                                          className="icon icon_tuichudenglu"
                                                                          aria-hidden="true"
                                                                      >
                                                                          <use xlinkHref="#icon_tuichu" />
                                                                      </svg>
                                                                      退出登录
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      )
                                                  }}
                                              >
                                                  <div className="wrapper">
                                                      <img src={avatar} alt="" className="avatar" />
                                                      <div className={`name_show_text single_name`}>
                                                          {getUserName()}
                                                      </div>
                                                  </div>
                                              </Dropdown>
                                          )
                                      },
                                  }
                                : undefined
                        }
                        logo={{
                            url: getCustomLogo(),
                            afterDom: getAfterDom(),
                            onClick: () => {
                                let routeList = getFirstMenuRoute(userStore.permissionList) || []
                                if (location.pathname !== routeList[0]) {
                                    history.push(routeList[0])
                                }
                            },
                        }}
                        title={
                            alias === 'engineer'
                                ? userStore.selectedOrganizationDetail?.name
                                : undefined
                        }
                        leftContent={() => {
                            if (alias === 'engineer' && isTeacher) {
                                return (
                                    <Link
                                        to={
                                            !isAssistant
                                                ? '/engineer-center/assistant/home'
                                                : '/engineer-center/mine-class'
                                        }
                                    >
                                        {isAssistant ? (
                                            <div className={styles.engineer_left_content}>
                                                <div>返回教师端</div>
                                            </div>
                                        ) : (
                                            <div className={styles.engineer_left_assistant_content}>
                                                <img src="https://static.zpimg.cn/public/fe-engineer-pc/images/icon_jiaoyan%402x.png" />
                                                <div>AI教研</div>
                                            </div>
                                        )}
                                    </Link>
                                )
                            }
                        }}
                        rightContent={() => {
                            if (alias === 'engineer' && isAssistant) {
                                return (
                                    <div
                                        className={styles.assistant_btn}
                                        onClick={() =>
                                            afterEngineerDesignAIClick(!engineerDesignAIVisible)
                                        }
                                    >
                                        <img src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-engineer-pc/images/png_aizhushou%402x_96b38b91.png" />
                                        课程设计助手
                                    </div>
                                )
                            }
                        }}
                        trainNotification={{
                            visible: getTrainNotificationBtnVisible(),
                            onClick: onTrainNotificationBtnClick,
                            href: getTrainNotificationUrl(),
                        }}
                        customerService={{
                            visible: customerServiceVisible,
                        }}
                        accessPortal={{
                            visible: getAccessPortalVisible(),
                            randomCode: getCookie('RANDOM_CODE'),
                            onClick: fillToken,
                        }}
                        organization={{
                            visible: judgeIsUser(false) ? true : false,
                            list: userStore.organizationList,
                            isCreateOrganization:
                                findSiteData(siteData, 'login_org_create_org', {
                                    findKey: 'configList',
                                })?.value === '1',
                            hideList: Number(userStore.type) === 2 && orgSSO === '1',
                        }}
                        identify={{
                            //TODO 考评资源方接入：资源方不展示切换身份
                            visible: isAssistant ? false : sid !== 1,
                            // 工学站点不展示学员身份
                            list: userStore.identityList.filter(item =>
                                alias === 'engineer' ? String(item.id) !== '5' : true,
                            ),
                        }}
                        homePage={{
                            visible: getHomeVisible(),
                            onClick: gotoHome,
                            href: getHomeUrl(),
                        }}
                        buyPage={{
                            visible: getBuyVisible(),
                            moreVisible: userStore.shoppingCarNum > 0,
                            onClick: gotoBuy,
                            href: getBuyUrl(),
                        }}
                        informationPage={{
                            visible: informationVisible,
                            onClick: onInformationClick,
                            href: getInformationUrl(),
                        }}
                        {...(userStore.headerProps || {})}
                    />
                }
            >
                {getReactChild()}
            </PTSectionLayout>
            {/* @ts-ignore */}
            {alias === 'hun' && userStore.type?.toString?.() === '1' ? <Service /> : null}
            {/* 创培上新通知展示 */}
            {/* {isTrain && isNotPersonal ? (
                <div style={{ display: 'none' }}>
                    <MicroAppWithMemoHistory
                        name="training-center"
                        base="/trading-center"
                        url="/home"
                    />
                </div>
            ) : null} */}
        </>
    )
})

export default inject('userStore', 'siteStore')(GlobalLayout)
