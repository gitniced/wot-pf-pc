enum KEYS {
    TEMP_SID = 'tempSid',
    MY_BREAD_HISTROY = 'my_bread_histroy',
    AUTH_USER_TYPE = 'auth_user_type',
    AUTH_APP_ID = 'auth_app_id',
    AUTH_WX_DD = 'auth_wx_dd',
    CREATE_SOURCE = 'create_source',
    PLATFORM = 'platform',
    //  COMPANY_BACK_URL资源方角色-企业身份 登录、注册后的回调地址，优先级大于工作台
    COMPANY_BACK_URL = 'company_back_url',
    CURRENT_PORTAL_ALIAS_OBJ = 'currentPortalAliasObj',
    LAST_LOGIN_ACCOUNT = 'last_login_account',
    EXTRA_TIME_STATUS = 'extraTimeStatus',
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

/**
 * 通用 删除 sessionStorage
 * @param key
 * @param val
 */
export const delSessionStorage = (key: keyof typeof KEYS) => {
    if (!window) return
    sessionStorage.removeItem(KEYS[key])
}
