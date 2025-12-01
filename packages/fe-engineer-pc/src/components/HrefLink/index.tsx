import type { PropsWithChildren } from 'react'
import { history } from 'umi'
import { calcHrefUrl } from './utils'
import styles from './index.module.less'
import classNames from 'classnames'

interface IHrefLinkProps {
    url: string
    className?: string
    style?: React.CSSProperties
    target?: HTMLAnchorElement['target']
    onClick?: () => void
    disableJump?: boolean
}

const HrefLink: React.FC<PropsWithChildren<IHrefLinkProps>> = props => {
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
            className={classNames(styles.href_link, className)}
            style={style}
            target={target}
        >
            {children}
        </a>
    )
}

export default HrefLink
