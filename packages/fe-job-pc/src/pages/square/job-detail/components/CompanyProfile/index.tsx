import styles from './index.module.less'
import Plat from '@/pages/square/components/Plat'
import Commerce from '@/pages/square/components/Commerce'

/** 公司介绍 */
const CompanyProfile: React.FC<{ data: any }> = ({ data }) => {
    const { address, orgBusinessInfo, introductionDto } = data ?? {}
    const { companyAddress } = address ?? {}
    const addressText = companyAddress

    const orgBusinessInfoList = [
        {
            label: '公司名称',
            value: orgBusinessInfo?.companyName,
        },
        {
            label: '法定代表人',
            value: orgBusinessInfo?.legalRepresentative,
        },
        {
            label: '统一社会信用代码',
            value: orgBusinessInfo?.unifiedSocialCreditCode,
        },
        {
            label: '注册地址',
            value: orgBusinessInfo?.registeredAddress,
        },
        {
            label: '注册资金',
            value: orgBusinessInfo?.registeredCapital,
        },
    ]

    return (
        <div className={styles.company_profile}>
            {introductionDto?.introduction && (
                <div>
                    <h2 className={styles.h2} style={{ marginBottom: '10px' }}>
                        公司介绍
                    </h2>
                    <div className={styles.info}>{introductionDto?.introduction}</div>
                </div>
            )}

            {orgBusinessInfo && (
                <div>
                    <h2 className={styles.h2} style={{ marginBottom: '16px' }}>
                        工商信息
                    </h2>
                    <Commerce data={orgBusinessInfoList} />
                </div>
            )}
            {address?.longitude && address?.latitude && (
                <div>
                    <h2 className={styles.h2} style={{ marginBottom: '16px' }}>
                        工作地址
                    </h2>
                    <Plat
                        longitude={address?.longitude}
                        latitude={address?.latitude}
                        address={addressText}
                    />
                </div>
            )}
        </div>
    )
}

export default CompanyProfile
