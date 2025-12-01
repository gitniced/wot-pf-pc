import globalApi from '@/servers/globalApi'
import http from '@/servers/http'

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
    // let domain = emailVerifySite.find(item => window.origin.indexOf(item) > -1)
    return Boolean(emailVerifySite)
}
