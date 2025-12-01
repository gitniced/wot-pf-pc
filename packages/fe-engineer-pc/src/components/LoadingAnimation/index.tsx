/**
 * 加载中动画组件
 * 支持多种动画效果的加载指示器
 */
import React from 'react'
import styles from './index.module.less'
import type { LoadingAnimationProps } from './interface'

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
    type = 'spinner',
    size = 'medium',
    color = 'primary',
    text,
    className,
    style,
}) => {
    const getLoadingElement = () => {
        switch (type) {
            case 'spinner':
                return (
                    <div className={`${styles.spinner} ${styles[size]} ${styles[color]}`}>
                        <div className={styles.spinnerCircle} />
                    </div>
                )

            case 'dots':
                return (
                    <div className={`${styles.dots} ${styles[size]}`}>
                        <div className={`${styles.dot} ${styles[color]}`} />
                        <div className={`${styles.dot} ${styles[color]}`} />
                        <div className={`${styles.dot} ${styles[color]}`} />
                    </div>
                )

            case 'pulse':
                return (
                    <div className={`${styles.pulse} ${styles[size]} ${styles[color]}`}>
                        <div className={styles.pulseCircle} />
                    </div>
                )

            case 'wave':
                return (
                    <div className={`${styles.wave} ${styles[size]}`}>
                        <div className={`${styles.waveBar} ${styles[color]}`} />
                        <div className={`${styles.waveBar} ${styles[color]}`} />
                        <div className={`${styles.waveBar} ${styles[color]}`} />
                        <div className={`${styles.waveBar} ${styles[color]}`} />
                        <div className={`${styles.waveBar} ${styles[color]}`} />
                    </div>
                )

            case 'squares':
                return (
                    <div className={`${styles.squares} ${styles[size]}`}>
                        <div className={`${styles.square} ${styles[color]}`} />
                        <div className={`${styles.square} ${styles[color]}`} />
                        <div className={`${styles.square} ${styles[color]}`} />
                        <div className={`${styles.square} ${styles[color]}`} />
                    </div>
                )

            case 'ring':
                return (
                    <div className={`${styles.ring} ${styles[size]} ${styles[color]}`}>
                        <div className={styles.ringElement} />
                        <div className={styles.ringElement} />
                        <div className={styles.ringElement} />
                        <div className={styles.ringElement} />
                    </div>
                )

            default:
                return (
                    <div className={`${styles.spinner} ${styles[size]} ${styles[color]}`}>
                        <div className={styles.spinnerCircle} />
                    </div>
                )
        }
    }

    return (
        <div className={`${styles.loadingContainer} ${className}`} style={style}>
            {getLoadingElement()}
            {text && <div className={`${styles.loadingText} ${styles[size]}`}>{text}</div>}
        </div>
    )
}

export default LoadingAnimation
