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

const Header: FC<{ data?: ExamineDetailType }> = props => {
    const { data } = props

    return (
        <>
            <TitleBlock title="编辑试卷" />
            <div className={styles.edit_header}>
                <BaseInfoCard data={data} />
                <PaperSettingCard data={data} />
            </div>
        </>
    )
}

export default memo(Header)
