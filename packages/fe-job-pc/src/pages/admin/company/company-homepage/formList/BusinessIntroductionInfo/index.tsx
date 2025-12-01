import { observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import { useEffect } from 'react'
import Store from './store'
import PageTitle from '../../components/PageTitle'
import { Descriptions } from 'antd'

const BusinessIntroductionInfo: React.FC = () => {
    const store = useLocalObservable(() => new Store())

    useEffect(() => {
        store.getBusinessIntroductionInfo()
    }, [])

    return (
        <div className={styles.business_introduction_info}>
            <PageTitle title="工商信息" />
            <Descriptions
                contentStyle={{
                    color: 'rgba(0, 0, 0, 0.65)',
                    paddingRight: '12px'
                }}
            >
                <Descriptions.Item label="公司名称">{store.businessIntroductionInfo.companyName}</Descriptions.Item>
                <Descriptions.Item label="法定代表人">{store.businessIntroductionInfo.legalRepresentative}</Descriptions.Item>
                <Descriptions.Item label="统一社会信用代码">{store.businessIntroductionInfo.unifiedSocialCreditCode}</Descriptions.Item>
                <Descriptions.Item label="注册地址">{store.businessIntroductionInfo.registeredAddress}</Descriptions.Item>
                <Descriptions.Item label="注册资金">{store.businessIntroductionInfo.registeredCapital}</Descriptions.Item>
            </Descriptions>
        </div >
    )
}

/** 工商信息 */
export default observer(BusinessIntroductionInfo)