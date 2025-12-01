import React from 'react'
// import 'moment/locale/zh-cn'
import type { FORM_ITEM_PROPS } from './const'
import GetFormItemMap from './components'

const PTFormItem = (props: FORM_ITEM_PROPS) => {
    const { renderType } = props

    return <GetFormItemMap type={renderType} params={{ ...props }} />
}

export default PTFormItem
