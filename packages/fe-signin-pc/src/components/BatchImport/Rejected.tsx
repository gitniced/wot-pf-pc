// 导入失败

import type { FailRecordItem, RejectedProps } from './interface'

import styles from './index.module.less'
import { InfoCircleFilled } from '@ant-design/icons'
import { Divider, Space, Table, Typography } from 'antd'
import type { ColumnProps } from 'antd/lib/table'
import BusinessTable from '../BusinessTable'
import Http from '@/servers/http'

const Rejected = ({ failCount, totalCount, errorList, errorFileUrl, failApi, importCode }: RejectedProps) => {
    // 是否全部导入失败
    const isAllFail = failCount === totalCount

    // 导入成功条数
    const successCount = totalCount - failCount

    const columns: ColumnProps<FailRecordItem>[] = [
        {
            title: '照片名称',
            dataIndex: 'fileName',
            key: 'fileName',
            width: '50%',
        },
        {
            title: '失败原因',
            dataIndex: 'errorMsg',
            key: 'errorMsg',
        },
    ]

    // 获取导入结果
    const getImportResult = (params: any) => {
        return Http(`${failApi}`, 'post', {
            ...params,
            importCode
        })
    }
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

            <div className={styles.download_record}>
                <div className={styles.text}>失败记录</div>
                {Boolean(errorFileUrl) && (
                    <Typography.Link href={errorFileUrl} target="_blank">
                        下载失败记录
                    </Typography.Link>
                )}
            </div>

            {
                failApi ? (
                    <BusinessTable
                        activeKey='upload_fail_sign'
                        search={false}
                        columns={columns}
                        request={getImportResult}
                        toolBar={false}
                    />
                ) : (
                    <Table
                        columns={columns}
                        dataSource={errorList}
                        pagination={false}
                        scroll={{ y: 300 }}
                    />)
            }

        </div>
    )
}

export default Rejected
