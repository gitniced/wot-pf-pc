import styles from './index.module.less'
import { Col, Popover, Row, Tabs } from 'antd'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import SeeMore from '../../../components/SeeMore'
import Api from '../../../api'
import { useEffect } from 'react'
import { history } from 'umi'
import JobCard from '@/pages/square/components/JobCard'
import { Empty } from '@wotu/wotu-components'

const SelectedJob: React.FC = () => {
    const store = useLocalObservable(() => new Store())

    const init = async () => {
        await store.getJobExpectList()
        store.getCardItems()
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <>
            {store.jobExpectList.length ? (
                <div className={styles.selected_job}>
                    <h2 className={styles.h2}>精选职位</h2>
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <div className={styles.tab_box}>
                                <Tabs
                                    items={[
                                        { label: '精选职位', key: Api.choicesList },
                                        { label: '最新职位', key: Api.newList },
                                    ]}
                                    className={styles.tabs}
                                    onChange={store.setApiURL}
                                />
                                <div className={styles.info}>
                                    <span>根据求职意向匹配推荐：</span>
                                    <Popover
                                        placement="bottom"
                                        content={store.jobExpectList.map((item: any) => (
                                            <div
                                                className={styles.selected_job_item}
                                                key={item?.code}
                                                onClick={() => store.setJobExpectCurrent(item)}
                                            >
                                                {item?.capacityName}
                                            </div>
                                        ))}
                                    >
                                        <div className={styles.trigger}>
                                            {store.jobExpectCurrent.capacityName}
                                            <svg className={`icon ${styles.icon}`}>
                                                <use xlinkHref={'#ic_xialajiantou'} />
                                            </svg>
                                        </div>
                                    </Popover>
                                </div>
                            </div>
                        </div>
                        <Row className={styles.card_items} gutter={[23, 23]}>
                            {store.cardItems.length ? (
                                store.cardItems.map((item: any) => (
                                    <Col key={item.code} span={8}>
                                        <JobCard type="mini" data={item} />
                                    </Col>
                                ))
                            ) : (
                                <Empty
                                    size="small"
                                    className={styles.empty}
                                    text="根据您的求职意向，暂未找到适合您的职位，您可以前往搜索感兴趣的职位"
                                />
                            )}
                        </Row>
                        {store.cardItems.length ? (
                            <div className={styles.button_box}>
                                <SeeMore
                                    onClick={() =>
                                        history.push(
                                            `/square/job-list?professionTypeId=${store.jobExpectCurrent?.capacityId}`,
                                        )
                                    }
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : null}
        </>
    )
}

/** 精选职位 */
export default observer(SelectedJob)
