import React, { useEffect } from 'react'
import styles from './index.module.less'
import { Input, Pagination, ConfigProvider } from 'antd'
import { inject, observer, useLocalObservable } from 'mobx-react'
import EnrollListStore from './hooks'
import type { IRoute } from 'umi'
import { history } from 'umi'
// import { history } from 'umi'
import { SearchOutlined } from '@ant-design/icons'
import { Empty, findSiteData } from '@wotu/wotu-components'
import classNames from 'classnames'
import { getSessionStorage } from '@/storage'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import { PTListLayout, PTContentCard } from '@wotu/pt-components'
// import type { CategoryListItem } from './interface'

/**
 * @query category 资讯分类指定
 * 指定后 不展示项目筛选
 */
const PictureList = (props: any) => {
    const {
        siteStore,
        location: { query },
    } = props
    // 指定项目类型
    const { category, search } = query || {}
    const platform = getSessionStorage('PLATFORM')
    const tag = getSessionStorage('PLATFORM')
    const store = useLocalObservable(() => new EnrollListStore())
    const sid = siteStore?.siteData?.data?.sid

    const initPage = async () => {
        // await store.getFilterOption()
        if (!search && !category) {
            // 获取站点门户报名活动列表
            await store.getActiveList()
        } else {
            if (search && !category) {
                store.onSearch(search)
            }
            if (!search && category) {
                store.onSelectCategory(category)
            }
            if (search && category) {
                store.updateSearchParam({ title: search, categoryCodes: [category] })
            }
        }
    }

    const getPageTitle = () => {
        const { portalData, siteData } = siteStore
        const portalCode = getPortalCodeFromUrl()
        const siteName = findSiteData(siteData, 'name', { findKey: 'baseInfo' }) || ''

        switch (platform) {
            case 'portal':
                return `资讯列表-${portalData?.[portalCode]?.organizationName}`
            default:
                return `资讯列表-${siteName}`
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

    // const onSelectCategory = (e: string) => {
    //     store.onSelectCategory(e)
    // }

    const EventCard = (data: any) => {
        return (
            <PTContentCard
                layoutStyle={1}
                item={data}
                mode="pc"
                onClick={() => {
                    history.push(`/assistance/detail?code=${data.code}`)
                }}
            />
        )
    }

    return (
        <ConfigProvider>
            <div className={classNames(styles.enroll_list, styles[`enroll_list_${tag}`])}>
                <div className={styles.enroll_list_search_bar_wrapper}>
                    <div className={styles.enroll_list_search_bar}>
                        <Input.Search
                            height={48}
                            placeholder="请输入关键字"
                            value={store.searchStr}
                            onChange={store.onChange}
                            onSearch={store.onSearch}
                            enterButton={
                                <>
                                    <SearchOutlined />
                                    搜索
                                </>
                            }
                            className={styles.search_bar_input}
                            size="large"
                            allowClear
                            // loading={store.loading}
                        />
                    </div>
                </div>

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
                                            {item.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div> */}

                    <div className={styles.enroll_list_main} key={Math.random()}>
                        {store.activeList.length ? (
                            <PTListLayout
                                dataSource={store.activeList}
                                containerStyle={{ width: '1200px', margin: '0 auto' }}
                                numWithOneLine={1}
                                extraData={{
                                    onClickCard: () => {},
                                }}
                                itemRender={EventCard}
                                type="pc"
                                className={styles.pc_course_layout}
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
                            showTotal={(total, _range) => `共 ${total} 项`}
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

const ObserverPictureList: IRoute = inject('userStore', 'siteStore')(observer(PictureList))
ObserverPictureList.title = '资讯列表'
export default ObserverPictureList
