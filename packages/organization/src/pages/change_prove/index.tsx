import React from 'react'
import { observer } from 'mobx-react'
import ProveChange from '@/components/ProveChange'

const Page = () => {
    return <ProveChange />
}
const ObserverPage = observer(Page)

ObserverPage.title = '变更工商信息'
export default ObserverPage
