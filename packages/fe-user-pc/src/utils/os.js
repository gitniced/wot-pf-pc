;(function () {
    const ua = navigator.userAgent
    const isWindowsPhone = /(?:Windows Phone)/.test(ua)
    const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
    const isAndroid = /(?:Android)/.test(ua)
    const isFireFox = /(?:Firefox)/.test(ua)
    const isTablet =
        /(?:iPad|PlayBook)/.test(ua) ||
        (isAndroid && !/(?:Mobile)/.test(ua)) ||
        (isFireFox && /(?:Tablet)/.test(ua))
    const isPhone = /(?:iPhone)/.test(ua) && !isTablet
    const isPc = !isPhone && !isAndroid && !isSymbian && !isTablet
    const osMapObj = {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc,
    }
    window.os = osMapObj
    window.getOsName = () => {
        let osKey = ''
        Object.keys(osMapObj).map(item => {
            if (osMapObj[item]) {
                osKey = item
            }
        })
        return osKey
    }
    window.dyRem = () => {
        const REM_MAP = {
            isPc: 'https://static.zpimg.cn/public/utils/pc-rem.js',
            isTablet: 'https://static.zpimg.cn/public/utils/pad-rem.js',
            isPhone: 'https://static.zpimg.cn/public/utils/h5-rem.js',
            isAndroid: 'https://static.zpimg.cn/public/utils/h5-rem.js',
        }
        let current = null
        current = document.createElement('script')
        current.charset = 'utf-8'
        current.src = REM_MAP[window.getOsName()]
        let headTag = document.getElementsByTagName('head')[0]
        headTag.appendChild(current)
    }
})()
