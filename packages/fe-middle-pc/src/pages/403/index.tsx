import { Result } from 'antd'
import styles from './index.module.less'
const NotFound: React.FC = () => {
    return (
        <div className={styles.page}>
            <Result
                title={null}
                icon={<div className={[styles.icon].join(' ')} />}
                subTitle=""
                extra={null}
            />
        </div>
    )
}

export default NotFound
