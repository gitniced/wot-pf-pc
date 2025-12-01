import React, { useLayoutEffect, useRef, useState } from 'react'
import './index.less'

export default function Cover({
    cover,
    color,
    text,
    width,
    fontStyles = {},
}: {
    cover?: string
    color?: string
    text?: string
    width?: number
    fontStyles?: any
}) {
    const coverRef = useRef<HTMLDivElement>(null)
    const [fontSize, setFontSize] = useState<number>(16)
    useLayoutEffect(() => {
        if (coverRef.current) {
            const height = coverRef.current.offsetHeight
            if (height) {
                // 6行文字，每行高度为 fontSize * lineHeight
                // 6 * fontSize * 1.5 = height
                const size = height / (6 * 1.5)
                setFontSize(size)
            }
        }
    }, [])

    return (
        <div style={{ width: width || '100%' }} ref={coverRef}>
            <div
                className={'pt_enroll__cover_wrapper'}
                style={{ backgroundImage: `url(${cover})`, color }}
            >
                <div className={'pt_enroll__title'} style={{ fontSize, ...fontStyles }}>
                    {text}
                </div>
            </div>
        </div>
    )
}
