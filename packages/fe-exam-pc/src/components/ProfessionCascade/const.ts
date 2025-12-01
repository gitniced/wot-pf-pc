import type { AuthenticateParams } from '../AuthenticateCascade/interface'

export const initAuthenticateParams: AuthenticateParams = {
    order: 'ASC',
    orderBy: 'createdAt',
    pageNo: 1,
    pageSize: 8888,
}

/** 职业工种等级chldren字段 */
export const jobChildrenName: string[] = ['workList', 'levelList']
