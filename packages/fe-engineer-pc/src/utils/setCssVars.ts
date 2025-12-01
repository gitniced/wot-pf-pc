/* eslint-disable @typescript-eslint/no-unused-vars */
import colorRgb from '@/utils/colorFormat'
interface themeObj {
    primaryColor: string
    btnPrimaryBg?: string
    myBtnHoverBg?: string
}

/**
 * 根据设置主题色
 * */
const setCssVars = (themeObj: themeObj): void => {
    let { primaryColor } = themeObj
    document.documentElement.style.setProperty(`--primary-color`, primaryColor)
    // 生成 0-100 的数字数组（共 101 个元素）
    const numbers = Array.from({ length: 100 }, (_, index) => index)
    // 将每个数字格式化为三位数字符串（如 0 → "000", 5 → "005", 100 → "100"）
    const strArray = numbers.map(num => num.toString().padStart(3, '0'))
    strArray.map(item => {
        if (item) {
            document.documentElement.style.setProperty(
                `--primary-color-${item}`,
                colorRgb({ color: primaryColor, alpha: parseFloat(item) / 100 }),
            )
            if (item.match(/0+$/)) {
                let tempNum = item.replace(/0+$/, '')
                document.documentElement.style.setProperty(
                    `--primary-color-${tempNum}`,
                    colorRgb({ color: primaryColor, alpha: parseFloat(item) / 100 }),
                )
            }
        }
    })
    document.documentElement.style.setProperty(`--btn-primary-bg`, primaryColor)
}

export default setCssVars
