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
                <div
                    className="fe-engineer-pc-spin-nested-loading"
                    style={{
                        position: 'absolute',
                        top: '100px',
                        textAlign: 'center',
                    }}
                >
                    <div>
                        <div className="fe-engineer-pc-spin fe-engineer-pc-spin-lg fe-engineer-pc-spin-spinning">
                            <span className="fe-engineer-pc-spin-dot fe-engineer-pc-spin-dot-spin">
                                <i className="fe-engineer-pc-spin-dot-item" />
                                <i className="fe-engineer-pc-spin-dot-item" />
                                <i className="fe-engineer-pc-spin-dot-item" />
                                <i className="fe-engineer-pc-spin-dot-item" />
                            </span>
                            <div
                                className="fe-engineer-pc-spin-text"
                                style={{ paddingTop: '20px' }}
                            >
                                {message}
                            </div>
                        </div>
                    </div>
                    <div className="fe-engineer-pc-spin-container fe-engineer-pc-spin-blur">
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
