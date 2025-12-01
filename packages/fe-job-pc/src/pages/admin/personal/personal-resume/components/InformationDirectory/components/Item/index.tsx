import styles from './index.module.less'
import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons'
import classNames from 'classnames'

const Index = ({
    active,
    label,
    value,
    required = false,
    onChange,
    onPosition,
}: {
    id: string
    active: boolean
    label: string
    required?: boolean
    value?: boolean
    onChange?: (e: any) => void
    onPosition?: () => void
}) => {
    const handleChange = (_event: React.SyntheticEvent, _value: boolean) => {
        _event.stopPropagation()
        onChange?.(_value)
    }

    return (
        <div className={styles.container} onClick={onPosition}>
            <div
                className={classNames(styles.prefix, {
                    [styles.inactive]: !active,
                })}
            />
            <div
                className={classNames(styles.label, {
                    [styles.inactive]: !required && !value,
                })}
            >
                {label}
            </div>
            {!required &&
                (value ? (
                    <MinusCircleFilled onClick={e => handleChange(e, false)} />
                ) : (
                    <PlusCircleFilled onClick={e => handleChange(e, true)} />
                ))}
        </div>
    )
}

export default Index
