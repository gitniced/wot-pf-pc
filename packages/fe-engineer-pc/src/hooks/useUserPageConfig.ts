// 用户全局配置的分页数据
import { get, isEmpty } from 'lodash'
import Http from '@/servers/http'

interface UserPageConfig {
    module: string
    configKey: string
    configValue: string
    userCode: string
}

const MODULE_ID = 'globalPageSize'
const DEFAULT_PAGE_SIZE = 10

// 获取全局配置的pageSize
export const getUserPageSize = (userStore: any) => {
    const userPageConfig = get(userStore, 'userPageConfig', [])

    const userAccountPageConfig = userPageConfig?.find(
        (item: UserPageConfig) => item.module === MODULE_ID && item.configKey === 'pageSize',
    ) as UserPageConfig

    return parseInt(userAccountPageConfig?.configValue ?? String(DEFAULT_PAGE_SIZE)) as number
}

// 设置全局配置的pageSize
const setUserPageSize = (size: number, userStore: any) => {
    // 根据moduleId + configKey去找到对应的项，没有找到说明需要添加一个新的
    // 找到的话，直接换掉confingValue就行
    const params: UserPageConfig = {
        configKey: 'pageSize', // columns | pageSize
        configValue: String(size),
        userCode: userStore?.userData?.code,
        module: MODULE_ID, // 路由地址当作moduleId
    }

    Http('/admin/front/page_config/save', 'POST', params).then(() => {
        const userPageConfig = get(userStore, 'userPageConfig', [])

        const userAccountPageConfig = userPageConfig?.find(
            (item: UserPageConfig) => item.module === MODULE_ID && item.configKey === 'pageSize',
        ) as UserPageConfig

        if (isEmpty(userAccountPageConfig)) {
            userPageConfig.push(params)
        } else {
            userAccountPageConfig.configValue = String(size)
        }

        // 更新localstorage
        userStore?.updateUserPageConfig(userPageConfig)
    })
}

const useUserPageConfig = (userStore: any) => {
    return {
        pageSize: getUserPageSize(userStore),
        setUserPageSize,
    }
}

export default useUserPageConfig
