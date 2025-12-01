import styles from './index.module.less'

import Search from '@/pages/square/components/Search'
import FilterButtons from '@/pages/square/job-list/components/FilterButtons'
import CardList from '@/pages/square/job-list/components/CardList'
import React from 'react'

export interface HostPositionsProps {
    jobData: any
    jobParams: {
        professionName?: string
        cityCode?: string
    }
    setJobParams: (params: { professionName: string; cityCode?: string; pageNo?: number }) => void
}

/** 热招职位 */
const HostPositions: React.FC<HostPositionsProps> = ({ jobData, jobParams, setJobParams }) => {
    return (
        <div className={styles.similar_positions}>
            <div className={styles.main}>
                <div className={styles.search_content}>
                    <div className={`${styles.search_box} ${!top && styles.no_top}`}>
                        <Search
                            defaultValue={{
                                professionName: jobParams.professionName,
                                cityCode: jobParams.cityCode,
                            }}
                            onSearch={(professionName: any, cityCode?: string) =>
                                setJobParams({ professionName, cityCode, pageNo: 1 })
                            }
                        />
                        <FilterButtons jobParams={jobParams} setJobParams={setJobParams} />
                    </div>
                </div>
                <CardList data={jobData} setJobParams={setJobParams} source="company_detail" />
            </div>
        </div>
    )
}

export default HostPositions
