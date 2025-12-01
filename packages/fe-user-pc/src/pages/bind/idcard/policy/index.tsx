import React from 'react'
import { observer } from 'mobx-react'
import type { IRoute } from 'umi'
import DefaultAgreement from '@/pages/user/agreement/components/DefaultAgreement'
import { AGREEMENT_TYPE } from '@/pages/user/agreement/const'
import styles from './index.module.less'
import Header from '@/components/Global/Header'
const Price = () => {


    return (
        <div className={styles.police}>
            <Header noUser={false} padding={false} showSetting={false} />
            <div className={styles.content}>

                <DefaultAgreement type={AGREEMENT_TYPE.REAL_NAME_AGREEMENT} />
            </div>
        </div>
    )
}

const ObserverPage: IRoute = observer(Price)
ObserverPage.title = '实名认证协议'
export default ObserverPage
