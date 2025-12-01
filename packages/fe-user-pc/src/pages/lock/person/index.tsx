import { Button } from 'antd'
import type { IRoute } from 'umi'
import { history } from 'umi'
import styles from './index.module.less'
import { inject, observer } from 'mobx-react'
import type UserStore from '@/stores/userStore'
import type SiteStore from '@/stores/siteStore'
import { findSiteData } from '@wotu/wotu-components'
import { useEffect } from 'react'
import { getLocalStorage } from '@/storage'

type PersonProps = IRoute & {
    userStore: UserStore
    siteStore: SiteStore
}

enum CREATE_ORG_PERMISSION {
    CAN_NOT_CREATE = 0,
    CAN_CREATE,
}

const Person = (props: PersonProps) => {
    const {
        userStore,
        siteStore: { siteData },
    } = props
    let siteName = findSiteData(siteData, 'name', { findKey: 'baseInfo' }) || ''

    siteName = siteName ? `-${siteName}` : siteName
    // 资源方站点和普通站点创建机构的key不同
    let createFlagKey =
        Number(siteData.data?.sid) === 1 ? 'login_merchant_create_org' : 'login_org_create_org'
    const canCreateOrg = Number(findSiteData(siteData, createFlagKey)?.value || 0)

    const gotoCreate = () => {
        history.replace('/organization/create')
    }
    useEffect(() => {
        if (userStore.userOrg.length) {
            history.replace('/account')
        }
    }, [userStore.userOrg.length])

    useEffect(() => {
        document.title = `暂无权限${siteName}`
    }, [siteName])

    const gotoLoginPage = () => {
        const sid = getLocalStorage('SID')
        if (sid.toString() === '1') {
            const sourceType = getLocalStorage('SOURCE_TYPE')
            userStore.login_out(`/seller/login?sourceType=${sourceType}`)
        } else {
            userStore.login_out('/account/user/login')
        }
    }

    const LockView = {
        [CREATE_ORG_PERMISSION.CAN_CREATE]: (
            <div className={[styles.page].join(' ')}>
                <div className={styles.sign} />
                <div className={styles.sign_title}>该账号不是机构管理员</div>

                <div className={[styles.info_des, styles.mt_12].join(' ')}>你可以选择：</div>
                <div className={styles.info_des}>1、直接创建新机构，成为机构管理员；</div>
                <div className={styles.info_des}>2、更换账号重新登录</div>
                <Button
                    type={'primary'}
                    className={[styles.login_btn, styles.mt_36].join(' ')}
                    onClick={gotoLoginPage}
                >
                    重新登录
                </Button>
                <Button type={'text'} className={styles.gray_btn} onClick={gotoCreate}>
                    创建机构
                </Button>
            </div>
        ),
        [CREATE_ORG_PERMISSION.CAN_NOT_CREATE]: (
            <div className={[styles.page, styles.h_498].join(' ')}>
                <div className={styles.sign} />
                <div className={styles.sign_title}>该账号不是机构管理员</div>
                <div className={[styles.info_des, styles.text_center, styles.mt_24].join(' ')}>
                    您可以更换账号重新登录
                </div>
                <Button
                    type={'primary'}
                    className={[styles.login_btn, styles.mt_40].join(' ')}
                    onClick={gotoLoginPage}
                >
                    重新登录
                </Button>
            </div>
        ),
    }

    return LockView[canCreateOrg as unknown as CREATE_ORG_PERMISSION]
}

const ObserverPerson = inject('userStore', 'siteStore')(observer(Person))

export default ObserverPerson
