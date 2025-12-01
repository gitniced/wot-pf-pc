// 试卷详情

import { Space } from 'antd'
import styles from './index.module.less'
import { GRADING_TYPE_ENUM, GRADING_TYPE_OPTIONS } from '../grading-manage/constants'
import type { IPaperDetail } from './interface'

const PaperDetail = ({
    source,
    gradingType,
    examTitle,
    paperTitle,
    stuName,
    submitSort,
    isFinish,
}: Partial<IPaperDetail>) => {
    const gradingTypeObj = [...GRADING_TYPE_OPTIONS,  {
        label: '纯客观题',
        value: GRADING_TYPE_ENUM.ALLOBJECTIVE,
        color: '#1678FF',
        bgColor: '#EDF5FF'
    },].find(item => item.value === gradingType)

    return (
        <div className={styles.component_paper_detail}>
            <div className={styles.paper_detail_wrapper}>
                <Space size={16}>
                    <div
                        className={styles.GRADING_TYPE_tag}
                        style={{
                            color: gradingTypeObj?.color,
                            backgroundColor: gradingTypeObj?.bgColor,
                            borderColor: gradingTypeObj?.color,
                        }}
                    >
                        {gradingTypeObj?.label}
                    </div>
                    <div className={styles.exam_info}>
                        <div className={styles.paper_name}>{paperTitle}</div>
                        <div className={styles.exam_name}>考试名称：{examTitle}</div>
                    </div>
                </Space>
                <Space>
                    {source === 'organization' ? (
                        <div className={styles.student_name}>考生：{stuName}</div>
                    ) : (
                        !isFinish && (
                            <div className={styles.submit_sort}>当前考卷序号：{submitSort}</div>
                        )
                    )}
                </Space>
            </div>
        </div>
    )
}

export default PaperDetail
