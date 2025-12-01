import { history } from 'umi'
import styles from './index.module.less'
import { salaryCount } from '../../utils'
import { Button, Tooltip } from 'antd'
import classNames from 'classnames'

/** 企业卡片 */
const CompanyCard: React.FC<{ data: any; type?: string; className?: string }> = ({
    data,
    type,
    className,
}) => {
    const { professionList = [], organizationSimpleDto = {} } = data ?? {}

    return (
        <div className={`${styles.company_card} ${className}`}>
            <div
                className={classNames(styles.basic_info, {
                    [styles.no_list]: professionList?.length <= 0,
                })}
                onClick={() => {
                    const isApp = location.pathname.includes('/job-center/')
                    if (isApp) {
                        location.href = `/job-center/square/company-details?code=${organizationSimpleDto.code}`
                    } else {
                        location.href = `/square/company-details?code=${organizationSimpleDto.code}`
                    }
                }}
            >
                <div className={styles.header}>
                    <span className={styles.title}>企业基本信息</span>
                </div>

                <div className={styles.content}>
                    <img
                        className={styles.image}
                        src={organizationSimpleDto.logo || defaultOrgLogo}
                    />
                    <div className={styles.organizationName}>{organizationSimpleDto.name}</div>
                </div>

                <div className={styles.tags}>
                    {organizationSimpleDto.financingName ? (
                        <Tooltip title={organizationSimpleDto.financingName} placement="topLeft">
                            <div className={styles.tag_item}>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={`#ic_guimo`} fill="" />
                                </svg>
                                <div className={styles.tag}>
                                    {organizationSimpleDto.financingName}
                                </div>
                            </div>
                        </Tooltip>
                    ) : null}

                    {organizationSimpleDto.scaleName && organizationSimpleDto?.scale ? (
                        <Tooltip title={organizationSimpleDto.scaleName} placement="topLeft">
                            <div className={styles.tag_item}>
                                {' '}
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={`#icon_rongzi`} />
                                </svg>
                                <div className={styles.tag}>{organizationSimpleDto.scaleName}</div>
                            </div>
                        </Tooltip>
                    ) : null}

                    {organizationSimpleDto.industryName ? (
                        <Tooltip title={organizationSimpleDto.industryName} placement="topLeft">
                            <div className={styles.tag_item}>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={`#icon_hangye`} />
                                </svg>
                                <div className={styles.tag}>
                                    {organizationSimpleDto.industryName}
                                </div>
                            </div>
                        </Tooltip>
                    ) : null}
                </div>
            </div>
            {professionList?.length > 0 ? (
                <div className={styles.job_list}>
                    {professionList.map((item: any) => {
                        let tagDtoList = [
                            item?.addressDto?.cityName && item?.addressDto?.regionName
                                ? `${item?.addressDto?.cityName} ${item?.addressDto?.regionName}`
                                : '',
                            item?.recruitSimpleDto?.experienceName
                                ? item?.recruitSimpleDto?.experienceName
                                : '',
                            item?.recruitSimpleDto?.educationName
                                ? item?.recruitSimpleDto?.educationName
                                : '',
                        ].filter(Boolean)
                        return (
                            <div
                                className={styles.job}
                                key={item?.code}
                                onClick={() => {
                                    const isApp = location.pathname.includes('/job-center/')
                                    if (isApp) {
                                        location.href = `/job-center/square/job-detail?code=${item.code}`
                                    } else {
                                        location.href = `/square/job-detail?code=${item.code}`
                                    }
                                }}
                            >
                                <div className={styles.info}>
                                    <div className={styles.title}>{item?.professionName}</div>
                                    <div className={styles.money}>
                                        {salaryCount({
                                            salaryMin: item?.recruitSimpleDto?.salaryMin,
                                            salaryMax: item?.recruitSimpleDto?.salaryMax,
                                            salaryType: item?.recruitSimpleDto?.salaryType,
                                            salaryMonth: item?.recruitSimpleDto?.salaryMonth,
                                            uint: item?.recruitSimpleDto?.uint,
                                            salaryDesc: item?.recruitSimpleDto?.salaryDesc,
                                        })}
                                    </div>
                                </div>
                                {tagDtoList.length > 0 && (
                                    <div className={styles.tags}>
                                        {tagDtoList?.map(tag => (
                                            <div className={styles.tag} key={tag}>
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    {type !== 'index' && (
                        <div className={styles.btn_box}>
                            <Button
                                className={styles.button}
                                onClick={() =>
                                    history.push(
                                        `/square/company-details?code=${organizationSimpleDto.code}&key=recruit_position`,
                                    )
                                }
                            >
                                查看全部职位
                            </Button>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    )
}

export default CompanyCard
