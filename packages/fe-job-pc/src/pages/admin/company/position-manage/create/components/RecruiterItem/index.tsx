import React from 'react'
import { Space, Typography, Divider } from 'antd'
import styles from './index.module.less'
import type { RecruiterItemProps } from '@/pages/admin/company/recruiter-manage/interface'
import { COMPANY_TYPE_MAPS } from '@/pages/admin/company/recruiter-manage/constants'

const RecruiterItem = (option: RecruiterItemProps) => {
    return (
        <div className={styles.component_recruiter_item} key={option.code}>
            <div className={styles.company_name}>{option.companyName}</div>
            <div className={styles.company_dese}>
                <Space split={<Divider type="vertical" />}>
                    <Typography.Text type="secondary">
                        {COMPANY_TYPE_MAPS[option.companyType]}
                    </Typography.Text>
                    <Typography.Text type="secondary">{`${option.province}${option.city}${option.region}`}</Typography.Text>
                    <Typography.Text type="secondary">{`${option.parentIndustryName}${option.industryName}`}</Typography.Text>
                </Space>
            </div>
        </div>
    )
}

export default RecruiterItem
