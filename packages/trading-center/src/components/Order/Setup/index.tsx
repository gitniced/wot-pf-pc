import React from 'react'
import styles from './index.module.less'

function Setup({ setup = 1 }) {
    return (
        <div className={styles.setup}>
            <div className={styles[setup === 1 ? 'confirm_show' : 'confirm']}>① 订单确认</div>
            <div className={styles[setup === 2 ? 'play_show' : 'play']}>② 支付</div>
            <div className={styles[setup === 3 ? 'success_show' : 'success']}>③ 支付成功</div>
        </div>
    )
}

export default Setup
