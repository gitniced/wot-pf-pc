// import { getLocalStorage } from '@/storage'
import styles from './index.module.less'

type SellerHeaderProps = {
    logo: string
    pcDomain: string
    showBack: boolean
    noBg?: boolean
}

const Header = (props: SellerHeaderProps) => {
    const { logo, showBack, noBg = false } = props

    const gotoPcDomain = () => {
        return
    }

    return (
        <div className={styles.page} style={noBg ? { boxShadow: 'none', background: 'none' } : {}}>
            <div className={styles.logo_content} onClick={gotoPcDomain}>
                <div
                    className={styles.logo}
                    style={{
                        background: `url(${logo || defaultLogo}) no-repeat left center / contain`,
                    }}
                />

                {/* <div className={styles.site_name}>{userToken ? '账号设置' : '登录'}</div> */}
            </div>

            {showBack ? (
                <div className={styles.setting}>
                    <div className={styles.back} onClick={gotoPcDomain}>
                        <svg className={[styles.icon, 'icon'].join(' ')} aria-hidden="true">
                            <use xlinkHref={`#icon_top_home`} />
                        </svg>
                        <span>回到首页</span>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default Header
