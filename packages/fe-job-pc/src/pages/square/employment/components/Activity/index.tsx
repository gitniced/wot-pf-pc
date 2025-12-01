import styles from './index.module.less'
import { Col, Row } from 'antd'
import { inject, observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import SeeMore from '../../../components/SeeMore'
import { useEffect } from 'react'
import { Empty, findSiteData } from '@wotu/wotu-components'

const SelectedJob: React.FC<any> = props => {
    const { siteStore } = props || {}
    const store = useLocalObservable(() => new Store())

    const midDomain = findSiteData(siteStore.siteData, 'midDomain', { findKey: 'baseInfo' }) || ''

    const init = async () => {
        await store.getTabs()
    }

    useEffect(() => {
        init()
    }, [])

    const EventCard = (data: any) => {
        const imgLoaded = (e: any) => {
            const { target } = e || {}
            if (target.width > target.height) {
                target.setAttribute('width', 'auto')
                target.setAttribute('height', '100%')
            } else {
                target.setAttribute('width', '100%')
                target.setAttribute('height', 'auto')
            }
        }
        return (
            <div
                className={styles.event_card}
                onClick={() => {
                    location.href = `${midDomain}/enroll-gateway/event-detail?code=${data.code}`
                }}
            >
                <div className={styles.event_card_img_con}>
                    <img src={data.coverUrl || ''} onLoad={imgLoaded} />
                    <div
                        className={[
                            styles.event_status,
                            data.activityStatus?.toString?.() === '2'
                                ? styles.pending
                                : styles.no_pending,
                        ].join(' ')}
                    >
                        {data.activityStatusName}
                    </div>
                    <div className={styles.event_watch}>
                        <svg
                            className={['icon', styles.event_watch_svg].join(' ')}
                            aria-hidden="true"
                        >
                            <use xlinkHref="#Eye-open" />
                        </svg>
                        <div className={styles.event_watch_text}>{data.pvStr}人浏览</div>
                    </div>
                </div>

                <div className={styles.event_card_name}>{data.activityName}</div>

                <div className={styles.event_card_info}>
                    {data.dateDesc}
                    {data.cityDesc ? <span>{data.cityDesc}</span> : null}
                </div>
            </div>
        )
    }

    return (
        <>
            <div className={styles.selected_job}>
                <div className={styles.header}>
                    <div className={styles.tabs}>
                        {store.Tabs?.map((item: any) => {
                            return (
                                <span
                                    key={item.code}
                                    className={store.selectTab === item.code ? styles.active : ''}
                                    onClick={() => {
                                        store.setSelectTab(item.code)
                                    }}
                                >
                                    {item.catalogName}
                                </span>
                            )
                        })}
                    </div>
                    <SeeMore
                        text
                        onClick={() => {
                            location.href = `${midDomain}/enroll-gateway/event-list`
                        }}
                    />
                </div>
                <div className={styles.container}>
                    <Row className={styles.card_items} gutter={[24, 24]}>
                        {store.cardItems.length ? (
                            store.cardItems.map((item: any) => (
                                <Col key={item.code} span={8}>
                                    {EventCard(item)}
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

/** 热门活动 */
export default inject('siteStore')(observer(SelectedJob))
