import { Button, Result } from 'antd'
import { history } from 'umi'
import styles from './index.module.less'
import { useEffect } from 'react'
const NotFound: React.FC = () => {
    const backHome = () => {
        history.replace('/home')
    }

    useEffect(() => {
        document.title = '404'
    }, [])

    return (
        <div className={styles.page}>
            <Result
                title="404"
                icon={
                    <svg className={['iconpark-icon', styles.icon].join(' ')}>
                        <use href="#404" />
                    </svg>
                }
                subTitle="未找到页面"
                extra={
                    <Button type="primary" onClick={backHome}>
                        回到首页
                    </Button>
                }
            />
        </div>
    )
}

export default NotFound
