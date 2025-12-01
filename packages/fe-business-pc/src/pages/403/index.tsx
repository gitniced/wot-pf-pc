import { Result } from 'antd'
import { observer } from 'mobx-react'
import type { IRoute } from 'umi'
import styles from './index.module.less'
const NotFound: React.FC = () => {
    return (
        <div className={styles.page}>
            <Result title={null} icon={<div className={[styles.icon].join(' ')} />} extra={null} />
        </div>
    )
}
const ObserverNotFound: IRoute = observer(NotFound)
ObserverNotFound.title = '403'
export default ObserverNotFound
