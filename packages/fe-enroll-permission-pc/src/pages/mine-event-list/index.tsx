import React, { useEffect } from 'react'
import styles from './index.module.less'
import { Pagination, ConfigProvider } from 'antd'
import { inject, observer, useLocalObservable } from 'mobx-react'
import EnrollListStore from './store'
import type { IRoute } from 'umi'
// @ts-ignore
import { Empty, findSiteData } from '@wotu/wotu-components'
import classNames from 'classnames'
import { getSessionStorage } from '@/storage'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'

import packageInfo from '../../../package.json'
import type { ActivityPageFrontRespDto } from '../event-list/interface'
import CustomTitle from '@/components/CustomTitle'

/**
 * @query category 活动分类指定
 * @query status 活动状态指定
 * 指定后 不展示项目筛选
 */
const EventList = (props: any) => {
    const { name: packageName } = packageInfo
    const { siteStore } = props
    // 指定项目类型
    const platform = getSessionStorage('PLATFORM')
    const tag = getSessionStorage('PLATFORM')
    const store = useLocalObservable(() => new EnrollListStore())
    const sid = siteStore?.siteData?.data?.sid

    const getPageTitle = () => {
        const { portalData, siteData } = siteStore
        const portalCode = getPortalCodeFromUrl()
        const siteName = findSiteData(siteData, 'name', { findKey: 'baseInfo' })

        switch (platform) {
            case 'portal':
                return `活动列表-${portalData?.[portalCode]?.organizationName}`
            default:
                return `活动列表-${siteName}`
        }
    }

    useEffect(() => {
        document.title = getPageTitle()
    }, [siteStore.siteData, siteStore.portalData])

    useEffect(() => {
        if (sid) {
            store.getActiveList()
        }
    }, [sid])

    const toDetail = (item: ActivityPageFrontRespDto) => {
        const { siteData } = siteStore
        const midDomain = findSiteData(siteData, 'midDomain', { findKey: 'baseInfo' })
        window.location.href = `${midDomain}/enroll-gateway/event-detail?code=${item.code}`
    }

    const EventCard = (data: ActivityPageFrontRespDto) => {
        const imgLoaded = (e: any) => {
            const { target } = e || {}
            if (target.width > target.height) {
                target.setAttribute('width', 'auto')
                target.setAttribute('height', '100%')
            } else {
                target.setAttribute('width', '100%')
                target.setAttribute('height', 'auto')
            }
        }
        return (
            <div
                key={data.code}
                className={styles.event_card}
                onClick={() => {
                    toDetail(data)
                }}
            >
                <div className={styles.event_card_img_con}>
                    <img src={data.coverUrl!} onLoad={imgLoaded} />
                    <div
                        className={[
                            styles.event_status,
                            data.activityStatus?.toString?.() === '2'
                                ? styles.pending
                                : styles.no_pending,
                        ].join(' ')}
                    >
                        {data.activityStatusName}
                    </div>
                    <div className={styles.event_watch}>
                        <svg
                            className={['icon', styles.event_watch_svg].join(' ')}
                            aria-hidden="true"
                        >
                            <use xlinkHref="#Eye-open" />
                        </svg>
                        <div className={styles.event_watch_text}>{data.pvStr}人浏览</div>
                    </div>
                </div>

                <div className={styles.event_card_name}>{data.activityName}</div>

                <div className={styles.event_card_info}>
                    {data.dateDesc}
                    {data.activityForm?.toString?.() === '0' ? (
                        <div>线上活动</div>
                    ) : data.cityDesc ? (
                        <div>{data.cityDesc}</div>
                    ) : null}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <CustomTitle title="我的活动" marginBottom={8} />
            <ConfigProvider prefixCls={packageName}>
                <div className={classNames(styles.enroll_list, styles[`enroll_list_${tag}`])}>
                    <div
                        className={[
                            styles.enroll_list_wrapper,
                            tag === 'portal' ? styles.enroll_list_wrapper_portal : '',
                        ].join(' ')}
                    >
                        <div className={styles.enroll_list_main} key={Math.random()}>
                            {/* {store.activeList.length ? (
                                <PTListLayout
                                    dataSource={store.activeList}
                                    containerStyle={{ width: '100%', margin: '0 auto' }}
                                    numWithOneLine={5}
                                    itemRender={EventCard}
                                    type="pc"
                                    className={styles.pc_event_list_layout}
                                    prefixCls={packageName}
                                    extraData={{ width: '100%' }}
                                />
                            ) : (
                                <Empty />
                            )} */}
                            {store.activeList.length ? (
                                <div className={styles.pc_event_list_layout}>
                                    {store.activeList.map(item => EventCard(item))}
                                </div>
                            ) : (
                                <Empty />
                            )}
                            <Pagination
                                showQuickJumper
                                defaultCurrent={1}
                                current={store.count}
                                total={store.totalCount}
                                pageSizeOptions={[8, 16, 32, 48]}
                                onChange={(current, pageSize) => {
                                    store.updateSearchParam({
                                        pageSize,
                                        pageNo: current,
                                    })
                                }}
                            />
                        </div>
                    </div>
                </div>
            </ConfigProvider>
        </div>
    )
}

const ObserverEnrollList: IRoute = inject('userStore', 'siteStore')(observer(EventList))
ObserverEnrollList.title = '活动列表'
export default ObserverEnrollList
