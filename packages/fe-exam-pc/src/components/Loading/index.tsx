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
                <div className="exam-center-spin-nested-loading">
                    <div>
                        <div className="exam-center-spin exam-center-spin-lg exam-center-spin-spinning">
                            <span className="exam-center-spin-dot exam-center-spin-dot-spin">
                                <i className="exam-center-spin-dot-item" />
                                <i className="exam-center-spin-dot-item" />
                                <i className="exam-center-spin-dot-item" />
                                <i className="exam-center-spin-dot-item" />
                            </span>
                            <div className="exam-center-spin-text">{message}</div>
                        </div>
                    </div>
                    <div className="exam-center-spin-container exam-center-spin-blur">
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
