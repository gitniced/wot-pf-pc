/* eslint-disable @typescript-eslint/no-unused-vars */
import colorRgb from '@/utils/colorFormat'
import { ConfigProvider } from 'antd'

export interface ThemeObj {
    theme_color: string
    theme_color2: string
    theme_color3: string
}

/***编译less为css */
const getLess = async (themeColor: string) => {
    let lessData: any = await fetch(`${PUBLIC_PATH}color.less`)
    lessData = await lessData.text()
    lessData = lessData.replace('@primary-color: #45459f', `@primary-color: ${themeColor}`)
    const lessScriptNode = document.createElement('script')
    lessScriptNode.src = 'https://static.zpimg.cn/public/less_2.7.3/less.min.js'
    lessScriptNode.async = true
    lessScriptNode.onload = async () => {
        let cssData = (await less.render(lessData, {})) || {}
        const styleNode = document.createElement('style')
        styleNode.id = 'styleNode'
        styleNode.innerHTML = cssData.css
        document.body.appendChild(styleNode)
    }
    document.body.appendChild(lessScriptNode)
}

/**
 * 根据设置主题色
 * */
const changeTheme = (themeObj: ThemeObj): void => {
    let {
        theme_color: primaryColor,
        theme_color2: btnPrimaryBg,
        theme_color3: myBtnHoverBg,
    } = themeObj
    document.documentElement.style.setProperty(`--primary-color`, primaryColor)
    document.documentElement.style.setProperty(
        `--primary-color-0.5`,
        colorRgb({ color: primaryColor, alpha: 0.05 }),
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
        `--primary-color-006`,
        colorRgb({ color: primaryColor, alpha: 0.06 }),
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
        `--primary-color-065`,
        colorRgb({ color: primaryColor, alpha: 0.65 }),
    )
    document.documentElement.style.setProperty(
        `--primary-color-085`,
        colorRgb({ color: primaryColor, alpha: 0.85 }),
    )
    document.documentElement.style.setProperty(`--btn-primary-bg`, primaryColor)
    document.documentElement.style.setProperty(`--my-btn-hover-bg`, myBtnHoverBg)
    // getLess(primaryColor)
}

/**
 * 设置主题色
 * @param color
 */
export const changeThemeByOnce = (color: string) => {
    changeTheme({
        theme_color: color,
        theme_color2: color,
        theme_color3: color,
    })
    ConfigProvider.config({
        // prefixCls: packageInfo.name,
        theme: { primaryColor: color },
    })
}

export default changeTheme
