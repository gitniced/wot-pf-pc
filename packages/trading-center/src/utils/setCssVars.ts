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
    document.documentElement.style.setProperty(
        `--primary-color-0`,
        colorRgb({ color: primaryColor, alpha: 0 }),
    )
    document.documentElement.style.setProperty(
        `--primary-color-01`,
        colorRgb({ color: primaryColor, alpha: 0.1 }),
    )
    document.documentElement.style.setProperty(
        `--primary-color-02`,
        colorRgb({ color: primaryColor, alpha: 0.2 }),
    )
    document.documentElement.style.setProperty(
        `--primary-color-03`,
        colorRgb({ color: primaryColor, alpha: 0.3 }),
    )
    document.documentElement.style.setProperty(
        `--primary-color-04`,
        colorRgb({ color: primaryColor, alpha: 0.4 }),
    )
    document.documentElement.style.setProperty(
        `--primary-color-002`,
        colorRgb({ color: primaryColor, alpha: 0.02 }),
    )
    document.documentElement.style.setProperty(
        `--primary-color-005`,
        colorRgb({ color: primaryColor, alpha: 0.05 }),
    )
    document.documentElement.style.setProperty(
        `--primary-color-006`,
        colorRgb({ color: primaryColor, alpha: 0.06 }),
    )
    document.documentElement.style.setProperty(
        `--primary-color-012`,
        colorRgb({ color: primaryColor, alpha: 0.12 }),
    )
    document.documentElement.style.setProperty(
        `--primary-color-015`,
        colorRgb({ color: primaryColor, alpha: 0.15 }),
    )
    document.documentElement.style.setProperty(
        `--primary-color-025`,
        colorRgb({ color: primaryColor, alpha: 0.25 }),
    )
    document.documentElement.style.setProperty(
        `--primary-color-045`,
        colorRgb({ color: primaryColor, alpha: 0.45 }),
    )
    document.documentElement.style.setProperty(
        `--primary-color-048`,
        colorRgb({ color: primaryColor, alpha: 0.48 }),
    )
    document.documentElement.style.setProperty(
        `--primary-color-065`,
        colorRgb({ color: primaryColor, alpha: 0.65 }),
    )
    document.documentElement.style.setProperty(
        `--primary-color-085`,
        colorRgb({ color: primaryColor, alpha: 0.85 }),
    )
    document.documentElement.style.setProperty(`--btn-primary-bg`, primaryColor)
}

export default setCssVars
