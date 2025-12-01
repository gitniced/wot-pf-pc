import React, { useEffect, useState } from 'react'
import { findSiteData } from '@wotu/wotu-components'
import { inject, observer } from 'mobx-react'
import styles from './index.module.less'
import { getCookie } from '@/storage'

const Index = ({ data, siteStore, userStore }: any) => {
    const token = getCookie('TOKEN')
    const currentIdentity = getCookie('SELECT_IDENTITY_CODE')
    const isTeacher = ['11', '12'].includes(currentIdentity)
    const { siteData = {} } = siteStore
    const { userData = {}, organizationData = {} } = userStore

    const [aiUrl, setAiUrl] = useState('https://static.zpimg.cn/public/career/qz/ai_icon.png')
    const [hotUrl, setHotUrl] = useState('https://static.zpimg.cn/public/career/qz/hot_icon.png')
    const [open, setOpen] = useState(false)
    const [loginDropdown, setLoginDropdown] = useState(false)

    const midDomain =
        RUN_ENV === 'local'
            ? 'http://localhost:9061'
            : findSiteData(siteData, 'midDomain', { findKey: 'baseInfo' }) || ''
    const pcDomain = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) || ''
    const loginUrl = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) || ''
    const merchantUserDomain =
        findSiteData(siteData, 'merchantUserDomain', { findKey: 'baseInfo' }) || ''
    const _adminDomain = findSiteData(siteData, '_adminDomain', { findKey: 'baseInfo' }) || ''

    const aiList = [
        {
            id: '1',
            text: 'AI+智能简历',
            url: 'qz/aiJob/4',
        },
        {
            id: '2',
            text: 'AI+模拟面试',
            url: 'qz/aiJob/5',
        },
        {
            id: '3',
            text: 'AI+求职助手',
            url: 'qz/aiJob/6',
        },
        {
            id: '4',
            text: 'AI+职业导师',
            url: 'qz/aiJob/7',
        },
    ]

    const loginDdropdownList = [
        {
            id: '1',
            text: '我是学员',
            url: `${loginUrl}/account/user/login?logintype=1`,
            icon: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/career/qz/icon_xueyuan.png',
        },
        {
            id: '2',
            text: '我是讲师',
            url: `${merchantUserDomain}/teacher/job/login`,
            icon: 'https://static.zpimg.cn/public/career/qz/icon_jiangshi.png',
        },
        {
            id: '3',
            text: '我是机构',
            url: `${loginUrl}/account/user/login?logintype=2`,
            icon: 'https://static.zpimg.cn/public/career/qz/icon_jigou.png',
        },
        // {
        //     id: '4',
        //     text: '我是主管部门',
        //     url: `${adminDomain}/login`,
        //     icon: 'https://static.zpimg.cn/public/career/qz/icon_bm.png',
        // },
    ]

    useEffect(() => {}, [location.pathname])

    const toCenter = () => {
        const orgDomain = findSiteData(siteData, 'orgDomain', { findKey: 'baseInfo' })
        const lecturerDomain =
            findSiteData(siteData, 'lecturerDomain', { findKey: 'baseInfo' }) || ''
        if (isTeacher) {
            location.href = lecturerDomain
        } else {
            location.href = orgDomain
        }
    }

    const isAcitive = (url: string) => {
        const pictureRoute = ['/picture/list', '/picture/detail']
        const isPicture = pictureRoute.find(i => location.pathname.includes(i))
        // 在线报名相关页面
        const enrollList = [
            '/enroll-gateway/enroll-online-topic',
            '/enroll-gateway/org-list',
            '/enroll-gateway/enroll-detail',
            '/enroll-gateway/enroll-list',
            '/enroll-gateway/admissions',
            '/enroll-gateway/enroll-succeeded',
            '/enroll-gateway/my-enrollment',
        ]
        const isEnroll = enrollList.filter(path => location.pathname.includes(path)).length
        // 就业服务页面
        const isJob =
            !isEnroll &&
            (location.pathname.includes('/job-center/') ||
                location.pathname.includes('/enroll-gateway/') ||
                location.pathname.includes('/sign-center/'))
        const isTrain = location.pathname.includes('/train-gateway/')
        if (isPicture) {
            if (url.includes('/qz/policy')) {
                return true
            } else {
                return false
            }
        }
        if (isTrain) {
            if (url.includes('/train-gateway/gateway/careerAdvancement')) {
                return true
            } else {
                return false
            }
        }
        if (isJob) {
            if (url.includes('/job-center/square/')) {
                return true
            } else {
                return false
            }
        }
        if (isEnroll && enrollList.filter(path => url.includes(path)).length) {
            return true
        }
        return false
    }

    return (
        <div className={styles.job_header}>
            <div className={styles.top}>
                <div className={styles.logo}>
                    <img
                        src="https://static.zpimg.cn/public/career/qz/png_logo_qiuzhi.png"
                        alt=""
                    />
                    {data?.region ? (
                        <div className={styles.platform_select}>{data?.region}</div>
                    ) : undefined}
                </div>
                <div className={styles.login}>
                    {token ? (
                        <div className={styles.login_area} onClick={toCenter}>
                            <img
                                src={
                                    organizationData?.logo ||
                                    userData?.avatar ||
                                    'https://img-test.zpimg.cn/public_read/user_logo/17142331bhbnw83k.png'
                                }
                                alt=""
                            />
                            <div className={styles.login_area_info}>
                                <div>{organizationData?.name || userData?.name}</div>
                                {organizationData?.name && <div>{userData?.name}</div>}
                            </div>
                        </div>
                    ) : (
                        <div
                            className={styles.login_but}
                            onMouseEnter={() => {
                                setLoginDropdown(true)
                            }}
                            onMouseLeave={() => {
                                setLoginDropdown(false)
                            }}
                        >
                            <img
                                src="https://common.busionline.com/website-micro/dev/img/loginBtnImg3a835addecc6d6d4.41519ea6.png"
                                alt=""
                            />
                            请登录
                            <div
                                className={[
                                    styles.login_dropdown,
                                    loginDropdown
                                        ? styles.show_login_dropdown
                                        : styles.hide_login_dropdown,
                                ].join(' ')}
                            >
                                {loginDdropdownList?.map(item => (
                                    <div
                                        key={item.id}
                                        onClick={() => {
                                            window.open(item.url, '_self')
                                        }}
                                    >
                                        <img src={item.icon} alt="" />
                                        {item.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.nav}>
                {data?.menu?.map((item: any, index: number) => (
                    <div
                        key={item?.id}
                        className={[
                            styles.nav_item,
                            isAcitive(item?.url) ? styles.active : '',
                        ].join(' ')}
                        onMouseEnter={() => {
                            if (index.toString() === '2') {
                                setAiUrl(
                                    'https://static.zpimg.cn/public/career/qz/ai_icon_select.png',
                                )
                                setOpen(true)
                            }
                            if (index.toString() === '6') {
                                setHotUrl(
                                    'https://static.zpimg.cn/public/career/qz/hot_icon_select.png',
                                )
                            }
                        }}
                        onMouseLeave={() => {
                            if (index.toString() === '2') {
                                setAiUrl('https://static.zpimg.cn/public/career/qz/ai_icon.png')
                                setOpen(false)
                            }
                            if (index.toString() === '6') {
                                setHotUrl('https://static.zpimg.cn/public/career/qz/hot_icon.png')
                            }
                        }}
                        onClick={() => {
                            if ([0, 2, 5, 6, 7].includes(index)) {
                                window.open(`${pcDomain}${item?.url}`, '_self')
                            } else {
                                window.open(`${midDomain}${item?.url}`, '_self')
                            }
                        }}
                    >
                        {index.toString() === '2' && <img src={aiUrl} className={styles.ai} />}
                        {index.toString() === '6' && <img src={hotUrl} className={styles.hot} />}
                        {item?.title}

                        {index.toString() === '2' && open && (
                            <div className={styles.dropdown}>
                                <div>
                                    {aiList?.map((ele: any) => (
                                        <div
                                            key={ele?.id}
                                            onClick={e => {
                                                e.stopPropagation()
                                                window.open(`${pcDomain}/${ele?.url}`, '_self')
                                            }}
                                        >
                                            {ele?.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default inject('siteStore', 'userStore')(observer(Index))
