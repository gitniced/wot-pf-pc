import { findSiteLData } from '@/utils/valueGet'
import { quickEntryItems } from './const'
import styles from './index.module.less'
import { inject } from 'mobx-react'
import { SwapRightOutlined } from '@ant-design/icons'

const QuickEntry: React.FC<{ siteStore: any }> = ({ siteStore }) => {
    const { siteData } = siteStore
    const loginUrl = findSiteLData(siteData, 'pcDomain', { findKey: 'baseInfo' }) + '/account'
    const merchantUserDomain = findSiteLData(siteData, 'merchantUserDomain', {
        findKey: 'baseInfo',
    })
    const urlObj: Record<string, string> = {
        loginUrl,
        merchantUserDomain,
    }

    return (
        <div className={styles.quick_entry}>
            <h3 className={styles.h3}>快捷入口</h3>
            {quickEntryItems.map(item => (
                <div
                    className={styles.item}
                    key={item.info}
                    onClick={() => (location.href = `${urlObj[item.key]}${item.link}`)}
                >
                    <img className={styles.image} src={item.image} />
                    <div className={styles.text}>
                        <div className={styles.name}>
                            <span>{item.name}</span>
                            <SwapRightOutlined className={styles.icon} />
                        </div>
                        <div className={styles.info}>{item.info}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

/** 快捷入口 */
export default inject('userStore', 'siteStore')(QuickEntry)
