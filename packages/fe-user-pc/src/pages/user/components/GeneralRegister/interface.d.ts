import type SiteStore from '@/stores/siteStore'
import type UserStore from '@/stores/userStore'
import type { Type } from './const'
export type DemoProps = Record<string, any>

export interface groupObj {
    description: string
    id: number
    name: string
    sid: number
    type: number
}

// 注册参数
export interface RegisterProps {
    // formValues form表单数据
    formValues: Record<string, any>
    // site站点信息
    site: SiteStore | undefined
    // user用户信息
    user: UserStore | undefined
    // formRef formRef实例
    formRef: any
    // 路由参数
    query: Record<string, any>
}
// 三方授权登录若账号没有绑定，需要携带相关信息注册
export interface RegisterQueryType {
    // 登陆类型 1个人   2机构
    type: Type
    // 三方授权 扫码后的openId
    authOpenId?: string
    // 三方授权 的类型 wx  dd
    authType?: 'wx' | 'dd'
    // 携带来源身份注册
    sourceType?: string
    // 三方授权 需要携带绑定时的账号和验证码信息 randomKey和verifyCode
    account?: string
    preRandomKey?: string
    verifyCode?: string
}
