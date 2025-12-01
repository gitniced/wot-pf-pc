import React from 'react'
import { history } from 'umi'
import styles from './index.module.less'
import { Button } from 'antd'
import classNames from 'classnames'

export default function InitDom() {
    // 跳转页面
    const gotoPage = (path: string, state?: any) => {
        history.push(path, state)
    }
    return (
        <div className={styles.banner}>
            <svg
                className={[styles.icon, 'icon'].join(' ')}
                aria-hidden="true"
                width="100%"
                height="100%"
                viewBox="0 0 7999 1024"
                preserveAspectRatio="none meet"
            >
                <use xlinkHref={`#bg_zuzhi`} />
            </svg>

            <div className={styles.banner_mine}>
                <div className={styles.banner_title}>机构新建</div>
                <div className={styles.banner_text}>
                    还未建立新的机构？您可以新建一个机构，并关联相关人员，对其进行权限配置。建立自己团队的机构架构吧
                </div>
                <Button
                    type="primary"
                    onClick={() => {
                        gotoPage('/create')
                    }}
                    className={classNames(styles.banner_set, styles.btn)}
                >
                    去新建
                </Button>
            </div>
        </div>
    )
}
