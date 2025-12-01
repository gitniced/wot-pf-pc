/**
 * 头部信息
 */
import { memo } from 'react'
import type { FC } from 'react'
import TitleBlock from '@/components/TitleBlock'
import BaseInfoCard from './BaseInfoCard'
import PaperSettingCard from './PaperSettingCard'
import type { ExamineDetailType } from '../../interface'

import styles from '../../index.modules.less'

const Header: FC<{ data?: ExamineDetailType, isDetail?: boolean }> = props => {
    const { data, isDetail } = props

    return (
        <>
            <TitleBlock title={isDetail ? '查看试卷结构' : '编辑试卷'} />
            <div className={styles.edit_header}>
                <BaseInfoCard data={data} />
                <PaperSettingCard data={data} />
            </div>
        </>
    )
}

export default memo(Header)
