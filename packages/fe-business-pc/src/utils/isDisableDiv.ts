import { getLocalStorage } from '@/storage'

/**  
 * id :  权限id
 * flag:  false 返回css样式
  
*/

export const isDisableDiv = (id: number | string, flag = false) => {
    const { permissionIdList = [] } = getLocalStorage('USER_STORE') || {}
    if (id === 'default_menu_key') return undefined
    if (!permissionIdList.includes(id)) {
        // return { cursor: 'not-allowed' }

        return flag ? true : ({ cursor: 'not-allowed' } as any)
    }
}
