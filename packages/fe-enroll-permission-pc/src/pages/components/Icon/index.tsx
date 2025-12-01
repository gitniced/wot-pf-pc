import React from 'react'

interface IconProps {
    xlinkHref: string
    classList: any[]
}
const Icon = (props: IconProps) => {
    const { xlinkHref, classList = [] } = props
    return (
        <svg className={['icon', ...classList].join(' ')} aria-hidden="true">
            <use xlinkHref={`#${xlinkHref}`} />
        </svg>
    )
}

export default Icon
