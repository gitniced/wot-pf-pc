import { Modal, message } from 'antd'
import styles from './index.module.less'
import { useState } from 'react'
import GlobalUpload from '@/components/GlobalUpload'
import { PlusOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { AttachmentResumeProps, FileItem } from './interface'

const AttachmentResume: React.FC<AttachmentResumeProps> = ({ selectedFile, onChange, options }) => {
    return (
        <div className={styles.attachment_resume}>
            {options.map((item: any) => (
                <div
                    className={`${styles.item} ${
                        selectedFile?.code === item.code && styles.active
                    }`}
                    key={item.code}
                    onClick={() => onChange?.(item)}
                >
                    <img
                        className={styles.image}
                        src={`https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job-fe-pc/images/${
                            item.code === 'online' ? 'zaixianjianli' : 'fujianjianli'
                        }.png`}
                    />
                    <div className={styles.item_right}>
                        <div className={styles.name}>{item.fileName || '在线简历'}</div>
                        <div className={styles.time}>
                            更新于{dayjs(item?.updatedAt).format('YYYY-MM-DD')}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

/** 投递简历 */
const SubmitResume: React.FC<{
    isOpen: boolean
    setIsOpen: (e: boolean) => void
    onOk: (data: any) => Promise<void>
    resumeList: any
    uploadResumeFile: (url: string) => void
}> = ({ isOpen, setIsOpen, onOk, resumeList, uploadResumeFile }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedFile, setSelectedFile] = useState<FileItem>({
        code: 'online',
    })

    /** 投递简历 */
    const handleOk = () => {
        setLoading(true)
        onOk(selectedFile)
            .then(() => {
                setIsOpen(false)
                message.success('简历发送成功')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Modal
            className={styles.submit_Resume}
            title="请选择要投递的简历"
            open={isOpen}
            width={536}
            onOk={handleOk}
            onCancel={() => setIsOpen(false)}
            okButtonProps={{
                loading,
            }}
        >
            <AttachmentResume
                options={resumeList}
                selectedFile={selectedFile}
                onChange={file => setSelectedFile(file)}
            />

            {resumeList.length < 10 && (
                <GlobalUpload
                    size={20}
                    accept={['pdf']}
                    drag={false}
                    type={3}
                    onChange={val => uploadResumeFile(val)}
                    otherProps={{
                        itemRender: () => null,
                        maxCount: 1,
                    }}
                    className={styles.upload}
                >
                    <div className={styles.upload}>
                        <PlusOutlined className={styles.icon} />
                        <span>上传附件简历</span>
                    </div>
                </GlobalUpload>
            )}
        </Modal>
    )
}

export default SubmitResume
