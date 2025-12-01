import React, { useMemo } from 'react'

interface ContentCardProps {
    className?: string
    style?: React.CSSProperties
    width?: React.CSSProperties['width']
    height?: React.CSSProperties['height']
    padding?: React.CSSProperties['padding']
}

const ContentCard: React.FC<React.PropsWithChildren<ContentCardProps>> = props => {
    const style = useMemo<React.CSSProperties>(() => {
        return {
            width: props.width,
            height: props.height,
            padding: props.padding,
            background: '#021630',
            border: '1px solid',
            borderImage:
                'linear-gradient(180deg, rgba(72, 120, 188, 0.15), rgba(95, 145, 215, 0.77), rgba(93, 147, 222, 0.72), rgba(66, 118, 190, 0.33)) 1 1',
            boxSizing: 'border-box',
            ...props.style,
        }
    }, [props.style, props.width, props.height, props.padding])

    return (
        <div style={style} className={props.className}>
            {props.children}
        </div>
    )
}

export default React.memo(ContentCard)
