import React from 'react'
import styles from '../../index.module.less'

const Top = (props: { paperTitle: string }) => {
    const { paperTitle } = props || {}

    return (
        <div>
            <p className={styles.mg_0}>
                <span className={styles.song_5}>&#xa0;</span>
            </p>
            <p className={`${styles.mg_0} ${styles.text_center}`}>
                <span className={styles.black_2_l}>{paperTitle}</span>
            </p>
            <p className={`${styles.mg_0} ${styles.text_center}`}>
                <span className={styles.black_4_b}>答 案 与 解 析</span>
            </p>
        </div>
    )
}
export default Top
