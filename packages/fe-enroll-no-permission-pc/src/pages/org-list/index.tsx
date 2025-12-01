import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import type { CascaderProps } from 'antd'
import { Input, Pagination, ConfigProvider, Cascader } from 'antd'
import { inject, observer, useLocalObservable } from 'mobx-react'
import EnrollListStore from './store'
import { cloneDeep, debounce } from 'lodash'
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
import OrgCard from '@/components/OrgCard'

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
    const { portalData, siteData } = siteStore
    const portalCode = getPortalCodeFromUrl()
    console.log(category, status)
    const platform = getSessionStorage('PLATFORM')
    const tag = getSessionStorage('PLATFORM')
    const store = useLocalObservable(() => new EnrollListStore())
    const sid = siteStore?.siteData?.data?.sid
    const [cityOptions, setCityOptions] = useState<CascaderProps[]>([])

    const initPage = async () => {
        // store.updateSelectOrg(siteStore?.portalData?.[portalCode])
        // 获取站点门户机构列表
        store.updateSiteData(siteStore?.siteData?.data)
        // await store.getSiteDetail()
        await store.getOrgList()
        // await store.getFilterOption()
        // await store.getCityData()
        const { province } = siteStore?.siteData?.data?.baseInfo || {}
        store.getCityListByParentCode(0).then((res: any) => {
            const result = (res || [])
                .map((item: any) => ({
                    label: item.name,
                    value: item.code,
                    level: item.level,
                    /** 不为叶子结点，可以请求下一级数据 */
                    isLeaf: false,
                }))
                .filter((i: any) => i.value === province || province === '0')

            setCityOptions(cloneDeep(result))
        })
    }

    const getPageTitle = () => {
        const siteName = findSiteData(siteData, 'name', { findKey: 'baseInfo' }) || ''

        switch (platform) {
            case 'portal':
                return `机构列表-${portalData?.[portalCode]?.organizationName}`
            default:
                return `机构列表-${siteName}`
        }
    }

    const onSelectCategory = (value: any) => {
        store.onSelectCategory(value)
    }

    useEffect(() => {
        document.title = getPageTitle()
    }, [siteStore.siteData, siteStore.portalData])

    useEffect(() => {
        if (sid) {
            initPage()

            if (category) {
                onSelectCategory(category)
            }
        }
    }, [sid])

    const onSearch = (value: string) => {
        store.onSearch(value)
    }

    const DebounceSearch = debounce(onSearch, 300)

    const toDetail = (item: ActivityPageFrontRespDto) => {
        if (platform === 'middle') {
            PTHistory.push('history', `/admissions?code=${item.code}`)
        } else {
            PTHistory.push('location', `/enroll-gateway/admissions?code=${item.code}`)
        }
    }

    /** 动态加载城市/区域*/
    const handleLoadCityData = (_selectedOptions: any[]) => {
        const { province, city, area } = siteStore?.siteData?.data?.baseInfo || {}
        const address = [province, city, area]
        const targetOption = _selectedOptions[_selectedOptions.length - 1]

        const { value, level: parentLevel } = targetOption

        // value不为空或者等级小于2才能获取下一级数据（只允许请求三级数据）
        if (value && parentLevel <= 2) {
            store.getCityListByParentCode(Number(value)).then((res: any) => {
                targetOption.children = (res || [])
                    .map((item: any) => ({
                        label: item.name,
                        value: item.code,
                        level: item.level,
                        // 第三级为叶子结点
                        isLeaf: parentLevel === 2,
                    }))
                    .filter(i => i.value === address[parentLevel] || address[parentLevel] === '0')

                const fillData = (list: any[]) => {
                    list.map(item => {
                        if (item?.children?.length > 0) {
                            fillData(item.children)
                        }
                        if (item.value === targetOption.value) {
                            item.children = targetOption.children
                        }
                    })
                }

                const tempCityOptions = cloneDeep(cityOptions)

                fillData(tempCityOptions)

                // 修改state 触发render，更新视图
                setCityOptions(tempCityOptions)
            })
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
                                <Cascader
                                    options={cityOptions}
                                    placeholder="地区"
                                    getPopupContainer={target => target.parentNode}
                                    loadData={handleLoadCityData}
                                    className={`${styles.cascader} ${
                                        store.address ? styles.actived : ''
                                    }`}
                                    onChange={onSelectCategory}
                                    displayRender={() => '地区'}
                                    changeOnSelect
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
                        {store.orgList.length ? (
                            <PTListLayout
                                dataSource={store.orgList}
                                containerStyle={{ width: '1200px', margin: '0 auto' }}
                                numWithOneLine={2}
                                extraData={{
                                    onClickCard: () => {},
                                }}
                                itemRender={(data: any) => {
                                    return <OrgCard data={data} onClick={() => toDetail(data)} />
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
                            pageSize={10}
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
ObserverEnrollList.title = '机构列表'
export default ObserverEnrollList
