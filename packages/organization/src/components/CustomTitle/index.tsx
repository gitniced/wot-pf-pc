import styles from './index.module.less'
const CustomTitle = ({
    title,
    moreHandler,
    style = {},
}: {
    title: string
    style?: Record<string, string | number>
    moreHandler?: () => void
}) => {
    // if (moreHandler){

    // }else{

    // }
    return (
        <div className={styles.content} style={style}>
            <div className={styles.left}>
                <div className={styles.sign} />
                <div className={styles.title}>{title}</div>
            </div>

            {moreHandler ? (
                <div className={styles.right} onClick={moreHandler}>
                    查看更多
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref={`#icon_shouqi`} />
                    </svg>
                </div>
            ) : null}
        </div>
    )
}
export default CustomTitle
