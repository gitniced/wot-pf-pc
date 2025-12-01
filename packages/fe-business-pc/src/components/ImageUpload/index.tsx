import type { UploadFile } from 'antd/es/upload/interface'
import { message, Upload, Button } from 'antd'
// import { PlusOutlined } from '@ant-design/icons'
import { PlusOutlined } from '@ant-design/icons'
import type { UploadRequestOption } from 'rc-upload/lib/interface'
import http from '@/servers/http'
import globalApi from '@/servers/globalApi'

const ImageUpload = ({
    otherProps,
    onChange,
    fileList = [],
    type = 10,
    listType,
    onCustomRequestEnd,
    onCustomRequestStart,
}: {
    otherProps: any
    fileList?: UploadFile[]
    onChange?: (e: UploadFile[]) => void
    type: number
    listType?: string
    onCustomRequestEnd: any
    onCustomRequestStart: any
}) => {
    const size = otherProps?.size || 100
    const maxCount = otherProps?.maxCount || 100
    const accept =
        otherProps.accept || 'image/jpeg,image/bmp,image/png,image/gif,image/svg,image/svg+xml'

    return (
        <Upload
            {...otherProps}
            fileList={fileList}
            listType={listType}
            onChange={onChange}
            accept={otherProps.accept}
            beforeUpload={e => {
                if (accept) {
                    const isAccept = accept.indexOf(e?.type)
                    console.log('accept', accept, e.type, isAccept)

                    if (isAccept === -1) {
                        const errorMess = otherProps?.acceptMessage || `文件格式不正确，请重新选择`
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
                onCustomRequestStart?.()
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

                        const resFile = {
                            uid: url,
                            name: name,
                            url,
                            size: res.size,
                            hash,
                        }

                        // setDargImage(url)
                        option.onSuccess(resFile)
                        onCustomRequestEnd?.()
                    })
                    .catch(() => {
                        option.onError()
                    })
            }}
            onPreview={(file: UploadFile) => {
                const { url, response } = file || {}
                const fileUrl = url || response?.url || ''

                window.open(fileUrl, '_blank')
            }}
        >
            {fileList.length >= maxCount ? null : listType ? (
                <>
                    <PlusOutlined />
                    <div>上传</div>
                </>
            ) : (
                <Button type="primary" size="large">
                    选择图标
                </Button>
            )}
        </Upload>
    )
}
export default ImageUpload
