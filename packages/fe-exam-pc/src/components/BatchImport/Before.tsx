// 导入前

import { Alert, Button, Typography, Upload, message } from 'antd'
import styles from './index.module.less'
import { ContainerOutlined, DownloadOutlined } from '@ant-design/icons'
import { ACCEPT_MAP, IMPORT_DESCRIPTION, IMPORT_TEMPLATE, MAX_SIZE } from './constant'
import { fileUpload } from './api'
import type { BeforeProps, FileUpload } from './interface'
import type { UploadChangeParam } from 'antd/lib/upload'
import { SUBJECT_TYPE_ENUM } from '@/pages/question/[type]/constants'

const Before = ({
    onChange,
    practiceCode,
    description,
    importTemplate,
    subject = SUBJECT_TYPE_ENUM.REAL,
    importFileType = 'excel',
}: BeforeProps) => {
    let currDescription: React.ReactNode = IMPORT_DESCRIPTION[subject] || description
    let currImportTemplate = IMPORT_TEMPLATE[subject] || importTemplate

    if (practiceCode) {
        currDescription = description
        currImportTemplate = importTemplate as string
    }

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

    return (
        <div className={styles.import_start}>
            <Alert type="info" message="导入说明：" description={currDescription} showIcon />

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
                            window.open(currImportTemplate, '_blank')
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
        </div>
    )
}

export default Before
