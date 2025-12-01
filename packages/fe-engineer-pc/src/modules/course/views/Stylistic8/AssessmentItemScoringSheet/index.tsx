import styles from './index.module.less'
import { useCallback, useState } from 'react'
import classNames from 'classnames'
import React from 'react'
import ClickEditInput from '@/components/ClickEditInput'
import useComponentValue from '@/hooks/useComponentValue'
import { Descriptions } from 'antd'
import type { StudyTaskAssessmentPlanCriteria } from '@/modules/course/types/stylistic8'
// import { Button } from 'antd'
// import { SyncOutlined } from '@ant-design/icons'
import ClickEditActiveContainer from '@/components/ClickEditActiveContainer'

interface AssessmentItemScoringSheetProps<T> {
    title: string
    dataTitle?: string
    defaultValue: T[]
    value?: T[]
    onChangeBlur?: (value: T[]) => Promise<boolean | undefined> | boolean | undefined | void
    onChange?: (value: T[], prevValue?: T[]) => void
}

const AssessmentItemScoringSheet = <T extends StudyTaskAssessmentPlanCriteria>(
    props: AssessmentItemScoringSheetProps<T>,
) => {
    const [active, setActive] = useState(false)

    const {
        value: dataSource,
        onChange,
        onChangeBlur,
    } = useComponentValue({
        value: props.value,
        defaultValue: props.defaultValue,
        onChange: props.onChange,
        onChangeBlur: props.onChangeBlur,
    })

    const handleBlur = useCallback(() => {
        if (!active) return
        setActive(false)
        onChangeBlur()
    }, [active, onChangeBlur])

    const handleDataChange = useCallback(
        (index: number, field: string, value: any) => {
            const newDataSource = [...(dataSource || [])]
            if (newDataSource[index]) {
                newDataSource[index] = { ...newDataSource[index], [field]: value }
                onChange(newDataSource)
            }
        },
        [dataSource, onChange],
    )

    const labelContentStyle = {
        labelStyle: { width: '12%' },
        contentStyle: { width: '89%' },
    }

    return (
        <ClickEditActiveContainer
            active={active}
            setActive={setActive}
            onBlur={handleBlur}
            className={classNames(styles.click_edit_table_h2_card, {
                [styles.active]: active,
            })}
        >
            <div className={styles.click_edit_table_h2_card_header}>
                <div className={styles.click_edit_table_h2_card_header_title}>
                    <span>{props.title}</span>
                </div>
                {/* {active && (
                    <Button icon={<SyncOutlined />} type="primary" ghost style={{ marginLeft: 16 }}>
                        从关键信息同步
                    </Button>
                )} */}
            </div>

            {dataSource?.map((item, index) => (
                <div className={styles.content} key={item?.name}>
                    <div className={styles.content_title}>考核项目{index + 1}评分细则</div>

                    <div className={styles.content_card}>
                        <Descriptions bordered>
                            <Descriptions.Item label="考核项目" {...labelContentStyle} span={3}>
                                <ClickEditInput
                                    defaultValue={item.assessmentProject}
                                    active={active}
                                    setActive={setActive}
                                    placeholder="请输入"
                                    onChange={val => {
                                        handleDataChange(index, 'assessmentProject', val)
                                    }}
                                    onChangeBlur={val => {
                                        handleDataChange(index, 'assessmentProject', val)
                                    }}
                                />
                            </Descriptions.Item>
                            <Descriptions.Item label="考核组织" {...labelContentStyle} span={3}>
                                <ClickEditInput
                                    defaultValue={item.assessmentOrg}
                                    active={active}
                                    setActive={setActive}
                                    placeholder="请输入"
                                    onChange={val => {
                                        handleDataChange(index, 'assessmentOrg', val)
                                    }}
                                    onChangeBlur={val => {
                                        handleDataChange(index, 'assessmentOrg', val)
                                    }}
                                />
                            </Descriptions.Item>
                            <Descriptions.Item label="成果形式" {...labelContentStyle} span={3}>
                                <ClickEditInput
                                    defaultValue={item.outcomeForm}
                                    active={active}
                                    setActive={setActive}
                                    placeholder="请输入"
                                    onChange={val => {
                                        handleDataChange(index, 'outcomeForm', val)
                                    }}
                                    onChangeBlur={val => {
                                        handleDataChange(index, 'outcomeForm', val)
                                    }}
                                />
                            </Descriptions.Item>
                            <Descriptions.Item label="评价方式" {...labelContentStyle} span={3}>
                                <ClickEditInput
                                    defaultValue={item.evaluationMode}
                                    active={active}
                                    setActive={setActive}
                                    placeholder="请输入"
                                    onChange={val => {
                                        handleDataChange(index, 'evaluationMode', val)
                                    }}
                                    onChangeBlur={val => {
                                        handleDataChange(index, 'evaluationMode', val)
                                    }}
                                />
                            </Descriptions.Item>
                            <Descriptions.Item label="评分细则" {...labelContentStyle} span={3}>
                                <ClickEditInput
                                    defaultValue={item.criteria}
                                    active={active}
                                    setActive={setActive}
                                    placeholder="请输入"
                                    onChange={val => {
                                        handleDataChange(index, 'criteria', val)
                                    }}
                                    onChangeBlur={val => {
                                        handleDataChange(index, 'criteria', val)
                                    }}
                                />
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
            ))}
        </ClickEditActiveContainer>
    )
}

export default React.memo(AssessmentItemScoringSheet)
