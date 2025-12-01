import React from 'react'
import type { IRoute } from 'umi'
import styles from './index.module.less'
import { inject } from 'mobx-react'
import { toMenuFirstPage } from '@/layouts/menuConfig'
import { Button, Tooltip } from 'antd'
import classNames from 'classnames'
import { findConfigValueToBoolean, findSiteData, YsfService } from '@wotu/wotu-components'

const AliasLayout = (props: IRoute) => {
    let { userStore, siteStore } = props
    // 站点是否打开客服按钮
    let showServer = findConfigValueToBoolean(siteStore?.siteData, 'enable_customer_service')

    const getLogoPath = () => {
        return findSiteData(props?.siteStore, 'wap_logo')?.value || ''
    }
    return (
        <div className={styles.case}>
            <div className={styles.header}>
                <div className={styles.header_left}>
                    <img
                        className={styles.header_logo}
                        src={
                            getLogoPath() ||
                            'https://static.zpimg.cn/public/fe_user_pc/images/png_logo%402x.png'
                        }
                    />
                    <div className={styles.header_title}>标杆案例</div>
                </div>
                {/* 客服 */}
                <div className={styles.header_right}>
                    {showServer && (
                        <YsfService
                            style={{ display: 'flex' }}
                            userDate={userStore?.userData}
                            siteData={siteStore?.siteData?.data}
                        >
                            <Tooltip title="客服" placement="bottom">
                                <svg className={classNames('icon', styles.kefu)} aria-hidden="true">
                                    <use xlinkHref="#kefu" />
                                </svg>
                            </Tooltip>
                        </YsfService>
                    )}
                    <Button onClick={toMenuFirstPage} className="extra_button">
                        回到工作台
                    </Button>
                </div>
            </div>

            <div className={styles.content}>{props.children}</div>
        </div>
    )
}

export default inject('userStore', 'siteStore')(AliasLayout)
