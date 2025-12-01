interface RingProps {
    size?: number
    stroke?: number
    progress: number
    fgColor?: string
    bgColor?: string
}

const RingProgress = ({
    size = 64,
    stroke = 10,
    progress,
    fgColor = '#4A8BFF',
    bgColor = 'rgba(91, 143, 249, 0.10)',
}: RingProps) => {
    const radius = (size - stroke) / 2
    const len = 2 * Math.PI * radius

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={bgColor}
                strokeWidth={stroke}
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={fgColor}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={len}
                strokeDashoffset={(1 - progress) * len}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
        </svg>
    )
}

export default RingProgress
