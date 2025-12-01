import { InputNumber } from 'antd'
import styles from './index.module.less'

interface ICheckInRangeProps {
    value?: number
    onChange?: (value: any) => void
}

/** 打卡范围    */
const CheckInRange: React.FC<ICheckInRangeProps> = props => {
    const { value, onChange } = props
    return (
        <div className={styles.check_in_range}>
            <span className={styles.left}>距离定位点</span>
            <InputNumber
                min={1}
                max={9999}
                value={value || 1}
                onChange={e => {
                    onChange?.(e)
                }}
            />
            <span className={styles.right}>米内</span>
        </div>
    )
}

export default CheckInRange
