import React, { useEffect, useMemo } from 'react'
import Http from '@/servers/http'
import styles from './index.module.less'
// import { getPreferentialNameByType } from '@/pages/order/const'
interface AllPriceProps {
    /** 支付金额 */
    total: number | string
    /** 支付文案，默认支付总计 */
    text?: string
    /** 优惠价格 */
    preferential?: number | string
    /** 优惠类型 */
    preferentialType?: number
}
function AllPrice({
    total = 0,
    preferentialType = 0,
    preferential,
    text = '支付总计',
}: AllPriceProps) {
    const [preferentialList, setPreferentialList] = React.useState<any[]>([])

    const preferentialName = useMemo(() => {
        const target = preferentialList.find(
            item => item.type && item.type.toString() === preferentialType.toString(),
        ) || { desc: '' }
        return target.desc
    }, [preferentialList, preferentialType])

    // 组件加载时的副作用
    useEffect(() => {
        Http<any, any>('/order/backend/list_preferential_type', 'POST', {}).then(res => {
            if (res) {
                setPreferentialList(res)
            }
        })
    }, [])

    return (
        <div className={styles.price}>
            {/* 有优惠名称，就展示 */}
            {preferentialType ? (
                <div>
                    {preferentialName}：<span>￥{preferential}</span>
                </div>
            ) : null}
            <div>
                {text}：<span>￥{total}</span>
            </div>
        </div>
    )
}

export default AllPrice
