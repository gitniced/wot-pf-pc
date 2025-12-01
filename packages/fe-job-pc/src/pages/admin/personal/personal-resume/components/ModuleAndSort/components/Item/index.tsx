import { Switch } from 'antd'
import styles from './index.module.less'

const Index = ({
    _active,
    label,
    required = false,
    value,
    onChange,
}: {
    required: boolean
    active: boolean
    label: string
    value: boolean
    onChange: (e: any) => void
}) => {
    const handleChange = (e: any) => {
        onChange?.(e)
    }
    return (
        <div className={styles.container}>
            <div className={styles.label}>{label}</div>
            {!required && (
                <div>
                    {' '}
                    <Switch
                        checked={value}
                        onChange={handleChange}
                        checkedChildren="开"
                        unCheckedChildren="关"
                    />
                </div>
            )}
        </div>
    )
}

export default Index
