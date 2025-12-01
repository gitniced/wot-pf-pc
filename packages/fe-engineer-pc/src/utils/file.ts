import { message } from 'antd'

export const downloadFileByUrl = async (url: string, filename?: string) => {
    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error('下载失败')

        const blob = await res.blob()
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)

        // 如果没传 filename 就从 URL 取
        link.download = filename || url.split('/').pop() || 'download'
        link.click()

        // 释放 blob URL
        URL.revokeObjectURL(link.href)
    } catch (err) {
        console.error(err)
        message.error('下载失败，请稍后重试')
    }
}

export const readBlob = (blob: Blob) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = evt => {
            resolve(evt?.target?.result)
        }
        reader.onerror = err => {
            reject(err)
        }
        reader.readAsDataURL(blob)
    })
}
