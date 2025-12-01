import styles from './index.module.less'
import type { TitleAdvanceProps } from './interface'
import classNames from 'classnames'

const TitleAdvance = ({ title, children, className }: TitleAdvanceProps) => {
    console.log(className)
    return (
        <div className={classNames(styles.component_title_advance, className)}>
            <div className={styles.title}>{title}</div>
            <div className={styles.children}>{children}</div>
        </div>
    )
}

export default TitleAdvance
