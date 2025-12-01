import styles from './index.module.less'
import { DimensionHierarchyItem, JudgmentResultItem, SurveyScoreItem } from './interface'
import AssistanceMeasures from './AssistanceMeasures'
import DiagnosisResults from './DiagnosisResults'
import React from 'react'

const SecondStep = React.forwardRef(
    (
        {
            surveyScoreList,
            judgmentResults,
            dimensionHierarchy,
        }: {
            surveyScoreList: SurveyScoreItem[]
            judgmentResults: JudgmentResultItem[]
            dimensionHierarchy: DimensionHierarchyItem[]
        },
        ref: any,
    ) => {
        return (
            <div className={styles.second_step_content}>
                {/* 诊断结果 */}
                <DiagnosisResults
                    surveyScoreList={surveyScoreList}
                    judgmentResults={judgmentResults}
                    dimensionHierarchy={dimensionHierarchy}
                />

                {/* 帮扶措施 */}
                <AssistanceMeasures ref={ref} />
            </div>
        )
    },
)

export default SecondStep
