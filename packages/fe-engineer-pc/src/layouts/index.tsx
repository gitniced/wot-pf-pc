import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import zhCN from 'antd/es/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import type { IRoute } from 'umi'
import { useLocation, useModel } from 'umi'
import '@/styles/antd.variable.css'
import '@/styles/global.css'
import { ConfigProvider } from 'antd'
import packageInfo from '../../package.json'
import MyEmpty from '@/components/Empty'
import { findSiteData, SuperProvider } from '@wotu/wotu-components'
import { setSessionStorage, delSessionStorage, getCookie, getLocalStorage } from '@/storage'
import classNames from 'classnames'
import setCssVars from '@/utils/setCssVars'
import styles from './index.module.less'
import PageLoading from '@/components/PageLoading'
import { ChatModal } from '../components/AIComp'

const GlobalLayout = observer((props: IRoute) => {
    const { name: packageName } = packageInfo
    const { userStore, siteStore } = props || {}
    const masterModel = useModel('@@qiankunStateFromMaster')
    const {
        tag,
        masterStore,
        masterHistory,
        gatewayUserStore,
        gatewaySiteStore,
        getOrganizationCode,
        portalData,
    } = masterModel || {}

    const { pathname } = useLocation()

    const currentPortalCode = getOrganizationCode?.() || ''

    const [themeChanged, setThemeChanged] = useState(false)
    const [aiModalOpen, setAiModalOpen] = useState(false)

    const sid = getLocalStorage('SID')

    /**
     * 当前身份code
     * 教师身份 14
     * 学生身份 15
     */
    const currentIdentity = sid ? getCookie('SELECT_IDENTITY_CODE') : ''

    // 判断当前路由是否有layout，区分样式
    const [hasLayout, setHasLayout] = useState(false)

    const updateTheme = (themeColor: string = '#1890ff') => {
        setCssVars({ primaryColor: themeColor })
        ConfigProvider.config({
            prefixCls: packageInfo.name,
            theme: { primaryColor: themeColor },
        })
        setThemeChanged(true)
    }

    const showLayoutPages: string[] = []

    const updateByTag = (currentTag: string) => {
        let tempThemeColor: string = ''
        switch (currentTag) {
            case 'workbench':
                userStore.updateTag(currentTag)
                userStore.updateHistory(masterHistory)
                userStore.updateUserData(masterStore?.userStore?.userData)
                userStore.updateStudentData(masterStore?.userStore?.studentData)
                userStore.updateTeacherData(masterStore?.userStore?.teacherData)

                siteStore.updateTag(currentTag)
                siteStore.updateHistory(masterHistory)
                siteStore.updateSiteData(masterStore?.siteStore?.siteData)
                tempThemeColor =
                    findSiteData(masterStore?.siteStore?.siteData || {}, 'theme_color')?.value || ''
                updateTheme(tempThemeColor)
                break
            case 'portal':
                userStore.updateTag(currentTag)
                userStore.updateHistory(masterHistory)
                userStore.updateUserData(gatewayUserStore?.userData)
                userStore.updateStudentData(gatewayUserStore?.studentData)
                userStore.updateTeacherData(gatewayUserStore?.teacherData)
                userStore.updatePortalData(portalData)

                showLayoutPages.forEach(item => {
                    gatewayUserStore?.updateLayoutConfig({
                        path: item,
                        header: true,
                        footer: true,
                    })
                })

                siteStore.updateTag(currentTag)
                siteStore.updateHistory(masterHistory)
                siteStore.updateSiteData(gatewaySiteStore?.siteData)
                siteStore.updatePortalData(portalData)
                tempThemeColor = portalData?.[currentPortalCode]?.themeColor
                updateTheme(tempThemeColor)
                break
            case 'train':
                userStore.updateTag('train')
                siteStore.updateHistory(masterHistory)
                getCookie('TOKEN') ? userStore.getUserData() : ''

                siteStore.updateTag('train')
                siteStore.updateHistory(masterHistory)
                siteStore.getSiteData(updateTheme)
                break
            default:
                userStore.updateTag('site')
                siteStore.updateHistory(masterHistory)
                getCookie('TOKEN') ? userStore.getUserData() : ''
                // getCookie('TOKEN') ? userStore.getStudentData() : ''
                // getCookie('TOKEN') ? userStore.getTeacherData() : ''

                siteStore.updateTag('site')
                siteStore.updateHistory(masterHistory)
                siteStore.getSiteData(updateTheme)
        }
    }

    /**更新本地路由信息 */
    // useEffect(() => {
    //     getLocalPaths(props)
    // }, [])

    const parentStore = useModel('@@qiankunStateFromMaster') || {}
    const { onEngineerDesignAIClick } = parentStore || {}

    useEffect(() => {
        onEngineerDesignAIClick?.(() => {
            setAiModalOpen(true)
        })
    }, [])

    /**tag变化后 更新父应用信息 */
    useEffect(() => {
        if (tag) {
            setSessionStorage('PLATFORM', tag)
        } else {
            delSessionStorage('PLATFORM')
        }
        updateByTag(tag)
    }, [tag])

    useEffect(() => {
        let layoutFlag = showLayoutPages.find(item => item.includes(pathname))
        setHasLayout(Boolean(layoutFlag))
    }, [pathname])

    useEffect(() => {
        if (sid && currentIdentity) {
            if (String(currentIdentity) === '15') {
                userStore.getStudentData()
            } else if (String(currentIdentity) === '8') {
                // 管理端不处理
            } else {
                userStore.getTeacherData()
            }
        }
    }, [sid, currentIdentity])

    return (
        <ConfigProvider
            prefixCls={packageName}
            locale={zhCN}
            renderEmpty={MyEmpty as unknown as any}
        >
            <SuperProvider
                value={{
                    prefixCls: packageName,
                }}
            >
                <div className={classNames(hasLayout && styles[`container_${tag}`])}>
                    {themeChanged ? (
                        <div style={{ minHeight: 'calc(100vh - 158px)' }}>{props.children}</div>
                    ) : (
                        <PageLoading />
                    )}

                    <ChatModal
                        title="AI课程设计助手"
                        params={{ personType: '1' }}
                        streamUrl="/wil/ai/course_design_assistant"
                        open={aiModalOpen}
                        onCancel={() => setAiModalOpen(false)}
                        welcome="我可以帮你厘清课程设计思路、提供建议或相关资料。"
                    />
                </div>
            </SuperProvider>
        </ConfigProvider>
    )
})

export default inject('userStore', 'siteStore')(GlobalLayout)
