/* eslint-disable react-hooks/rules-of-hooks */
// 用户全局配置的分页数据
import { get } from 'lodash'
import Http from '@/servers/http'

interface UserPageConfig {
    module: string
    configKey: string
    configValue: string
    userCode: string
}

// 获取全局配置的columns
const getUserColumns = (userStore: any, currentModule: string) => {
    const userPageConfig = get(userStore, 'userPageConfig', [])

    const userAccountColumns = userPageConfig?.find(
        (item: UserPageConfig) => item.module === currentModule && item.configKey === 'columns',
    ) as UserPageConfig

    return userAccountColumns?.configValue ? JSON.parse(userAccountColumns?.configValue) : []
}

// 设置全局配置的columns
const setUserColumns = (userStore: any, columns: any, currentModule: string) => {
    // 根据moduleId + configKey去找到对应的项，没有找到说明需要添加一个新的
    // 找到的话，直接换掉confingValue就行
    const params: UserPageConfig = {
        configKey: 'columns', // columns
        configValue: JSON.stringify(columns),
        userCode: userStore?.userData?.code,
        module: currentModule, // 路由地址当作moduleId
    }

    Http('/admin/page_config/save', 'POST', params).then(() => {
        const userPageConfig = get(userStore, 'userPageConfig', [])

        const findIndex = userPageConfig?.findIndex(
            (item: UserPageConfig) => item.module === currentModule && item.configKey === 'columns',
        ) as number

        if (findIndex === -1) {
            userPageConfig.push(params)
        } else {
            userPageConfig[findIndex].configValue = JSON.stringify(columns)
        }

        // 更新localstorage
        userStore?.updateUserPageConfig(userPageConfig)
    })
}

const useUserColumns = (userStore: any, activeKey?: any) => {
    const currentPath = window.location.pathname
    const currentModule = `${currentPath}${activeKey ? activeKey : ''}`

    return {
        columnsSettings: getUserColumns(userStore, currentModule),
        setUserColumns: (_userStore: any, columns: any) =>
            setUserColumns(_userStore, columns, currentModule),
    }
}

export default useUserColumns
