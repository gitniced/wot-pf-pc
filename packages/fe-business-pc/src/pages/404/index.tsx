import { Result } from 'antd'
import styles from './index.module.less'
import { observer } from 'mobx-react'
import type { IRoute } from 'umi'
const NotFound: React.FC = () => {
    return (
        <div className={styles.page}>
            <Result
                title={null}
                icon={<div className={[styles.icon].join(' ')} />}
                subTitle="未找到页面"
            />
        </div>
    )
}

const ObserverNotFound: IRoute = observer(NotFound)
ObserverNotFound.title = '未找到页面'
export default ObserverNotFound
