import { Spin } from 'antd'

import styles from './index.module.less'

const PageLoading = () => {
    return (
        <div className={styles.page_loading}>
            <Spin size="large" />
        </div>
    )
}

export default PageLoading
