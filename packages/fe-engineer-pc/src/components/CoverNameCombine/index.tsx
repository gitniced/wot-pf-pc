import React, { useMemo } from 'react'
import { BLACK_SYSTEM_IMAGE_LIST, WHITE_SYSTEM_IMAGE_LIST } from './const'
import styles from './index.module.less'

interface CoverNameCombineProps {
    coverUrl: string
    name: string
    width?: number
    radius?: number
    style?: React.CSSProperties
}

const CoverNameCombine = (props: CoverNameCombineProps) => {
    const { coverUrl, name, width = 361, radius, style } = props || {}

    const isWhiteSystem = WHITE_SYSTEM_IMAGE_LIST.includes(coverUrl)
    const includesList = isWhiteSystem || BLACK_SYSTEM_IMAGE_LIST.includes(coverUrl)

    const zoom = width / 361

    const containerStyle = useMemo(() => {
        return {
            zoom: zoom,
            color: isWhiteSystem ? '#fff' : 'rgba(0,0,0,0.85)',
            ...(radius
                ? { borderRadius: parseInt(`${radius / zoom}`) + 'px', overflow: 'hidden' }
                : {}),
            ...(style || {}),
        }
    }, [zoom, isWhiteSystem, style, radius])

    return (
        <div className={styles.cover_name_combine} style={containerStyle}>
            <div className={styles.cover_name_combine_cover}>
                <img src={coverUrl} alt={name} />
            </div>
            {includesList && (
                <div className={styles.cover_name_combine_name}>
                    <span>{name}</span>
                </div>
            )}
        </div>
    )
}

export default React.memo(CoverNameCombine)
