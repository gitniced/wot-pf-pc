/**
 * 动态生成loading遮罩
 * **/
import React from 'react'
import ReactDOM from 'react-dom'
import styles from './index.module.less'

interface offlineDomProps {
    customStr: string
}

let delayEvents: NodeJS.Timeout[] = []

const Offline = () => {
    let container: HTMLElement | null = null

    const OfflineDOM = (props: offlineDomProps) => {
        let { customStr } = props
        customStr = customStr || '网络异常，请稍后再试~'
        return (
            <div className={styles.offline_bg}>
                <div className={styles.offline_content}>
                    <svg className={`icon ${styles.offline_img}`} aria-hidden="true">
                        <use xlinkHref="#Close-Circle-Fill" />
                    </svg>
                    <div className={styles.offline_tit}>{customStr}</div>
                </div>
            </div>
        )
    }

    /**
     * 关闭
     */
    OfflineDOM.close = () => {
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
    OfflineDOM.show = (customStr: string) => {
        container = document.getElementById('offline_content')

        if (container === null) {
            container = document.createElement('div')
            container.id = 'offline_content'
            document.body.appendChild(container)
        }

        ReactDOM.render(<OfflineDOM customStr={customStr} />, container)
        if (delayEvents.length === 0) {
            let tempEvent = setTimeout(() => {
                OfflineDOM.close()
                delayEvents.map(item => {
                    clearTimeout(item)
                })
                delayEvents = []
            }, 2000)
            delayEvents.push(tempEvent)
        }
    }

    return OfflineDOM
}

export default Offline
