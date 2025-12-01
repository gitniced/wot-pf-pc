import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import accountHooks from './hooks'
import type { PageProps } from '@/types'
import type { IRoute } from 'umi'
import CustomTitle from '@/components/Global/CustomTitle'
import { useEffect } from 'react'
import UserInformation from '@/components/Global/UserInformation'
import GetLogDom from './components/GetLogDom'
import GetBindMind from './components/GetBindMind'
import GetBindItem from './components/GetBindItem'
import ChangeBindModal from '@/pages/bind/components/ChangeBindModal'
const orgImg = new Image()
orgImg.src = 'https://static.zpimg.cn/public/fe_user_pc/images/account_org.png'
const orgImgActive = new Image()
orgImgActive.src = 'https://static.zpimg.cn/public/fe_user_pc/images/account_org_active.png'

const Account = observer((props: PageProps) => {
    const { userStore } = props
    const hooks = useLocalObservable(() => new accountHooks())

    useEffect(() => {
        if (userStore?.userData) {
            hooks.getAccountBind(userStore?.userData)
            hooks.getAccountLog()
        }
    }, [userStore?.userData])

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <div className={styles.left_content}>
                    <div className={styles.account_bind}>
                        <GetBindMind
                            accountBind={hooks.accountBind}
                            fixBind={hooks.fixBind}
                            userData={userStore?.userData}
                            getBindUrl={hooks.getBindUrl}
                        />

                        <div className={styles.account_item_list}>
                            <GetBindItem
                                accountBind={hooks.accountBind}
                                fixBind={hooks.fixBind}
                                userData={userStore?.userData}
                                getBindUrl={hooks.getBindUrl}
                            />
                        </div>
                    </div>

                    <div className={styles.account_bind}>
                        <CustomTitle
                            title="最近登录记录"
                            moreHandler={hooks.toLoginLog}
                            moreUrl="/recode"
                        />
                        <div className={styles.log_list}>
                            <div className={styles.log_list_title_item}>登录方式</div>
                            <div className={styles.log_list_title_item}>登录IP</div>
                            <div className={styles.log_list_title_item}>终端</div>
                            <div className={styles.log_list_title_item}>登录时间</div>
                        </div>
                        <GetLogDom accountLog={hooks.accountLog} />
                    </div>
                </div>
                <div className={styles.right_content}>
                    {/* @ts-ignore */}
                    <UserInformation />
                </div>
            </div>
            <ChangeBindModal
                bindModalVisible={hooks.bindModalVisible}
                setBindModalVisible={hooks.setBindModalVisible}
                email={userStore?.userData?.email}
                mobile={userStore?.userData?.mobile}
            />
        </div>
    )
})

const ObserverAccount: IRoute = inject('userStore', 'siteStore')(Account)

ObserverAccount.title = '我的账号'

export default ObserverAccount
