import styles from './index.module.less'
import { useCallback, useState } from 'react'
import classNames from 'classnames'
import React from 'react'
import ClickEditInput from '@/components/ClickEditInput'
import useComponentValue from '@/hooks/useComponentValue'
import { Table, Descriptions } from 'antd'
import ClickEditInputNumber from '@/components/ClickEditInputNumber'
import { getTeachingActivityDesignColumns } from './../const'
import type { StageMastermind } from '@/modules/course/types/stylistic12'
import ClickEditActiveContainer from '@/components/ClickEditActiveContainer'
import { toJS } from 'mobx'
import { numberToChinese } from '@/utils/number'

interface TeachingActivityDesignProps<T> {
    title: string
    dataTitle?: string
    defaultValue: T[]
    value?: T[]
    onChangeBlur?: (value: T[]) => Promise<boolean | undefined> | boolean | undefined | void
    onChange?: (value: T[], prevValue?: T[]) => void
    activeTitleRightRender?: React.ReactNode
}

const TeachingActivityDesign = <T extends StageMastermind>(
    props: TeachingActivityDesignProps<T>,
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
            const newDataSource = [...(toJS(dataSource) || [])]
            if (newDataSource[index]) {
                newDataSource[index].learningStepList[0] = {
                    ...newDataSource[index].learningStepList[0],
                    [field]: value,
                }
                onChange(newDataSource)
            }
        },
        [dataSource, onChange],
    )

    const labelContentStyle = {
        labelStyle: { width: '11%' },
        contentStyle: { width: '15%' },
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

            {dataSource?.map((_item, index) => {
                const list = _item.learningStepList || []
                return list.map(item => {
                    const num = Number(item?.stageSort) || index + 1
                    const title = (
                        <span>
                            学习环节{' '}
                            <span style={{ textDecoration: 'underline' }}>
                                {numberToChinese(num)}、{item.stageName || '-'}
                            </span>{' '}
                            教学单元{' '}
                            <span style={{ textDecoration: 'underline' }}>
                                {item.units || '  '}
                            </span>
                        </span>
                    )

                    return (
                        <div className={styles.content} key={_item.code}>
                            <div className={styles.content_title}>{title}</div>

                            <div className={styles.content_list}>
                                <div
                                    className={styles.content_card}
                                    key={`${_item.code}-${item?.stageCode}`}
                                >
                                    <div className={styles.descriptions1}>
                                        <Descriptions bordered>
                                            <Descriptions.Item
                                                label="学习环节序号"
                                                {...labelContentStyle}
                                            >
                                                {numberToChinese(num)}
                                            </Descriptions.Item>
                                            <Descriptions.Item
                                                label="学习环节名称"
                                                {...labelContentStyle}
                                            >
                                                <ClickEditInput
                                                    defaultValue={item.stageName}
                                                    active={active}
                                                    setActive={setActive}
                                                    placeholder="请输入"
                                                    rows={2}
                                                    onChange={val => {
                                                        handleDataChange(index, 'stageName', val)
                                                    }}
                                                    onChangeBlur={val => {
                                                        handleDataChange(index, 'stageName', val)
                                                    }}
                                                    disabled={true}
                                                />
                                            </Descriptions.Item>
                                            <Descriptions.Item
                                                label="教学单元序号及名称"
                                                labelStyle={{ width: '10%' }}
                                                contentStyle={{ width: '40%' }}
                                            >
                                                <ClickEditInput
                                                    defaultValue={item.units}
                                                    active={active}
                                                    setActive={setActive}
                                                    placeholder="请输入"
                                                    rows={2}
                                                    onChange={val => {
                                                        handleDataChange(index, 'units', val)
                                                    }}
                                                    onChangeBlur={val => {
                                                        handleDataChange(index, 'units', val)
                                                    }}
                                                />
                                            </Descriptions.Item>

                                            <Descriptions.Item label="学时" {...labelContentStyle}>
                                                <ClickEditInputNumber
                                                    defaultValue={Number(item?.stagePeriod || 0)}
                                                    active={active}
                                                    setActive={setActive}
                                                    placeholder="请输入"
                                                    onChange={val => {
                                                        handleDataChange(index, 'stagePeriod', val)
                                                    }}
                                                    onChangeBlur={val => {
                                                        handleDataChange(index, 'stagePeriod', val)
                                                    }}
                                                    disabled={true}
                                                />
                                            </Descriptions.Item>
                                            <Descriptions.Item
                                                label="教学时间"
                                                {...labelContentStyle}
                                            >
                                                {item.time}
                                            </Descriptions.Item>
                                            <Descriptions.Item
                                                label="教学地点"
                                                {...labelContentStyle}
                                            >
                                                {item.address}
                                            </Descriptions.Item>

                                            <Descriptions.Item
                                                label="学习目标"
                                                span={3}
                                                contentStyle={{ width: '90%' }}
                                            >
                                                <ClickEditInput
                                                    defaultValue={item.learningGoal}
                                                    active={active}
                                                    setActive={setActive}
                                                    placeholder="请输入"
                                                    rows={4}
                                                    onChange={val => {
                                                        handleDataChange(index, 'learningGoal', val)
                                                    }}
                                                    onChangeBlur={val => {
                                                        handleDataChange(index, 'learningGoal', val)
                                                    }}
                                                />
                                            </Descriptions.Item>
                                            <Descriptions.Item
                                                label="学习内容"
                                                span={3}
                                                contentStyle={{ width: '90%' }}
                                            >
                                                <ClickEditInput
                                                    defaultValue={item.learningContent}
                                                    active={active}
                                                    setActive={setActive}
                                                    placeholder="请输入"
                                                    rows={4}
                                                    onChange={val => {
                                                        handleDataChange(
                                                            index,
                                                            'learningContent',
                                                            val,
                                                        )
                                                    }}
                                                    onChangeBlur={val => {
                                                        handleDataChange(
                                                            index,
                                                            'learningContent',
                                                            val,
                                                        )
                                                    }}
                                                />
                                            </Descriptions.Item>
                                            <Descriptions.Item
                                                label="教学重点难点分析"
                                                span={3}
                                                contentStyle={{ width: '90%' }}
                                            >
                                                <ClickEditInput
                                                    defaultValue={item.learningnNdusFocusAnalysis}
                                                    active={active}
                                                    setActive={setActive}
                                                    placeholder="请输入"
                                                    rows={4}
                                                    onChange={val => {
                                                        handleDataChange(
                                                            index,
                                                            'learningnNdusFocusAnalysis',
                                                            val,
                                                        )
                                                    }}
                                                    onChangeBlur={val => {
                                                        handleDataChange(
                                                            index,
                                                            'learningnNdusFocusAnalysis',
                                                            val,
                                                        )
                                                    }}
                                                />
                                            </Descriptions.Item>
                                            <Descriptions.Item
                                                label="教学资源准备"
                                                span={3}
                                                contentStyle={{ width: '90%' }}
                                            >
                                                <ClickEditInput
                                                    defaultValue={item.learningResourcePreparation}
                                                    active={active}
                                                    setActive={setActive}
                                                    placeholder="请输入"
                                                    rows={4}
                                                    onChange={val => {
                                                        handleDataChange(
                                                            index,
                                                            'learningResourcePreparation',
                                                            val,
                                                        )
                                                    }}
                                                    onChangeBlur={val => {
                                                        handleDataChange(
                                                            index,
                                                            'learningResourcePreparation',
                                                            val,
                                                        )
                                                    }}
                                                />
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </div>

                                    <div className={styles.descriptions2}>
                                        <Descriptions layout="vertical" bordered>
                                            <Descriptions.Item label="教学活动设计" span={3}>
                                                <Table
                                                    dataSource={
                                                        item?.learningActivityList?.map(
                                                            (activity, idx) => ({
                                                                ...activity,
                                                                __rowKey: `${index}-activity-${idx}`,
                                                            }),
                                                        ) || []
                                                    }
                                                    rowKey={record => (record as any).__rowKey}
                                                    columns={getTeachingActivityDesignColumns(
                                                        active,
                                                        setActive,
                                                        item?.learningActivityList || [],
                                                        handleDataChange.bind(null, index),
                                                    )}
                                                    style={{ padding: '0' }}
                                                    pagination={false}
                                                />
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </div>

                                    <div className={styles.descriptions3}>
                                        <Descriptions bordered>
                                            <Descriptions.Item
                                                label="课后反思"
                                                span={3}
                                                contentStyle={{ width: '90%' }}
                                                labelStyle={{ width: '11%' }}
                                            >
                                                <ClickEditInput
                                                    defaultValue={item.reflection}
                                                    active={active}
                                                    setActive={setActive}
                                                    placeholder="请输入"
                                                    rows={4}
                                                    onChange={val => {
                                                        handleDataChange(index, 'reflection', val)
                                                    }}
                                                    onChangeBlur={val => {
                                                        handleDataChange(index, 'reflection', val)
                                                    }}
                                                />
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            })}
        </ClickEditActiveContainer>
    )
}

export default React.memo(TeachingActivityDesign)
