import { uploadResourceFile } from '../services'

export const updateExcelToBatch = (type: number) => {
    let _resolve
    let _reject
    const promise = new Promise<string>((resolve, reject) => {
        _resolve = resolve
        _reject = reject
    })

    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.xlsx,.xls'
    input.onchange = async event => {
        const target = event.target as HTMLInputElement
        if (target.files && target.files[0]) {
            const file = target.files[0]
            try {
                const result = await uploadResourceFile(file, type)
                console.log(`文件 ${file.name} 上传成功:`, result)

                _resolve(result.url)
            } catch (error) {
                console.error(`文件 ${file.name} 上传失败:`, error)
                _reject(error)
            }
        }
    }
    input.oncancel = () => {
        _reject(new Error('File upload canceled'))
    }

    input.click()

    return promise
}
