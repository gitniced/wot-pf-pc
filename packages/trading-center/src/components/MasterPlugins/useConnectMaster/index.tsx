/**
 * @ File: 父子应用面包屑及404处理
 * @ Description:
 * @ Author: feeling
 * @ Create Time: 2023-01-06 15:11:16
 * @ Modified by: feeling
 * @ Modified time: 2023-02-06 11:13:08
 */

import { useEffect } from 'react'
import packageInfo from '../../../../package.json'
import type { IRoute } from 'umi'
import type { MasterStore } from '../interface'

export default function useConnectMaster(props: IRoute & { masterStore: MasterStore }) {
    const { name: packageName } = packageInfo
    const { masterStore } = props

    // 获取项目所有页面路由 提供给主应用 用作面包屑数据源
    useEffect(() => {
        let titleRoutes = props?.routes?.[0]?.routes || []
        let {
            globalStore: { updateRoutes },
        } = masterStore || {}
        updateRoutes = updateRoutes || new Function()
        const usefullyRoutes = titleRoutes
            .filter((item: any) => item.title)
            .map(({ path, title }: any) => {
                return { path: `/${packageName}${path}`, title }
            })
        if (usefullyRoutes.length > 0) {
            ;(window as any).appRoutes = usefullyRoutes
            updateRoutes(usefullyRoutes)
        }
    }, [props?.routes?.[0]?.routes])

    // 判断项目是否存在当前路由 如果不存在 通知主应用跳转404
    useEffect(() => {
        let {
            globalStore: { goTo404 },
        } = masterStore || {}
        goTo404 = goTo404 || new Function()
        let is404 =
            (window as any)?.appRoutes?.filter((item: string) => item === props?.location?.pathname)
                .length === 0
        if (is404) {
            goTo404()
        }
    }, [props?.location?.pathname])

    return false
}
