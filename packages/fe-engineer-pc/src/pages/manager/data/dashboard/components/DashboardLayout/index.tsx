import React, { useState, useCallback, useEffect, useRef } from 'react'
import styles from './index.module.less'
import classNames from 'classnames'

interface DashboardState {
    scale: number
    containerWidth: number
    containerHeight: number
}

interface DashboardLayoutProps {
    children?: React.ReactNode
    designWidth?: number
    designHeight?: number
    headerOffset?: number
    containerClassName?: string
    className?: string
    style?: React.CSSProperties
    backgroundImage?: string
    backgroundSize?: 'cover' | 'contain' | '100% 100%' | string
    backgroundPosition?: string
    backgroundRepeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y'
}

const DEFAULT_DESIGN_WIDTH = 1920
const DEFAULT_DESIGN_HEIGHT = 1080

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
    designWidth = DEFAULT_DESIGN_WIDTH,
    designHeight = DEFAULT_DESIGN_HEIGHT,
    containerClassName,
    className,
    style,
    backgroundImage,
    backgroundSize = 'cover',
    backgroundPosition = 'center',
    backgroundRepeat = 'no-repeat',
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [dashboardState, setDashboardState] = useState<DashboardState>({
        scale: 1,
        containerWidth: designWidth,
        containerHeight: designHeight,
    })

    const calculateScale = useCallback(() => {
        if (!containerRef.current) {
            return {
                scale: 1,
                containerWidth: designWidth,
                containerHeight: designHeight,
            }
        }

        const containerRect = containerRef.current.getBoundingClientRect()
        const containerWidth = containerRect.width

        const scale = containerWidth / designWidth

        return {
            scale,
            containerWidth: designWidth * scale,
            containerHeight: designHeight * scale,
        }
    }, [designWidth, designHeight])

    const handleResize = useCallback(() => {
        const newState = calculateScale()
        setDashboardState(newState)
    }, [calculateScale])

    useEffect(() => {
        const timer = setTimeout(() => {
            handleResize()
        }, 0)

        window.addEventListener('resize', handleResize)
        return () => {
            clearTimeout(timer)
            window.removeEventListener('resize', handleResize)
        }
    }, [handleResize])

    const contentStyle = {
        ...style,
        zoom: dashboardState.scale,
        width: designWidth,
        height: designHeight,
        ...(backgroundImage && {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize,
            backgroundPosition,
            backgroundRepeat,
        }),
    }

    return (
        <div
            ref={containerRef}
            className={classNames(styles.dashboard_container, containerClassName)}
        >
            <div className={`${styles.dashboard} ${className || ''}`} style={contentStyle}>
                {children}
            </div>
        </div>
    )
}

export default React.memo(DashboardLayout)
