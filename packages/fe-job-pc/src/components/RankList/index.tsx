import styles from './index.module.less'
import { Divider } from 'antd'

const Index = ({
    label = '',
    columns = [],
    lg = '#fff',
    dataSource = [],
    onlyContent = false,
}: {
    label?: string
    columns: any[]
    lg?: string
    dataSource?: any[]
    onlyContent?: boolean
}) => {
    return (
        <div style={{ background: lg }} className={styles.container}>
            {!onlyContent && (
                <div className={styles.rank_header}>
                    <div>
                        <span className={styles.label}>{label}</span>
                    </div>

                    <div className={styles.sort}>
                        <span>正序</span>
                        <Divider type="vertical" />
                        <span>倒序</span>
                    </div>
                </div>
            )}
            {!onlyContent && <Divider />}
            <div className={styles.column}>
                {columns.map(item => (
                    <div style={item.width ? { width: item.width } : {}} key={item.title}>
                        {item.title}
                    </div>
                ))}
            </div>
            <div className={styles.column}>
                {dataSource.map(dataItem =>
                    columns.map(item => (
                        <div
                            style={item.width ? { width: item.width } : { flex: 1 }}
                            key={item.title}
                        >
                            {dataItem[item.dataIndex]}
                        </div>
                    )),
                )}
            </div>
        </div>
    )
}

export default Index
