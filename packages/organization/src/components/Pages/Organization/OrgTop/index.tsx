import React from 'react'
import styles from './index.module.less'
import { history } from 'umi'
import { Tooltip } from 'antd'
import dayjs from 'dayjs'
import type { PropsType, stateType } from './interface'
import { certifyStatusObj } from '@/types'

export default function Index(props: PropsType) {
    let { organizationDetail } = props
    let {
        logo,
        name,
        provinceName,
        cityName,
        areaName,
        createdAt,
        code,
        certifyStatus,
        industryList,
    } = organizationDetail || {}

    industryList ??= []
    createdAt = dayjs(createdAt).format('YYYY年MM月DD日') ?? '-'

    let industryNames = industryList.map((item, index: number) => {
        if (!index) {
            return item?.name
        } else {
            return '/' + item?.name
        }
    })
    let whereNames = provinceName || '-'
    whereNames += cityName ? `·${cityName}` : '-'
    whereNames += areaName ? `·${areaName}` : '-'

    // 跳转页面
    const gotoPage = (path: string, state?: stateType) => {
        history.push(path, state)
    }
    return (
        <>
            <div className={styles.nav}>
                <img className={styles.logo} src={logo || defaultOrgLogo} alt="" />
                <div className={styles.right}>
                    <div className={styles.nav_title}>
                        <span> {name}</span>

                        {name && (
                            <span onClick={() => gotoPage(`/detail?code=${code}`)}>
                                <svg className={[styles.icon, 'icon'].join(' ')} aria-hidden="true">
                                    <use xlinkHref={'#icon-pingjia'} />
                                </svg>
                            </span>
                        )}
                    </div>

                    <div className={styles.nav_info}>
                        <Tooltip title={industryNames}>
                            <div className={styles.nav_info_detail}>
                                所属行业：
                                <span>{industryNames}</span>
                            </div>
                        </Tooltip>
                        <Tooltip title={whereNames}>
                            <div className={styles.nav_info_detail}>
                                所在地：
                                <span>{whereNames}</span>
                            </div>
                        </Tooltip>
                        <Tooltip title={createdAt}>
                            <div className={styles.nav_info_detail}>
                                创建时间：<span>{createdAt}</span>
                            </div>
                        </Tooltip>
                        <div className={styles.nav_info_detail}>
                            认证状态：
                            <img
                                src={certifyStatusObj?.[certifyStatus]?.img}
                                style={{ height: '28px', width: 'auto', marginRight: 8 }}
                            />
                            {/* {certifyStatusObj?.[certifyStatus]?.url ? (
                                <span
                                    onClick={() => {
                                        gotoPage('/prove', { code, name })
                                    }}
                                    className={styles.nav_info_detail_approve}
                                >
                                    {certifyStatusObj?.[certifyStatus]?.text}
                                    <svg
                                        className={[styles.icon_shouqi, 'icon'].join(' ')}
                                        aria-hidden="true"
                                        preserveAspectRatio="xMidYMid slice"
                                    >
                                        <use xlinkHref={`#icon_shouqi`} />
                                    </svg>
                                </span>
                            ) : null} */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
