import { observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import { Col, Row } from 'antd'
import SeeMore from '../../../components/SeeMore'
import { useEffect } from 'react'
import Store from './store'
import { history } from 'umi'
import Card from './Card'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const HotCompany: React.FC = () => {
    const store = useLocalObservable(() => new Store())

    useEffect(() => {
        store.getCardItems()
    }, [])

    return (
        <div className={styles.hot_company}>
            <div className={styles.header}>
                <div className={styles.tabs}>
                    <span className={styles.active}>名企推荐</span>
                </div>
                <SeeMore
                    text
                    onClick={() => {
                        history.push('/square/company-list')
                    }}
                />
            </div>
            <div className={styles.content}>
                <div
                    className={styles.arrow_left}
                    onClick={() => {
                        store.setTranslateX(0)
                    }}
                >
                    <LeftOutlined />
                </div>

                <div className={styles.wrap}>
                    <div
                        className={styles.card_items}
                        style={{ transform: `translateX(${store.translateX}px)` }}
                    >
                        <Row gutter={[24, 24]}>
                            {store.cardItems.map(item => (
                                <Col key={item?.organizationSimpleDto?.code} span={3}>
                                    <Card data={item} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>

                <div
                    className={styles.arrow_right}
                    onClick={() => {
                        store.setTranslateX(-1200)
                    }}
                >
                    <RightOutlined />
                </div>
            </div>
        </div>
    )
}

/** 热门企业 */
export default observer(HotCompany)
