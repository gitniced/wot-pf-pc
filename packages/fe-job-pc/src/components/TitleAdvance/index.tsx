import type { IRoute } from 'umi'
import styles from './index.module.less'

export interface TitleAdvanceProps extends IRoute {
    title: string
}

const TitleAdvance = ({ title, children }: TitleAdvanceProps) => {
    return (
        <div className={styles.component_title_advance}>
            <div className={styles.title}>{title}</div>
            <div className={styles.children}>{children}</div>
        </div>
    )
}

export default TitleAdvance
