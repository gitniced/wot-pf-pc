import styles from './index.module.less'
import { Button } from 'antd'
import Slider from 'react-slick'
import type { UserOrgItem } from '@/stores/interface'

const Swiper = (props: { orgData: UserOrgItem[]; currentUserCode: string }) => {
    const NextArrow = (swiper: any) => {
        return (
            <div className={styles.swiper_next} onClick={swiper.onClick}>
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`#icon_jiantou_you`} />
                </svg>
            </div>
        )
    }

    const PrevArrow = (swiper: any) => {
        return (
            <div className={styles.swiper_prev} onClick={swiper.onClick}>
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`#icon_jiantou_zuo`} />
                </svg>
            </div>
        )
    }

    const swiperConfig = {
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    }

    const toFromDomain = (code: string) => {
        console.log(code)

        // setCookie('SELECT_ORG', code)
        // const fromDomain = getCookie('FROM_DOMAIN')
        // if (!fromDomain) return
        // window.location.replace(fromDomain)
    }

    const getOrg = (data: UserOrgItem[]) => {
        return data.map(item => {
            const { userRole, name, userCode, organizationCode, logo } = item

            return (
                <div
                    key={`${name}${userRole}`}
                    className={styles.swiper_item}
                    onClick={() => {
                        toFromDomain(organizationCode)
                    }}
                >
                    <div
                        className={styles.logo}
                        style={{
                            backgroundImage: `url(${
                                logo
                                    ? logo
                                    : 'https://static.zpimg.cn/public/fe_user_pc/images/default_org%402x.png'
                            })`,
                        }}
                    />

                    <div className={styles.title}>{name}</div>
                    <Button className={styles.btn}>
                        {props?.currentUserCode?.toString() === userCode?.toString()
                            ? '机构创建者'
                            : userRole}
                    </Button>
                </div>
            )
        })
    }

    return (
        <div className={styles.swiper}>
            <Slider {...swiperConfig}>{getOrg(props.orgData)}</Slider>
        </div>
    )
}

export default Swiper
