import { SearchOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { Input } from 'antd'
const { Search } = Input

interface Props {
    onSearch: (e: string) => void
}

const Index: React.FC<Props> = ({ onSearch }) => {

    return (
        <div className={styles.page}>
            <div className={styles.search_box}>
                <h2 className={styles.h2}>职位广场</h2>
                <Search className={styles.search} placeholder="请输入搜索关键词" allowClear enterButton={
                    <>
                        <SearchOutlined className={styles.icon}/>
                        <span className={styles.text}>搜索</span>
                    </>
                } size="large" onSearch={onSearch} />
            </div>
        </div>
    )
}

/** 职位广场搜索 */
export default Index
