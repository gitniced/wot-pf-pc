import type { UploadFile } from 'antd/es/upload/interface'
import { PlusOutlined } from '@ant-design/icons'
import type { UploadRequestOption } from 'rc-upload/lib/interface'
import { message, Modal, Upload } from 'antd'
import http from '@/servers/http'
import globalApi from '@/servers/globalApi'
import { useState } from 'react'

const ImageUpload = ({
    otherProps,
    onChange,
    fileList = [],
    type = 10,
    currentPageIsShow = false,
}: {
    otherProps: any
    fileList?: UploadFile[]
    onChange?: (e: UploadFile[]) => void
    type: number
    currentPageIsShow?: boolean //时候当前页面显示
}) => {
    let size = otherProps?.size || 100
    let maxCount = otherProps?.maxCount || 100
    let accept =
        otherProps.accept || 'image/jpeg,image/bmp,image/png,image/gif,image/svg,image/svg+xml'

    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')

    const modalCancel = () => {
        setPreviewVisible(false)
        setPreviewImage('')
        setPreviewTitle('')
    }

    return (
        <>
            <Upload
                {...otherProps}
                fileList={fileList}
                listType="picture-card"
                onChange={onChange}
                accept={otherProps?.accept}
                beforeUpload={e => {
                    if (accept) {
                        const isAccept = accept.indexOf(e?.type)

                        if (isAccept === -1) {
                            let errorMess =
                                otherProps?.acceptMessage || `文件格式不正确，请重新选择`
                            message.error(errorMess)
                            return Upload.LIST_IGNORE
                        }
                        return true
                    }

                    if (e?.size > size * 1024 * 1024) {
                        message.error(`请上传小于${size}M的图片`)

                        return Upload.LIST_IGNORE
                    }
                }}
                customRequest={async (option: UploadRequestOption) => {
                    const { file } = option
                    otherProps?.setBtnLoading?.(true)
                    http(
                        globalApi.upload,
                        'post',
                        { file: file, isPrivate: false, type: type },
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                            delayTime: 60000,
                        },
                    )
                        .then(res => {
                            const { url, name, hash } = res

                            let resFile = {
                                uid: url,
                                name: name,
                                url,
                                size: res.size,
                                hash,
                            }

                            otherProps?.setBtnLoading?.(false)
                            option.onSuccess(resFile)
                        })
                        .catch(() => {
                            otherProps?.setBtnLoading?.(false)
                            option.onError()
                        })
                }}
                onPreview={(file: UploadFile) => {
                    const { url, response, name } = file || {}
                    let fileUrl = url || response?.url || ''

                    if (currentPageIsShow) {
                        setPreviewImage(fileUrl)
                        setPreviewTitle(name)
                        setPreviewVisible(true)
                    } else {
                        window.open(fileUrl, '_blank')
                    }
                }}
            >
                {fileList.length >= maxCount ? null : (
                    <>
                        <PlusOutlined />
                        <div>上传</div>
                    </>
                )}
            </Upload>
            <Modal
                centered
                open={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={modalCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    )
}
export default ImageUpload
