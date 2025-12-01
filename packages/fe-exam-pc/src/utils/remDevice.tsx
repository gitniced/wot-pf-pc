const remDevice = (baseWidth: number = 1024) => {
    const docEl = document.documentElement
    const resizeEvt = 'orientationchange' in window ? 'remDevice' : 'resize'

    const calculateFontSize = () => {
        const clientWidth = docEl.clientWidth
        if (!clientWidth) return
        if (clientWidth > baseWidth) {
            docEl.style.fontSize = '100px'
            return
        }

        docEl.style.fontSize = 100 * (clientWidth / baseWidth) + 'px'
        docEl.setAttribute('lang', 'zh-CN')
    }
    if (!docEl.addEventListener) return

    calculateFontSize()
    window.addEventListener(resizeEvt, calculateFontSize, false)
    document.addEventListener('DOMContentLoaded', calculateFontSize, false)
}

export { remDevice }
