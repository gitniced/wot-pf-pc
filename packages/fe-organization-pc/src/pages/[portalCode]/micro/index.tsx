/* eslint-disable no-case-declarations */
import { inject, observer } from 'mobx-react'
import type { IRoute } from 'umi'

import type { PageProps } from '@/types'
import MicroPageFc from './microPageFc'
import { useLocation } from 'umi'

const MicroHome = (props: PageProps) => {
    const { siteStore, userStore } = props

    let { query } = useLocation()

    return (
        <MicroPageFc
            code={query?.code}
            type="micro"
            siteStore={siteStore!}
            userStore={userStore!}
        />
    )
}

const ObserverMicroHome: IRoute = inject('userStore', 'siteStore')(observer(MicroHome))

export default ObserverMicroHome
