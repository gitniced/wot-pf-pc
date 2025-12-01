import React, { useEffect, useRef, useState } from 'react'
import Store from './store'
import { history, MicroAppWithMemoHistory } from 'umi'

import { inject, observer, useLocalObservable } from 'mobx-react'
import { findSiteData, getMapLoginUrl } from '@wotu/wotu-components'
import type siteStore from '@/stores/siteStore'
import type { UserStore } from '@/stores/userStore'
import DataOverview from './DataOverview'
import {
    PTWeather,
    PTMiniHeader,
    PTBlockBox,
    PTTodoList,
    PTSpace,
    PTGroup,
    PTUserInfo,
    PTCalendar,
    PTLesson,
    PTGrow,
    PTCaseCard,
    PTCarousel,
    PTCommonFunctions,
    PTCommonFunctionsEdit,
} from '@wotu/pt-components'
import styles from './index.module.less'
// import { useObservableAndTrue } from '@/utils/customHooks'
import { getNowType } from '@/utils/userUtils'
import { getCookie, getLocalStorage } from '@/storage'
import { isEmailSite } from '@/utils/isEmailSite'

const growCenter = PTGrow()

function Page({ userStore, siteStore }: { userStore: UserStore; siteStore: siteStore }) {
    const store = useLocalObservable(() => new Store(userStore))
    const { userData, sid: storeSid, selectedOrganization, defaultIdentity } = userStore
    const monthRef = useRef(() => {})
    const dayRef = useRef(() => {})
    const [showEmail, setShowEmail] = useState(false)

    // 获取站点业务线
    const tags =
        findSiteData(siteStore, 'tagIdList', {
            findKey: 'baseInfo',
        }) || []

    /* 是否有创培业务线 */
    const isTrain = tags.includes(1)

    /**
     * 登录域名
     */

    const getLoginUrl = () => {
        // 个人
        if (Number(userStore.type || 0) === 1) {
            const loginUrl = getMapLoginUrl({ type: 'storage', key: 'workSiteStore' })
                .replaceAll('/account/user/login', '')
                .replaceAll('/user/login', '')
            return loginUrl
        } else if (Number(userStore.type || 0) === 4) {
            // 个人中心资源方  讲师
            const loginUrl = findSiteData(siteStore, 'merchantUserDomain', {
                findKey: 'baseInfo',
            })
            return loginUrl
        }
    }

    /**
     *
     * @returns 用户名
     */
    const getUserCode = () => userStore?.userData?.code || getCookie('USER_CODE')

    const init = async () => {
        let sid = findSiteData(siteStore, 'sid') || ''
        let name = findSiteData(siteStore, 'name', { findKey: 'baseInfo' }) || ''
        setTimeout(() => {
            window.document.title = name ? `工作台-${name}` : `工作台`
        }, 1000)
        let { code: userCode } = userData
        let { userData: data } = getLocalStorage('USER_STORE')
        let code = data.code
        store.getIpCity()
        store.getMessage(sid, getUserCode() || userCode || code)
        let email = await isEmailSite()
        setShowEmail(email)
    }

    useEffect(() => {
        init()
    }, [])

    // useEffect(() => {
    //     let iframeDocument = document.getElementsByTagName('iframe')?.[0].contentDocument
    //     let cityHtml = iframeDocument?.getElementsByTagName?.('strong')?.[0] || <></>
    //     //@ts-ignore
    //     cityHtml?.innerHTML = store.cityName
    // }, [store.cityName])

    const judgeType = () => {
        return getNowType() === '1' || getNowType() === '4'
    }
    /* 
    监听 type的变化  和机构 code  身份的变化 
    如果是个人用户和中心个人 讲师 始终返回true  表示 如果identity 变化之后 才会去进行执行
    假设是机构 或者资源方 那么就同时监听 两个code
 */
    // useObservableAndTrue(
    //     (sid: string) => {
    //         store.updateSid(sid)
    //         store.onChangeOrganizationAndIdentity(organizationCode, identityCode).then(() => {
    //             store.initData(monthRef.current, dayRef.current)
    //         })
    //     },
    //     [judgeType() ? true : organizationCode, identityCode, store.sid],
    // )

    useEffect(() => {
        if (judgeType()) {
            if (defaultIdentity && storeSid) {
                //@ts-ignore
                store.updateSid(storeSid)
                store
                    .onChangeOrganizationAndIdentity(selectedOrganization, defaultIdentity)
                    .then(() => {
                        store.initData(monthRef.current, dayRef.current)
                    })
            }
        } else {
            if (selectedOrganization && defaultIdentity && storeSid) {
                //@ts-ignore
                store.updateSid(storeSid)
                store
                    .onChangeOrganizationAndIdentity(selectedOrganization, defaultIdentity)
                    .then(() => {
                        store.initData(monthRef.current, dayRef.current)
                    })
            }
        }
    }, [judgeType() ? true : selectedOrganization, defaultIdentity, storeSid])

    /**
     *  获取手机号
     *  @returns 手机号
     */
    const getMobile = () =>
        userStore?.userData?.mobile &&
        (`${userStore.userData.mobile.slice(0, 3)}****${userStore.userData.mobile.slice(
            -4,
        )}` as string)

    /**
     *
     * @returns 用户名
     */
    const getUserName = () => userStore?.userData?.nickname || (getMobile() as string)

    /**
     * 点击关闭走马灯
     */
    const handlerClick = () => {
        store.closeCarousel()
    }

    /**
     *  点击图片跳转url
     * @param url
     */
    const goToLink = (url: string) => {
        url && window.open(url)
    }

    /**
     * 点击事件 添加常用功能
     * 获取所有的待选数据
     */
    const addUsedPower = () => {
        store.getToDoAllList()
    }

    /**
     * 清空待选数据
     * 关闭弹窗
     */
    const clearOptions = () => {
        store.toBeSelectedData = null
    }

    /**
     * 常用功能的每个item点击事件
     * @param url 跳转的url
     */
    const clickGoToUrl = (url: string) => {
        history.push(url)
    }

    /**
     * 常用功能的提交事件
     * @param val
     */
    const onSubmitOk = (val: any[]) => {
        store.submitToDoList(val)
    }

    useEffect(() => {
        store.getAreaVisible()
    }, [store.nowIdentityViewComponents, store.carlVisible])

    const judgeUserStoreType = () => {
        return Number(userStore.type || 0) === 1 || Number(userStore.type || 0) === 4
    }
    /**
     * 个人卡片支持在锄禾控制每个身份是否展示（仅个人角色 1开启，同时关闭天气组件） //讲师也开启 4
     * 机构角色之间展示天气组件
     */
    const getUserOfWeather = () => {
        // 个人单点登录不展示个人信息
        const personalSSO = findSiteData(siteStore?.siteData || {}, 'login_personal_sso')?.value
        const showUserInfo =
            (personalSSO !== '1' && Number(userStore.type || 0) === 1) ||
            Number(userStore.type || 0) === 4

        if (judgeUserStoreType()) {
            if (store.nowIdentityViewComponents.length > 0) {
                return (
                    <>
                        {/* <PTGroup hide={store.isHideNowIdentityViewComponents('weather')}>
                            <div className={styles.weather}>
                                <PTWeather name={getUserName()} />
                            </div>
                        </PTGroup> */}
                        {showUserInfo && (
                            <PTGroup hide={store.isHideNowIdentityViewComponents('personalInfo')}>
                                <div style={{ marginBottom: 24 }}>
                                    <PTUserInfo
                                        userStore={userStore}
                                        siteStore={siteStore}
                                        loginUrl={getLoginUrl()}
                                        city={store.cityName}
                                        showEmail={showEmail}
                                    />
                                </div>
                            </PTGroup>
                        )}
                    </>
                )
            } else {
                return null
            }
        } else {
            return (
                <PTGroup hide={false}>
                    <div style={{ marginBottom: 24 }}>
                        <PTWeather name={getUserName()} />
                    </div>
                </PTGroup>
            )
        }
    }

    return (
        <div className={[styles.workbench, judgeUserStoreType() ? styles.personal : ''].join(' ')}>
            {getUserOfWeather()}
            <div className={styles.content}>
                <div className={styles.left_content}>
                    {/* 待办事项 */}
                    {!store.isHideNowIdentityViewComponents('todoList') ? (
                        <PTGroup
                            dataSource={store.toDoList || []}
                            hide={store.isHideNowIdentityViewComponents('todoList')}
                        >
                            {({
                                dataSource = [],
                                isEmpty,
                            }: {
                                dataSource?: any[]
                                isEmpty: boolean
                            }) => {
                                return (
                                    <>
                                        <PTBlockBox style={{ padding: '24px 0' }}>
                                            <PTMiniHeader
                                                title="待办事项"
                                                isEmpty={isEmpty}
                                                emptyText="暂无待办事项"
                                                style={{ padding: '0 24px' }}
                                            />
                                            {isEmpty ? (
                                                <> </>
                                            ) : (
                                                <>
                                                    <PTSpace height={4} />
                                                    <PTTodoList
                                                        dataSource={dataSource || []}
                                                        maxCount={30}
                                                    />
                                                </>
                                            )}
                                        </PTBlockBox>
                                    </>
                                )
                            }}
                        </PTGroup>
                    ) : null}

                    {/* 题库数据\培训数据\评价数据 */}
                    {/* 当数据返回为空数组时或者当前为创培站点时 隐藏数据概览 */}
                    {['questionData', 'dataOverview', 'trainingData'].map(item => {
                        let dataList = store.dataCardList[String(item)]
                        // console.log('item-数据概览', toJS(dataList))
                        if (dataList?.length) {
                            return (
                                <DataOverview
                                    key={item}
                                    title={store.componentNameMap[item]}
                                    dataList={dataList}
                                    hide={store.isHideNowIdentityViewComponents(item) || isTrain}
                                />
                            )
                        }
                    })}

                    {/* 我的日程卡片和我的班级 */}
                    {!store.isHideNowIdentityViewComponents('myClass') && isTrain ? (
                        <div className={styles.horizontal_layout}>
                            {/* 我的班级 */}
                            <div
                                className={styles.horizontal_layout_left}
                                style={
                                    store.isHideNowIdentityViewComponents('schedule')
                                        ? { width: '100%' }
                                        : {}
                                }
                            >
                                <PTGroup hide={store.isHideNowIdentityViewComponents('myClass')}>
                                    <PTBlockBox>
                                        <PTMiniHeader
                                            title="我的班级"
                                            isEmpty={false}
                                            emptyText="暂无数据"
                                        />
                                        <PTSpace height={24} />
                                        <MicroAppWithMemoHistory
                                            name="student-center"
                                            base="/student-center"
                                            url="/myClasses"
                                        />
                                    </PTBlockBox>
                                </PTGroup>
                            </div>
                            {/* 我的日程 */}
                            <div
                                className={styles.horizontal_layout_right}
                                style={
                                    store.isHideNowIdentityViewComponents('schedule')
                                        ? { width: '0' }
                                        : {}
                                }
                            >
                                <PTGroup hide={store.isHideNowIdentityViewComponents('schedule')}>
                                    <PTBlockBox>
                                        <PTMiniHeader
                                            title="我的日程"
                                            isEmpty={false}
                                            emptyText="暂无数据"
                                        />
                                        <PTSpace height={24} />
                                        <PTCalendar
                                            imageStyle={{ backgroundColor: '#fff' }}
                                            sourceMap={store.calenderNowMonthMap || {}}
                                            dataSource={store.calenderDataSource || []}
                                            onCheckMonth={(startTime: number, endTime: number) => {
                                                store.getCalenderNowMonthMap(startTime, endTime)
                                                monthRef.current = () =>
                                                    store.getCalenderNowMonthMap(startTime, endTime)
                                                // store.promiseTaskAdd(() => {
                                                //     store.getCalenderNowMonthMap(startTime, endTime)
                                                // })
                                            }}
                                            onCheckDay={(s: number, e: number) => {
                                                store.getNowDayCalender(s, e)
                                                dayRef.current = () => store.getNowDayCalender(s, e)
                                                // store.promiseTaskAdd(() => {
                                                //     store.getNowDayCalender(s, e)
                                                // })
                                            }}
                                            layout={
                                                store.isHideNowIdentityViewComponents('myClass')
                                                    ? 'horizontal'
                                                    : 'vertical'
                                            }
                                        />
                                    </PTBlockBox>
                                </PTGroup>
                            </div>
                        </div>
                    ) : (
                        <PTGroup hide={store.isHideNowIdentityViewComponents('schedule')}>
                            <PTBlockBox>
                                <PTMiniHeader
                                    title="我的日程"
                                    isEmpty={false}
                                    emptyText="暂无数据"
                                />
                                <PTSpace height={24} />
                                <PTCalendar
                                    imageStyle={{ backgroundColor: '#fff' }}
                                    sourceMap={store.calenderNowMonthMap || {}}
                                    dataSource={store.calenderDataSource || []}
                                    onCheckMonth={(startTime: number, endTime: number) => {
                                        store.getCalenderNowMonthMap(startTime, endTime)
                                        monthRef.current = () =>
                                            store.getCalenderNowMonthMap(startTime, endTime)
                                        // store.promiseTaskAdd(() => {
                                        //     store.getCalenderNowMonthMap(startTime, endTime)
                                        // })
                                    }}
                                    onCheckDay={(s: number, e: number) => {
                                        store.getNowDayCalender(s, e)
                                        dayRef.current = () => store.getNowDayCalender(s, e)
                                        // store.promiseTaskAdd(() => {
                                        //     store.getNowDayCalender(s, e)
                                        // })
                                    }}
                                    layout={
                                        isTrain
                                            ? store.isHideNowIdentityViewComponents('myClass')
                                                ? 'horizontal'
                                                : 'vertical'
                                            : 'horizontal'
                                    }
                                />
                            </PTBlockBox>
                        </PTGroup>
                    )}

                    {/* 创培培训数据卡片 */}
                    {!store.isHideNowIdentityViewComponents('customTrainingData') && isTrain ? (
                        <MicroAppWithMemoHistory
                            name="training-center"
                            base="/trading-center"
                            url="/home"
                        />
                    ) : null}

                    {/* 标杆案例无数据时 不展示区块 */}
                    {store.caseList?.length === 0 ? null : (
                        <PTGroup hide={store.isHideNowIdentityViewComponents('benchmark')}>
                            <PTCaseCard
                                dataSource={store.caseList || []}
                                moreClick={() => {
                                    history.push('/case/list')
                                }}
                                onItemClick={(code: string) => {
                                    history.push(`/case/detail?code=${code}`)
                                }}
                            />
                        </PTGroup>
                    )}
                    {/* 成长中心无数据时 不展示区块 */}
                    {store.lessonList?.length === 0 ? null : (
                        <PTGroup
                            hide={store.isHideNowIdentityViewComponents('development')}
                            dataSource={store.lessonList || []}
                        >
                            {({ dataSource, isEmpty }) => {
                                return (
                                    <PTBlockBox>
                                        <PTMiniHeader
                                            title="成长中心"
                                            isEmpty={isEmpty}
                                            emptyText="暂无数据"
                                        />
                                        {isEmpty ? (
                                            <> </>
                                        ) : (
                                            <>
                                                <PTSpace height={24} />
                                                <div className={styles.lesson_group}>
                                                    {dataSource?.map((item, index) => {
                                                        return (
                                                            <PTLesson
                                                                key={item?.code || index}
                                                                label={
                                                                    item?.customContent?.videoTitle
                                                                }
                                                                image={
                                                                    item?.customContent
                                                                        ?.videoImage?.[0]?.url
                                                                }
                                                                onClick={() => {
                                                                    growCenter.show({
                                                                        touchClose: false,
                                                                        playerProps: {
                                                                            width: 800,
                                                                            height: 600,
                                                                            src:
                                                                                item?.customContent
                                                                                    ?.videoUrl ||
                                                                                '',
                                                                        },
                                                                    })
                                                                }}
                                                            />
                                                        )
                                                    })}
                                                </div>
                                            </>
                                        )}
                                    </PTBlockBox>
                                )
                            }}
                        </PTGroup>
                    )}
                </div>

                {store.rightVisible ? (
                    <div className={styles.right_content}>
                        <div
                            style={{
                                marginBottom:
                                    store.carlVisible && store.carouselData?.length !== 0 ? 24 : 0,
                            }}
                            className={styles.swiper}
                        >
                            {/* 走马灯 轮播图*/}
                            <PTGroup hide={store.isHideNowIdentityViewComponents('advertisement')}>
                                {store.carlVisible && store.carouselData?.length !== 0 ? (
                                    <PTCarousel
                                        datas={store.carouselData}
                                        onCancel={handlerClick}
                                        goToLink={goToLink}
                                    />
                                ) : (
                                    <></>
                                )}
                            </PTGroup>
                        </div>
                        {/* 个人用户没有常用功能 */}
                        {judgeUserStoreType() ? null : (
                            <div>
                                {/* 常用功能 */}
                                <PTGroup
                                    hide={store.isHideNowIdentityViewComponents('commonFunction')}
                                >
                                    {/* 常用功能 */}
                                    <PTCommonFunctions
                                        onAdd={addUsedPower}
                                        datas={store.commonlyUsedData}
                                        handleClick={clickGoToUrl}
                                    />
                                </PTGroup>
                                {/* Modal */}
                                <PTCommonFunctionsEdit
                                    optionsData={store.toBeSelectedData}
                                    setOptionsData={clearOptions}
                                    onSubmit={(v: any[]) => onSubmitOk(v)}
                                />
                            </div>
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    )
}

const ObserverLayout = inject('userStore', 'siteStore')<any>(observer(Page))

ObserverLayout.title = '工作台'

export default ObserverLayout
