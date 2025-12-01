import React, { useEffect, useState } from 'react'
import { history } from 'umi'
import WarpMenu from '../WarpMenu'
import InnerMenu from '../InnerMenu'
import { findItem } from '@/utils/menuUtils'
import { menuData, groupEnum } from '@/layouts/menuConfig'
import style from './index.module.less'

function GlobalMenu() {
    const [pathArr, setPathArr] = useState<string[]>([]) // 路径分割后的数组
    const [menuArr, setMenuArr] = useState<menuDataType[][]>([menuData, [], []]) // 页面展示的menu数据

    const getPathName = () => history.location.pathname
    // 分割路径
    const splitPath = (path: string) => path.split('/').filter(i => !!i)

    // 获取path arr 拼接的层级
    const getDeepKey = (path: string[], n: number) => `/${path.slice(0, n).join('/')}`

    // 找到符合当前key 的menu item
    const getKeyChidrenMenu = (key: string) => findItem(menuData, item => item.key === key)

    //获取当前菜单的chidren
    const getNowItemChildren = (splitPaths: string[], deep: 1 | 2 | 3) =>
        getKeyChidrenMenu(getDeepKey(splitPaths, deep))?.children || []

    // 监听函数 负责数据的一层处理
    const watchPathChange = () => {
        const pathName = getPathName()
        const splitPaths = splitPath(pathName)
        setPathArr(splitPaths)
        setMenuArr([menuData, getNowItemChildren(splitPaths, 1), getNowItemChildren(splitPaths, 2)])
    }

    // 跳转到传入的key对应的菜单下面的 第页面
    const toSecondFirst = (selfKey: string) => {
        const parseItem = findItem(menuData, item => item.key === selfKey)
        const skipKey = findItem(
            parseItem ? [parseItem] : undefined,
            item => item.type !== groupEnum,
        )?.key
        skipKey ? history.push(skipKey) : console.error('当前菜单下没有找到页面 请检查配置')
    }
    // 跳转页面
    const changeKeys = (key: string) => {
        if (key !== history.location.pathname) {
            console.log('key: ', key)
            history.push(key)
        }
    }

    useEffect(() => {
        watchPathChange()
    }, [history.location?.pathname])
    return (
        <div className={style.menu}>
            <WarpMenu
                items={menuArr[0]}
                activeKeys={getDeepKey(pathArr, 1)}
                onSelect={(key: string) => {
                    toSecondFirst(key)
                }}
            />
            <InnerMenu
                title={findItem(menuData, item => item.key === getDeepKey(pathArr, 1))?.label || ''}
                items={menuArr[1]}
                activeKeys={getDeepKey(pathArr, 2)}
                onSelect={(key: string) => {
                    console.log('onSelect= 》key: ', key)
                    changeKeys(key)
                }}
            />
        </div>
    )
}

export default GlobalMenu
