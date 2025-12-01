import { Result } from 'antd'
import { useEffect } from 'react'
import styles from './index.module.less'
const NotFound: React.FC = () => {
    useEffect(() => {
        document.title = '服务已关闭'
    }, [])
    return (
        <div className={styles.page}>
            <Result
                className={styles.result}
                title={null}
                icon={<div className={[styles.icon].join(' ')} />}
                subTitle="尊敬的客户，您当前的访问域名服务已关闭，如有疑问，请联系咨询"
                extra={null}
            />
        </div>
    )
}

export default NotFound
