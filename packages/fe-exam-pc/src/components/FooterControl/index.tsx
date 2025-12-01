import type { FC } from 'react'
import styles from './index.module.less'
import type { IRoute } from 'umi'

const FooterControl: FC<IRoute> = props => {
    return <div className={styles.bottom_fixed}>{props.children}</div>
}

export default FooterControl
