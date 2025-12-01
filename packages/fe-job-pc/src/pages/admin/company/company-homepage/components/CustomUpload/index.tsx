import { Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
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
    btnText: string
    value?: any[]
    onChange?: (e: any) => void
    otherProps?: AnyObj
}
/**
 * 上传组件
 */
const CustomUpload: React.FC<CustomUploadProps> = ({ btnText, value = [], onChange, otherProps = {} }) => {
    /** 上传前限制 */
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng =
            file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpeg'
        if (!isJpgOrPng) {
            message.error('文件格式只能是JPG、PNG、JPEG')
            return false
        }
        const isLt10M = file.size / 1024 / 1024 < 10
        if (!isLt10M) {
            message.error('上传图片大小不能大于10MB')
            return false
        }
        imageUpload({
            image: file,
            type: 2,
        }).then(res => {
            onChange?.([...value, res])
        })
    }

    /** 删除图片 */
    const onRemove = (file: RcFile) => {
        const index = value.findIndex(item => item.uid === file.uid)
        if (~index) {
            value.splice(index, 1)
            onChange?.([...value])
        }
    }

    return (
        <Upload
            listType={'picture-card'}
            accept={'.jpg,.png,.jpeg'}
            beforeUpload={beforeUpload}
            customRequest={() => { }}
            fileList={value}
            onRemove={onRemove}
            maxCount={1}
            {...otherProps}
        >
            {value.length < (otherProps.maxCount ?? 1) && (
                <div>
                    <PlusOutlined />
                    {btnText}
                </div>
            )}
        </Upload>
    )
}

export default CustomUpload
