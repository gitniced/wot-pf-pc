import { CheckCircleFilled, InfoCircleFilled } from '@ant-design/icons'
import { Button, ConfigProvider, Modal } from 'antd'
import React, { useEffect } from 'react'
import type { DetailModalProps } from '../../interface'
import styles from './index.module.less'
import { wrapper } from '@wotu/wotu-components'
import type { ColumnsType } from 'antd/es/table'
import Table from 'antd/es/table'
import { observer, useLocalObservable } from 'mobx-react'

import ImportStore from '../../store'
// locale
import zhCN from 'antd/es/locale/zh_CN'

const DetailModal = (props: DetailModalProps) => {
    let { visible, closeDialog, code, errorFileUrl, past } = props
    let store = useLocalObservable(() => new ImportStore())

    useEffect(() => {
        store.getImportDetail(code)
    }, [])

    let { errorList = [], failCount = 0, totalCount = 0 } = store.importDetail || {}

    // table
    // 操作记录
    const failColumns: ColumnsType<any> = [
        {
            title: '行数',
            key: 'line',
            dataIndex: 'line',
            width: '15%',
        },
        {
            title: '内容',
            dataIndex: 'content',
            key: 'content',
            width: '30%',
        },
        {
            title: '错误原因',
            dataIndex: 'reason',
            key: 'reason',
        },
    ]
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
        <ConfigProvider prefixCls={'organization'} locale={zhCN}>
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
                            共 {totalCount} 条，导入成功{' '}
                            <span className={styles.success}>{totalCount - failCount}</span> 条
                            {failCount ? (
                                <>
                                    ，导入失败 <span className={styles.fail}>{failCount}</span> 条
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
                            {errorFileUrl && past && (
                                <a className={styles.operation_btn} href={errorFileUrl}>
                                    下载失败记录
                                </a>
                            )}
                        </div>

                        <Table
                            columns={failColumns}
                            dataSource={errorList}
                            pagination={{ pageSize: 5, showSizeChanger: false }}
                        />
                    </div>
                )}
            </Modal>
        </ConfigProvider>
    )
}

export default wrapper(observer(DetailModal))
