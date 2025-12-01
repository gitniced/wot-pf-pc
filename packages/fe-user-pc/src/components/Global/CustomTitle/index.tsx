import styles from './index.module.less'
import { SuperLink } from '@wotu/wotu-components'

const CustomTitle = ({
    title,
    moreHandler,
    marginBottom = '0',
    moreUrl,
}: {
    title: string
    moreHandler?: () => void
    moreUrl?: string
    marginBottom?: string | number
}) => {
    return (
        <div className={styles.content} style={{ marginBottom }}>
            <div className={styles.left}>
                <div className={styles.sign} />
                <div className={styles.title}>{title}</div>
            </div>

            {moreHandler ? (
                <SuperLink className={styles.right} href={moreUrl} onClick={moreHandler}>
                    查看更多
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref={`#icon_shouqi`} />
                    </svg>
                </SuperLink>
            ) : null}
        </div>
    )
}
export default CustomTitle
