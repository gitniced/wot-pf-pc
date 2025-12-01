/**
 * 动态生成loading遮罩
 * **/
import React from 'react'
import ReactDOM from 'react-dom'
import styles from './index.module.less'

interface offlineDomProps {
    customStr: string
}

const Offline = () => {
    let container: HTMLElement | null = null

    const OfflineDOM = (props: offlineDomProps) => {
        let { customStr } = props
        customStr = customStr || '网络异常，请检查网络后再试'
        return (
            <div className={styles.offline_bg}>
                <div className={styles.offline_content}>
                    <div className={styles.offline_img} />
                    <svg className={`icon`} aria-hidden="true">
                        <use xlinkHref="#jinhangzhong2" />
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
    }

    return OfflineDOM
}

export default Offline
