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
