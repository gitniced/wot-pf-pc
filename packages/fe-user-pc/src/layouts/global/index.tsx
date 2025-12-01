import Header from '@/components/Global/Header'
import MyMenu from '@/components/Global/MyMenu'
import { Layout } from 'antd'
import type { IRoute } from 'umi'
import styles from './index.module.less'

export default (props: IRoute) => {
    return (
        <Layout className={styles.page}>
            <Header padding={true} />
            <div className={styles.layout}>
                <MyMenu {...props} />
                <div className={styles.content}>
                    <div className={styles.children}>{props.children}</div>
                </div>
            </div>
        </Layout>
    )
}
