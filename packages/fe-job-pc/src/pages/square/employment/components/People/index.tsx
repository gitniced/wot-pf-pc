import { observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import { Col, Row } from 'antd'
import { useEffect } from 'react'
import Store from './store'
import Card from './Card'

const HotCompany: React.FC = () => {
    const store = useLocalObservable(() => new Store())

    useEffect(() => {
        store.getCardItems()
    }, [])

    return (
        <div className={styles.hot_company}>
            <div className={styles.header}>
                <div className={styles.tabs}>
                    <span className={styles.active}>人力资源旗舰店</span>
                </div>
            </div>
            <Row className={styles.card_items} gutter={[24, 24]}>
                {store.cardItems.map(item => (
                    <Col key={item?.organizationSimpleDto?.code} span={4}>
                        <Card data={item.customContent} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

/** 人力资源旗舰店 */
export default observer(HotCompany)
