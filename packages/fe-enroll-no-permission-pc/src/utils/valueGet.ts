interface findSiteLDataTypes {
    getKey: string // 数组对象的时候 以什么键值进行匹配 默认 key
    isAvaricious: boolean // 是否开启贪婪模式 即查找到了一个之后是否继续往下查找 默认 true
    onError: (err: any) => void // 错误处理
    findKey?: 'baseInfo' | 'configList' | 'groupList'
}

// 直接从数组 或者对象里面取值
const getSiteValue = (
    param: any[] | Record<string, any>,
    key: React.Key,
    getKey: string = 'key',
) => {
    if (Array.isArray(param)) {
        return param.find(i => i[getKey] === key)
    } else {
        return param[key]
    }
}

// 查找方法
const findSiteLData = (
    params: any[] | Record<string, any>,
    key: React.Key,
    {
        getKey = 'key',
        isAvaricious = true,
        onError,
        findKey = 'configList',
    }: Partial<findSiteLDataTypes> = {},
) => {
    let findResult
    try {
        if (!params) return
        if (Array.isArray(params)) return getSiteValue(params, key, getKey)
        const _findKey: string[] = Array.isArray(findKey) ? findKey : [findKey]
        _findKey.push('sid')
        const dfs = (value: any): any => {
            if (Object.prototype.toString.call(value) !== '[object Object]') return
            for (const k in value) {
                if (_findKey.includes(k)) {
                    if (k === key) {
                        // 如果key === 那就直接取出
                        findResult = value[k]
                        if (!isAvaricious) return // 贪婪模式的校验
                    }
                    // 如果目标key 允许被查询 就去拿值
                    const result = getSiteValue(value[k], key, getKey)
                    if (result) {
                        // 如果有找到值
                        findResult = result
                        if (!isAvaricious) return
                    } else {
                        //没有就继续往下走
                        dfs(value[k])
                    }
                } else {
                    // 走下一步
                    dfs(value[k])
                }
            }
        }
        dfs(params)
    } catch (err) {
        onError?.(err)
    }

    return findResult
}

export { getSiteValue, findSiteLData }
