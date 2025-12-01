import type { PropsWithChildren } from 'react'
import { history } from 'umi'
import { calcHrefUrl } from './utils'
import styles from './index.module.less'
import classNames from 'classnames'

interface IHrefContainerProps {
    url: string
    className?: string
    style?: React.CSSProperties
    target?: HTMLAnchorElement['target']
    onClick?: () => void
    disableJump?: boolean
}

const HrefContainer: React.FC<PropsWithChildren<IHrefContainerProps>> = props => {
    const { url, className, style, children, target, onClick, disableJump } = props

    const href = calcHrefUrl(url)

    return (
        <a
            href={href}
            rel="noreferrer"
            onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                if (!disableJump) {
                    if (target === '_blank') {
                        window.open(href, target)
                    } else {
                        history.push(url)
                    }
                }
                onClick?.()
            }}
            className={classNames(styles.href_container, className)}
            style={style}
            target={target}
        >
            {children}
        </a>
    )
}

export default HrefContainer
