import { useState } from 'react'
import styles from './index.module.less'

const BtnGroup = ({ list = [] }: any) => {
    const [active, _setActive] = useState(0)

    return (
        <div className={styles.container}>
            {list.map((item: any, i: number) => (
                <div key={i} className={active === i ? styles.active_btn : styles.btn}>
                    {item?.name}
                </div>
            ))}
        </div>
    )
}

export default BtnGroup
