enum KEYS {
    TEMP_SID = 'tempSid',
    MY_BREAD_HISTROY = 'my_bread_histroy',
    AUTH_USER_TYPE = 'auth_user_type',
    AUTH_APP_ID = 'auth_app_id',
    AUTH_WX_DD = 'auth_wx_dd',
    CREATE_SOURCE = 'create_source',
    PLATFORM = 'platform',
    CURRENT_PORTAL_ALIAS_OBJ = 'currentPortalAliasObj',
    TERMINAL_NONE = 'terminalNone',
}

/**
 * 获取 sessionStorage
 * @param key
 * @returns
 */
export const getSessionStorage = (key: keyof typeof KEYS) => {
    if (!window) return {}
    const res = sessionStorage.getItem(KEYS[key]) as any
    try {
        return JSON.parse(res)
    } catch (e) {
        return res
    }
}

/**
 * 通用写入 sessionStorage
 * @param key
 * @param val
 */
export const setSessionStorage = (key: keyof typeof KEYS, val: any) => {
    if (!window) return
    sessionStorage.setItem(KEYS[key], typeof val === 'object' ? JSON.stringify(val) : val)
}
