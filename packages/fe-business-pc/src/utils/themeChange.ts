/**
 * @ File: 主题色更改
 * @ Description: 根据站点信息实时更新主题色
 * @ Author: feeling
 * @ Create Time: 2023-01-07 20:32:25
 * @ Modified by: cmm
 * @ Modified time: 2023-08-30 16:44:45
 */

import { ConfigProvider } from 'antd'
import colorRgb from './colorFormat'
// import packageInfo from '../../package.json'

const themeChange = (themeColor: string = '#1890ff', callback?: () => void) => {
    console.log(themeColor)
    /**
     * 根据设置主题色
     * */
    const bindStyleVars = (primaryColor: string): void => {
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
            `--primary-color-004`,
            colorRgb({ color: primaryColor, alpha: 0.04 }),
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
            `--primary-color-008`,
            colorRgb({ color: primaryColor, alpha: 0.08 }),
        )
        document.documentElement.style.setProperty(
            `--primary-color-015`,
            colorRgb({ color: primaryColor, alpha: 0.15 }),
        )
        document.documentElement.style.setProperty(
            `--primary-color-012`,
            colorRgb({ color: primaryColor, alpha: 0.12 }),
        )
        document.documentElement.style.setProperty(
            `--primary-color-025`,
            colorRgb({ color: primaryColor, alpha: 0.25 }),
        )
        document.documentElement.style.setProperty(
            `--primary-color-034`,
            colorRgb({ color: primaryColor, alpha: 0.34 }),
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
    }

    ConfigProvider.config({
        // prefixCls: packageInfo.name,
        theme: { primaryColor: themeColor },
    })
    bindStyleVars(themeColor)
    callback?.()
}

export default themeChange
