import React, { useEffect } from 'react'
import styles from './index.module.less'
import { Input, Pagination, ConfigProvider } from 'antd'
import { inject, observer, useLocalObservable } from 'mobx-react'
import EnrollListStore from './store'
import type { IRoute } from 'umi'
import { debounce } from 'lodash'
import { SearchOutlined } from '@ant-design/icons'
// @ts-ignore
import { Empty, findSiteData, PTHistory } from '@wotu/wotu-components'
import classNames from 'classnames'
import { getSessionStorage } from '@/storage'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
// @ts-ignore
import { PTListLayout } from '@wotu/pt-components'

import packageInfo from '../../../package.json'
import type { ActivityPageFrontRespDto } from './interface'
import { Selection } from '@/components/FilterButton'

/**
 * @query category 活动分类指定
 * @query status 活动状态指定
 * 指定后 不展示项目筛选
 */
const EventList = (props: any) => {
    const { name: packageName } = packageInfo
    const {
        siteStore,
        location: { query },
    } = props
    // 指定项目类型
    const { category, status } = query || {}
    console.log(category, status)
    const platform = getSessionStorage('PLATFORM')
    const tag = getSessionStorage('PLATFORM')
    const store = useLocalObservable(() => new EnrollListStore())
    const sid = siteStore?.siteData?.data?.sid

    const initPage = async () => {
        // 获取站点门户报名活动列表
        await store.getActiveList()
        await store.getFilterOption()
        await store.getCityData(siteStore.siteData)
    }

    const getPageTitle = () => {
        const { portalData, siteData } = siteStore
        const portalCode = getPortalCodeFromUrl()
        const siteName = findSiteData(siteData, 'name', { findKey: 'baseInfo' }) || ''

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
            initPage()
        }
    }, [sid])

    const onSelectStatus = (e: string[]) => {
        store.onSelectStatus(e?.[0])
    }

    const onSelectCategory = (e: string[]) => {
        store.onSelectCategory(e?.[0])
    }

    const onSearch = (value: string) => {
        store.onSearch(value)
    }

    const DebounceSearch = debounce(onSearch, 300)

    const toDetail = (item: ActivityPageFrontRespDto) => {
        if (platform === 'middle') {
            PTHistory.push('history', `/event-detail?code=${item.code}`)
        } else {
            PTHistory.push('location', `/enroll-gateway/event-detail?code=${item.code}`)
        }
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
                    <img src={data.coverUrl || ''} onLoad={imgLoaded} />
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
        <ConfigProvider prefixCls={packageName}>
            <div className={classNames(styles.enroll_list, styles[`enroll_list_${tag}`])}>
                {/* <div className={styles.enroll_list_search_bar_wrapper}>
                    <div className={styles.enroll_list_search_bar}>
                        <Input.Search
                            placeholder="请输入关键字"
                            onSearch={DebounceSearch}
                            enterButton={
                                <>
                                    <SearchOutlined />
                                    搜索
                                </>
                            }
                            className={styles.search_bar_input}
                            size="large"
                            allowClear
                            loading={store.loading}
                        />
                    </div>
                </div> */}

                <div
                    className={[
                        styles.enroll_list_wrapper,
                        tag === 'portal' ? styles.enroll_list_wrapper_portal : '',
                    ].join(' ')}
                >
                    {/* <div className={[styles.enroll_list_screen].join(' ')}>
                        <div className={styles.filter_line}>
                            <div className={styles.filter_line_label}>分类：</div>
                            <div className={styles.filter_line_list}>
                                {store.categoryList.map((item: CategoryListItem) => {
                                    return (
                                        <div
                                            key={item.code}
                                            className={[
                                                styles.filter_line_list_item,
                                                store.catalogCode === item.code
                                                    ? styles.active
                                                    : '',
                                            ].join(' ')}
                                            onClick={() => {
                                                onSelectCategory(item.code)
                                            }}
                                        >
                                            {item.catalogName}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className={styles.filter_line_split} />

                        <div className={styles.filter_line}>
                            <div className={styles.filter_line_label}>状态：</div>
                            <div className={styles.filter_line_list}>
                                {store.statusList.map(item => {
                                    return (
                                        <div
                                            key={item.key}
                                            className={[
                                                styles.filter_line_list_item,
                                                store.activityStatus === item.key
                                                    ? styles.active
                                                    : '',
                                            ].join(' ')}
                                            onClick={() => {
                                                onSelectStatus(item.key)
                                            }}
                                        >
                                            {item.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div> */}

                    <div className={styles.enroll_list_main}>
                        <div className={styles.search_wrapper}>
                            <div className={styles.filter_wrapper}>
                                <Selection
                                    title="活动分类"
                                    type="radio"
                                    options={store.categoryList}
                                    value={store.catalogCode ? [store.catalogCode] : undefined}
                                    onChange={onSelectCategory}
                                    wrapperClassName={styles.select_wrapper}
                                    fieldNames={{
                                        label: 'catalogName',
                                        value: 'code',
                                    }}
                                />
                                <Selection
                                    title="活动状态"
                                    type="radio"
                                    options={store.statusList}
                                    value={
                                        store.activityStatus ? [store.activityStatus] : undefined
                                    }
                                    onChange={onSelectStatus}
                                    wrapperClassName={styles.select_wrapper}
                                    fieldNames={{
                                        label: 'name',
                                        value: 'key',
                                    }}
                                />
                                <Selection
                                    title="活动形式"
                                    type="radio"
                                    options={store.formList}
                                    wrapperClassName={styles.select_wrapper}
                                    value={store.activityFormList}
                                    onChange={val => store.changeActivityFormList(val)}
                                />
                                <Selection
                                    title="活动地区"
                                    type="radio"
                                    options={store.cityList}
                                    wrapperClassName={styles.select_wrapper}
                                    value={store.cityCode}
                                    onChange={val => store.onChangeArea(val)}
                                    fieldNames={{
                                        label: 'name',
                                        value: 'code',
                                    }}
                                />
                            </div>
                            <Input
                                onChange={e => store.changeSearch(e)}
                                className={styles.search_input_wrapper}
                                onPressEnter={() => DebounceSearch(store.activityName)}
                                placeholder="请输入关键词"
                                suffix={
                                    <div
                                        className={styles.search_button}
                                        onClick={() => DebounceSearch(store.activityName)}
                                    >
                                        <SearchOutlined />
                                    </div>
                                }
                            />
                        </div>
                        {store.activeList.length ? (
                            <PTListLayout
                                dataSource={store.activeList}
                                containerStyle={{ width: '1200px', margin: '0 auto' }}
                                numWithOneLine={3}
                                extraData={{
                                    onClickCard: () => {},
                                }}
                                itemRender={EventCard}
                                type="pc"
                                className={styles.pc_course_layout}
                                prefixCls={packageName}
                            />
                        ) : (
                            <Empty />
                        )}

                        <Pagination
                            showQuickJumper
                            defaultCurrent={1}
                            current={store.count}
                            total={store.totalCount}
                            pageSize={9}
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
    )
}

const ObserverEnrollList: IRoute = inject('userStore', 'siteStore')(observer(EventList))
ObserverEnrollList.title = '活动列表'
export default ObserverEnrollList
