import React from 'react'
import styles from './index.module.less'

function Empty({ desc }: { desc: string }) {
    return (
        <div className={styles.empty_image_warp}>
            <img
                src="https://static.zpimg.cn/public/fe_saas_pc/image/png_tianjiazujian%402x.png"
                alt=""
                className={styles.empty_image}
            />
            <div className={styles.empty_image_warp_desc}>{desc || ''}</div>
        </div>
    )
}

export default Empty
