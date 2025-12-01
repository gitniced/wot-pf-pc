import type { IRouteComponentProps } from 'umi'
import { Redirect } from 'umi'
import * as Storage from '@/storage'
import { getLocalStorage } from '@/storage'
import { findSiteData } from '@wotu/wotu-components'

export default (props: IRouteComponentProps) => {
    const userToken = Storage.getCookie('TOKEN')
    const { siteData } = getLocalStorage('SITE_STORE') || {}
    const pcDomain = findSiteData(siteData || {}, 'pcDomain', { findKey: 'baseInfo' }) || ''
    if (!userToken) {
        return <div>{props.children}</div>
    } else {
        return <Redirect to={`${pcDomain}/account/user/login`} />
    }
}
