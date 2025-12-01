import React from 'react'
import { useEffect } from 'react'
import hooks from './hooks'
import type { TCaptchaProps } from './interface'

const TCaptcha: React.FC<TCaptchaProps> = props => {
    const {
        fail,
        depend,
        serverVerify,
        children,
        autoOpenVerify = false,
        skipVerify = false,
    } = props

    const myHooks = hooks(serverVerify, fail)

    const { afterServerVerify, loadScript, doVerify } = myHooks

    let finialChildren = React.Children.map(children, (childItem: any) => {
        afterServerVerify(childItem.props.onClick)

        return React.cloneElement(childItem, {
            onClick: () => {
                // 如果开启了是否跳过滑动验证码 就直接触发children的onclick
                if (skipVerify) {
                    childItem.props.onClick()
                    return
                }
                if (depend) {
                    const { form, key } = depend
                    form.validateFields([key]).then(() => {
                        doVerify()
                    })
                } else {
                    doVerify()
                }
            },
        })
    })

    useEffect(() => {
        loadScript(autoOpenVerify)
    }, [])

    return finialChildren
}

export default TCaptcha
