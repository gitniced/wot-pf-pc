/**
 * 动态生成loading遮罩
 * **/
import React from 'react'
import ReactDOM from 'react-dom'
import type { LoadingProps } from './interface'

const GlobalLoading = () => {
    let container: HTMLElement | null = null

    const LoadingDOM = (props: LoadingProps) => {
        const { message = '', mask = false } = props || {}
        return (
            <div
                style={{
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    minHeight: '500px',
                    zIndex: '11111',
                    top: '0',
                    left: '0',
                    background: mask ? 'rgba(255,255,255,0.4)' : '',
                }}
            >
                <div className="fe-middle-pc-spin-nested-loading" style={{ top: '100px' }}>
                    <div>
                        <div className="fe-middle-pc-spin fe-middle-pc-spin-lg fe-middle-pc-spin-spinning">
                            <span className="fe-middle-pc-spin-dot fe-middle-pc-spin-dot-spin">
                                <i className="fe-middle-pc-spin-dot-item" />
                                <i className="fe-middle-pc-spin-dot-item" />
                                <i className="fe-middle-pc-spin-dot-item" />
                                <i className="fe-middle-pc-spin-dot-item" />
                            </span>
                            <div className="fe-middle-pc-spin-text" style={{ paddingTop: '20px' }}>
                                {message}
                            </div>
                        </div>
                    </div>
                    <div className="fe-middle-pc-spin-container fe-middle-pc-spin-blur">
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
    LoadingDOM.show = (message: string, mask: boolean) => {
        container = document.getElementById('loading_content')

        if (container === null) {
            container = document.createElement('div')
            container.id = 'loading_content'
            document.body.appendChild(container)
        }

        ReactDOM.render(<LoadingDOM message={message} mask={mask} />, container)
    }

    return LoadingDOM
}

export default GlobalLoading
