// 导入失败

import type { FailRecordItem, RejectedProps } from './interface'

import styles from './index.module.less'
import { InfoCircleFilled } from '@ant-design/icons'
import { Divider, Space, Table, Typography } from 'antd'
import type { ColumnProps } from 'antd/lib/table'
import classNames from 'classnames'

const Rejected = ({
    failCount,
    totalCount,
    errorList,
    errorFileUrl,
    importFileType,
}: RejectedProps) => {
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
            width: 200,
        },
        {
            title: '错误原因',
            dataIndex: 'reason',
            key: 'reason',
        },
    ]

    const imageColumns: ColumnProps<FailRecordItem>[] = [
        {
            title: '照片名称',
            dataIndex: 'content',
            key: 'content',
            width: 200,
        },
        {
            title: '错误原因',
            dataIndex: 'reason',
            key: 'reason',
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
                                    <Typography.Text type="success">
                                        {' '}
                                        {successCount}{' '}
                                    </Typography.Text>
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

            <div
                className={classNames(styles.download_record, {
                    [styles.isWord]: importFileType === 'word',
                })}
            >
                {importFileType === 'excel' && <div className={styles.text}>失败记录</div>}
                {Boolean(errorFileUrl) && (
                    <Typography.Link href={errorFileUrl} target="_blank">
                        下载失败记录
                    </Typography.Link>
                )}
            </div>

            {
                // word场景不展示失败记录
                (importFileType === 'excel' || importFileType === 'image') && (
                    <Table
                        columns={importFileType === 'excel' ? columns : imageColumns}
                        dataSource={errorList}
                        pagination={false}
                        scroll={{ y: 300 }}
                    />
                )
            }
        </div>
    )
}

export default Rejected
