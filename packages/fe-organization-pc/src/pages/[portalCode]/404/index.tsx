import { Result } from 'antd'
import { useEffect } from 'react'
import styles from './index.module.less'
const NotFound: React.FC = () => {
    useEffect(() => {
        document.title = '未找到页面'
    }, [])
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

export default NotFound
