import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
interface RenderProps {
    element: HTMLDivElement
    component: React.FC
    config: Record<string | number, unknown>
}

const wrapper = (component: React.FC<any>) => {
    // 销毁组件
    const destoryDialog = (element: HTMLDivElement) => {
        const unmountResult = ReactDOM.unmountComponentAtNode(element)
        if (unmountResult && element.parentNode) {
            setTimeout(() => {
                element.parentNode!.removeChild(element)
            }, 300)
        }
    }
    // 渲染组件
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const render = ({ element, component, config = {} }: RenderProps) => {
        const comInstance = React.createElement(
            ConfigProvider,
            { locale: zhCN },
            React.createElement(component, {
                ...config,
                key: 'div',
                closeDialog: () => {
                    destoryDialog(element)
                },
                visible: true,
            } as any),
        )
        // const comInstance = React.createElement(component, {
        //     ...config,
        //     key: 'div',
        //     closeDialog: () => {
        //         destoryDialog(element)
        //     },
        //     visible: true,
        // } as any)
        ReactDOM.render(comInstance, element)
    }

    return function (config: Record<string | number, unknown> = {}) {
        // 挂载div
        const element = document.createElement('div')
        render({ element, component, config })
        document.getElementsByTagName('body')[0].appendChild(element)
    }
}

export default wrapper
