import globalApi from '@/servers/globalApi'
import http from '@/servers/http'

/**
 * 获取公钥
 */
export const getPublicKey = () => {
    return http(globalApi.getPublicKey, 'get', {})
}
// 加密错误统一返回的messageCode
export const SM2_ERROR_CODE = 'ENCRYPT_PUBLIC_KEY_NO_FOUND'

// 未注册统一返回的messageCode
export const NOT_REGISTER_ERROR_CODE = '1007'

// 加密结果的类型
export interface Sm2ResultType {
    publicKey: string
    password?: string
    passwordRepeat?: string

}

