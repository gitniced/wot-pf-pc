/* eslint-disable @typescript-eslint/no-unused-vars */
import colorRgb from '@/utils/colorFormat'
interface themeObj {
    primaryColor: string
    btnPrimaryBg: string
    myBtnHoverBg: string
}

/***编译less为css */
const getLess = async (themeColor: string, callback: () => void) => {
    let lessData = await fetch(`${PUBLIC_PATH}color.less`)
    lessData = await lessData.text()
    lessData = lessData.replace('@primary-color: #45459f', `@primary-color: ${themeColor}`)
    const lessScriptNode = document.createElement('script')
    lessScriptNode.src = 'https://static.zpimg.cn/public/less_2.7.3/less.min.js'
    lessScriptNode.async = true
    lessScriptNode.onload = async () => {
        const cssData = (await less.render(lessData, {})) || {}
        const styleNode = document.createElement('style')
        styleNode.id = 'styleNode'
        styleNode.innerHTML = cssData.css
        document.body.appendChild(styleNode)
        callback?.()
    }
    document.body.appendChild(lessScriptNode)
}

/**
 * 根据设置主题色
 * */
const changeTheme = (themeObj: themeObj, callback: () => void): void => {
    const { primaryColor, btnPrimaryBg, myBtnHoverBg } = themeObj
    document.documentElement.style.setProperty(`--primary-color`, primaryColor)
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
        `--primary-color-05`,
        colorRgb({ color: primaryColor, alpha: 0.5 }),
    )
    document.documentElement.style.setProperty(`--btn-primary-bg`, primaryColor)
    document.documentElement.style.setProperty(`--my-btn-hover-bg`, myBtnHoverBg)
    getLess(primaryColor, callback)
}

export default changeTheme
