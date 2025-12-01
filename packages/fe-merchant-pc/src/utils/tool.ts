/**
 * 获取 uuid
 * @returns
 */
export const getUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

/**
 * Url下载文件
 * -
 * 通过HTTP将文件先下载在重新修改文件名
 * @param {string} url
 * @param {string} fileName
 */
export function downloadUrlFile(url: string, fileName: string) {
    const xml = new XMLHttpRequest()
    xml.open('GET', url, true)
    xml.responseType = 'blob'
    xml.onload = () => {
        const _url = window.URL.createObjectURL(xml.response)
        const a = document.createElement('a')
        a.href = _url
        a.download = fileName
        // 使用a标签批量下载文件时最好使用_blank，否则只会下载最后一个文件
        a.setAttribute('target', '_blank')
        a.click()
        a.remove()
    }
    xml.send()
}

/**
 * 下载Excel
 * @param {file} data 流文件
 * @param {string} download 文件名
 */
export function downloadFile(data: File, download: string) {
    const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    // 获取heads中的filename文件名
    const downloadElement = document.createElement('a')
    // 创建下载的链接
    const href = window.URL.createObjectURL(blob)
    downloadElement.href = href
    // 下载后文件名
    downloadElement.download = download
    document.body.appendChild(downloadElement)
    // 点击下载
    downloadElement.click()
    // 下载完成移除元素
    document.body.removeChild(downloadElement)
    // 释放掉blob对象
    window.URL.revokeObjectURL(href)
}

// 回调函数的类型
type ReFn = (...args: any) => void
// 节流函数的类型
type ThFn = (fn: ReFn, timer: number) => ReFn
export const throttle: ThFn = (fn, timer) => {
    let time: any = null
    const _throttle = (...args: any) => {
        if (time) clearTimeout(time)
        time = setTimeout(() => {
            fn.apply(this, args)
        }, timer)
    }
    return _throttle
}
