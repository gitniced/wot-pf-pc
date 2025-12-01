import styles from './index.module.less'

interface CircleProgressProps {
    /** 当前值 */
    current: number
    /** 总值 */
    total: number
    /** 圆环大小 */
    size?: number
    /** 线条宽度 */
    strokeWidth?: number
    /** 进度条颜色 */
    strokeColor?: string
    /** 背景圆环颜色 */
    trailColor?: string
    /** 是否显示百分比文字 */
    showPercent?: boolean
    /** 自定义样式类名 */
    className?: string
    /** 中心圆环颜色 */
    centerRender?: React.ReactNode
}

/**
 * 圆形进度条组件
 */
const CircleProgress: React.FC<CircleProgressProps> = ({
    current,
    total,
    size = 58,
    strokeWidth = 6,
    strokeColor = '#1678FF',
    trailColor = 'rgba(22,120,255,0.15)',
    className = '',
    centerRender,
}) => {
    // 计算百分比
    const percentage = total === 0 ? 0 : Math.round((current / total) * 100)

    const finalStrokeColor = strokeColor

    // 计算圆环参数
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
        <div
            className={`${styles.circle_progress} ${className}`}
            style={{ width: size, height: size }}
        >
            <svg
                width={size}
                height={size}
                className={styles.circle_svg}
                style={{ transform: 'scaleX(-1)' }}
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={trailColor}
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={finalStrokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className={styles.progress_circle}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </svg>

            {centerRender && <div className={styles.center_render}>{centerRender}</div>}
        </div>
    )
}

export default CircleProgress
