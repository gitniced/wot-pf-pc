import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Upload, message, Modal } from 'antd'
import type { UploadProps } from 'antd/lib/upload/Upload'
import type { UploadChangeParam } from 'antd/lib/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import type { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface'
import Http from '@/servers/http'
import globalApi from '@/servers/globalApi'
import styles from './index.module.less'
import type { GlobalUploadType } from '@/types'

const accetpMap = {
    zip: 'application/zip,application/x-zip,application/x-zip-compressed',
    pdf: 'application/pdf',
    excel: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    image: 'image/jpeg,image/bmp,image/png,image/gif,image/svg',
    word: '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    csv: '.csv',
    normal: 'image/jpeg,image/png',
    normalAndSvg: 'image/jpeg,image/png,image/svg+xml',
    ppt: 'application/vnd.ms-powerpoint',
}

interface FileProps {
    onChange?: (file: any) => void
    value?: any[]
    // 子组件
    children?: ReactNode
    // 自定义上传事件开始
    onCustomRequestStart?: () => void
    // 自定义上传事件结束
    onCustomRequestEnd?: () => void
    // 限制数量
    amount?: number
    // 限制大小 单位 M
    size?: number
    // 限制上传类型
    accept?:
        | 'zip'
        | 'excel'
        | 'pdf'
        | 'image'
        | 'word'
        | 'csv'
        | 'svg'
        | 'normal'
        | 'normalAndSvg'
        | 'ppt'
        | Partial<'zip' | 'excel' | 'pdf' | 'image' | 'word' | 'csv' | 'ppt'>[]
    // 是否开启拖拽
    drag?: boolean
    // upload样式
    className?: string
    // 同upload参数
    otherProps?: UploadProps
    // 	业务类型 1导入机构成员 2用户头像 3合同附件 4客户附件 5站点图片 6机构认证图片 7 二要素认证图片 8商品图片 9机构头像 10推荐位上传 11财务凭证 ,12菜单icon,18图文附件
    type: GlobalUploadType
    disabled?: boolean
}

export default function GlobalUpload({
    onChange,
    value,
    accept,
    amount,
    size,
    otherProps,
    children,
    drag = false,
    className,
    type,
    onCustomRequestStart,
    onCustomRequestEnd,
    disabled = false,
}: FileProps) {
    const uploadRef = useRef(null)
    const contentRef = useRef(null)
    const [dargImage, setDargImage] = useState('')
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')

    const [dargImageWidth, setDargImageWidth] = useState('100%')
    const [dargImageHeight, setDargImageHeight] = useState('auto')

    const { listType } = otherProps || {}

    useEffect(() => {
        // 实时更新
        if (value?.[0]?.url) {
            setDargImage(value?.[0]?.url)
        }
    }, [value])
    const modalCancel = () => {
        setPreviewVisible(false)
        setPreviewImage('')
        setPreviewTitle('')
    }

    const getAccepts = (acpt: any) =>
        acpt && (Array.isArray(acpt) ? acpt : [acpt]).map(item => accetpMap[item]).join(',')

    // 数量限制
    const checkLimit = (fileList: string | any[]) => {
        return new Promise((resolve, reject) => {
            const isLen = (uploadRef?.current?.fileList?.length ?? 0) + fileList.length
            amount && isLen > amount ? reject(Error('')) : resolve()
        }).then(
            () => {
                return true
            },
            () => {
                message.error(`超过最大上传数量${amount}个，请重新选择！`)
                return Promise.reject(Error('超过最大上传数量'))
            },
        )
    }

    // 大小限制
    const checkSize = (file: { size: number }) => {
        return new Promise((resolve, reject) => {
            size && file.size > Math.pow(1024, 2) * size ? reject(Error('')) : resolve()
        }).then(
            () => {
                return true
            },
            () => {
                message.error(`超过大小限制${size}M，请重新选择！`)
                return Promise.reject(Error('超过大小限制'))
            },
        )
    }

    // 格式限制
    const checkAccpt = (file: { type: string }) => {
        return new Promise((resolve, reject) => {
            if (accept && file?.type && getAccepts(accept).indexOf(file?.type) === -1) {
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
        // const func = async () => {
        let result: boolean | string = true
        try {
            await checkAccpt(file)
            await checkLimit(fileList)
            await checkSize(file)
        } catch (error) {
            result = Upload.LIST_IGNORE
            // throw Error('文件格式错误')
        }
        return result
        // }
        // return func()
    }

    // 自定义上传UploadRequestOption
    const handleUpload = async (option: RcCustomRequestOptions) => {
        const { file } = option

        onCustomRequestStart?.()
        Http(
            globalApi.upload,
            'post',
            { file: file, isPrivate: false, type },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                delayTime: 60000,
            },
        )
            .then(res => {
                const { url, name, hash } = res

                const resFile = {
                    uid: url,
                    name: name,
                    url,
                    size: res.size,
                    hash,
                }
                setDargImage(url)
                option.onSuccess(resFile)
                onCustomRequestEnd?.()
            })
            .catch(() => {
                /**上传单个文件异常时，从文件列表移除文件结果 */
                if (amount === 1) {
                    uploadRef?.current?.fileList?.pop?.()
                }
                setDargImage(null)
                option.onError()
                onCustomRequestEnd?.()
            })
    }

    // 抛出数值
    const handleChange = async ({ fileList }: UploadChangeParam) => {
        if (onChange) {
            const noErrFileList = fileList.filter(item => item.status !== 'error')
            onChange(
                noErrFileList?.map(v => ({
                    ...v,
                    // status:item.status,
                })),
            )
        }
    }

    const uploadProps = {
        name: 'file',
        ...otherProps,
        fileList: value,
        maxCount: amount,
        accept: getAccepts(accept),
        beforeUpload: beforeCheck,
        onChange: handleChange,
        customRequest: handleUpload,
        onRemove: () => {
            setDargImage('')
        },
        onPreview: (file: UploadFile) => {
            const {
                response: { url, name },
            } = file
            setPreviewImage(url)
            setPreviewTitle(name)
            setPreviewVisible(true)
        },
        disabled,
    }

    // 单张传图时计算图片宽高 适应显示
    const previewImageLoaded = e => {
        const contentWidth = contentRef.current.offsetWidth
        const contentHeight = contentRef.current.offsetHeight
        let imgWidth = e.target.width
        let imgHeight = e.target.height
        let maxSize = ''
        contentWidth > contentHeight ? (maxSize = contentHeight) : (maxSize = contentWidth)
        maxSize = maxSize - 20
        imgWidth > imgHeight
            ? ((imgWidth = `${maxSize}px`), (imgHeight = 'auto'))
            : ((imgWidth = `auto`), (imgHeight = `${maxSize}px`))
        setDargImageWidth(imgWidth)
        setDargImageHeight(imgHeight)
    }

    const isDragger = () => {
        if (drag) {
            return (
                <div ref={contentRef} className={className}>
                    <Upload.Dragger ref={uploadRef} {...uploadProps}>
                        {amount === 1 && dargImage ? (
                            <img
                                src={dargImage}
                                style={{
                                    width: dargImageWidth,
                                    height: dargImageHeight,
                                }}
                                onLoad={previewImageLoaded}
                            />
                        ) : (
                            children
                        )}
                    </Upload.Dragger>
                </div>
            )
        } else {
            if (listType === 'picture-card') {
                return (
                    <Upload ref={uploadRef} {...uploadProps}>
                        {amount && value && value?.length >= amount ? null : children}
                    </Upload>
                )
                // }
            } else {
                return (
                    <Upload ref={uploadRef} {...uploadProps}>
                        {children}
                    </Upload>
                )
            }
        }
    }

    return (
        <div className={styles.page} style={otherProps?.style || {}}>
            {isDragger()}
            <Modal
                centered
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={modalCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    )
}
