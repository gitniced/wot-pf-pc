import React, { useEffect } from 'react'
import styles from './index.module.less'
import { Input, Pagination, ConfigProvider } from 'antd'
import { inject, observer, useLocalObservable } from 'mobx-react'
import EnrollListStore from './store'
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
import { Selection } from '@/components/FilterClickButton'
import Enrollcard from '@/components/EnrollCard'
import Cascade from '@/components/Cascade'
import { ENROLL_PROJECT } from '@/types/enroll-const'

/**
 * @query type 指定报名项目类型
 *          -organization
 *          -reviews-plan
 *          -training-plan
 *          -training-class
 *          -career
 * 指定后 不展示项目筛选
 * @eg 指定展示机构报名列表: /enroll-list?type=organization
 * @eg 指定展示评价计划报名列表: /enroll-list?type=reviews-plan
 * @eg 指定展示培训计划报名列表: /enroll-list?type=training-plan
 * @eg 指定展示培训班级报名列表: /enroll-list?type=training-class
 * @eg 指定展示职业报名列表: /enroll-list?type=career
 */
const EventList = (props: any) => {
    const { name: packageName } = packageInfo
    const {
        siteStore,
        location: { query },
    } = props
    // 指定项目类型
    const { type: event_type } = query || {}
    const upcaseEventType = event_type?.toUpperCase?.()?.replace?.('-', '_') || ''
    const category = ENROLL_PROJECT?.[upcaseEventType]?.KEY || ''

    const { portalData, siteData } = siteStore
    const portalCode = getPortalCodeFromUrl()
    const platform = getSessionStorage('PLATFORM')
    const tag = getSessionStorage('PLATFORM')
    const store = useLocalObservable(() => new EnrollListStore())
    const sid = siteStore?.siteData?.data?.sid

    const initPage = async () => {
        store.updateSelectOrg(siteStore?.portalData?.[portalCode])
        // 获取站点门户报名活动列表
        store.updateSiteData(siteStore?.siteData?.data)
        await store.getSiteDetail()
        await store.getActiveList()
        await store.getFilterOption()
        await store.getCityData()
    }

    const hasQueryCate = store.ApplyProjectOptions.filter(item => item.value === Number(category))

    const getPageTitle = () => {
        const siteName = findSiteData(siteData, 'name', { findKey: 'baseInfo' }) || ''

        switch (platform) {
            case 'portal':
                return `报名列表-${portalData?.[portalCode]?.organizationName}`
            default:
                return `报名列表-${siteName}`
        }
    }

    useEffect(() => {
        document.title = getPageTitle()
    }, [siteStore.siteData, siteStore.portalData])

    const onSelectCategory = (e: string[]) => {
        store.onSelectCategory(e?.[0])
    }

    useEffect(() => {
        if (sid) {
            initPage()

            if (category) {
                onSelectCategory(category)
            }
        }
    }, [sid])

    const onSelectStatus = (e: string[]) => {
        store.onSelectStatus(e?.[0])
    }

    const onSearch = (value: string) => {
        store.onSearch(value)
    }

    const DebounceSearch = debounce(onSearch, 300)

    const toDetail = (item: ActivityPageFrontRespDto) => {
        if (platform === 'middle') {
            PTHistory.push('history', `/enroll-detail?code=${item.code}`)
        } else {
            PTHistory.push('location', `/enroll-gateway/enroll-detail?code=${item.code}`)
        }
    }

    return (
        <ConfigProvider prefixCls={packageName}>
            <div className={classNames(styles.enroll_list, styles[`enroll_list_${tag}`])}>
                <div
                    className={[
                        styles.enroll_list_wrapper,
                        tag === 'portal' ? styles.enroll_list_wrapper_portal : '',
                    ].join(' ')}
                >
                    <div className={styles.enroll_list_main}>
                        <div className={styles.search_wrapper}>
                            <div className={styles.filter_wrapper}>
                                {hasQueryCate?.length ? (
                                    <div className={styles.select_cate_text}>
                                        {hasQueryCate?.[0]?.label}
                                    </div>
                                ) : (
                                    <Selection
                                        title="报名项目"
                                        type="radio"
                                        options={store.ApplyProjectOptions}
                                        value={
                                            store.entryCodeInteger
                                                ? [store.entryCodeInteger]
                                                : undefined
                                        }
                                        onChange={onSelectCategory}
                                        wrapperClassName={styles.select_wrapper}
                                    />
                                )}
                                <Selection
                                    title="报名状态"
                                    type="radio"
                                    options={store.statusList}
                                    value={store.status ? [store.status] : undefined}
                                    onChange={onSelectStatus}
                                    wrapperClassName={styles.select_wrapper}
                                    fieldNames={{
                                        label: 'name',
                                        value: 'key',
                                    }}
                                />
                                {store.cateOpen && (
                                    <Cascade
                                        value={store.categoryId}
                                        onChange={val => store.changeCategoryId(val)}
                                    />
                                )}
                                {store.courseOpen && (
                                    <Selection
                                        title="课程"
                                        type="radio"
                                        options={store.courseList}
                                        value={store.cityCode}
                                        onChange={val => store.onChangeArea(val)}
                                        fieldNames={{
                                            label: 'name',
                                            value: 'id',
                                        }}
                                    />
                                )}
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
                                itemRender={(data: any) => {
                                    return <Enrollcard data={data} onClick={() => toDetail(data)} />
                                }}
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

const ObserverEnrollList: any = inject('userStore', 'siteStore')(observer(EventList))
ObserverEnrollList.title = '报名列表'
export default ObserverEnrollList
