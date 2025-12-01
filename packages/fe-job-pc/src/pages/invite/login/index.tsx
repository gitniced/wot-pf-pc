import styles from './index.module.less'
import { useLocation } from 'umi'


const Index = () => {

    const { query }: any = useLocation()
    const { name } = query || {}

    return (
        <div className={styles.invite_login_container}>
            <div className={styles.invite_wrap} >
                <div className={styles.apply_name} >
                    {name}
                </div>
                <div className={styles.title} >请你加入智慧就业平台进行校企合作, 一起进入智慧就业时代!</div>
                <div className={styles.choice_wrap} >
                <div className={styles.sign_up}>
                    <div className={styles.icon}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={`#icon_wode_n`} />
                        </svg>
                    </div>
                    <div className={styles.desc}>已有账号, 去登录</div>
                </div>
                <div className={styles.sign_up}>
                    <div className={styles.icon}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={`#icon_zhanghao_un`} />
                        </svg>
                    </div>
                    <div className={styles.desc}>没有账号, 去注册</div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Index
