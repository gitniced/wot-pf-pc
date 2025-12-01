import styles from './index.modules.less'
import { Image } from 'antd'
import { title, list } from './const'
/**
 * 服务
 */
const Serve: React.FC = () => {
    return (
        <div className={styles.page}>
            <div className={styles.serve}>
                <div className={[styles.title, 'animated'].join(' ')}>{title}</div>
                <div className={[styles.list, 'animated'].join(' ')}>
                    {list.map(item => (
                        <div className={styles.item} key={item.url}>
                            <Image className={styles.image} src={item.url} preview={false} />
                            <div className={styles.title}>{item.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Serve
