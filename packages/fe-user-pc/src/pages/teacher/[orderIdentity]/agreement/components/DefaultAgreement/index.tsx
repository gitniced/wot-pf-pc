import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { inject, observer } from 'mobx-react'
import type { PageProps } from '@/types'
import { getPrivacy, privacyPolicy, realNamePolicy } from './const'
import { AGREEMENT_TYPE } from '../../const'

// 默认的用户协议
function DefaultAgreement(props: PageProps) {
    const { siteStore, type } = props || {}

    let name = siteStore?.siteData?.data?.baseInfo?.name || '站点名称'

    const [agreementData, SetAgreementData] = useState<any>([])

    useEffect(() => {
        switch (type) {
            // 用户协议
            case AGREEMENT_TYPE.USER_AGREEMENT:
                SetAgreementData(getPrivacy(name))
                break
            // 隐私政策
            case AGREEMENT_TYPE.PRIVACY_POLICY:
                SetAgreementData(privacyPolicy(name))
                break
            // 实名认证协议
            case AGREEMENT_TYPE.REAL_NAME_AGREEMENT:
                SetAgreementData(realNamePolicy(name))
                break
        }
    }, [type])

    return (
        <div className={styles.page}>
            {agreementData?.map?.((item: any, index: number) => {
                let { text, className } = item || {}
                className ??= 'text'
                return (
                    <div key={index} className={styles[className]}>
                        {text}
                    </div>
                )
            })}
        </div>
    )
}
export default inject('siteStore')(observer(DefaultAgreement))
