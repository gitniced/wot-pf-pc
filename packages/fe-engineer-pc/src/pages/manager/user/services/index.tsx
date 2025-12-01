import globalApi from '@/servers/globalApi'
import http from '@/servers/http'

/**
 * 上传资源文件
 */
export const uploadResourceFile = (image: File, type: number) => {
    return http<
        any,
        {
            ext: string
            hash: string
            name: string
            size: number
            url: string
            urlOriginal: string
        }
    >(
        globalApi.upload,
        'post',
        { file: image, isPrivate: false, type: type },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            delayTime: 60000,
            repeatFilter: false,
        },
    )
}
