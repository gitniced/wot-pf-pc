// 导入成功

import { Space, Typography } from 'antd'
import styles from './index.module.less'
import { CheckCircleFilled } from '@ant-design/icons'
import type { ResolvedProps } from './interface'

const Resolved = ({ totalCount }: ResolvedProps) => {
    return (
        <div className={styles.import_resolved}>
            <Space size={16}>
                <CheckCircleFilled />
                <div className={styles.success_content}>
                    <div className={styles.text}>导入成功</div>
                    <Typography>
                        共{totalCount}条，导入成功
                        <Typography.Text type="success"> {totalCount} </Typography.Text>条
                    </Typography>
                </div>
            </Space>
        </div>
    )
}

export default Resolved
