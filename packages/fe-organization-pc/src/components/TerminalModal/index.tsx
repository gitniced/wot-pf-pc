import React, { useState } from 'react'
import styles from './index.module.less'

export default () => {
    const [vis, setVis] = useState(true)
    return (
        <>
            {vis ? (
                <div className={styles.mask}>
                    <div className={styles.modal_content}>
                        <div className={styles.modal_title}>温馨提示</div>
                        <div className={styles.modal_text}>
                            检测到您当前打开的页面不适配手机端使用，请使用电脑浏览和操作
                        </div>
                        <div
                            className={styles.modal_bottom}
                            onClick={() => {
                                setVis(false)
                            }}
                        >
                            我知道了
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}
