/**
 * 动态生成loading遮罩
 * **/
import React from 'react'
import ReactDOM from 'react-dom'
import type { LoadingProps } from './interface'

const GlobalLoading = () => {
    let container: HTMLElement | null = null

    const LoadingDOM = (props: LoadingProps) => {
        const { message = '' } = props || {}
        return (
            <div
                style={{
                    position: 'fixed',
                    width: '100%',
                    height: '500px',
                    zIndex: '11111',
                    top: '200px',
                    left: '0',
                }}
            >
                <div className="ant-spin-nested-loading">
                    <div>
                        <div className="ant-spin ant-spin-lg ant-spin-spinning">
                            <span className="ant-spin-dot ant-spin-dot-spin">
                                <i className="ant-spin-dot-item" />
                                <i className="ant-spin-dot-item" />
                                <i className="ant-spin-dot-item" />
                                <i className="ant-spin-dot-item" />
                            </span>
                            <div className="ant-spin-text">{message}</div>
                        </div>
                    </div>
                    <div className="ant-spin-container ant-spin-blur">
                        <div style={{ position: 'relative', width: '100vw', height: '100vh' }} />
                    </div>
                </div>
            </div>
        )
    }

    /**
     * 关闭
     */
    LoadingDOM.close = () => {
        if (container) {
            ReactDOM.unmountComponentAtNode(container)
            document.body.removeChild(container)
            container = null
        }
    }

    /**
     * 显示
     * @param message
     */
    LoadingDOM.show = (message: string) => {
        container = document.getElementById('loading_content')

        if (container === null) {
            container = document.createElement('div')
            container.id = 'loading_content'
            document.body.appendChild(container)
        }

        ReactDOM.render(<LoadingDOM message={message} />, container)
    }

    return LoadingDOM
}

export default GlobalLoading
