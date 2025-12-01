
import type { IRoute } from 'umi'
import styles from './index.module.less'

const Footer: React.FC = (props: IRoute) => {

    return (
        <div className={styles.footer_wrapper}>
            {props.children}
        </div>
    )
}

export default Footer