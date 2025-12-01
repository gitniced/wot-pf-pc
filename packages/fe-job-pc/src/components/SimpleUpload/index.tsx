import { Upload, message } from 'antd'
import type { RcFile } from 'antd/lib/upload'
import http from '@/servers/http'
import globalApi from '@/servers/globalApi'
import type { AnyObj } from '@/types'

/** 上传图片文件 */
const imageUpload = async ({ image, type }: { image: File; type: number }) => {
    const imageData: any = await http(
        globalApi.upload,
        'post',
        { file: image, type },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            delayTime: 60000,
        },
    )
    const { url, name } = imageData
    return {
        uid: url,
        name: name,
        status: 'done',
        url,
        thumbUrl: url,
    }
}

interface CustomUploadProps {
    btnText?: string
    value?: any[]
    onChange?: (e: any) => void
    otherProps?: AnyObj
    fileType?: string[]
}
/**
 * 上传组件
 */
const SimpleUpload: React.FC<CustomUploadProps> = ({
    value = [],
    onChange,
    otherProps = {},
    children,
    fileType = [],
    type = 2,
}: any) => {
    /** 上传前限制 */
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = fileType.some((item: string) => file.type.indexOf(item) !== -1)
        if (!isJpgOrPng) {
            message.error(`文件格式只能是${fileType.join()}`)
            return false
        }
        const isLt10M = file.size / 1024 / 1024 < 10
        if (!isLt10M) {
            message.error('上传图片大小不能大于10MB')
            return false
        }
        imageUpload({
            image: file,
            type,
        }).then(res => {
            onChange?.([...value, res])
        })
    }

    const accept = fileType.map((item: any) => `.${item}`).join()

    return (
        <Upload
            accept={accept}
            beforeUpload={beforeUpload}
            customRequest={() => {}}
            showUploadList={false}
            maxCount={1}
            {...otherProps}
        >
            {children}
        </Upload>
    )
}

export default SimpleUpload
