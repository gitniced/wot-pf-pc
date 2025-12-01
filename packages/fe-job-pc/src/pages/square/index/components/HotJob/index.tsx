import styles from './index.module.less'
import { Col, Row, Tabs } from 'antd'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import { useEffect } from 'react'
import JobCard from '../../../components/JobCard'
import SeeMore from '../../../components/SeeMore'
import { history } from 'umi'
import { Empty } from '@wotu/wotu-components'

const SelectedJob: React.FC = () => {
    const store = useLocalObservable(() => new Store())

    const init = async () => {
        await store.getJobType()
        const id = store.jobTypeOptions[0]?.key
        id && store.getCardItems(id)
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <div className={styles.selected_job}>
            <h2 className={styles.h2}>热招职位</h2>
            <div className={styles.container}>
                <div className={styles.content}>
                    <Tabs
                        className={styles.tabs}
                        items={store.jobTypeOptions}
                        onChange={store.getCardItems}
                    />
                    <Row className={styles.card_items} gutter={[23, 23]}>
                        {store.cardItems.length ? (
                            store.cardItems.map(item => (
                                <Col key={item.code} span={8}>
                                    <JobCard type="mini" data={item} />
                                </Col>
                            ))
                        ) : (
                            <Empty className={styles.empty} text=" " />
                        )}
                    </Row>
                </div>
                {store.cardItems.length ? (
                    <div className={styles.button_box}>
                        <SeeMore onClick={() => history.push('/square/job-list')} />
                    </div>
                ) : null}
            </div>
        </div>
    )
}

/** 热招职位 */
export default observer(SelectedJob)
