/* eslint-disable @typescript-eslint/no-unused-vars */
import colorRgb from '@/utils/colorFormat'

const lessTxt = require('@/styles/color.txt')

export interface ThemeObj {
    theme_color: string
    theme_color2: string
    theme_color3: string
}

let lessData: any = null

// 获取lessData 已存在时不再加载
const getLessData = async (themeObj: ThemeObj) => {
    let { theme_color: primaryColor } = themeObj
    const customLessData = lessTxt.default.replace(
        '@primary-color: #45459f',
        `@primary-color: ${primaryColor}`,
    )
    return customLessData
}

let instance: ThemeChange
export default class ThemeChange {
    public changeEvent: any = null

    // 更新style变量
    updateStyleVars = (themeObj: ThemeObj, callBack: () => void = () => {}) => {
        let {
            theme_color: primaryColor,
            theme_color2: btnPrimaryBg,
            theme_color3: myBtnHoverBg,
        } = themeObj

        document.documentElement.style.setProperty(`--primary-color`, primaryColor)
        document.documentElement.style.setProperty(
            `--primary-color-005`,
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
            `--primary-color-06`,
            colorRgb({ color: primaryColor, alpha: 0.6 }),
        )
        document.documentElement.style.setProperty(
            `--primary-color-006`,
            colorRgb({ color: primaryColor, alpha: 0.06 }),
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
            `--primary-color-065`,
            colorRgb({ color: primaryColor, alpha: 0.65 }),
        )
        document.documentElement.style.setProperty(
            `--primary-color-085`,
            colorRgb({ color: primaryColor, alpha: 0.85 }),
        )
        document.documentElement.style.setProperty(`--btn-primary-bg`, primaryColor)
        document.documentElement.style.setProperty(`--my-btn-hover-bg`, myBtnHoverBg)
        callBack?.()
    }

    // 更新主题色
    changeTheme = async (themeObj: ThemeObj, callback?: () => void) => {
        this.updateStyleVars(themeObj)

        const customLessData = await getLessData(themeObj)
        // @ts-ignore
        less.render(customLessData, {}).then((cssData: any) => {
            // eslint-disable-next-line no-param-reassign
            cssData = cssData || {}
            const styleNode = document.createElement('style')
            // @ts-ignore
            styleNode.id = new Date().getTime()
            styleNode.innerHTML = cssData.css
            document.body.appendChild(styleNode)
            callback?.()
        })
    }

    // 生成更新主题色延时方法
    doChangeTheme = (themeObj: ThemeObj, callback?: () => void) => {
        return setTimeout(() => {
            this.changeTheme(themeObj, callback)
            this.changeEvent = null
        }, 50)
    }

    // 防抖执行更改主题色
    debounceChange = (themeObj: ThemeObj) => {
        if (this.changeEvent) {
            clearTimeout(this.changeEvent)
            this.changeEvent = this.doChangeTheme(themeObj)
        } else {
            this.changeEvent = this.doChangeTheme(themeObj)
        }
    }
}

// 单例模式 始终保持一个实例
export const getThemeClass = () => {
    if (!instance) {
        instance = new ThemeChange()
    }
    return instance
}

export const setThemeColor = (themeObj: ThemeObj, callBack: () => void = () => {}) => {
    const themeClassObj = getThemeClass()
    themeClassObj.doChangeTheme(themeObj, callBack)
}

export const setRootVarStyleColor = (themeObj: ThemeObj, callBack: () => void = () => {}) => {
    const themeClassObj = getThemeClass()
    themeClassObj.updateStyleVars(themeObj, callBack)
}
