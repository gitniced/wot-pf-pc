import styles from './index.module.less'
import type { IRoute } from 'umi'

interface FilterButtonProps extends IRoute {
    title: string
    num: number
}

/** 筛选按钮 */
const FilterButton: React.FC<FilterButtonProps> = ({ title, num, children }) => {
    return (
        <div className={styles.filter_button}>
            <span className={styles.title}>
                <span>{title}</span>
                {num ? <span>({num})</span> : ''}
            </span>
            <svg className={`icon ${styles.icon}`}>
                <use xlinkHref={'#ic_xialajiantou'} />
            </svg>
            <div className={styles.child}>{children}</div>
        </div>
    )
}

export default FilterButton
