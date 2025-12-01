import { UploadOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'
import Upload from 'antd/lib/upload/Upload'
// @ts-ignore
import type { UploadRequestOption } from 'rc-upload/lib/interface'
import Http from '@/servers/http'
import globalApi from '@/servers/globalApi'
import { useEffect, useState } from 'react'

import styles from './index.module.less'

interface VideoUploadProps {
    onChange?: (url: string) => void
    value: string
}

const VideoUpload = ({ onChange, value }: VideoUploadProps) => {
    const [currentFileUrl, setCurrentFileUrl] = useState<string>()
    const [uploading, setUploading] = useState<boolean>(false)

    useEffect(() => {
        value && setCurrentFileUrl(value)
    }, [value])

    const beforeUpload = (file: File) => {
        if (file.size > 5 * 1024 * 1024 * 1024) {
            message.warning('视频大小不得超过5G')
            return false
        }

        return file
    }

    const handleChange = ({ file }: UploadChangeParam) => {
        if (file.status === 'uploading') {
            setUploading(true)
        }
        if (file.status === 'done') {
            setUploading(false)
        }

        const { url } = file.response ?? {}

        if (url) {
            setCurrentFileUrl(url)
            onChange?.(url)
        }
    }

    const customRequest = (options: UploadRequestOption) => {
        const { file } = options
        Http(
            globalApi.upload,
            'post',
            { file: file, isPrivate: false, type: 25 },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                delayTime: 60000,
            },
        )
            .then((res: any) => {
                const { url, name, hash } = res

                const resFile = {
                    uid: url,
                    name: name,
                    url,
                    size: res.size,
                    hash,
                }
                options.onSuccess(resFile)
            })
            .catch(() => {
                options.onError()
            })
    }

    return (
        <div className={styles.component_video_upload}>
            {currentFileUrl ? (
                <video src={currentFileUrl} controls />
            ) : (
                <Upload
                    accept="video/*"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    customRequest={customRequest}
                    maxCount={1}
                >
                    <Button icon={<UploadOutlined />} loading={uploading}>
                        上传文件
                    </Button>
                    <div className={styles.tips}>支持上传视频格式文件，大小不超过5G</div>
                </Upload>
            )}
        </div>
    )
}

export default VideoUpload
