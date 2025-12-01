// import { getLocalStorage } from '@/storage'
// import { getCookie } from '@/storage'
import styles from './index.module.less'
import { SuperLink } from '@wotu/wotu-components'
// import { history } from 'umi'

type SellerHeaderProps = {
    logo: string
    lecturerDomain: string
    showBack: boolean
    noBg?: boolean
    backLogin?: boolean
}

const Header = (props: SellerHeaderProps) => {
    const { logo, showBack, noBg = false, lecturerDomain } = props

    const gotoPcDomain = e => {
        e.preventDefault()
        // if (getCookie('TOKEN')) {

        // } else {
        //     const personMerchantRoute = getCookie('PERSON_MERCHANT_ROUTE')
        //     backLogin && history.replace(`/teacher/${personMerchantRoute}/login`)
        // }
        location.href = lecturerDomain
        return
    }

    return (
        <div className={styles.page} style={noBg ? { boxShadow: 'none', background: 'none' } : {}}>
            <SuperLink href={lecturerDomain} className={styles.logo_content} onClick={gotoPcDomain}>
                <div
                    className={styles.logo}
                    style={{
                        background: `url(${logo || defaultLogo}) no-repeat left center / contain`,
                    }}
                />

                {/* <div className={styles.site_name}>{userToken ? '账号设置' : '登录'}</div> */}
            </SuperLink>

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
