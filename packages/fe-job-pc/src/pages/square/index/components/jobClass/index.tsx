import { observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import { useEffect } from 'react'
import Store from './store'
import { CaretRightOutlined } from '@ant-design/icons'
import { Pagination } from 'antd'
import { history } from 'umi'
import MenuSub from './MenuSub'

const JobClass: React.FC = () => {
    const store = useLocalObservable(() => new Store())

    useEffect(() => {
        store.getJobOptions()
        store.getRecommend()
    }, [])

    return (
        <div className={styles.job_class}>
            <div className={styles.left}>
                <div className={styles.options}>
                    {store.jobOptions?.data?.map((option: any) => (
                        <div className={styles.option} key={option.code}>
                            <div className={styles.title}>{option.name}</div>
                            <div className={styles.items}>
                                {option.childList?.[0]?.childList?.slice(0, 8)?.map((item: any) => (
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
                <div className={styles.img_box}>
                    <img
                        className={styles.main_image}
                        src={store.recommend[2]?.url}
                        onClick={() =>
                            history.push(
                                `/square/job-list?professionTypeId=${store.recommend[0]?.id}`,
                            )
                        }
                    />
                </div>
                <div className={styles.auxiliary_images}>
                    <div className={styles.img_box}>
                        <img
                            className={styles.auxiliary_image}
                            src={store.recommend[1]?.url}
                            onClick={() =>
                                history.push(
                                    `/square/job-list?professionTypeId=${store.recommend[1]?.id}`,
                                )
                            }
                        />
                    </div>
                    <div className={styles.img_box}>
                        <img
                            className={styles.auxiliary_image}
                            src={store.recommend[0]?.url}
                            onClick={() =>
                                history.push(
                                    `/square/job-list?professionTypeId=${store.recommend[2]?.id}`,
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

/** 职业分类 */
export default observer(JobClass)
