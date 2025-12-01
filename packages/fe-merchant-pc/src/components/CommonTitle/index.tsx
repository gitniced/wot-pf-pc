import type { CSSProperties } from 'react'
import styles from './index.module.less'

interface IProps {
    style: CSSProperties
}
const Index: React.FC<IProps> = props => {
    return (
        <div style={props?.style} className={styles.container1}>
            <div className={styles.left} />
            <span>{props.children}</span>
        </div>
    )
}

export default Index
