/**
 * @ File: 主题跟随组件
 * @ Description: 根据站点信息实时更新主题色
 * @ Author: feeling
 * @ Create Time: 2023-01-07 20:32:25
 * @ Modified by: feeling
 * @ Modified time: 2023-09-27 16:28:31
 */

import { ConfigProvider } from 'antd'
import { useEffect, useState } from 'react'
// import colorRgb from '@/utils/colorFormat'
import packageInfo from '../../../../package.json'
import { getLocalStorage, getSessionStorage } from '@/storage'
import { findSiteData } from '@wotu/wotu-components'

const useThemeByMaster = () => {
    const PLATFORM = getSessionStorage('PLATFORM') || ''

    let siteStore = getLocalStorage('SITE_STORE')

    if (PLATFORM === 'workbench') {
        siteStore = getLocalStorage('WORKBENCH_SITE_STORE')
    } else {
        siteStore = getLocalStorage('SITE_STORE')
    }

    const { siteData } = siteStore || {}

    let themeColor = findSiteData(siteData, 'theme_color')?.value || ''

    const [themeChanged, setThemeChanged] = useState(false)

    themeColor = themeColor || '#1890ff'

    /**
     * 根据设置主题色
     * */
    // const bindStyleVars = (primaryColor: string): void => {
    //     document.documentElement.style.setProperty(`--primary-color`, primaryColor)
    //     document.documentElement.style.setProperty(
    //         `--primary-color-005`,
    //         colorRgb({ color: primaryColor, alpha: 0.05 }),
    //     )
    //     document.documentElement.style.setProperty(
    //         `--primary-color-01`,
    //         colorRgb({ color: primaryColor, alpha: 0.1 }),
    //     )
    //     document.documentElement.style.setProperty(
    //         `--primary-color-02`,
    //         colorRgb({ color: primaryColor, alpha: 0.2 }),
    //     )
    //     document.documentElement.style.setProperty(
    //         `--primary-color-03`,
    //         colorRgb({ color: primaryColor, alpha: 0.3 }),
    //     )
    //     document.documentElement.style.setProperty(
    //         `--primary-color-04`,
    //         colorRgb({ color: primaryColor, alpha: 0.4 }),
    //     )
    //     document.documentElement.style.setProperty(
    //         `--primary-color-006`,
    //         colorRgb({ color: primaryColor, alpha: 0.06 }),
    //     )
    //     document.documentElement.style.setProperty(
    //         `--primary-color-025`,
    //         colorRgb({ color: primaryColor, alpha: 0.25 }),
    //     )
    //     document.documentElement.style.setProperty(
    //         `--primary-color-045`,
    //         colorRgb({ color: primaryColor, alpha: 0.45 }),
    //     )
    //     document.documentElement.style.setProperty(
    //         `--primary-color-065`,
    //         colorRgb({ color: primaryColor, alpha: 0.65 }),
    //     )
    //     document.documentElement.style.setProperty(
    //         `--primary-color-085`,
    //         colorRgb({ color: primaryColor, alpha: 0.85 }),
    //     )
    //     document.documentElement.style.setProperty(`--btn-primary-bg`, primaryColor)
    // }

    useEffect(() => {
        ConfigProvider.config({
            prefixCls: packageInfo.name,
            theme: { primaryColor: themeColor },
        })
        // bindStyleVars(themeColor)
        setThemeChanged(true)
    }, [themeColor])

    return themeChanged
}

export default useThemeByMaster
