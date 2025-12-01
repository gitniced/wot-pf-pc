import { useEffect } from 'react'
// import { Redirect, history } from 'umi'
import { history } from 'umi'
import type { IRoute } from 'umi'
import '@/styles/global.css'
import { inject, observer } from 'mobx-react'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'

const AliasLayout = (props: IRoute) => {
    const redirectHandler = async () => {
        const portalCode = getPortalCodeFromUrl()
        if (portalCode) {
            const currentDomain = getPortalCodeFromUrl({ isGetDomain: true }) || ''
            if (
                props.location.pathname === `/${currentDomain}` ||
                props.location.pathname === `/${currentDomain}/`
            ) {
                history.replace(`/${currentDomain}/home`)
            }
        }
    }
    useEffect(() => {
        redirectHandler()
    }, [props.location.pathname])

    return props.children
}

export default inject('userStore', 'siteStore')(observer(AliasLayout))
