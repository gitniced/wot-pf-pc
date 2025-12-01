import { useEffect, useMemo } from 'react'
import { useCourseStore } from '../../context'
import { observer } from 'mobx-react'
import styles from './index.module.less'
import ClickEditInputH3Card from '../../components/ClickEditInputH3Card'
import { COURSE_DESIGN_STYLISTIC_MAP, COURSE_DESIGN_STYLISTIC } from '../../const'
import ClickEditTableH2Card from '../../components/ClickEditTableH2Card'
import ClickEditTableH3Card from '../../components/ClickEditTableH3Card'
import {
    getScoringCriteriaColumns,
    getAssessmentRequirementsColumns,
    getAssessmentQuestionsColumns,
} from './const'
import classnames from 'classnames'
import { cloneDeep } from 'lodash'
// import { Button } from 'antd'
// import { SyncOutlined } from '@ant-design/icons'

const Stylistic5: React.FC = observer(() => {
    const courseStore = useCourseStore()
    const activeListItem = useMemo(() => courseStore.activeListItem, [courseStore.activeListItem])

    useEffect(() => {
        if (!activeListItem?.code) return
        courseStore.loadStylistic5(activeListItem.code)
    }, [courseStore, activeListItem?.code])

    const stylistic5 = courseStore.stylistic5

    return (
        <div className={styles.stylistic}>
            <div className={classnames(styles.stylistic_h2)}>
                <div className={styles.stylistic_item_header}>
                    <div className={styles.stylistic_item_title}>一、终结性考核试题</div>
                    {/* {[active1, active2, active3, active4].includes(true) && (
                        <>
                            <Button
                                icon={<SyncOutlined />}
                                type="primary"
                                ghost
                                style={{ marginLeft: 16 }}
                            >
                                从关键信息同步
                            </Button>
                        </>
                    )} */}
                </div>
                <div className={styles.stylistic_item_content}>
                    <ClickEditInputH3Card
                        title="1. 任务名称"
                        dataTitle=""
                        items={[]}
                        defaultValue={stylistic5.finalAssessmentName}
                        onChangeBlur={value => {
                            return courseStore.saveStylistic5({
                                finalAssessmentName: value,
                            })
                        }}
                        // getActive={value => {
                        //     setActive1(value)
                        // }}
                    />

                    <ClickEditInputH3Card
                        title="2. 情景描述"
                        dataTitle=""
                        items={[]}
                        defaultValue={stylistic5.finalAssessmentDesc}
                        onChangeBlur={value => {
                            return courseStore.saveStylistic5({
                                finalAssessmentDesc: value,
                            })
                        }}
                        // getActive={value => {
                        //     setActive2(value)
                        // }}
                    />

                    <ClickEditTableH3Card
                        title="3. 考核要求"
                        dataTitle=""
                        items={[]}
                        getColumns={getAssessmentRequirementsColumns}
                        defaultValue={stylistic5.finalAssessmentQuestionsStageList}
                        onChangeBlur={value => {
                            return courseStore.saveStylistic5({
                                finalAssessmentQuestionsStageList: value,
                            })
                        }}
                        // getActive={e => {
                        //     setActive3(e)
                        // }}
                        rowKey={record => record.code || record.name}
                    />

                    <ClickEditTableH3Card
                        title="4. 考核题目"
                        dataTitle=""
                        items={[]}
                        getColumns={getAssessmentQuestionsColumns}
                        defaultValue={stylistic5.finalAssessmentQuestionList}
                        onChangeBlur={value => {
                            return courseStore.saveStylistic5({
                                finalAssessmentQuestionList: value,
                            })
                        }}
                        // getActive={e => {
                        //     setActive4(e)
                        // }}
                        rowKey={record => record.code || record.name}
                    />
                </div>
            </div>

            <ClickEditTableH2Card
                title="二、课程终结性考核评分标准"
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic6].name}
                items={[]}
                getColumns={getScoringCriteriaColumns}
                defaultValue={cloneDeep(stylistic5.finalAssessmentScoringCriterianList)}
                onChangeBlur={value => {
                    return courseStore.saveStylistic5({
                        finalAssessmentScoringCriterianList: value,
                    })
                }}
                hideAI
                rowKey={record => record.code || record.name}
                // activeTitleRightRender={
                //     <Button icon={<SyncOutlined />} type="primary" ghost style={{ marginLeft: 16 }}>
                //         从关键信息同步
                //     </Button>
                // }
            />
        </div>
    )
})

export default Stylistic5
