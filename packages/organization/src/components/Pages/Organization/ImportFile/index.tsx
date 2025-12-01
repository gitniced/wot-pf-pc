import React, { useState } from 'react'
import styles from './index.module.less'
import { Modal, Table, Tag, Upload, Progress, message } from 'antd'
import { ExclamationCircleTwoTone, ContainerTwoTone } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import kingUrl from '@/servers/kingUrl'
import * as Storage from '@/storage'
import type { ColumnsType } from 'antd/es/table'
import { history } from 'umi'
import dayjs from 'dayjs'
import type { PropsType } from './interface'

const { Dragger } = Upload

const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    method: 'post',
    action: `${kingUrl}/auth/resource/file/upload`,
    data: { type: 1 },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files)
    },
}

const ImportFile = (props: PropsType) => {
    let { importResource, importList, isImportVisible, setImportVisible } = props

    const [importUrl, setImportUrl] = useState('')
    const [importName, setImportName] = useState('')
    let BASE_IMG_URL = 'https://static.zpimg.cn/public/fe_user_pc/images'

    // token
    const userToken = Storage.getCookie('TOKEN')

    const [confirmLoading, setConfirmLoading] = useState(false)

    const onCancel = () => {
        setImportVisible(false)
    }
    const onOK = () => {
        setImportVisible(false)
        if (importUrl && importName) {
            importResource(importUrl, importName)
        }
    }

    // 跳转页面
    const gotoPage = (path: string, state?: any) => {
        history.push(path, state)
    }
    // 判断是否超过七天
    const isPast = (createdAt: string) => {
        let sevenDay = 24 * 3600 * 1000 * 7
        let steps = new Date().getTime() - Number(createdAt)
        let result = !(steps >= sevenDay)
        return result
    }

    // 操作记录
    const modalColumns: ColumnsType<any> = [
        {
            title: '序号',
            key: 'code',
            dataIndex: 'code',

            width: '25%',
            render: (_, { code }) => {
                return <div className={styles.code}> {code}</div>
            },
        },
        {
            title: '操作时间',
            dataIndex: 'createdAt',
            key: 'createdAt',

            render: (_, { createdAt }) => {
                return <div> {dayjs(createdAt).format('YYYY-MM-DD HH:mm') ?? '-'}</div>
            },
        },
        {
            title: '操作进度',
            dataIndex: 'rate',
            key: 'rate',

            render: (_, { rate, status, showStatus }) => {
                return (
                    <>
                        {status === 2 && showStatus === 0 && (
                            <Progress percent={rate} size="small" status="exception" />
                        )}
                        {status === 2 && showStatus === 1 && (
                            <Progress percent={rate} size="small" />
                        )}
                        {status === 1 && showStatus === 0 && (
                            <Progress percent={rate} size="small" status="exception" />
                        )}
                    </>
                )
            },
        },
        {
            title: '操作',
            key: 'operation',
            dataIndex: 'operation',

            render: (_, { errorFileUrl, showStatus, createdAt }) => {
                let past: boolean = isPast(createdAt)
                return (
                    <div className={styles.operation}>
                        {errorFileUrl && showStatus === 0 && past && (
                            <a className={styles.operation_btn} href={errorFileUrl}>
                                下载结果
                            </a>
                        )}
                    </div>
                )
            },
        },
    ]
    return (
        <div className={styles.content}>
            {/* 批量导入 */}
            <Modal
                title="批量导入"
                visible={isImportVisible}
                onOk={onOK}
                onCancel={onCancel}
                wrapClassName={styles.import}
                width={648}
                centered
                confirmLoading={confirmLoading}
                bodyStyle={{}}
            >
                <div className={styles.box}>
                    <div className={styles.box_top}>
                        <Tag
                            icon={<ExclamationCircleTwoTone twoToneColor="#FAAD14" />}
                            color="warning"
                            style={{
                                width: '100%',
                                height: '0.25rem',
                                lineHeight: '0.25rem',
                            }}
                        >
                            请先下载模板文件，并填入正确信息，再进行上传导入
                        </Tag>{' '}
                    </div>
                    <div className={styles.box_center}>
                        <div className={styles.box_center_left}>
                            <div className={styles.box_center_left_title}>模板下载</div>
                            <a
                                className={styles.box_center_left_main}
                                href="https://i.zpimg.cn/public_read/import_organization/1001/成员导入模版.xlsx"
                            >
                                <img src={BASE_IMG_URL + '/icon_excel@2x.png'} alt="" />
                                <div className={styles.box_center_left_main_name}>
                                    机构成员导入模板.xlsx
                                </div>
                            </a>
                        </div>
                        <div className={styles.box_center_right}>
                            <div className={styles.box_right_title}>名单上传</div>
                            <div className={styles.box_right_main}>
                                <Dragger
                                    maxCount={1}
                                    accept={'.xlsx,.xls'}
                                    {...uploadProps}
                                    headers={{ authorization: userToken }}
                                    showUploadList={false}
                                    style={{
                                        background: '#fff',
                                        border: 'none',
                                    }}
                                    onChange={(info: any) => {
                                        const { status } = info.file
                                        setConfirmLoading(true)
                                        if (status !== 'uploading') {
                                            if (info.file.response.success) {
                                                setImportUrl(info.file.response.data?.url)
                                                setImportName(info.file.response.data?.name)
                                                message.info('文件上传成功')
                                                setConfirmLoading(false)
                                            } else {
                                                message.error(info.file.response.message)
                                                setConfirmLoading(false)
                                            }
                                        }
                                    }}
                                >
                                    <p className="upload_icon">
                                        <ContainerTwoTone
                                            twoToneColor="#1678ff"
                                            style={{
                                                fontSize: '0.24rem',
                                                marginBottom: '0.1rem',
                                            }}
                                        />
                                    </p>
                                    <p className={styles.box_right_main_title}>
                                        点击或将文件拖拽到这里上传
                                    </p>
                                    <p className={styles.box_right_main_desc}>
                                        只能上传EXCEL文档，且不超过5mb
                                    </p>
                                </Dragger>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.line} />
                <div className={styles.importTitle}>
                    <div>操作记录</div>
                    <div
                        className={styles.importTitle_more}
                        onClick={() => {
                            gotoPage('/action')
                        }}
                    >
                        查看更多
                        <img src={BASE_IMG_URL + '/icon_shouqi@2x.png'} alt="" />
                    </div>
                </div>
                <Table pagination={false} columns={modalColumns} dataSource={importList} />
            </Modal>
        </div>
    )
}
export default ImportFile
