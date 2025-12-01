import { useRef, useState } from 'react'
import { Upload, message, Spin } from 'antd'

import type { ReactNode } from 'react'
import type { UploadProps } from 'antd/lib/upload/Upload'
import type { UploadChangeParam } from 'antd/lib/upload'
// import type { UploadFile } from 'antd/es/upload/interface'
import type { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface'
import Http from '@/servers/http'
import globalApi from '@/servers/globalApi'
import styles from './index.module.less'
import GlobalLoading from '@/components/Loading'

const accetpMap = {
    image: 'image/jpeg,image/bmp,image/png,image/gif,image/svg',
}

interface FileProps {
    onChange?: (file: any) => void
    onUplaodStar?: () => void
    onUploadEnd?: () => void
    value?: any[]
    // 子组件
    children?: ReactNode
    // upload样式
    className?: string
    // 同upload参数
    otherProps?: UploadProps
}

export default function GlobalUpload({
    onChange,
    children,
    otherProps,
    onUplaodStar,
    onUploadEnd,
}: FileProps) {
    const [isNowLoading, setIsNowLoading] = useState(false)
    const uploadRef = useRef(null)

    const tempEvent: NodeJS.Timeout[] = []

    const loadingDOM: any = GlobalLoading()

    const getAccepts = () => accetpMap.image

    // 数量限制
    const checkLimit = (fileList: string | any[]) => {
        return new Promise<void>((resolve, reject) => {
            fileList.length > 1 ? reject(Error('')) : resolve()
        }).then(
            () => {
                return true
            },
            () => {
                message.error(`超过最大上传数量1个，请重新选择！`)
                return Promise.reject(Error('超过最大上传数量'))
            },
        )
    }

    // 大小限制
    const checkSize = (file: { size: number }) => {
        return new Promise<void>((resolve, reject) => {
            file.size > Math.pow(1024, 2) * 100 ? reject(Error('')) : resolve()
        }).then(
            () => {
                return true
            },
            () => {
                message.error(`超过大小限制100M，请重新选择！`)
                return Promise.reject(Error('超过大小限制'))
            },
        )
    }

    // 格式限制
    const checkAccpt = (file: { type: string }) => {
        return new Promise<void>((resolve, reject) => {
            if (file?.type && getAccepts().indexOf(file?.type) === -1) {
                message.error(`文件格式不正确，请重新选择！`)
                reject(Error('文件格式不正确，请重新选择！'))
            } else {
                resolve()
            }
        }).then(
            () => {
                return true
            },
            () => {
                message.error(`文件格式不正确，请重新选择！`)
                return Promise.reject(Error('文件格式不正确，请重新选择！'))
            },
        )
    }

    // 上传前验证
    const beforeCheck = async (file: { type: string; size: number }, fileList: any[]) => {
        let result: any = TransformStreamDefaultController
        try {
            await checkAccpt(file)
            await checkLimit(fileList)
            await checkSize(file)
        } catch (error) {
            result = Upload.LIST_IGNORE
        }
        return result
    }

    // 自定义上传UploadRequestOption
    const handleUpload = async (option: RcCustomRequestOptions) => {
        const { file } = option
        tempEvent.map(item => clearTimeout(item))
        const loadEvent = setTimeout(() => {
            loadingDOM.show('上传中', true)
        }, 2000)
        tempEvent.push(loadEvent)
        onUplaodStar?.()
        Http(
            globalApi.upload,
            'post',
            { file: file, isPrivate: false, type: 6 },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                delayTime: 60000,
            },
        )
            .then((res: any) => {
                const { url, name, hash, size } = res

                const resFile = {
                    uid: url,
                    name,
                    url,
                    size,
                    hash,
                }

                option.onSuccess?.(resFile)
                onUploadEnd?.()
            })
            .catch(err => {
                option.onError?.(err)
                onUploadEnd?.()
                setIsNowLoading(false)
            })
            .finally(() => {
                tempEvent.map(item => clearTimeout(item))
                loadingDOM.close()
            })
    }

    // 抛出数值
    const handleChange = async ({ fileList }: UploadChangeParam) => {
        const noErrFileList = fileList.filter(item => item.status !== 'error')
        const finishedFileList = noErrFileList.filter(item => item.hasOwnProperty('response'))
        setIsNowLoading(true)

        if (onChange && finishedFileList.length > 0) {
            setIsNowLoading(false)
            onChange(finishedFileList)
        }
    }

    const uploadProps = {
        name: 'file',
        ...otherProps,
        maxCount: 1,
        accept: getAccepts(),
        beforeUpload: beforeCheck,
        onChange: handleChange,
        customRequest: handleUpload,
        showUploadList: false,
    }

    return (
        <Upload ref={uploadRef} {...uploadProps} className={styles.custom_upload}>
            {isNowLoading ? <Spin /> : children}
        </Upload>
    )
}
