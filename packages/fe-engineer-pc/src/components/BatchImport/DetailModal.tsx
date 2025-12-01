import { CheckCircleFilled, InfoCircleFilled } from '@ant-design/icons'
import { Button, ConfigProvider, Modal } from 'antd'
import { useEffect, useState } from 'react'
import type { DetailModalProps } from './interface'
import styles from './index.module.less'
import Table from 'antd/es/table'
import { observer } from 'mobx-react'
import packageInfo from '../../../package.json'

// locale
import zhCN from 'antd/es/locale/zh_CN'
import { getImportResult } from './api'
import http from '@/servers/http'
import { SuperTable } from '@wotu/wotu-components'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'

const DetailModal = (props: DetailModalProps) => {
    const { name: _packageName } = packageInfo
    let { visible, closeDialog, code, failApi, type } = props
    const [detail, setDetail] = useState<any>({})

    useEffect(() => {
        getImportResult({ code }).then(res => {
            setDetail(res)
        })
    }, [])

    let { errorList = [], failCount = 0, totalCount = 0, createdAt, errorFileUrl } = detail || {}

    // 判断是否超过15天
    const isPast = () => {
        console.log(12312)
        let fiveTeenDay = 24 * 3600 * 1000 * 15
        let steps = new Date().getTime() - Number(createdAt)
        let result = !(steps >= fiveTeenDay)
        return result
    }

    // 操作记录
    const failColumns: ColumnsTypeItem<any>[] = [
        {
            title: '照片名称',
            dataIndex: 'content',
            key: 'content',
            width: '50%',
        },
        {
            title: '失败原因',
            dataIndex: 'reason',
            key: 'reason',
        },
    ]

    // 操作记录
    const imageFailColumns: ColumnsTypeItem<any>[] = [
        {
            title: '照片名称',
            dataIndex: 'content',
            key: 'content',
            width: '50%',
        },
        {
            title: '失败原因',
            dataIndex: 'reason',
            key: 'reason',
        },
    ]
    const col = type === 'image' ? failColumns : imageFailColumns
    // 是否成功
    const isSuccess = () => {
        return failCount === 0 && totalCount > 0
    }
    // 是否（全部）失败
    const isAllFail = () => {
        // failCount、totalCount 可能都为0
        return failCount === totalCount
    }
    // 是否部分失败
    const isPartFail = () => {
        return failCount > 0 && failCount !== totalCount
    }
    const renderTitle = () => {
        if (isSuccess()) {
            return '导入成功'
        } else if (isPartFail()) {
            return '部分失败'
        } else if (isAllFail()) {
            return '失败'
        }
    }
    return (
        <ConfigProvider locale={zhCN}>
            <Modal
                title="详情"
                width={650}
                visible={visible}
                onCancel={closeDialog}
                footer={[
                    <Button type="primary" key="close" onClick={closeDialog}>
                        关闭
                    </Button>,
                ]}
            >
                <div className={styles.info}>
                    {isSuccess() ? (
                        <CheckCircleFilled style={{ fontSize: 40, color: '#36c626' }} />
                    ) : (
                        <InfoCircleFilled style={{ fontSize: 40, color: '#ff4d4f' }} />
                    )}
                    <div className={styles.content}>
                        <div className={styles.title}>{renderTitle()}</div>
                        <div className={styles.detail}>
                            共 {totalCount} 条，
                            {totalCount - failCount ? (
                                <>
                                    导入成功{' '}
                                    <span className={styles.success}>{totalCount - failCount}</span>{' '}
                                    条，
                                </>
                            ) : null}
                            {failCount ? (
                                <>
                                    导入失败 <span className={styles.fail}>{failCount}</span> 条
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
                {/* 全部失败或者部分失败需要展示 */}
                {(isPartFail() || isAllFail()) && (
                    <div className={styles.record}>
                        <div className={styles.record_title}>
                            <div>失败记录</div>
                            {errorFileUrl && isPast() && (
                                <a className={styles.operation_btn} href={errorFileUrl}>
                                    下载失败记录
                                </a>
                            )}
                        </div>

                        {failApi ? (
                            <SuperTable
                                activeKey="upload_fail_sign_detail"
                                search={false}
                                columns={col}
                                // @ts-ignore
                                request={(params: any) => {
                                    return http(`${failApi}`, 'get', {
                                        ...params,
                                        importCode: code,
                                    })
                                }}
                                beforeSearchSubmit={({ pageNo, pageSize }) => {
                                    return { pageNo, pageSize }
                                }}
                                toolBar={false}
                            />
                        ) : (
                            <Table
                                columns={col}
                                dataSource={errorList}
                                pagination={{ pageSize: 5, showSizeChanger: false }}
                            />
                        )}
                    </div>
                )}
            </Modal>
        </ConfigProvider>
    )
}

export default observer(DetailModal)
