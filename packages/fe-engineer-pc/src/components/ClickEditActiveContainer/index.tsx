import useClickOutside from '@/hooks/useClickOutside'
import { useCallback, useRef } from 'react'
import type { PropsWithChildren } from 'react'

interface ClickEditActiveContainerProps {
    active: boolean
    setActive: (active: boolean) => void
    onBlur: () => void
    className?: string
    style?: React.CSSProperties
}

const ClickEditActiveContainer: React.FC<
    PropsWithChildren<ClickEditActiveContainerProps>
> = props => {
    const { setActive, children, onBlur, className, style } = props

    const containerRef = useRef<HTMLDivElement>(null)

    useClickOutside(containerRef, onBlur)

    const isPreview = /assistant\/course\/.*\/preview/.test(location.pathname)

    const handleClick = useCallback(() => {
        if (isPreview) {
            return
        }
        setActive(true)
    }, [setActive])

    return (
        <div ref={containerRef} onClick={handleClick} className={className} style={style}>
            {children}
        </div>
    )
}

export default ClickEditActiveContainer
