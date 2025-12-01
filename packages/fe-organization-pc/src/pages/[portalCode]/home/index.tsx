/* eslint-disable no-case-declarations */
import { inject, observer } from 'mobx-react'
import type { IRoute } from 'umi'
import { useEffect } from 'react'
import type { PageProps } from '@/types'
// import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import MicroPageFc from '../micro/microPageFc'

const MicroHome = (props: PageProps) => {
    const { userStore, siteStore } = props
    const { homeCode } = userStore

    useEffect(() => {
        sessionStorage.removeItem('isFirst')
    }, [])

    return <MicroPageFc code={homeCode} type="home" siteStore={siteStore!} userStore={userStore!} />
}

const ObserverMicroHome: IRoute = inject('userStore', 'siteStore')(observer(MicroHome))

export default ObserverMicroHome
