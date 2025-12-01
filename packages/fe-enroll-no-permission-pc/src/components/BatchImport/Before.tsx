// 导入前

import { Alert, Button, Space, Typography, Upload, message } from 'antd'
import styles from './index.module.less'
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { ACCEPT, MAX_SIZE } from './constant'
import { fileUpload, getExportTemplate } from './api'
import type { BeforeProps, FileUpload } from './interface'
import type { UploadChangeParam, UploadFile } from 'antd/lib/upload'
import { history } from 'umi'
import type { GroupEnrollQuery } from '@/pages/group-enroll/interface'
import { useState } from 'react'

const Before = ({ onChange, currentFile: importFile }: BeforeProps) => {
    const { activityCode } = history.location.query as GroupEnrollQuery

    const [currentFile, setCurrentFile] = useState<UploadFile | undefined>(importFile)

    // 上传前验证
    const handleBeforeUpload = (file: File) => {
        const { type, size } = file
        if (ACCEPT.indexOf(type) === -1) {
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
        setCurrentFile(file)
    }

    const handleDownloadTemplate = () => {
        getExportTemplate(activityCode).then((res: any) => {
            window.open(res)
        })
    }

    return (
        <div className={styles.import_start}>
            <Space direction="vertical" size={24} style={{ width: '100%' }}>
                <Alert
                    showIcon
                    type="warning"
                    message="导入说明"
                    description={
                        <Space direction="vertical" size={0}>
                            <Typography>1.请按照模板文件内的相关说明，进行内容填写。</Typography>
                            <Typography>
                                2.将填写好的导入文件上传，系统会校验导入内容是否符合规定的数据格式。校验通过，会入库保存。如未通过，则会反馈提示。
                            </Typography>
                            <Typography>3. 请勿对模版已有内容做改动，否则可能无法导入。</Typography>
                        </Space>
                    }
                />

                <div className={styles.import_wrapper}>
                    <div className={styles.download_template}>
                        <div className={styles.header}>
                            <div className={styles.sort}>1</div>
                            <Space direction="vertical" size={0}>
                                <div className={styles.title}>下载模板</div>
                                <div className={styles.sub_title}>下载后，填写要导入的内容</div>
                            </Space>
                        </div>

                        <div className={styles.content}>
                            <img
                                width={48}
                                height={48}
                                src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-enroll-pc/icon_excel.png"
                                alt="icon"
                            />
                            <Button icon={<DownloadOutlined />} onClick={handleDownloadTemplate}>
                                下载模板
                            </Button>
                        </div>
                    </div>

                    <div className={styles.upload_file}>
                        <div className={styles.header}>
                            <div className={styles.sort}>2</div>
                            <Space direction="vertical" size={0}>
                                <div className={styles.title}>上传文件</div>
                                <div className={styles.sub_title}>
                                    上传填写完毕的文件，支持xls、xlsx格式文件
                                </div>
                            </Space>
                        </div>

                        <div className={styles.content}>
                            {currentFile?.response ? (
                                <Typography>{currentFile?.response?.name}</Typography>
                            ) : (
                                <img
                                    width={48}
                                    height={48}
                                    src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-enroll-pc/icon_tongyongfujian.png"
                                    alt="icon"
                                />
                            )}
                            <Upload
                                accept={ACCEPT}
                                showUploadList={false}
                                beforeUpload={handleBeforeUpload}
                                customRequest={handleFileUpload}
                                onChange={handleFileChange}
                            >
                                <Button icon={<UploadOutlined />}>
                                    {currentFile?.response ? '重新选择' : '选择文件'}
                                </Button>
                            </Upload>
                        </div>
                    </div>
                </div>
            </Space>
        </div>
    )
}

export default Before
