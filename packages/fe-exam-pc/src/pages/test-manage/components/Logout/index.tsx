// 退出登录组件
import { observer } from 'mobx-react'
import styles from './index.module.less'
import { LogoutWhiteIcon } from '@/pages/test-manage/exam/constant'
import { backUserQuickLogin } from '@/utils/urlUtils'
import classNames from 'classnames'
import useSiteStore from '@/hooks/useSiteStore'

const Logout = (props: { showBg?: boolean; showLogout?: boolean }) => {
    const { showBg = true, showLogout = true } = props
    const siteStore = useSiteStore()

    const onLogout = () => {
        backUserQuickLogin(siteStore?.siteData)
    }

    return (
        <div
            className={classNames(styles.component_logout, {
                [styles.bg]: showBg,
            })}
        >
            <img
                src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-exam-pc/logo_white%402x.png"
                className={styles.logo}
            />
            {showLogout && (
                <div className={styles.logout_inner} onClick={onLogout}>
                    <img src={LogoutWhiteIcon} alt="logoutIcon" />
                    <span className={styles.text}>退出登录</span>
                </div>
            )}
        </div>
    )
}

export default observer(Logout)
