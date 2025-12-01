import React, { useMemo, useState } from 'react'

/**
 * @param onActive 接收一个promise函数
 * @param onActiveParams promise函数的入参
 * @param onActiveSuccess promise函数执行成功之后回调
 * @param onActiveFail promise函数执行失败之后回调
 * @param styleClass div样式
 */
type DebounceBtnProps = {
    onActive: (fn?: any) => Promise<any>
    onActiveParams?: any
    onActiveSuccess?: (fn?: any) => void
    onActiveFail?: (fn?: any) => void
    styleClass?: string
    children: JSX.Element
}

const Index = (props: DebounceBtnProps) => {
    let { onActive, onActiveParams, onActiveSuccess, onActiveFail, styleClass, children } = props
    onActiveSuccess = onActiveSuccess || function () {}
    onActiveFail = onActiveFail || function () {}
    const [showLoading, setShowLoading] = useState(false)

    const doActive = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!showLoading) {
            setShowLoading(true)
            if (onActiveParams !== undefined) {
                onActive(onActiveParams)
                    .then(res => {
                        onActiveSuccess!(res)
                        setShowLoading(false)
                    })
                    .catch(err => {
                        onActiveFail!(err)
                        setShowLoading(false)
                    })
            } else {
                onActive()
                    .then(res => {
                        onActiveSuccess!(res)
                        setShowLoading(false)
                    })
                    .catch(err => {
                        onActiveFail!(err)
                        setShowLoading(false)
                    })
            }
        }
    }

    const DebounceBtn = useMemo(() => {
        const FinialChildren = React.Children.map(children, childItem => {
            return React.cloneElement(childItem, {
                disabled: showLoading,
            })
        })
        return FinialChildren
    }, [showLoading])

    return (
        <div className={[styleClass ? styleClass : ''].join(' ')} onClick={doActive}>
            {DebounceBtn}
        </div>
    )
}
export default Index
