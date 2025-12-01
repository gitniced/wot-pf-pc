/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import type { IRoute } from 'umi'
import 'dayjs/locale/zh-cn'
import '@/styles/antd.variable.css'
import '@/styles/global.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import MyEmpty from '@/components/Empty'
import { setSessionStorage, getCookie } from '@/storage'
import setCssVars from '@/utils/setCssVars'
import { findSiteData } from '@wotu/wotu-components'
import styles from './index.module.less'

//@ts-ignore
import { getSiteInfoQZ } from './getSiteInfo'
import JobHeader from './JobHeader'
import JobFooter from './JobFooter'
import JobService from './JobService'

import packageInfo from '../../package.json'
import TrainHeader from './TrainHeader'
import TrainOrgHeader from './TrainOrgHeader'
import AssistanceHeader from './AssistanceHeader'

import MLHHeader from './MLH/Header'
import MLHFooter from './MLH/Footers'

const GlobalLayout = observer((props: IRoute) => {
    const { name: packageName } = packageInfo
    const { userStore, siteStore } = props || {}

    const pcDomain =
        findSiteData(siteStore.siteData || {}, 'pcDomain', { findKey: 'baseInfo' }) || ''
    const sid = findSiteData(siteStore.siteData || {}, 'sid', { findKey: 'baseInfo' }) || ''
    const alias = findSiteData(siteStore.siteData || {}, 'alias', { findKey: 'baseInfo' }) || ''

    // const jyAliasList = [
    //     'shqznlsx',
    //     'demoqznlsx',
    //     'hnqznlsx',
    //     'ynqznlsx',
    //     'qznlsz',
    //     'zjqznlsx',
    //     'cqqznlsx',
    //     'gzqznlsx',
    //     'ahqznlsx',
    //     'scqznlsx',
    //     'jlqznlsx',
    //     'hainanqznlsx',
    //     'gxqznlsx',
    //     'hbqznlsx',
    //     'jxqznlsx',
    //     'liaoningqznlsx',
    // ]

    /** 判断当前是否为就业站点 */
    const judgeIsJyAlias = (tempAlias: string) => {
        if (tempAlias === 'qznlsz') {
            return true
        } else {
            return tempAlias.includes('qznlsx')
        }
    }

    /** 判断当前是否是求职师资端 */
    const judgeIsSZAlise = (tempAlias: string) => {
        if (tempAlias === 'szqznlsz') {
            return true
        } else {
            return tempAlias.includes('szqznlsx')
        }
    }
    /** 判断当前是否是就业援助专题页面 */
    const judgeIsCP = () => {
        let result = false
        const tagIdList = findSiteData(siteStore.siteData || {}, 'tagIdList', { findKey: 'baseInfo' }) || ''
        if (tagIdList.includes(1)) {
            result = true
        }
        return result
    }


    /** 判断当前是否是就业援助专题页面 */
    const judgeIsAssistance = () => {
        let result = false
            ;['/assistance/'].forEach(item => {
                if (location.pathname.includes(item)) {
                    result = true
                }
            })
        return result
    }

    /** 需要使用创培 个人中心页头的网页 */
    const needTrainLayout = [
        '/job-center/admin/personal/personal-resume',
        '/employment-center/admin/personal/personal-resume',
        // 招聘单位管理
        '/employment-center/admin/company/recruiter-manage',
        // 职位管理
        '/employment-center/admin/company/position-manage',
        '/employment-center/admin/company/position-manage/edit',
        '/employment-center/admin/company/position-manage/create',
    ]

    const specialRouteNoLayout = [
        '/train-gateway/study',
        '/train-gateway/exam',
        '/train-gateway/selfcrouse',
        '/employment-center/admin/personal/attachment-resume',
        '/job-center/admin/personal/attachment-resume',
    ]

    const isTrainLayoutRoute = needTrainLayout.find(i => i === location.pathname)

    const isNoLayoutRoute = specialRouteNoLayout.find(i => location.pathname.includes(i))

    const [themeChanged, setThemeChanged] = useState(false)
    const [QZSiteData, setQZSiteData] = useState<any>({})

    const updateTheme = (themeColor: string = '#1890ff') => {
        setCssVars({ primaryColor: themeColor })
        ConfigProvider.config({
            prefixCls: packageName,
            theme: { primaryColor: themeColor },
        })
        setThemeChanged(true)
    }

    /**更新父应用信息 */
    useEffect(() => {
        setSessionStorage('PLATFORM', 'middle')
        const tempUpdateTheme = judgeIsAssistance()
            ? () => {
                updateTheme()
            }
            : updateTheme
        siteStore.getSiteData(tempUpdateTheme)
    }, [])

    /**更新父应用信息 */
    useEffect(() => {
        sid && getCookie('TOKEN') ? userStore.getUserData() : ''
    }, [getCookie('TOKEN'), sid])

    /**更新父应用信息 */
    useEffect(() => {
        sid && getCookie('SELECT_ORG_CODE') ? userStore.getOrganizationData() : ''
    }, [getCookie('SELECT_ORG_CODE'), sid])

    useEffect(() => {
        if (judgeIsJyAlias(alias) || judgeIsCP()) {
            getSiteInfoQZ(pcDomain).then((res: any) => {
                setQZSiteData(res)
            })
        }
    }, [alias])

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

    const getLayout = () => {
        if (judgeIsAssistance()) {
            return (
                <div
                    style={{
                        fontFamily:
                            "PingFangSC-regular, 思源黑体CN, Mircrosoft YaHei, Arial, 'sans-serif'",
                    }}
                >
                    <AssistanceHeader data={QZSiteData?.header} />
                    <div className={styles.content_middle}>{props.children}</div>
                    {/* @ts-ignore */}
                    {/* <AssistanceService data={QZSiteData?.rightSide} /> */}
                    <JobFooter data={QZSiteData?.footer} />
                </div>
            )
        } else if (judgeIsSZAlise(alias)) {
            return props.children
        } else if (judgeIsJyAlias(alias)) {
            if (isNoLayoutRoute) {
                return props.children
            } else {
                return (
                    <div
                        style={{
                            fontFamily:
                                "PingFangSC-regular, 思源黑体CN, Mircrosoft YaHei, Arial, 'sans-serif'",
                        }}
                    >
                        {isTrainLayoutRoute ? (
                            judgeIsUser(true) ? (
                                <TrainHeader />
                            ) : (
                                <TrainOrgHeader />
                            )
                        ) : (
                            <JobHeader data={QZSiteData?.header} />
                        )}
                        <div className={styles.content_middle}>{props.children}</div>
                        {/* @ts-ignore */}
                        <JobService data={QZSiteData?.rightSide} />
                        <JobFooter data={QZSiteData?.footer} />
                    </div>
                )
            }
        } else if (judgeIsCP()) { // 创培业务站点 马兰花
            return <div>
                <MLHHeader data={QZSiteData} />
                <div className={styles.content_middle}>{props.children}</div>
                <MLHFooter />
                <JobFooter data={QZSiteData?.footer} style={{ backgroundColor: '#1f2a3b' }}/>
            </div>
        } else {
            return props.children
        }
    }

    return (
        <ConfigProvider
            locale={zhCN}
            renderEmpty={MyEmpty as unknown as any}
            prefixCls={packageName}
        >
            {themeChanged ? getLayout() : null}
        </ConfigProvider>
    )
})

export default inject('userStore', 'siteStore')(GlobalLayout)
