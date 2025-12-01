import ClickEditTableH2Card from '@/modules/course/components/ClickEditTableH2Card'
import { getAssessmentPointsColumns, getAssessmentInstructionsColumns } from './const'
import styles from './index.module.less'
import { useCourseStore } from '../../context'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import AssessmentResults from '@/pages/assistant/course/[id]/design/check/components/AssessmentResults/index'
import { Button } from 'antd'
// import { SyncOutlined } from '@ant-design/icons'
import { cloneDeep } from 'lodash'

const Stylistic4: React.FC = observer(() => {
    const courseStore = useCourseStore()

    useEffect(() => {
        courseStore.loadStylistic4()
    }, [courseStore])

    const stylistic4 = courseStore.stylistic4

    const isPreview = /assistant\/course\/.*\/preview/.test(location.pathname)

    return (
        <div className={styles.stylistic}>
            <ClickEditTableH2Card
                title="一、课程考核要点"
                dataTitle={''}
                items={[]}
                getColumns={(active, setActive, onDataChange) => {
                    return getAssessmentPointsColumns(
                        active,
                        setActive,
                        stylistic4.stageList,
                        onDataChange,
                    )
                }}
                defaultValue={stylistic4.stageList}
                onChangeBlur={value => {
                    return courseStore.saveStylistic4({
                        stageList: value,
                    })
                }}
                hideAI
                rowKey={record => record.code || record.name}
                // activeTitleRightRender={
                //     <>
                //         <Button
                //             icon={<SyncOutlined />}
                //             type="primary"
                //             ghost
                //             style={{ marginLeft: 16 }}
                //         >
                //             从关键信息同步
                //         </Button>
                //     </>
                // }
            />

            <ClickEditTableH2Card
                title="二、通用能力素养考核说明"
                dataTitle={''}
                items={[]}
                getColumns={getAssessmentInstructionsColumns}
                defaultValue={stylistic4.literacyAssessmentList}
                onChangeBlur={value => {
                    return courseStore.saveStylistic4({
                        literacyAssessmentList: value,
                    })
                }}
                hideAI
                // activeTitleRightRender={
                //     <>
                //         <Button
                //             icon={<SyncOutlined />}
                //             type="primary"
                //             ghost
                //             style={{ marginLeft: 16 }}
                //         >
                //             从关键信息同步
                //         </Button>
                //     </>
                // }
            >
                {!isPreview && (
                    <div
                        style={{ marginTop: '12px' }}
                        onClick={() => {
                            const newData = cloneDeep(stylistic4.literacyAssessmentList)
                            newData.push({
                                code: '',
                                name: '',
                                objectives: '',
                                observationPoints: '',
                            })
                            return courseStore.saveStylistic4({
                                literacyAssessmentList: newData,
                            })
                        }}
                    >
                        <Button>添加培养维度</Button>
                    </div>
                )}
            </ClickEditTableH2Card>

            <div className={styles.no_padding_table}>
                <AssessmentResults
                    title="三、课程考核成绩构成"
                    assessmentResultCompositionList={stylistic4.assessmentResultCompositionList}
                    onChangeBlur={value => {
                        return courseStore.saveStylistic4({
                            assessmentResultCompositionList: value,
                        })
                    }}
                    isStylistic
                />
            </div>
        </div>
    )
})

export default Stylistic4
