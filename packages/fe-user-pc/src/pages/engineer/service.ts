import api from './api'
import http from '@/servers/http'
import type { ENGINEER_LOGIN_IDENTITY } from './const'
import type { LoginRequestDto, LoginResponseDto, CodeLoginRequestDto } from './types'

export const checkLoginIdentity = (data: {
    /**
     * 手机号/身份证号，账号
     */
    account: string
    /**
     * 身份ID
     */
    identity: ENGINEER_LOGIN_IDENTITY
    /**
     * 站点id
     */
    sid: number
    /**
     * 是否设置默认身份
     */
    setDefaultIdentity?: boolean
}) => {
    return http(api.checkLoginIdentity, 'post', data) as unknown as Promise<boolean>
}

export const passwordLogin = (data: LoginRequestDto) => {
    return http(api.passwordLogin, 'post', data) as unknown as Promise<LoginResponseDto>
}

export const codeLogin = (data: CodeLoginRequestDto) => {
    return http(api.codeLogin, 'post', data) as unknown as Promise<LoginResponseDto>
}

export const getCode = (data: { account: string; randomKey: string; type: number }) => {
    return http(api.getCode, 'post', data) as unknown as Promise<any>
}

export const sendCodeValidate = (data: {
    account: string
    ticket: string
    randstr: string
    key: string
    type: number
}) => {
    return http(api.sendCodeValidate, 'post', data, {
        ticket: data.ticket,
    } as any) as unknown as Promise<any>
}
