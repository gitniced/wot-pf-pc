import { getLocalStorage, setCookie } from '@/storage'
import { getSourceTypeByType } from './urlUtils'

//将工作台中的身份设置为当前选中机构的的身份
export const setCurrentIdentityCode = (
    setSelectIdentity: (identityCode: number) => void,
    sourceType?: string,
) => {
    let currentSourceType = sourceType || getLocalStorage('SOURCE_TYPE')
    let identityCode = getSourceTypeByType(currentSourceType)
    if (!identityCode || !currentSourceType) return
    console.log('将工作台中的身份设置为当前选中机构的的身份', identityCode)

    setCookie('SELECT_IDENTITY_CODE', identityCode)
    identityCode && setSelectIdentity?.(identityCode)
}
