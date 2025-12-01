/**
 * @ File: 主题跟随组件
 * @ Description: 根据站点信息实时更新主题色
 * @ Author: feeling
 * @ Create Time: 2023-01-07 20:32:25
 * @ Modified by: feeling
 * @ Modified time: 2023-02-09 23:22:52
 */

import { ConfigProvider } from 'antd'
import { useEffect } from 'react'
import colorRgb from '@/utils/colorFormat'
import packageInfo from '../../../../package.json'
import { getLocalStorage } from '@/storage'

const useThemeByMaster = () => {
    let themeColor = ''
    const siteStore = getLocalStorage('SITE_STORE')
    const { siteData } = siteStore || {}
    let { data } = siteData || {}
    data = data || {}
    let { configList } = data
    configList = configList || []
    configList.map((item: any) => {
        if (item.key === 'theme_color') {
            themeColor = item.value
        }
    })

    themeColor = themeColor || '#ff0000'

    /**
     * 根据设置主题色
     * */
    const bindStyleVars = (primaryColor: string): void => {
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
    }

    useEffect(() => {
        ConfigProvider.config({
            prefixCls: packageInfo.name,
            theme: { primaryColor: themeColor },
        })
        bindStyleVars(themeColor)
    }, [themeColor])
}

export default useThemeByMaster
