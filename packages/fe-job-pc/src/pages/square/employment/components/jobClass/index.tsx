import { observer, useLocalObservable } from 'mobx-react'
import { SearchOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useEffect } from 'react'
import Store from './store'
import { CaretRightOutlined } from '@ant-design/icons'
import { Carousel, Input, Pagination } from 'antd'
import MenuSub from './MenuSub'

interface Props {
    onSearch: (val: string) => void
    defaultValue?: string
}

const JobClass: React.FC<Props> = ({ onSearch, defaultValue }) => {
    const store = useLocalObservable(() => new Store())

    const jump = (url: string) => {
        if (url) window.open(url)
    }

    useEffect(() => {
        store.getJobOptions()
        store.getRecommend()
        store.getRecommendPage()
    }, [])

    return (
        <div className={styles.top}>
            <div className={styles.search_wrap}>
                <div className={styles.search_box}>
                    <Input.Search
                        className={styles.search}
                        placeholder="请输入搜索关键词"
                        allowClear
                        enterButton={
                            <>
                                <SearchOutlined className={styles.icon} />
                                <span className={styles.text}>搜索</span>
                            </>
                        }
                        size="large"
                        onSearch={onSearch}
                        defaultValue={defaultValue}
                    />
                    <div className={styles.hot}>
                        {store.recommendpage?.map(item => {
                            return (
                                <span
                                    key={item}
                                    onClick={() => {
                                        onSearch(item)
                                    }}
                                >
                                    {item}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={styles.job_class}>
                <div className={styles.left}>
                    <div className={styles.options}>
                        {store.jobOptions?.data?.map((option: any) => (
                            <div className={styles.option} key={option.code}>
                                <div className={styles.title}>{option.name}</div>
                                <div className={styles.items}>
                                    {option.childList?.[0]?.childList
                                        ?.slice(0, 8)
                                        ?.map((item: any) => (
                                            <div key={item.code} className={styles.item}>
                                                {item.name}
                                            </div>
                                        ))}
                                </div>
                                <CaretRightOutlined width={5} height={8} className={styles.icon} />
                                <MenuSub option={option} />
                            </div>
                        ))}
                    </div>
                    <div className={styles.pagination_box}>
                        <Pagination
                            size="small"
                            className={styles.pagination}
                            current={store.jobOptions?.currentPage}
                            pageSize={6}
                            total={store.jobOptions?.totalCount}
                            onChange={pageNo => store.setJobParams({ pageNo })}
                        />
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.img_box} style={{ width: 535 }}>
                        <Carousel autoplay>
                            {store.recommend?.map((item: any) => {
                                return (
                                    <img
                                        key={item.id}
                                        className={styles.main_image}
                                        src={item?.url}
                                        onClick={() => jump(item?.jumpUrl)}
                                    />
                                )
                            })}
                        </Carousel>
                    </div>
                    <div className={styles.auxiliary_images}>
                        <div className={styles.img_box}>
                            <img
                                className={styles.auxiliary_image}
                                src={store.lastSecondrecommend?.url}
                                onClick={() => jump(store.lastSecondrecommend?.jumpUrl)}
                            />
                        </div>
                        <div className={styles.img_box}>
                            <img
                                className={styles.auxiliary_image}
                                src={store.lastRecommend?.url}
                                onClick={() => jump(store.lastRecommend?.jumpUrl)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/** 职业分类 */
export default observer(JobClass)
