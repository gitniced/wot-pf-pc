import React, { useContext, useEffect, useState } from 'react'
import { Spin } from 'antd'
import { ModalValueContext } from '@/components/ModalProvider'
import ExamineItemCard from './ExamineItemCard'
import ExamineAlert from './ExamineAlert'
import type { QuestionDetailType } from '../../interface'
import styles from '../../index.module.less'
import { getQuestionDetailByCode } from '../../api'
import useCommonParams from '@/hooks/useCommonParams'

const PreviewModal = () => {
    const [loading, setLoading] = useState(false)
    const [dataInfo, setDataInfo] = useState<QuestionDetailType[]>([])
    const commonParams = useCommonParams()

    const { dataSource } = useContext(ModalValueContext)

    useEffect(() => {
        if (!dataSource?.code) return
        setLoading(true)

        getQuestionDetailByCode(`${dataSource.code}`, {...commonParams})
            .then((res: any) => {
                setDataInfo(res)
            })
            .finally(() => setLoading(false))
    }, [dataSource?.code])

    return (
        <div className={styles.preview_examine}>
            <Spin spinning={loading}>
                <div className={styles.preview_examine_title}>{dataSource.title}</div>
                {dataInfo.map(item => (
                    <React.Fragment key={item.questionType}>
                        <ExamineAlert data={item} />
                        <ExamineItemCard data={item} showVersion />
                    </React.Fragment>
                ))}
            </Spin>
        </div>
    )
}

export { default as ExamineAlert } from './ExamineAlert'
export { default as ExamineItemCard } from './ExamineItemCard'

export default PreviewModal
