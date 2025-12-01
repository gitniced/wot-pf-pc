import { inject, observer } from 'mobx-react'
import type { ReactNode } from 'react'
import React from 'react'

type PowerProps = {
    children: JSX.Element
    api: string
    disabled?: boolean
    visiable?: boolean
}

/**
 * @param api string 按钮后续请求的api地址 详情及编辑需要使用通配符
 * @param visiable boolean 无权限时是否展示子组件 默认false不展示
 * @param disabled boolean 无权限时展示子组件是否启用disabled状态 默认true启用
 */
const Power: React.FC<PowerProps> = observer(props => {
    const { children, api = '', disabled = true, visiable = false, userStore } = props
    const { userPermissionList } = userStore
    let finialChildren: ReactNode = null
    if (userPermissionList?.includes(api)) {
        finialChildren = children
    } else {
        finialChildren = React.Children.map(children, childItem => {
            if (visiable) {
                let childItemStyle = childItem.props.style || {}
                childItemStyle = { ...childItemStyle, cursor: 'auto' }
                return React.cloneElement(childItem, {
                    disabled,
                    href: undefined,
                    style: disabled
                        ? childItem.props.style
                        : childItem.type === 'a'
                        ? { ...childItemStyle, color: 'inherit' }
                        : childItemStyle,
                    onClick: undefined,
                })
            } else {
                return null
            }
        })
    }
    return finialChildren
})

export default inject('userStore')(Power)
