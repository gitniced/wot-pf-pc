import type { JSXElementConstructor, ReactElement, ReactNode } from 'react'
import React from 'react'

type PowerProps = {
    children:
        | ReactElement<any, string | JSXElementConstructor<any>>
        | ReactElement<any, string | JSXElementConstructor<any>>[]
    powerId: string
    disabled?: boolean
    visible?: boolean
}

/**
 * @param powerId string 当前dom关联的权限id
 * @param visible boolean 无权限时是否展示子组件 默认false不展示
 * @param disabled boolean 无权限时展示子组件是否启用disabled状态 默认true启用
 */
const Power = (props: PowerProps): any => {
    const { children, powerId = '', disabled = true, visible = false } = props
    let permissionIdList = window?.permissionIdList || []
    let finialChildren: ReactNode = null
    if (permissionIdList.includes(powerId)) {
        finialChildren = children
    } else {
        finialChildren = React.Children.map(children, (childItem: React.ReactElement) => {
            if (visible) {
                let childItemStyle = childItem?.props?.style || {}
                childItemStyle = { ...childItemStyle, cursor: 'auto' }
                return React.cloneElement(childItem, {
                    disabled,
                    href: undefined,
                    style: disabled
                        ? childItem?.props?.style
                        : childItem?.type === 'a'
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
}

export default Power
