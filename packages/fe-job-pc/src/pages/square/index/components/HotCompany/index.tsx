import { observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import { Col, Row } from 'antd'
import SeeMore from '../../../components/SeeMore'
import { useEffect, useMemo } from 'react'
import Store from './store'
import CompanyCard from '@/pages/square/components/CompanyCard'
import { history } from 'umi'

const HotCompany: React.FC = () => {
    const store = useLocalObservable(() => new Store())

    useEffect(() => {
        store.getCardItems()
    }, [])

    const cardItems = useMemo(
        () => store.cardItems.filter(item => item.professionList?.length! > 0),
        [store.cardItems],
    )

    return (
        <div className={styles.hot_company}>
            <h2 className={styles.h2}>热门企业</h2>
            <Row className={styles.card_items} gutter={[24, 24]}>
                {cardItems.map(item => (
                    <Col key={item?.organizationSimpleDto?.code} span={8}>
                        <CompanyCard data={item} type="index" />
                    </Col>
                ))}
            </Row>
            <div className={styles.button_box}>
                <SeeMore onClick={() => history.push('/square/company-list')} />
            </div>
        </div>
    )
}

/** 热门企业 */
export default observer(HotCompany)
