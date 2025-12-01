import Http from '@/servers/http'
import type { AuthenticasQuery, CreateAuthenticates } from './interface'

export const createAuthenticatesApi = (params: CreateAuthenticates) => {
    return Http('/question/front/authenticate/create_authenticates', 'POST', params)
}

export const deleteAuthenticateApi = (code: string) => {
    return Http('/question/front/authenticate/delete_authenticates', 'POST', { code })
}

export const getAuthenticasApi = (params: AuthenticasQuery) => {
    return Http('/question/front/authenticate/page_authenticates', 'POST', { status: 1, ...params })
}

export const publishAuthenticateApi = (authenticateCode: string, status: number) => {
    return Http('/question/front/authenticate/publish', 'POST', { authenticateCode, status })
}
