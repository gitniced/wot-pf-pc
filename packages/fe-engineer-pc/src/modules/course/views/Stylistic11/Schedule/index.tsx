import styles from './index.module.less'
import { useCallback, useState } from 'react'
import classNames from 'classnames'
import React from 'react'
import ClickEditInput from '@/components/ClickEditInput'
import useComponentValue from '@/hooks/useComponentValue'
import { cloneDeep } from 'lodash'
import { Table } from 'antd'
import { getPlanTableColumns } from './../const'
import useSubrowHeights from '@/hooks/useSubrowHeights'
import ClickEditActiveContainer from '@/components/ClickEditActiveContainer'

interface scheduleProps<T> {
    title: string
    dataTitle: string
    defaultValue: T[]
    value?: T[]
    onChangeBlur?: (value: T[]) => Promise<boolean | undefined> | boolean | undefined | void
    onChange?: (value: T[], prevValue?: T[]) => void
    activeTitleRightRender?: React.ReactNode
}

const Index = <T extends Record<string, any>>({
    dataSource,
    active,
    setActive,
    handleDataChange,
}: {
    dataSource: T[]
    active: boolean
    setActive: (active: boolean) => void
    handleDataChange: (value: T[], prevValue?: T[]) => void
}) => {
    const rowHeights = useSubrowHeights(dataSource)

    const newDataSource = cloneDeep(dataSource)

    return (
        <>
            {newDataSource.map((item: Record<string, any>, index: number) => (
                <div key={item?.name} className={classNames(styles.card)}>
                    <div className={styles.h1}>
                        <div className={styles.line} /> 学习任务{index + 1}名称：{item?.name}
                    </div>

                    {item?.stageTeachingScheduleList?.map(
                        (ele: Record<string, any>, eleIndex: number) => (
                            <div key={ele?.name} className={styles.link}>
                                <div className={styles.h2}>
                                    <div className={styles.line} />
                                    学习环节{eleIndex + 1}：{ele?.name}（{ele.period}学时）
                                </div>

                                <div className={styles.boxs}>
                                    <div className={classNames(styles.card, styles.shadow)}>
                                        <div className={styles.h3}>
                                            <div />
                                            学习环节目标
                                        </div>
                                        <ClickEditInput
                                            defaultValue={ele?.learningGoal}
                                            active={active}
                                            setActive={setActive}
                                            placeholder="请输入"
                                            onChange={val => {
                                                ele.learningGoal = val
                                                handleDataChange?.(newDataSource)
                                            }}
                                            onChangeBlur={val => {
                                                ele.learningGoal = val
                                                handleDataChange?.(newDataSource)
                                            }}
                                            rows={1}
                                        />
                                    </div>
                                    <div className={classNames(styles.card, styles.shadow)}>
                                        <div className={styles.h3}>
                                            <div />
                                            学习环节内容
                                        </div>
                                        <ClickEditInput
                                            defaultValue={ele?.learningContent}
                                            active={active}
                                            setActive={setActive}
                                            placeholder="请输入"
                                            onChange={val => {
                                                ele.learningContent = val
                                                handleDataChange?.(newDataSource)
                                            }}
                                            onChangeBlur={val => {
                                                ele.learningContent = val
                                                handleDataChange?.(newDataSource)
                                            }}
                                            rows={1}
                                        />
                                    </div>
                                    <div className={classNames(styles.card, styles.shadow)}>
                                        <div className={styles.h3}>
                                            <div />
                                            教学计划
                                        </div>

                                        <div className={styles.no_padding_table}>
                                            <Table
                                                columns={getPlanTableColumns(
                                                    active,
                                                    setActive,
                                                    newDataSource,
                                                    index,
                                                    eleIndex,
                                                    handleDataChange,
                                                    rowHeights,
                                                )}
                                                dataSource={[
                                                    {
                                                        weekly: ele?.weekly,
                                                        learningStepList: ele?.learningStepList,
                                                    },
                                                ]}
                                                bordered
                                                pagination={false}
                                                className={styles.click_edit_table_h2_card_content}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ),
                    )}
                </div>
            ))}
        </>
    )
}

const Schedules = <T extends Record<string, any>>(props: scheduleProps<T>) => {
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

    const handleDataChange = (val: T[]) => {
        onChange(val)
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
                {props.activeTitleRightRender && (
                    <div
                        style={{
                            overflow: active ? 'visible' : 'hidden',
                            opacity: active ? 1 : 0,
                            pointerEvents: active ? 'auto' : 'none',
                        }}
                    >
                        {props.activeTitleRightRender}
                    </div>
                )}
            </div>
            <Index
                dataSource={dataSource || []}
                active={active}
                setActive={setActive}
                handleDataChange={handleDataChange}
            />
        </ClickEditActiveContainer>
    )
}

export default React.memo(Schedules)
