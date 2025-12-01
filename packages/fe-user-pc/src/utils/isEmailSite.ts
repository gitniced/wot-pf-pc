import globalApi from '@/servers/globalApi'
import http from '@/servers/http'
import { message } from 'antd'

// 开启邮箱验证的站点域名集合
// const emailVerifySite = ['wozhipei', 'wokaoping', 'busionline', 'wozp'];

/** 当前域名不在白名单，为特殊站点 返回true 否则返回false*/
export const isEmailSite = async () => {
    const emailVerifySite = (await http(
        globalApi.getEmailDomainList,
        'post',
        {},
        { repeatFilter: false },
    )) as unknown as string[]
    return Boolean(emailVerifySite)
}

/** 当前域名不在白名单 弹出特殊提示*/
export const isDisableEmailSite = async () => {
    let isEmail = await isEmailSite()
    if (!isEmail) {
        message.error('功能升级中，暂不可使用')
        return true
    } else {
        return false
    }
}
