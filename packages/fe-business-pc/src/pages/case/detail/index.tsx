import React, { useEffect } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import type { IRoute } from 'umi'
import { useLocation } from 'umi'
import CaseStore from '../store'
import { PTCaseDetail } from '@wotu/pt-components'
import { Breadcrumb } from 'antd'
import styles from './index.module.less'
const Page = () => {
    const store = useLocalObservable(() => new CaseStore())
    const { query } = useLocation()
    useEffect(() => {
        setTimeout(() => {
            document.title = '案例详情'
        }, 1000)
        store.getImageTextDetail(query?.code)
    }, [])
    return (
        <div className={styles.page}>
            <Breadcrumb>
                <Breadcrumb.Item href="/case/list">标杆案例</Breadcrumb.Item>
                <Breadcrumb.Item href="">案例详情</Breadcrumb.Item>
            </Breadcrumb>
            <PTCaseDetail data={store.imageTextDetail} />
        </div>
    )
}

const ObserverPage: IRoute = observer(Page)
ObserverPage.title = '案例详情'
export default ObserverPage
