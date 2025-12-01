import ClickEditInputH2Card from '@/modules/course/components/ClickEditInputH2Card'
import ClickEditInputNumberH2Card from '@/modules/course/components/ClickEditInputNumberH2Card'
import ClickEditTableH2Card from '@/modules/course/components/ClickEditTableH2Card'
import ClickEditMultiInputH2Card from '@/modules/course/components/ClickEditMultiInputH2Card'
import { COURSE_DESIGN_STYLISTIC_MAP, COURSE_DESIGN_STYLISTIC } from '@/modules/course/const'
import { getAnalyzeColumns, getTeachingActivityPlanningTableColumns } from './const'
import styles from './index.module.less'
import { useCourseStore } from '../../context'
import { useEffect, useMemo, useCallback } from 'react'
import { observer } from 'mobx-react'
// import { Button } from 'antd'
// import { SyncOutlined } from '@ant-design/icons'
import { cloneDeep } from 'lodash'

const Stylistic7: React.FC = observer(() => {
    const courseStore = useCourseStore()
    const activeListItem = useMemo(() => courseStore.activeListItem, [courseStore.activeListItem])

    useEffect(() => {
        if (!activeListItem?.code) return
        courseStore.loadStylistic7(activeListItem.code)
    }, [courseStore, activeListItem?.code])

    const stylistic7 = courseStore.stylistic7

    const handleStageMastermindTransformValue = useCallback(
        (value: any, setValue: any, prev: any) => {
            const currentList = JSON.parse(JSON.stringify(value?.stageMastermindList || []))
            const prevList = JSON.parse(JSON.stringify(prev?.[0]?.value || []))

            prevList.forEach((item: any, index: number) => {
                const currentItem = currentList[index]
                if (currentItem && item.learningStepList && currentItem.learningStepList) {
                    item.learningStepList.forEach((step: any, stepIndex: number) => {
                        const currentStep = currentItem.learningStepList[stepIndex]
                        if (currentStep) {
                            step.teacherActivity = currentStep.teacherActivity
                        }
                    })
                }
            })

            setValue?.([
                {
                    name: '五、教学活动策划表',
                    key: 'stageMastermindList',
                    value: prevList,
                },
            ])
        },
        [],
    )

    return (
        <div className={styles.stylistic}>
            <ClickEditInputNumberH2Card
                title="一、基本信息"
                textTitle="学时"
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic7].name}
                defaultValue={stylistic7.period}
                items={[]}
                onChangeBlur={value => {
                    return courseStore.saveStylistic7({
                        period: value,
                    })
                }}
                // activeTitleRightRender={
                //     <>
                //         <Button
                //             icon={<SyncOutlined />}
                //             type="primary"
                //             ghost
                //             style={{ marginLeft: 16 }}
                //             onClick={() => {}}
                //         >
                //             从关键信息同步
                //         </Button>
                //     </>
                // }
                key={Math.random()}
            />
            <ClickEditInputH2Card
                title="二、学习任务价值分析（选填）"
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic7].name}
                defaultValue={stylistic7.valueAnalysis}
                onChangeBlur={value => {
                    return courseStore.saveStylistic7({
                        valueAnalysis: value,
                    })
                }}
                items={[
                    {
                        name: '二、学习任务价值分析（选填）',
                        key: 'valueAnalysis',
                    },
                ]}
                key={Math.random()}
            />

            <ClickEditTableH2Card
                title="三、学情分析（选填）"
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic7].name}
                items={[
                    {
                        name: '三、学情分析（选填）',
                        key: 'academicSituationAnalysisList',
                    },
                ]}
                getColumns={getAnalyzeColumns}
                defaultValue={stylistic7.academicSituationAnalysisList}
                onChangeBlur={value => {
                    return courseStore.saveStylistic7({
                        academicSituationAnalysisList: value,
                    })
                }}
                rowKey={record => `task-${record?.refinementModules || 'unknown'}`}
            />
            <ClickEditMultiInputH2Card
                title="四、重点和难点（选填）"
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic7].name}
                items={[
                    {
                        name: '1. 重点',
                        key: 'focus',
                    },
                    {
                        name: '2. 难点',
                        key: 'nodus',
                    },
                ]}
                defaultValue={{
                    focus: stylistic7.focus,
                    nodus: stylistic7.nodus,
                }}
                onChangeBlur={value => {
                    return courseStore.saveStylistic7(value)
                }}
                key={Math.random()}
            />

            <ClickEditTableH2Card
                title="五、教学活动策划表"
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic7].name}
                items={[
                    {
                        name: '五、教学活动策划表',
                        key: 'stageMastermindList',
                    },
                ]}
                getColumns={getTeachingActivityPlanningTableColumns}
                defaultValue={cloneDeep(stylistic7.stageMastermindList)}
                onChangeBlur={value => {
                    return courseStore.saveStylistic7({
                        stageMastermindList: value,
                    })
                }}
                rowKey={record => record.code || record.name}
                transformValue={handleStageMastermindTransformValue}
                hideAI
                className={styles.no_padding_table}
                // activeTitleRightRender={
                //     <>
                //         <Button
                //             icon={<SyncOutlined />}
                //             type="primary"
                //             ghost
                //             style={{ marginLeft: 16 }}
                //             onClick={() => {}}
                //         >
                //             从关键信息同步
                //         </Button>
                //     </>
                // }
                key={Math.random()}
            />
        </div>
    )
})

export default Stylistic7
