import React from 'react'
import styles from './index.module.less'
import type { ICourseStylistic9StageLearningStepActivity } from '@/modules/course/types/stylistic9'
import ClickEditInput from '@/components/ClickEditInput'
import SwitchQuesRender from '@/modules/question/render/SwitchQuesRender'
import classNames from 'classnames'
import { COURSE_DESIGN_STYLISTIC } from '@/modules/course/const'

interface IStageActivityListProps {
    stageLearningStepActivityList?: ICourseStylistic9StageLearningStepActivity[]
    active: boolean
    setActive: (active: boolean) => void
    onActivityDataChange?: (
        stageCode: string,
        activityCode: string,
        field: string,
        value: any,
    ) => void
    onStageDataChange?: (stageCode: string, field: string, value: any) => void
    stylistic?: COURSE_DESIGN_STYLISTIC.stylistic9 | COURSE_DESIGN_STYLISTIC.stylistic10
    taskIndex: number
}

const StageActivityList = (props: IStageActivityListProps) => {
    const {
        stageLearningStepActivityList = [],
        active,
        setActive,
        onActivityDataChange,
        onStageDataChange,
        taskIndex,
    } = props

    const isStylistic10 = props.stylistic === COURSE_DESIGN_STYLISTIC.stylistic10

    return (
        <div className={styles.stage_activity_list}>
            {stageLearningStepActivityList?.filter(Boolean)?.map((stage, stageIndex) => {
                return (
                    <div key={stage.code}>
                        <div
                            style={{
                                marginTop: '24px',
                                marginBottom: '24px',
                                borderTop: '1px solid #e8e8e8',
                            }}
                        />
                        <div className={styles.stage_activity_item}>
                            <div className={styles.stage_activity_title}>
                                <span>
                                    学习步骤{taskIndex + 1}.{stageIndex + 1} {stage.name}
                                </span>
                            </div>

                            {isStylistic10 && (
                                <div className={styles.stage_activity_item_render}>
                                    <div className={styles.stage_activity_item_render_content}>
                                        <div
                                            className={
                                                styles.stage_activity_item_render_content_title
                                            }
                                        >
                                            <span>职业素养</span>
                                        </div>
                                        <div
                                            className={
                                                styles.stage_activity_item_render_content_input
                                            }
                                        >
                                            <ClickEditInput
                                                active={active}
                                                setActive={setActive}
                                                defaultValue={stage.professionalism}
                                                onChange={value => {
                                                    onStageDataChange?.(
                                                        stage.code,
                                                        'professionalism',
                                                        value,
                                                    )
                                                }}
                                                onChangeBlur={value => {
                                                    onStageDataChange?.(
                                                        stage.code,
                                                        'professionalism',
                                                        value,
                                                    )
                                                }}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.stage_activity_item_render_content}>
                                        <div
                                            className={
                                                styles.stage_activity_item_render_content_title
                                            }
                                        >
                                            <span>思想政治</span>
                                        </div>
                                        <div
                                            className={
                                                styles.stage_activity_item_render_content_input
                                            }
                                        >
                                            <ClickEditInput
                                                active={active}
                                                setActive={setActive}
                                                defaultValue={stage.politicalEducation}
                                                placeholder="请输入"
                                                onChange={value => {
                                                    onStageDataChange?.(
                                                        stage.code,
                                                        'politicalEducation',
                                                        value,
                                                    )
                                                }}
                                                onChangeBlur={value => {
                                                    onStageDataChange?.(
                                                        stage.code,
                                                        'politicalEducation',
                                                        value,
                                                    )
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className={styles.stage_activity_activity}>
                                {stage.learningStepActivityList
                                    ?.filter(Boolean)
                                    ?.map((activity, activityIndex) => {
                                        return (
                                            <div
                                                key={activity.code}
                                                className={styles.stage_activity_activity_item}
                                            >
                                                <div
                                                    className={
                                                        styles.stage_activity_activity_item_title
                                                    }
                                                >
                                                    <span>
                                                        学习活动{taskIndex + 1}.{stageIndex + 1}.
                                                        {activityIndex + 1} {activity.name}
                                                    </span>
                                                </div>

                                                {!isStylistic10 && (
                                                    <div
                                                        className={
                                                            styles.stage_activity_activity_item_content
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.stage_activity_activity_item_content_title
                                                            }
                                                        >
                                                            <span>学习内容</span>
                                                        </div>
                                                        <ClickEditInput
                                                            className={
                                                                styles.stage_activity_activity_item_content_input
                                                            }
                                                            active={active}
                                                            setActive={setActive}
                                                            defaultValue={activity.content}
                                                            onChange={value => {
                                                                onActivityDataChange?.(
                                                                    stage.code,
                                                                    activity.code,
                                                                    'content',
                                                                    value,
                                                                )
                                                            }}
                                                            onChangeBlur={value => {
                                                                onActivityDataChange?.(
                                                                    stage.code,
                                                                    activity.code,
                                                                    'content',
                                                                    value,
                                                                )
                                                            }}
                                                            disabled={true}
                                                        />
                                                    </div>
                                                )}

                                                <div
                                                    className={
                                                        styles.stage_activity_activity_item_content
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.stage_activity_activity_item_content_title
                                                        }
                                                    >
                                                        <span>引导问题</span>
                                                    </div>
                                                    <div
                                                        className={classNames([
                                                            styles.stage_activity_activity_item_content_input,
                                                            styles.stage_activity_activity_item_content_question,
                                                        ])}
                                                    >
                                                        {activity.questions?.map(question => {
                                                            return (
                                                                <div
                                                                    key={question.code}
                                                                    className={
                                                                        styles.stage_activity_activity_item_content_question_item
                                                                    }
                                                                >
                                                                    <SwitchQuesRender
                                                                        data={question}
                                                                        showType
                                                                    />
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>

                                                {isStylistic10 ? (
                                                    <div
                                                        className={
                                                            styles.stage_activity_activity_item_content
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.stage_activity_activity_item_content_title
                                                            }
                                                        >
                                                            <span>学习材料</span>
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.stage_activity_activity_item_content_input
                                                            }
                                                        >
                                                            <ClickEditInput
                                                                active={active}
                                                                setActive={setActive}
                                                                defaultValue={activity.materials}
                                                                onChange={value => {
                                                                    onActivityDataChange?.(
                                                                        stage.code,
                                                                        activity.code,
                                                                        'materials',
                                                                        value,
                                                                    )
                                                                }}
                                                                onChangeBlur={value => {
                                                                    onActivityDataChange?.(
                                                                        stage.code,
                                                                        activity.code,
                                                                        'materials',
                                                                        value,
                                                                    )
                                                                }}
                                                                disabled={true}
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div
                                                            className={
                                                                styles.stage_activity_activity_item_content
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.stage_activity_activity_item_content_title
                                                                }
                                                            >
                                                                <span>学习成果</span>
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.stage_activity_activity_item_content_input
                                                                }
                                                            >
                                                                {activity.learningOutcomes?.map(
                                                                    (outcome, index) => {
                                                                        return (
                                                                            <div
                                                                                className={
                                                                                    styles.stage_activity_activity_item
                                                                                }
                                                                                key={outcome.code}
                                                                            >
                                                                                <span>
                                                                                    成果
                                                                                    {index + 1}：
                                                                                </span>
                                                                                {outcome.name}
                                                                            </div>
                                                                        )
                                                                    },
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.stage_activity_activity_item_content
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.stage_activity_activity_item_content_title
                                                                }
                                                            >
                                                                <span>课后作业</span>
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.stage_activity_activity_item_content_input
                                                                }
                                                            >
                                                                {activity.homeworks?.map(
                                                                    (homework, index) => {
                                                                        return (
                                                                            <div
                                                                                className={
                                                                                    styles.stage_activity_activity_item
                                                                                }
                                                                                key={homework.code}
                                                                            >
                                                                                <span>
                                                                                    作业
                                                                                    {index + 1}：
                                                                                </span>
                                                                                {homework.name}
                                                                            </div>
                                                                        )
                                                                    },
                                                                )}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default React.memo(StageActivityList)
