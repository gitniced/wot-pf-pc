interface colorParams {
    color: string
    alpha?: number
}

/**
 * 根据颜色生成透明色
 * */
const colorRgb = (colorParams: colorParams): string => {
    let { color, alpha } = colorParams || {}
    color = color || ''
    alpha = alpha || 0
    // 16进制颜色值的正则
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    // 把颜色值变成小写
    let colorStr = color.toString().toLowerCase()
    if (reg.test(colorStr)) {
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff
        if (colorStr.length === 4) {
            let colorNew = '#'
            for (let i = 1; i < 4; i += 1) {
                colorNew += colorStr.slice(i, i + 1).concat(colorStr.slice(i, i + 1))
            }
            colorStr = colorNew
        }
        // 处理六位的颜色值，转为RGB
        const colorChange = []
        for (let i = 1; i < 7; i += 2) {
            colorChange.push(parseInt('0x' + colorStr.slice(i, i + 2)))
        }
        colorChange.push(alpha)
        return 'RGB(' + colorChange.join(',') + ')'
    } else {
        return colorStr
    }
}

export default colorRgb
