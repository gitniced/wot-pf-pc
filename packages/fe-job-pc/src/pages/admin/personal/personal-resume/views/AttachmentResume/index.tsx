import styles from './index.module.less'
import { Dropdown, Modal, Tooltip, message } from 'antd'
import SimpleUpload from '@/components/SimpleUpload'
import RenameModal from '../../components/Rename'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'
import dayjs from 'dayjs'
import Empty from '@/components/Empty'

const Index = ({
    deleteAttachmentFile,
    saveAttachmentFile,
    userAttachmentList,
    renameResume,
}: any) => {
    // 显示重命名弹窗
    const [openRename, setOpenRename] = useState<boolean>(false)

    const [code, setCode] = useState<string>()
    const [fileName, setFileName] = useState<string>()

    const onDeleteResume = (code: string) => {
        Modal.confirm({
            title: '确认要删除吗？该操作不可逆',
            onOk: () => {
                deleteAttachmentFile(code).then(() => {
                    message.success('删除成功')
                })
            },
        })
    }

    const onShowRenameModal = (item: any) => {
        setCode(item.code)
        setFileName(item.fileName)
        setOpenRename(true)
    }

    // 简历重命名
    const onRenameResume = (name: string) => {
        renameResume(code, name).then(() => {
            message.success('操作成功')
            setOpenRename(false)
        })
    }

    // 下载附件
    const onDownResume = (fileUrl: string) => {
        window.open(fileUrl, '_blank')
    }

    const onAttachmentChange = (e: string | any[]) => {
        if (e[e.length - 1]?.url) {
            saveAttachmentFile(e[e.length - 1].url)
        }
    }

    // 跳转pdf预览页面
    const jumpPdfPreview = (url: string) => {
        window.open(url)
    }

    const getItems = (item: any) => {
        const items = [
            {
                key: 'rename',
                label: '重命名',
                onClick: () => {
                    onShowRenameModal(item)
                },
            },
            {
                key: 'download',
                label: '下载',
                onClick: () => {
                    onDownResume(item.fileUrl)
                },
            },
            {
                key: 'delete',
                label: '删除',
                onClick: () => {
                    onDeleteResume(item.code)
                },
            },
        ]
        return items
    }

    return (
        <div className={styles.job_seeker_container}>
            <div className={styles.sub_wrap}>
                <div className={styles.sub_wrap_header}>
                    <span className={styles.text}>附件简历</span>

                    {userAttachmentList.length < 10 && (
                        //    @ts-ignore
                        <SimpleUpload type={11} fileType={['pdf']} onChange={onAttachmentChange}>
                            <Tooltip title="上传pdf格式简历文件">
                                {' '}
                                <svg className={styles.icon}>
                                    <use xlinkHref={'#icon_add'} />
                                </svg>
                            </Tooltip>
                        </SimpleUpload>
                    )}
                </div>
                {userAttachmentList.length ? (
                    <div className={styles.sub_wrap_content}>
                        {userAttachmentList?.map((item: any) => (
                            <div className={styles.attachment_wrap} key={item?.code}>
                                <div
                                    onClick={() => jumpPdfPreview(item?.fileUrl)}
                                    className={styles.attachment_item}
                                >
                                    <div className={styles.attachment_item_left}>
                                        <img
                                            src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job-pc/img/icon_pdf.png"
                                            alt="icon_pdf"
                                        />
                                    </div>
                                    <div className={styles.attachment_item_middle}>
                                        <div className={styles.file_name}>{item?.fileName}</div>
                                        <div className={styles.update_time}>
                                            更新于
                                            {dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                                        </div>
                                    </div>

                                    <div
                                        className={styles.attachment_item_right}
                                        onClick={(e: SyntheticEvent) => e.stopPropagation()}
                                    >
                                        {/* @ts-ignore */}
                                        <Dropdown menu={{ items: getItems(item) }}>
                                            <svg className={styles.icon}>
                                                <use xlinkHref={'#icon_more'} />
                                            </svg>
                                        </Dropdown>
                                    </div>

                                    {/* <div className={styles.attachment_item_bottom}>
                                    <Space size={12}>
                                        <Typography.Link onClick={e => onShowRenameModal(e, item)}>
                                            重命名
                                        </Typography.Link>
                                        <Typography.Link onClick={e => onDownResume(e, item)}>
                                            下载
                                        </Typography.Link>
                                        <Typography.Link
                                            onClick={e => {
                                                onDeleteResume(e, item?.code)
                                            }}
                                        >
                                            删除
                                        </Typography.Link>
                                    </Space>
                                </div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.sub_empty_content}>
                        <img
                            src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job-pc/img/empty_attachment.png"
                            alt="empty_attachment"
                            width={200}
                            height={200}
                        />
                        <div className={styles.text}>暂无附件简历</div>
                    </div>
                )}
            </div>

            <RenameModal
                open={openRename}
                name={fileName}
                onOk={onRenameResume}
                onCancel={() => {
                    setOpenRename(false)
                }}
            />
        </div>
    )
}

export default Index
