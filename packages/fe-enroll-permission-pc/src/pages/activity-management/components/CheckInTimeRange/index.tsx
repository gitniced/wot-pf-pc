import { InputNumber } from 'antd'
import styles from './index.module.less'

interface ICheckInTimeRangeProps {
    value?: number[]
    onChange?: (value: any) => void
}

/** 签到时间范围    */
const CheckInTimeRange: React.FC<ICheckInTimeRangeProps> = props => {
    const { value, onChange } = props
    return (
        <div className={styles.check_in_time_range}>
            <span className={styles.left}>活动开始前</span>
            <InputNumber
                min={0}
                max={120}
                value={value?.[0] || 0}
                onChange={e => {
                    onChange?.([e, value?.[1]])
                }}
            />
            <span className={styles.center}>分钟～ 活动结束后</span>
            <InputNumber
                min={0}
                max={120}
                value={value?.[1] || 0}
                onChange={e => {
                    onChange?.([value?.[0], e])
                }}
            />
            <span className={styles.right}>分钟</span>
        </div>
    )
}

export default CheckInTimeRange
