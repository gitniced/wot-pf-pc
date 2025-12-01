import globalApi from '@/servers/globalApi'
import { PlusOutlined } from '@ant-design/icons'
import { Spin, Upload } from 'antd'
import Http from '@/servers/http'
import { useState } from 'react'

const CustomUpload = ({
    customKey,
    customText,
    className,
    btnClassName,
    value,
    addImage,
    removeImage,
}: {
    customKey: string
    customText: string
    className: string
    btnClassName: string
    value: any[]
    addImage: any
    removeImage: any
}) => {
    const [loading, setLoading] = useState(false)
    const imageUpload = async ({ image, key }: { image: File; key: string }) => {
        Http(
            globalApi.upload,
            'post',
            { file: image, isPrivate: false, type: 7 },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                delayTime: 60000,
                repeatFilter: false,
            },
        )
            .then(imageData => {
                addImage({ image: imageData, key })
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Upload
            listType={'picture-card'}
            accept={'.jpg,.png,.jpeg'}
            fileList={value}
            className={className}
            beforeUpload={e => {
                setLoading(true)
                imageUpload({
                    image: e,
                    key: customKey,
                })
                return false
            }}
            onRemove={e => {
                removeImage({
                    image: e,
                    key: customKey,
                })
                return false
            }}
        >
            {loading ? (
                <Spin />
            ) : value?.length > 0 ? null : (
                <div className={btnClassName}>
                    <PlusOutlined />
                    {customText}
                </div>
            )}
        </Upload>
    )
}

export default CustomUpload
