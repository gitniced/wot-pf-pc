import { WindowsFilled } from '@ant-design/icons'
import styles from './index.module.less'
import { useLocation } from 'umi'
import { useEffect, useState } from 'react'
import { getCookie } from '@/storage'
import Http from '@/servers/http'
import api from './api'

const Index = () => {
    const { query }: any = useLocation()
    const { inviteCode } = query || {}
    const [applyName, setApplyName] = useState('')
    const [redirection, setRedirection] = useState('')

    const jumpUrl = `${window.location.origin}/invite/apply?inviteCode=${inviteCode}`

    useEffect(() => {
        document.title = '校企合作申请'
        if (getCookie('TOKEN')) {
            window.location.href = jumpUrl
        }
    }, [])

    // 根据邀请码获取报名信息
    const getInfoByInviteCode = async () => {
        const resp = await Http(api.getInviteInfo, 'get', { inviteCode }, { repeatFilter: false })
        const { applyName: newApplyName, redirection: newRedirection } = (resp ||
            {}) as unknown as any
        setApplyName(newApplyName)
        setRedirection(newRedirection)
    }

    // 注册
    const signUp = () => {
        if (!redirection) return
        window.location.href = `${redirection}/seller/register?sourceType=company&companyBackUrl=${jumpUrl}`
    }

    // 登录
    const signIn = () => {
        if (!redirection) return
        window.location.href = `${redirection}/seller/login?sourceType=company&companyBackUrl=${jumpUrl}`
    }

    useEffect(() => {
        getInfoByInviteCode()
    }, [inviteCode])

    return (
        <div className={styles.invite_login_container}>
            <div className={styles.invite_wrap}>
                <div className={styles.apply_name}>{applyName}</div>
                <div className={styles.title}>
                    请你加入智慧就业平台进行校企合作, 一起进入智慧就业时代!
                </div>
                <div className={styles.choice_wrap}>
                    <div onClick={signIn} className={styles.sign_up}>
                        <div className={styles.icon}>
                            <svg className={styles.icon1} aria-hidden="true">
                                <use xlinkHref={`#icon_wode_n`} />
                            </svg>
                        </div>
                        <div className={styles.desc}>已有账号, 去登录</div>
                    </div>
                    <div onClick={signUp} className={styles.sign_up}>
                        <div className={styles.icon}>
                            <svg
                                // t="1697770114248"
                                className={styles.icon1}
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="8128"
                                width="64"
                                height="64"
                            >
                                <path
                                    d="M862.421333 273.408a134.4 134.4 0 0 1 36.992 92.672v291.84c0 47.786667-25.6 92.16-66.986666 116.48l-253.44 146.346667c-41.386667 23.893333-92.586667 23.893333-134.4 0l-145.493334-84.010667 125.866667-125.909333h201.386667l4.821333-0.256c31.530667-3.413333 48.853333-39.509333 30.549333-66.730667-21.717333-32.256-58.709333-56.576-102.912-66.816l303.616-303.616z m17.877334-138.538667l30.165333 30.165334-724.053333 724.053333-30.208-30.122667 724.053333-724.053333zM578.986667 103.253333l172.8 99.754667-155.989334 156.074667a99.413333 99.413333 0 1 0-137.344 137.301333l-273.92 273.877333-0.512-0.298666A134.442667 134.442667 0 0 1 124.16 657.92V366.08c0-47.786667 25.6-92.16 66.986667-116.48l253.44-146.346667c41.386667-23.893333 92.586667-23.893333 134.4 0z"
                                    p-id="8129"
                                />
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
