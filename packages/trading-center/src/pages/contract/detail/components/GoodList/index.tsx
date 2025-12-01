import React from 'react'
import styles from './index.module.less'
import { Tooltip } from 'antd'
interface ContractGoodListType {
    list: any[]
}
const GoodList = ({ list = [] }: ContractGoodListType) => {
    const filterTaxRate = (taxrate: number | string) => {
        if (!taxrate && typeof taxrate !== 'number') return ''
        return Number(taxrate) * 100
    }
    const filterNum = (price: number | string) => {
        if (!price && typeof price !== 'number') return ''
        return Number(price).toFixed(2)
    }
    return (
        <div className={styles.contract_goods_list}>
            {list.map(item => {
                return (
                    <div key={item.code} className={styles.good_item}>
                        <div className={styles.img}>
                            <img src={item.imageUrl} />
                        </div>
                        <div className={styles.name}>
                            <div className={styles.title}>名称</div>

                            <Tooltip title={item.name}>
                                <div className={styles.value}>{item.name}</div>
                            </Tooltip>
                        </div>
                        <div className={styles.classify}>
                            <div className={styles.title}>商品分类</div>
                            <Tooltip title={item.name}>
                                <div className={styles.value}>
                                    {item.categoryList?.join('/') ?? '-'}
                                </div>
                            </Tooltip>
                        </div>
                        <div className={styles.rate}>
                            <div className={styles.title}>税率</div>
                            <div className={styles.value}>{filterTaxRate(item.taxRate)}%</div>
                        </div>
                        <div className={styles.price}>
                            <div className={styles.title}>单价</div>
                            <div className={styles.value}>￥{filterNum(item.price)}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default GoodList
