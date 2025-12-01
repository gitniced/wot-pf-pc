import { Progress } from 'antd'
import { companyInfoList } from '../../const'
import styles from './index.module.less'
import type { COMPANY_INFO_ITEM } from '../../interface'
import PageTitle from '../PageTitle'

interface InfoListProps {
    /** 当前编辑项 */
    tab: COMPANY_INFO_ITEM
    /** 切换编辑项 */
    setTab: (e: COMPANY_INFO_ITEM) => void
    rate: number
}
const InfoList: React.FC<InfoListProps> = ({ tab, setTab, rate }) => {
    return (
        <div className={styles.info_list}>
            <PageTitle title="编辑公司信息" />
            <header className={styles.header}>
                <div className={styles.content}>
                    <div className={styles.text}>
                        <div className={styles.title}>你的公司主页吸引力</div>
                        <div className={styles.info}>继续完善信息，让你的公司主页更吸睛</div>
                    </div>
                    <Progress
                        className={styles.progress}
                        strokeColor="var(--primary-color)"
                        width={72}
                        type="circle"
                        percent={rate}
                        format={percent => `${percent}%`}
                    />
                </div>
            </header>
            <div className={styles.list}>
                {companyInfoList.map(item => (
                    <div
                        className={[styles.item, tab === item.tab && styles.active].join(' ')}
                        key={item.tab}
                        onClick={() => setTab(item.tab)}
                    >
                        <div className="name">{item.name}</div>
                        {/* <div className={styles.current}>{current}</div>
                        <div className={styles.total}>{item.total}</div> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

/** 编辑公司信息 */
export default InfoList
