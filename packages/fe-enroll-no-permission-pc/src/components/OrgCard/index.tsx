import React from 'react'
import styles from './index.module.less'

export default function OrgCard({ data, onClick }: any) {
    const { logo, provinceName, cityName, areaName, name, industryList, applyCount } = data
    return (
        <div className={styles.org_card_wrapper} onClick={() => onClick(data)}>
            <div className={styles.org_card_logo}>
                <img src={logo || 'https://i.zpimg.cn/public_read/22102410qdkcjk.png'} />
            </div>
            <div className={styles.org_card_info}>
                <div className={styles.org_card_name}>{name}</div>
                <div className={styles.org_card_count}>
                    <span>在线报名</span>
                    <span className={styles.count}>{applyCount}个</span>
                </div>
                <div className={styles.org_card_cate}>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref={`#icon_hangye`} />
                    </svg>
                    {industryList.map((i: any) => i.name).join(' / ')}
                </div>
                <div className={styles.org_card_address}>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref={`#jigou`} />
                    </svg>
                    {[provinceName, cityName, areaName].filter(o => o).join(' / ')}
                </div>
            </div>
        </div>
    )
}
