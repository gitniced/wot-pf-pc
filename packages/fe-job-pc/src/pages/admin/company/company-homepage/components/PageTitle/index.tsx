import styles from './index.module.less'

interface PageTitleProps {
    title: string
}
/** 页头 */
const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
    return (
        <div className={styles.page_title}>
            <span className={styles.title}>{title}</span>
        </div>
    )
}

export default PageTitle