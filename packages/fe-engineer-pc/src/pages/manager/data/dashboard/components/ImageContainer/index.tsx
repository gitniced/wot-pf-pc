import React from 'react'
import styles from './index.module.less'

interface ImageContainerProps {
    /** 背景图片 URL */
    image: string
    /** 容器宽度 */
    width?: number | string
    /** 容器高度 */
    height?: number | string
    /** 自定义类名 */
    className?: string
    /** 自定义样式 */
    style?: React.CSSProperties
    /** 背景图片尺寸 */
    backgroundSize?: 'cover' | 'contain' | '100% 100%' | string
    /** 背景图片位置 */
    backgroundPosition?: string
    /** 背景图片重复 */
    backgroundRepeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y'
    /** 子元素 */
    children?: React.ReactNode
}

const ImageContainer: React.FC<ImageContainerProps> = ({
    image,
    width = '100%',
    height = '100%',
    className,
    style,
    backgroundSize = 'cover',
    backgroundPosition = 'center',
    backgroundRepeat = 'no-repeat',
    children,
}) => {
    const containerStyle: React.CSSProperties = {
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        backgroundImage: `url(${image})`,
        backgroundSize,
        backgroundPosition,
        backgroundRepeat,
        ...style,
    }

    return (
        <div className={`${styles.image_container} ${className || ''}`} style={containerStyle}>
            {children}
        </div>
    )
}

export default React.memo(ImageContainer)
