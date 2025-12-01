// 导入失败

import type { FailRecordItem, RejectedProps } from './interface'

import styles from './index.module.less'
import { InfoCircleFilled } from '@ant-design/icons'
import { Divider, Space, Table, Typography } from 'antd'
import type { ColumnProps } from 'antd/lib/table'

const Rejected = ({ failCount, totalCount, errorList, errorFileUrl }: RejectedProps) => {
    // 是否全部导入失败
    const isAllFail = failCount === totalCount

    // 导入成功条数
    const successCount = totalCount - failCount

    const columns: ColumnProps<FailRecordItem>[] = [
        {
            title: '行数',
            dataIndex: 'line',
            key: 'line',
            width: 80,
        },
        {
            title: '内容',
            dataIndex: 'content',
            key: 'content',
            width: 130,
        },
        {
            title: '错误原因',
            dataIndex: 'errorMsg',
            key: 'errorMsg',
        },
    ]

    return (
        <div className={styles.import_rejected}>
            <div className={styles.header}>
                <Space size={16}>
                    <InfoCircleFilled />
                    <div className={styles.fail_content}>
                        {!isAllFail ? (
                            <>
                                <div className={styles.text}>部分导入失败</div>
                                <Typography>
                                    共 {totalCount} 条，导入成功
                                    <Typography.Text type="success">{successCount}</Typography.Text>
                                    条，导入失败
                                    <Typography.Text type="danger"> {failCount} 条</Typography.Text>
                                </Typography>
                            </>
                        ) : (
                            <>
                                <div className={styles.text}>导入失败</div>
                                <Typography>
                                    共 {totalCount} 条，导入失败
                                    <Typography.Text type="danger"> {failCount} </Typography.Text>条
                                </Typography>
                            </>
                        )}
                    </div>
                </Space>
            </div>

            <Divider />

            <div className={styles.download_record}>
                <div className={styles.text}>失败记录</div>
                {errorFileUrl && (
                    <Typography.Link href={errorFileUrl} target="_blank">
                        下载失败记录
                    </Typography.Link>
                )}
            </div>

            <Table
                columns={columns}
                dataSource={errorList}
                pagination={false}
                scroll={{ y: 300 }}
            />
        </div>
    )
}

export default Rejected
