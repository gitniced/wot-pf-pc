import type { IRouteComponentProps } from 'umi'
import { Redirect } from 'umi'
import * as Storage from '@/storage'
import { getCookie, getLocalStorage } from '@/storage'
import { MERCHANT_LOGIN_TYPE } from '@wotu/wotu-components/dist/esm/Types'

export default (props: IRouteComponentProps) => {
    const userToken = Storage.getCookie('TOKEN')
    const sid = (Storage.getLocalStorage('SID') || '').toString()
    let source_type = getLocalStorage('SOURCE_TYPE')
    const personMerchantRoute = getCookie('PERSON_MERCHANT_ROUTE')

    const getRedirect = (e: string) => {
        if (e === MERCHANT_LOGIN_TYPE.PERSON_TEACHER) {
            return <Redirect to={`/teacher/${personMerchantRoute}/login`} />
        } else {
            return <Redirect to={`/seller/login?sourceType=${getLocalStorage('SOURCE_TYPE')}`} />
        }
    }

    // debugger
    if (!userToken) {
        return <div>{props.children}</div>
    } else {
        return sid === '1' ? getRedirect(source_type) : <Redirect to="/user/login" />
    }
}
