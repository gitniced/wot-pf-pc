import styles from './index.module.less'
import { useState } from 'react'
import type { DimensionHierarchyItem, JudgmentResultItem, SurveyScoreItem } from './interface'
import TitleAdvance from '@/components/TitleAdvance'
import AnswerDetailModal from './AnswerDetailModal'
import DiagnosisRecordModal from './DiagnosisRecordModal'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import { LEVEL_TEXT } from './consts'
import { useLocation } from 'umi'
import { RightOutlined } from '@ant-design/icons'

const DiagnosisResults = ({
    surveyScoreList,
    judgmentResults,
    dimensionHierarchy,
}: {
    surveyScoreList: SurveyScoreItem[]
    judgmentResults: JudgmentResultItem[]
    dimensionHierarchy: DimensionHierarchyItem[]
}) => {
    const store = useLocalObservable(() => Store)
    const { query: { code } } = useLocation()
    const [openRecordModal, setOpenRecordModal] = useState<boolean>(false)
    const [openDetailModal, setOpenDetailModal] = useState<boolean>(false)
    // 项目分类
    const [projectClassification, setProjectClassification] = useState<string>()
    // 评分结果label
    const [resultLabel, setResultLabel] = useState<string>()
    // 评分结果value
    const [resultValue, setResultValue] = useState<string | number>()
    // 答题详情
    const [questionList, setQuestionList] = useState<any[]>()
    // 问题类型 1 求职者调查 2 问题研判
    const [type, setType] = useState<any>()

    const projectClassificationList = [
        { key: 'employmentMentality', value: '就业心态', module: "3" },
        { key: 'conditionsOfEmployment', value: '就业条件', module: "1" },
        { key: 'jobHuntingAbility', value: '求职能力', module: "2" },
    ]

    const handleShowDetailModal = (
        classification: {value: string, module: string},
        result: string | number,
        label: string,
        type: number
    ) => {
        const { surveyQuestionList, judgmentQuestionList } = store
        const questionList = type === 1 ? surveyQuestionList : judgmentQuestionList
        
        setType(type)
        setQuestionList(questionList.filter(item => item.moduleCode === classification?.module))
        setOpenDetailModal(true)
        setProjectClassification(classification?.value)
        setResultLabel(label)
        setResultValue(result)
    }

    const getOptionRecord = () => {
        store.getListLog({ recordCode: code }).then(res => {
            setOpenRecordModal(true)
        })
    }

    return (
        <div className={styles.diagnosis_results}>
            <div className={styles.header}>
                <TitleAdvance title="诊断结果" />
                <div className={styles.right} onClick={() => getOptionRecord()}>
                    诊断记录 <RightOutlined />
                </div>
            </div>

            <div className={styles.table}>
                {/* 项目分类 */}
                <div className={styles.table_tr}>
                    <div className={styles.table_tr_td}>项目分类</div>
                    {projectClassificationList.map(item => (
                        <div className={styles.table_tr_td} key={item.key}>
                            {item.value}
                        </div>
                    ))}
                </div>
                <div className={styles.table_tr}>
                    <div className={styles.table_tr_td}>求职者调查分数</div>
                    {surveyScoreList.map((item, index) => {
                        let level = 2
                        // 弱
                        if((Number(item?.value) < 1.5 && index === 2) || (Number(item?.value) > 30 && index === 1)){
                            level = 1
                        // 强
                        }else if((Number(item?.value) > 2 && index === 0) || (Number(item?.value) > 2.5 && index === 2) || (Number(item?.value) > 70 && index === 1)){ 
                            level = 3
                        }
                        return <div className={`${styles.table_tr_td} ${styles[`text_${level}`]}`}
                            key={index}
                            onClick={() =>
                                handleShowDetailModal(
                                    projectClassificationList[index],
                                    item.value!,
                                    '求职者调查',
                                    1
                                )
                            }
                        >
                            {item.value} &gt;
                        </div>
                    })}
                </div>
                <div className={styles.table_tr}>
                    <div className={styles.table_tr_td}>就业服务人员研判结果</div>
                    {judgmentResults.map((item, index) => (
                        <div
                            className={`${styles.table_tr_td} ${styles[`text_${item.value}`]}`}
                            key={index}
                            onClick={() =>
                                handleShowDetailModal(
                                    projectClassificationList[index],
                                    item.value!,
                                    '就业服务人员研判提问',
                                    2
                                )
                            }
                        >
                            {LEVEL_TEXT[`${item.value}`]} &gt;
                        </div>
                    ))}
                </div>
                <div className={styles.table_tr}>
                    <div className={styles.table_tr_td}>维度分级</div>
                    {dimensionHierarchy.map((item, index) => (
                        <div
                            className={`${styles.table_tr_td} ${styles.dimension_hierarchy}`}
                            key={index}
                        >
                            <div className={`${styles.btn} ${styles[`btn_${item.value}`]}`}>{LEVEL_TEXT[`${item.value}`]}</div>
                        </div>
                    ))}
                </div>
                <div className={styles.table_tr}>
                    <div className={styles.table_tr_td}>诊断结果</div>
                    <div className={`${styles.table_tr_td} ${styles.result}`}>
                        {store.assistanceInfo.diagnosticResult?.diagonsticResult}
                    </div>
                </div>
            </div>

            <DiagnosisRecordModal
                dataSource={store.optionRecord}
                open={openRecordModal}
                onCancel={() => setOpenRecordModal(false)}
            />

            <AnswerDetailModal
                open={openDetailModal}
                resultLabel={resultLabel}
                resultValue={resultValue}
                projectClassification={projectClassification}
                onCancel={() => setOpenDetailModal(false)}
                questionList={questionList}
                type={type}
            />
        </div>
    )
}

export default observer(DiagnosisResults)
