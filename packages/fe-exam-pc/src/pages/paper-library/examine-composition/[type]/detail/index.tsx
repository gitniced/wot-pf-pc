import React, { useEffect, useState } from 'react'
import { history, useParams } from 'umi'
import http from '@/servers/http'
import API from './api'
import styles from './index.module.less'
import type { DetailType } from './interface'
import Breadcrumbs from '@/components/Breadcrumbs'
import MyTitle from '../../components/MyTitle'
import DetailContent from '../../components/DetailContent'
import { findSiteData } from '@/utils/valueGet'
import useSiteStore from '@/hooks/useSiteStore'
import useCommonParams from '@/hooks/useCommonParams'
import useMasterHistory from '@/hooks/userMasterHistory'
import { DIFFICULTY_LEVEL } from '@/pages/paper-library/[type]/const'

const Detail = () => {
    const masterHistory = useMasterHistory()
    const siteStore = useSiteStore()
    const commonParams = useCommonParams()

    const { type } = useParams() as { type: 'platform' | 'examine' }

    const { code } = history.location.query || {}
    const [detail, setDetail] = useState<DetailType | any>()

    // 获取模板详情
    const getDetail = async () => {
        const res = (await http(`${API.getTemplateDetail}/${code}`, 'get', {
            ...commonParams,
        })) as unknown as DetailType
        const { difficultyConfigList } = res || {}
        const difficultyTableData = difficultyConfigList.map((item: any) => {
            item.levelName = DIFFICULTY_LEVEL[item.level]
            return item
        })
        setDetail({ ...res, difficultyTableData })
    }

    useEffect(() => {
        getDetail()
        const siteName = findSiteData(siteStore.siteData, 'name', { findKey: 'baseInfo' }) || ''
        document.title = `组卷模板详情-${siteName}`
    }, [])

    const { title, customContent } = detail || {}
    const { commonJob } = customContent || {}
    const { jobName, jobType, jobLevel } = commonJob || {}

    const handleClickBreadcrumbs = () => {
        // 平台的页面组卷模板列表
        if (type === 'platform') {
            history.push('/paper-library/examine-composition/list')
        } else {
            // 考评的组卷模板列表
            masterHistory.push('/exam/mine/company/test-paper-template')
        }
    }
    return (
        <div className={styles.detail}>
            <Breadcrumbs
                crumbData={[
                    {
                        name: '组卷模板',
                        isDynamic: true,
                    },
                    { name: '详情' },
                ]}
                onClick={handleClickBreadcrumbs}
            />
            <div className={styles.content}>
                <MyTitle title="组卷模板详情" />
                <div className={styles.description}>
                    <div>
                        <label className={styles.required}>模板名称：</label>
                        <span className={styles.info}>{title}</span>
                    </div>
                    <div className={styles.description_item}>
                        <label className={styles.required}>职业/工种/等级：</label>
                        <span className={styles.info}>
                            {jobName}/{jobType}/{jobLevel}
                        </span>
                    </div>
                    <DetailContent formData={detail} isEdit={false} />
                </div>
            </div>
        </div>
    )
}

export default Detail
