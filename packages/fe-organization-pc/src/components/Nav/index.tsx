import { Result } from 'antd'
import styles from './index.module.less'
const PcNav: React.FC = () => {
    return (
        <div className={styles.page}>
            <Result
                title={null}
                icon={<div className={[styles.icon].join(' ')} />}
                subTitle="未找到页面"
                extra={null}
            />
        </div>
    )
}

export default PcNav
