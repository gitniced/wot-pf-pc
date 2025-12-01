import { List } from 'antd'

import styles from './index.module.less'

const workDays = [
    { value: '0', label: '不限' },
    { value: '1', label: '周一' },
    { value: '2', label: '周二' },
    { value: '3', label: '周三' },
    { value: '4', label: '周四' },
    { value: '5', label: '周五' },
    { value: '6', label: '周六' },
    { value: '7', label: '周日' },
]

const Index = ({
    value = [],
    onChange,
}: {
    value?: string[]
    onChange?: (params: object) => void
}) => {
    const handleClick = (val: string) => {
        if (val === '0') {
            if (value.includes(val)) {
                onChange?.([])
            } else {
                onChange?.(['0'])
            }
        } else {
            if (value.includes(val)) {
                onChange?.(value.filter(item => item !== val && item !== '0'))
            } else {
                onChange?.([...value, val].filter(item => item !== '0'))
            }
        }
    }

    return (
        <div className={styles.container}>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={workDays}
                renderItem={item => (
                    // @ts-ignore
                    <List.Item>
                        <div
                            onClick={() => handleClick(item.value)}
                            className={
                                value.includes(item.value) ? styles.active_item : styles.item
                            }
                        >
                            {item.label}
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Index
