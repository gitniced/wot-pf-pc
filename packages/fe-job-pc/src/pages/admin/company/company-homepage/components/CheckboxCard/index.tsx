import { Col, Row } from 'antd'
import styles from './index.module.less'

type Value = string | number

type Option = string | (
    {
        label: string,
        value: Value
    }
)

interface CheckboxCardProps {
    value?: Value[],
    onChange?: (e: Value[]) => void,
    options: Option[]
}

const CheckboxCard: React.FC<CheckboxCardProps> = ({
    options,
    value = [],
    onChange
}) => {

    /** 点击某一项数据 */
    const onClick = (e: Value) => {
        const index = value.findIndex(item => item === e)
        if (index === -1) {
            onChange?.([...value, e])
        } else {
            const _value = [...value]
            _value.splice(index, 1)
            onChange?.(_value)
        }
    }

    return (
        <Row className={styles.checkbox_card} gutter={[16, 16]}>
            {options.map(item => {
                const _label = item?.label ?? item
                const _value = item?.value ?? item
                return (
                    <Col key={_value}>
                        <div
                            className={[styles.item, value.find(_item => _item === _value) && styles.active].join(' ')}
                            onClick={() => onClick(_value)}
                        >
                            {_label}
                        </div>
                    </Col>
                )
            })}
        </Row>
    )
}

export default CheckboxCard