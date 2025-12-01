// 导入前

import { Alert, Badge, Button, Divider, Space, Tooltip, Typography, Upload, message } from 'antd'
import styles from './index.module.less'
import { ContainerOutlined, DownloadOutlined } from '@ant-design/icons'
import { ACCEPT_MAP, ACTION_STATUS_TYPE, MAX_SIZE } from './constant'
import { fileUpload, getImportList } from './api'
import type { BeforeProps, FileUpload, ImportListType } from './interface'
import type { UploadChangeParam } from 'antd/lib/upload'
import { SuperTable } from '@wotu/wotu-components'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { isPast } from './utils'
import dayjs from 'dayjs'
import TitleBlock from '../TitleBlock'
import { useState } from 'react'
import DetailModal from './DetailModal'

const Before = ({
    onChange,
    _failApi,
    description,
    importTemplate,
    importFileType = 'excel',
}: BeforeProps) => {
    const [recordCode, setRecordCode] = useState<string>()
    // 上传前验证
    const handleBeforeUpload = (file: File) => {
        const { type, size } = file
        if (ACCEPT_MAP[importFileType].indexOf(type) === -1) {
            message.error(`文件格式不正确，请重新选择！`)
            return Upload.LIST_IGNORE
        }

        if (size > MAX_SIZE) {
            message.error(`超过大小限制5M，请重新选择！`)
            return Upload.LIST_IGNORE
        }

        return true
    }

    // 自定义上传
    const handleFileUpload = (option: any) => {
        const params: FileUpload = { file: option.file, type: 13, isPrivate: false }

        fileUpload(params).then((res: any) => {
            const { url, name, hash } = res
            const resFile = {
                url,
                hash,
                uid: url,
                name: name,
                size: res.size,
            }
            option.onSuccess(resFile)
        })
    }

    const handleFileChange = ({ file }: UploadChangeParam) => {
        onChange(file)
    }

    // 操作记录
    const modalColumns: ColumnsTypeItem<ImportListType>[] = [
        {
            title: '操作文件',
            dataIndex: 'fileName',
            key: 'fileName',
            width: 200,
            render: (_, { fileUrl, fileName, createdAt }) => {
                let past: boolean = isPast(createdAt)
                return (
                    <div className={styles.fileName}>
                        {past ? (
                            <a href={fileUrl}>{fileName}</a>
                        ) : (
                            <Tooltip title="文件已过期">
                                <span>{fileName}</span>
                            </Tooltip>
                        )}
                    </div>
                )
            },
        },
        {
            search: false,
            title: '操作人',
            dataIndex: 'createdByName',
            key: 'createdByName',
            width: 120,
            render: (_, { createdByName }: any) => {
                return <div> {createdByName ?? '-'}</div>
            },
        },
        {
            search: false,
            title: '操作时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 200,
            render: (_, { createdAt }) => {
                return <div> {dayjs(createdAt).format('YYYY-MM-DD HH:mm') ?? '-'}</div>
            },
        },
        {
            title: '操作进度',
            dataIndex: 'rate',
            key: 'rate',
            width: 120,
            // @ts-ignore
            render: (_, { status, failCount, totalCount }) => {
                // (全部)失败 部分失败 成功 等待中 导入中
                // totalCount可以有0的情况，这种情况指的是文件格式有问题，试题未导入，也认为是失败
                return (
                    <div className={styles.progress}>
                        {status === ACTION_STATUS_TYPE.FORMAT_ERROR && failCount === totalCount && (
                            <Space>
                                <Badge status="error" />
                                <span className={styles.format}>失败</span>
                            </Space>
                        )}

                        {status === ACTION_STATUS_TYPE.FORMAT_ERROR &&
                            failCount > 0 &&
                            failCount !== totalCount && (
                                <Space>
                                    <Badge status="error" />
                                    <span className={styles.format}>部分失败</span>
                                </Space>
                            )}

                        {status === ACTION_STATUS_TYPE.COMPLETE &&
                            failCount === 0 &&
                            totalCount > 0 && (
                                <Space>
                                    <Badge status="success" />
                                    <span className={styles.format}>成功</span>
                                </Space>
                            )}

                        {status === ACTION_STATUS_TYPE.PENDING && (
                            <Space>
                                <span className={styles.format}>导入中</span>
                            </Space>
                        )}

                        {status === ACTION_STATUS_TYPE.WAITING && (
                            <Space>
                                <Badge status="processing" />
                                <span className={styles.format}>等待中</span>
                            </Space>
                        )}
                    </div>
                )
            },
        },
        {
            title: '操作',
            key: 'operation',
            dataIndex: 'operation',
            width: 200,
            render: (_, { errorFileUrl, createdAt, code, status }) => {
                let past: boolean = isPast(createdAt)
                const handleOpera = () => {
                    if (!errorFileUrl) return <></>
                    if (past) {
                        return (
                            <a className={styles.operation_btn} href={errorFileUrl}>
                                下载失败记录
                            </a>
                        )
                    } else {
                        return (
                            <Tooltip title="文件已过期">
                                <span className={styles.be_overdue}>下载失败记录</span>
                            </Tooltip>
                        )
                    }
                }

                return (
                    <Space className={styles.operation}>
                        {/* 状态完成展示详情 */}
                        {[ACTION_STATUS_TYPE.FORMAT_ERROR, ACTION_STATUS_TYPE.COMPLETE].includes(
                            status,
                        ) && (
                            <span
                                className={styles.operation_btn}
                                onClick={() => setRecordCode(code)}
                            >
                                详情
                            </span>
                        )}
                        {handleOpera()}
                    </Space>
                )
            },
        },
    ]

    return (
        <div className={styles.import_start}>
            <Alert type="info" message="导入说明：" description={description} showIcon />

            {importFileType === 'excel' && (
                <div className={styles.download_template}>
                    <div className={styles.text_wrapper}>
                        <div className={styles.text}>下载模版</div>
                        <div className={styles.sub_text}>请填写后再上传</div>
                    </div>

                    <Button
                        icon={<DownloadOutlined />}
                        className={styles.download_btn}
                        onClick={() => {
                            window.open(importTemplate, '_blank')
                        }}
                    >
                        <Typography.Link>下载模版</Typography.Link>
                    </Button>
                </div>
            )}

            <Upload
                accept={ACCEPT_MAP[importFileType]}
                listType="text"
                maxCount={1}
                beforeUpload={handleBeforeUpload}
                customRequest={handleFileUpload}
                onChange={handleFileChange}
            >
                <div className={styles.download_content}>
                    <ContainerOutlined className={styles.icon_import} />

                    <div className={styles.tips}>
                        {importFileType === 'excel'
                            ? '仅支持xls、xlsx格式文件'
                            : '仅支持doc、docx格式文件'}
                    </div>

                    <Button>点击上传</Button>
                </div>
            </Upload>
            <Divider />
            <TitleBlock title="操作记录" />
            <SuperTable
                search={false}
                // @ts-ignore
                activeKey={'loading'}
                columns={modalColumns}
                // @ts-ignore
                request={getImportList}
                toolBar={false}
                params={{
                    type: 47,
                }}
                beforeSearchSubmit={({ type, organizationCode, pageNo, pageSize }) => {
                    return { type, organizationCode, pageNo, pageSize }
                }}
                inTableParamsChange={() => {}}
            />

            {recordCode && (
                <DetailModal
                    visible={!!recordCode}
                    closeDialog={() => setRecordCode(undefined)}
                    code={recordCode}
                    // failApi={failApi}
                />
            )}
        </div>
    )
}

export default Before
