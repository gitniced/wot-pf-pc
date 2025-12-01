import React from 'react'
import Prove from '@/components/Prove'
import { observer } from 'mobx-react'
const Page = () => {
    return <Prove />
}
const ObserverPage = observer(Page)

ObserverPage.title = '机构认证'
export default ObserverPage
