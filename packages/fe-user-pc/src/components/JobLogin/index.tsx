/**
 * 就业：院校 企业身份的专题登录页
 * 院校专题：身份为机构 
 * 企业专题：身份为资源方
 */

import React, { useEffect } from 'react'
import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import OrgLoginHooks from './hooks'
import type { PageProps } from '@/types';
import { CURRENT_LOGIN_URL_TYPE_ENUM, CURRENT_LOGIN_URL_TYPE_MAPPING } from '@/types'
import { useLocation, useModel } from 'umi'
import { findSiteData } from '@wotu/wotu-components'
import { Layout, message } from 'antd'
import Footer from '@/components/Global/Footer'
import Header from '@/components/Global/Header'
import { CompanyIntroduce, Recommend, SchoolIntroduce } from './introduce'
import { BASE_URL } from './const'
import { setLocalStorage } from '@/storage'
import LoginForm from './jobLoginForm'
import SellerLoginHooks from '@/pages/seller/login/hooks'
import { setCurrentIdentityCode } from '@/utils/setWorkBenchUtils';
import { MERCHANT_LOGIN_TYPE } from '@wotu/wotu-components/dist/esm/Types';

const JobLogin = (props: PageProps) => {

    const orgLoginStore = useLocalObservable(() => new OrgLoginHooks())
    const sellerLoginStore = useLocalObservable(() => new SellerLoginHooks())

    const { query } = useLocation()

    const { siteStore, userStore, sourceType } = props || {}
    let { siteData } = siteStore || {}

    const masterStore = useModel('@@qiankunStateFromMaster')
    let { setSelectIdentity } = masterStore || {}

    let btnLoading = sourceType === MERCHANT_LOGIN_TYPE.COMPANY ? sellerLoginStore.btnLoading : orgLoginStore.btnLoading
    /**
     *登录
     * @param form
     * @param formRef
     */
    const loginHandler = async (form: any, formRef: any) => {
        switch (sourceType) {
            // 企业身份使用资源方登录
            case MERCHANT_LOGIN_TYPE.COMPANY:
                await sellerLoginStore.loginHandler(form, userStore!, formRef, query)
                break;
            // 高校身份使用机构登录
            case CURRENT_LOGIN_URL_TYPE_ENUM.SCHOOL:
                await orgLoginStore.loginHandler(form, siteStore!, userStore!, formRef)
                break;

            default:
                message.error('当前站点暂未开放登录')
                break;
        }

        // 将工作台中的身份设置为当前登录的身份
        setCurrentIdentityCode(setSelectIdentity, sourceType)

    }

    useEffect(() => {
        if (siteData?.data?.sid) {
            const name = findSiteData(siteData, 'name', { findKey: 'baseInfo' }) || ''
            let currentText = CURRENT_LOGIN_URL_TYPE_MAPPING?.[sourceType]
            document.title = name ? `${currentText}登录-${name}` : `${currentText}登录`
            sourceType && setLocalStorage('SOURCE_TYPE', sourceType)
        }


    }, [sourceType, siteData?.data?.sid])



    return (

        <Layout >
            <div className={styles.layout}>
                <Header noUser={false} noBg={true} padding={false} showGoToHome={sourceType === CURRENT_LOGIN_URL_TYPE_ENUM.SCHOOL} />

                <div className={styles.blank_content}>
                    <img className={styles.banner} src={`${BASE_URL}/job_banner_blue.png`} />
                    {/* 登录表单 */}
                    <LoginForm
                        sourceType={sourceType}
                        loginHandler={loginHandler}
                        btnLoading={btnLoading}
                    />
                </div>
                {/* 介绍等静态数据 */}
                {sourceType === MERCHANT_LOGIN_TYPE.COMPANY && <CompanyIntroduce />}
                {sourceType === CURRENT_LOGIN_URL_TYPE_ENUM.SCHOOL && <SchoolIntroduce />}
                <Recommend sourceType={sourceType} />
                <Footer noBg={true} />
            </div>
        </Layout>

    )
}

export default inject('siteStore', 'userStore')(observer(JobLogin))

