import styles from './index.module.less'
import { Col, Row } from 'antd'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import SeeMore from '../../../components/SeeMore'
import { useEffect } from 'react'
import { history } from 'umi'
import JobCard from '@/pages/square/components/JobCard'
import { Empty } from '@wotu/wotu-components'

const SelectedJob: React.FC = () => {
    const store = useLocalObservable(() => new Store())

    const init = async () => {
        store.getCardItems()
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <>
            <div className={styles.selected_job}>
                <div className={styles.header}>
                    <div className={styles.tabs}>
                        <span className={styles.active}>优质实习</span>
                    </div>
                    <SeeMore
                        text
                        onClick={() => {
                            history.push('/square/job-list?recruitType=3')
                        }}
                    />
                </div>
                <div className={styles.container}>
                    <Row className={styles.card_items} gutter={[24, 24]}>
                        {store.cardItems.length ? (
                            store.cardItems.map((item: any) => (
                                <Col key={item.code} span={8}>
                                    <JobCard type="mini" data={item} />
                                </Col>
                            ))
                        ) : (
                            <Empty className={styles.empty} />
                        )}
                    </Row>
                </div>
            </div>
        </>
    )
}

/** 优质实习 */
export default observer(SelectedJob)
