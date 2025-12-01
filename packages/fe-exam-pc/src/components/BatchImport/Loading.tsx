// 文件导入中

import type { LoadingProps } from './interface'

import styles from './index.module.less'
import { Progress, Spin } from 'antd'
import { LinkOutlined } from '@ant-design/icons'

const Loading = ({ file, progress }: LoadingProps) => {
    return (
        <div className={styles.import_loading}>
            <Spin size="large" />
            <div className={styles.text}>导入中，请稍候...</div>
            <div className={styles.file}>
                <LinkOutlined />
                <span className={styles.file_name}>{file?.name}</span>
            </div>
            <Progress percent={Number(progress)} size="small" />
        </div>
    )
}

export default Loading
