import type { CompanyActivityListItemRespDto } from '../../interface'
import styles from './index.module.less'
import { history } from 'umi'

interface CompanyCardProps {
    params: CompanyActivityListItemRespDto
}

const CompanyCard: React.FC<CompanyCardProps> = ({ params }) => {
    const { professionList = [] } = params || {}
    const firstProfessionList = professionList?.slice(0, 1) || []

    const toOrganizationJobList = () => {
        history.push(`/square/company-details?code=${params.organizationCode}`)
    }

    return (
        <div className={[styles.company_card].join(' ')} onClick={toOrganizationJobList}>
            <div className={[styles.company_card_top].join(' ')}>
                <div
                    className={[styles.company_card_top_info_img].join(' ')}
                    style={{
                        backgroundImage: `url(${
                            params.organizationLogo ? params.organizationLogo : defaultOrgLogo
                        })`,
                    }}
                />
                <div className={[styles.company_card_top_info].join(' ')}>
                    <div className={[styles.company_card_top_info_title].join(' ')}>
                        {params.organizationName}
                    </div>

                    <div className={[styles.company_card_top_info_tag].join(' ')}>
                        {params.scaleName ? <span>{params.scaleName}</span> : null}
                        {params.financingName ? <span>{params.financingName}</span> : null}
                    </div>
                </div>
            </div>
            <div className={[styles.company_card_bottom].join(' ')}>
                <span>热招</span>
                {firstProfessionList.map(i => (
                    <>
                        <div className={[styles.split].join(' ')} />
                        <span className={[styles.job].join(' ')}>{i.professionName}</span>
                        <span>{i.salaryDesc}</span>
                    </>
                ))}
            </div>
        </div>
    )
}

/** 职位广场搜索 */
export default CompanyCard
