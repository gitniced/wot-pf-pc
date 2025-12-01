import { SearchOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { Input } from 'antd'

const { Search } = Input

interface Props {
    defaultValue: string
    onSearch: (value: string) => void
}

const Index: React.FC<Props> = ({ onSearch, defaultValue }) => {
    return (
        <div className={styles.page}>
            <div className={styles.search_box}>
                <Search
                    className={styles.search}
                    placeholder="请输入搜索关键词"
                    allowClear
                    enterButton={
                        <>
                            <SearchOutlined className={styles.icon} />
                            <span className={styles.text}>搜索</span>
                        </>
                    }
                    size="large"
                    onSearch={onSearch}
                    defaultValue={defaultValue}
                />
            </div>
        </div>
    )
}

/** 职位列表搜索 */
export default Index
