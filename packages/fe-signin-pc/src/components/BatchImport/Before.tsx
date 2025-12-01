// 导入前

import { Alert, Badge, Button, Divider, Space, Tooltip, Typography, Upload, message } from 'antd'
import styles from './index.module.less'
import { ContainerOutlined, DownloadOutlined, InfoCircleFilled } from '@ant-design/icons'
import type { ImportListType } from './constant';
import { ACCEPTED_IMAGE_TYPES, ACCEPTED_XSLX_ACCEPT, ACCEPTED_ZIP_TYPES, ACTION_STATUS_TYPE, MAX_SIZE } from './constant'
import { fileUpload, getImportList } from './api'
import type { BeforeProps, FileUpload } from './interface'
import type { UploadChangeParam } from 'antd/lib/upload'
import { useState } from 'react'
import BusinessTable from '../BusinessTable'
import type { ColumnsType } from 'antd/lib/table'
import dayjs from 'dayjs'
import { getLocalStorage } from '@/storage'
import DetailModal from './components/DetailModal';

// 批量导入说明
const DESCRIPTION = (
    <>
        <Typography>1.请按照模板文件内的相关说明，进行内容填写；</Typography>
        <Typography>
            2.将填写好的导入文件上传，系统会校验导入内容是否符合规定的数据格式。校验通过，会入库保存。如未通过，则会反馈提示。
        </Typography>
    </>
)

const Before = ({ onChange, description = DESCRIPTION, importTemplate, uploadTips, accept, uploadParams, failApi }: BeforeProps) => {
    const accpect_type = {
        xslx: ACCEPTED_XSLX_ACCEPT,
        img: ACCEPTED_IMAGE_TYPES,
        zip: ACCEPTED_ZIP_TYPES,
    }
    const [filename, setFilename] = useState('')
    const userStore = getLocalStorage('USER_STORE')
    const [recordCode, setRecordCode] = useState()
    console.log(userStore)
    // 上传前验证
    const handleBeforeUpload = (file: File) => {
        /**
         * 自行补充类型
         * application/zip
         */
        const { type, size } = file
        if (accpect_type[accept].indexOf(type) === -1) {
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
        const params: FileUpload = { file: option.file, isPrivate: false, ...uploadParams }

        fileUpload(params).then((res: any) => {
            const { url, name, hash } = res
            const resFile = {
                url,
                hash,
                uid: url,
                name: name,
                size: res.size,
            }
            setFilename(name)
            option.onSuccess(resFile)
        })
    }

    const handleFileChange = ({ file }: UploadChangeParam) => {
        onChange(file)
    }

    // 操作记录

    // 判断是否超过15天
    const isPast = (createdAt: string) => {
        let fiveTeenDay = 24 * 3600 * 1000 * 15
        let steps = new Date().getTime() - Number(createdAt)
        let result = !(steps >= fiveTeenDay)
        return result
    }

    // table
    // 操作记录
    const modalColumns: ColumnsType<ImportListType> = [
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
            render: (_, { status, failCount, totalCount }) => {
                // (全部)失败 部分失败 成功 等待中 导入中
                // totalCount可以有0的情况，这种情况指的是文件格式有问题，试题未导入，也认为是失败
                return (
                    <div className={styles.progress}>
                        {status === ACTION_STATUS_TYPE.FORMATERROR && failCount === totalCount && (
                            <Space>
                                <Badge status="error" />
                                <span className={styles.format}>失败</span>
                            </Space>
                        )}

                        {status === ACTION_STATUS_TYPE.FORMATERROR &&
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
                        {[ACTION_STATUS_TYPE.FORMATERROR, ACTION_STATUS_TYPE.COMPLETE].includes(
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
            <Alert icon={<InfoCircleFilled />} className={styles.alert_wrapper} type="info" message="导入说明：" description={description} showIcon />

            <div className={styles.upload_wrapper}>
                {!!importTemplate && <div className={styles.download_template}>
                    <div className={styles.header}>
                        <div className={styles.sort}>1</div>
                        <Space direction="vertical" size={0}>
                            <div className={styles.title}>下载模板</div>
                            <div className={styles.sub_title}>
                                下载后，填写要导入的内容
                            </div>
                        </Space>
                    </div>
                    <img
                        width={48}
                        height={48}
                        style={{ marginBottom: 12 }}
                        src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-enroll-pc/icon_excel.png"
                        alt="icon"
                    />
                    <Button
                        icon={<DownloadOutlined />}
                        className={styles.download_btn}
                        onClick={() => {
                            window.open(importTemplate, '_blank')
                        }}
                    >
                        下载模版
                    </Button>
                </div>
                }


                <div className={styles.download_content}>
                    <div className={styles.header}>
                        {!!importTemplate && <div className={styles.sort}>2</div>}
                        <Space direction="vertical" size={0}>
                            <div className={styles.title}>上传文件</div>
                            <div className={styles.sub_title}>
                                {uploadTips}
                            </div>
                        </Space>
                    </div>
                    {filename ? <div className={styles.file_name}>{filename}</div> : <ContainerOutlined className={styles.icon_import} />}
                    <Upload
                        accept={accpect_type[accept!]}
                        maxCount={1}
                        beforeUpload={handleBeforeUpload}
                        customRequest={handleFileUpload}
                        onChange={handleFileChange}
                        showUploadList={false}
                    >
                        <Button className={styles.upload_btn}>选择文件</Button>
                    </Upload>
                </div>
            </div>
            <Divider />
            <div className={styles.title}>操作记录</div>
            <BusinessTable
                search={false}
                activeKey={'loading'}
                columns={modalColumns}
                request={getImportList as any}
                toolBar={false}
                params={{
                    organizationCode: userStore.selectedOrganization,
                    type: 41
                }}
                beforeSearchSubmit={({type, organizationCode, pageNo, pageSize}) => {
                    return {type, organizationCode, pageNo, pageSize}
                }}
                inTableParamsChange={() => { }}
            />
            {recordCode && <DetailModal visible={!!recordCode} closeDialog={() => setRecordCode(undefined)} code={recordCode} failApi={failApi} />}
        </div>
    )
}

export default Before
