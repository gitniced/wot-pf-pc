import { Suspense, lazy } from 'react'
import { Spin } from 'antd'
import ModalProvider from './ModalProvider'
import type { ComponentMapType, ModalProviderWrapperType } from './interface'

export * from './interface'
export * from './context'

/**
 *
 * @param props {
 *  config: 弹窗类型配置
 *  visible: 是否展示
 *  type: 弹窗类型
 *  dataSource: 弹窗数据
 *  handleClose: 弹窗关闭回调
 *  handleConfirm: 弹窗确认回调
 * }
 */
export default (props: ModalProviderWrapperType) => {
    const { config, ...restProps } = props

    const configList = Object.keys(config)
    const componentMap = configList.reduce((pre, next) => {
        const item = config[next]
        // 加载配置组件
        const Temp = lazy(() => item.component)
        return {
            ...pre,
            [item.type]: {
                ...item,
                component: (
                    <div>
                        <Suspense fallback={<Spin />}>
                            <Temp />
                        </Suspense>
                    </div>
                ),
            },
        }
    }, {}) as ComponentMapType

    return <ModalProvider {...restProps} componentMap={componentMap} />
}
