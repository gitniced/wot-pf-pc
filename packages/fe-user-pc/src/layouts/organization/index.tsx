import Header from '@/components/Global/Header'
import OrganizationMenu from '@/components/Global/OrganizationMenu'
import { Layout } from 'antd'
import type { IRoute } from 'umi'
import styles from './index.module.less'

export default (props: IRoute) => {
    return (
        <Layout className={styles.page}>
            <Header title="organization" />
            <div className={styles.layout}>
                <OrganizationMenu {...props} />
                <div className={styles.content}>
                    <div className={styles.children}>{props.children}</div>
                </div>
            </div>
        </Layout>
    )
}
