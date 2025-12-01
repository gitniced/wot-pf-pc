import styles from './index.module.less'
const GlobalContent = (props: any) => {
    let style = props?.style || {}
    return (
        <div className={styles.content} style={style}>
            {props.children}
        </div>
    )
}

export default GlobalContent
