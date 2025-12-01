import React, { useEffect } from 'react'
import { useLocalObservable, observer } from 'mobx-react'
import CustomTitle from '@/components/CustomTitle'
import type { IRoute } from 'umi'
import GoodsList from './components/GoodList'
import styles from './index.module.less'
import ContractDetailStore from './store'
import MiniTitle from '@/components/Order/Minititle'
import DisplayFormLayout from '@/components/DisplayFormLayout'
import type { DataType } from '@/components/DisplayFormLayout/interface'

const ContractDetail = (props: IRoute) => {
    const store = useLocalObservable(() => new ContractDetailStore())
    const init = () => {
        const { query = {} } = props.location || {}
        /**
         * code 合同详情编码
         */
        const { code } = query
        store.getContractDetail(code)
        store.getContractGoodsList(code)
    }
    useEffect(() => {
        init()
    }, [])
    /** 获取基本信息字段 */
    const getBaseInfoList = (): DataType[] => {
        return [
            {
                label: '合同编号',
                value: store.contractDetail.contractNo,
            },
            {
                label: '合同类型',
                value: store.contractDetail.typeName,
            },
            {
                label: '签订时间',
                timeStamp: true,
                value: store.contractDetail.contractStart,
            },
            {
                label: '区域',
                value: `${store.contractDetail.provinceName}/${store.contractDetail.cityName}`,
            },
            {
                label: '甲方名称',
                value: store.contractDetail.partyA,
            },
            {
                label: '甲方签字人',
                value: store.contractDetail.partyASign,
            },
            {
                label: '乙方名称',
                value: store.contractDetail.partyB,
            },
            {
                label: '乙方签字人',
                value: store.contractDetail.partyBSign,
            },
        ]
    }
    /** 获取合同信息字段 */
    const getContractList = (): DataType[] => {
        return [
            {
                label: '合同有效期',
                timeStamp: true,
                value: store.contractDetail.contractEnd,
            },
            {
                label: '结算标准',
                value: store.contractDetail.settleStandardName,
            },
            {
                label: '服务周期',
                timeStamp: true,
                value: [store.contractDetail.serviceStart, store.contractDetail.serviceEnd],
            },
            {
                label: '结算方式',
                value: store.contractDetail.settleTypeName,
            },
            {
                label: '合作优惠',
                value: store.contractDetail.preferential,
            },
        ]
    }
    return (
        <div className={styles.contract_detail}>
            <CustomTitle title="合同详情" marginBottom={32} />
            <MiniTitle title="基本信息" />
            <DisplayFormLayout data={getBaseInfoList()} />
            <MiniTitle title="合同信息" titleStyles={{ marginTop: '48px' }} />
            <DisplayFormLayout data={getContractList()} />
            {store.contractGoods?.length > 0 && (
                <>
                    <MiniTitle title="产品信息" titleStyles={{ marginTop: '48px' }} />
                    <GoodsList list={store.contractGoods} />
                </>
            )}
        </div>
    )
}

export default observer(ContractDetail)
