// 数字人正在思考中组件

import styles from './index.module.less'

const DotLoading = ({ style }: any) => {
    return (
        <div className={styles.component_meta_thinking} style={style}>
            <span className={`${styles.loading_dot} ${styles.dot}`} />
            <span className={`${styles.loading_dot} ${styles.dot2}`} />
            <span className={`${styles.loading_dot} ${styles.dot3}`} />
        </div>
    )
}

export default DotLoading
