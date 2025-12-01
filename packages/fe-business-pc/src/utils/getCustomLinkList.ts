import { ACCESS_TYPE_ENUM } from '@/components/CustomLink/const'
import Http from '@/servers/http'
import { getCookie } from '@/storage'
import { parsePortalType } from './parseValue'

const API = {
    // 获取菜单跳转配置列表
    getItemList: '/business/jumpurl/list',
}

/**  获取跳转链接数据  */
const getCustomLinkList = async (type: 'pc' | 'mobile') => {
    const res: any = await Http(
        API.getItemList,
        'get',
        {
            organizationCode: getCookie('SELECT_ORG_CODE'),
            type: parsePortalType(type),
            accessType: ACCESS_TYPE_ENUM.CUSTOM_LINK,
            identity: getCookie('SELECT_IDENTITY_CODE'),
        },
        {},
    )

    return res
}

export default getCustomLinkList
