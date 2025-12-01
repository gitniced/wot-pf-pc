import type { FC } from 'react'
import styles from './index.module.less'

const FooterControl: FC = props => {
    return <div className={styles.bottom_fixed}>{props.children}</div>
}

export default FooterControl
