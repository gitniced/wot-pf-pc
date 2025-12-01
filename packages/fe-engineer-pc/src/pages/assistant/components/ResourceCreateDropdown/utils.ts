import { createResource, uploadResourceFile } from '@/modules/resource/service'
import GlobalLoading from '@/components/Loading'
import type { RESOURCE_FORMAT, RESOURCE_TYPE } from '@/modules/resource/const'
import { message } from 'antd'

const globalLoading = GlobalLoading()

export const updateResourceFileAndCreateResource = (options: {
    format: RESOURCE_FORMAT
    type: RESOURCE_TYPE
    majorCode: string
    onSuccess: () => void
}) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '*'
    input.onchange = async event => {
        const target = event.target as HTMLInputElement
        if (target.files && target.files[0]) {
            const file = target.files[0]
            try {
                globalLoading.show('文件上传中...', true)
                const result = await uploadResourceFile(file)
                console.log(`文件 ${file.name} 上传成功:`, result)
                globalLoading.show('资源创建中...', true)

                const res = await createResource({
                    name: file.name,
                    format: options.format,
                    type: options.type,
                    content: result.url,
                    majorCode: options.majorCode,
                })

                if (res) {
                    message.success('创建成功')
                    options.onSuccess()
                }
            } catch (error) {
                console.error(`文件 ${file.name} 上传失败:`, error)
            } finally {
                globalLoading.close()
            }
        }
    }
    input.click()
}
