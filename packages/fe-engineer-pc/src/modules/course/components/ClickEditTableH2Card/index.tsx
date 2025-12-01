import styles from './index.module.less'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import type { TableColumnsType } from 'antd'
import { Button, Table } from 'antd'
import FullScreenEditBtn from '../FullScreenEditBtn'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import useComponentValue from '@/hooks/useComponentValue'
import { createFullScreenContentRender } from '../FullScreenContentHOC'
import type { ICourseDataItem } from '../../types'
import useSubrowHeights from '@/hooks/useSubrowHeights'
import ClickEditActiveContainer from '@/components/ClickEditActiveContainer'

interface IClickEditTableH2CardProps<T> extends IUseComponentValueProps<T[]> {
    title: string
    dataTitle: string
    description?: string
    dataSource?: T[]
    getColumns: (
        active: boolean,
        setActive: (active: boolean) => void,
        onDataChange?: (index: number, field: string, value: any) => void,
        rowHeights?: Record<string, number>,
    ) => TableColumnsType<T>
    className?: string
    style?: React.CSSProperties
    items: Omit<ICourseDataItem<T>, 'value'>[]
    rowKey?: ((record: T, index?: number) => string) | string
    children?: React.ReactNode
    summary?: any
    hideAI?: boolean
    activeTitleRightRender?: React.ReactNode
    transformValue?: (value: any, setValue: (value: any) => void, prevValue: any) => any
    canAdd?: boolean
    addItem?: () => T
    addText?: string
    aiState?: Record<string, any>
}

const ClickEditTableH2Card = <T extends Record<string, any>>(
    props: IClickEditTableH2CardProps<T>,
) => {
    const [active, setActive] = useState(false)
    const [innerItems, setInnerItems] = useState<ICourseDataItem<T>[]>(
        props.items.map(item => ({
            ...item,
            value: props.value as any,
        })),
    )
    const fullScreenStateRef = useRef(false)
    const [dataSourceRefreshKey, setDataSourceRefreshKey] = useState(String(Date.now()))

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

    const rowHeights = useSubrowHeights(dataSource)

    const ContentRender = useMemo(
        () =>
            createFullScreenContentRender(
                _p => {
                    const handleContentDataChange = (index: number, field: string, value: any) => {
                        const newDataSource = [...(_p.value || [])]
                        if (newDataSource[index]) {
                            newDataSource[index] = { ...newDataSource[index], [field]: value }
                            _p.onChange?.(newDataSource)
                        }
                    }

                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const _rowHeights = useSubrowHeights(_p.value)

                    const contentColumns = props.getColumns(
                        true,
                        () => {},
                        handleContentDataChange,
                        _rowHeights,
                    )

                    return (
                        <Table
                            columns={contentColumns}
                            dataSource={_p.value}
                            bordered
                            pagination={false}
                            rowKey={
                                props.rowKey || ((record, index) => `content-row-${index || 0}`)
                            }
                        />
                    )
                },
                {
                    save: async (value: T[]) => {
                        const res = await props.onChangeBlur?.(value)
                        onChange(value)
                        setDataSourceRefreshKey(String(Date.now()))
                        return res || false
                    },
                    items: props.items,
                    isMulti: false,
                    onUpdateItems: items => {
                        setInnerItems(items)
                    },
                },
                dataSource || [],
            ),
        [props.getColumns, props.onChangeBlur, props.rowKey, props.items, onChange, dataSource],
    )

    const handleBlur = useCallback(() => {
        if (!active || fullScreenStateRef?.current) return
        setActive(false)
        onChangeBlur()
    }, [active, onChangeBlur])

    const handleDataChange = useCallback(
        (index: number, field: string, value: any, isOnChangeBlur?: boolean) => {
            onChange(oldValues => {
                const newValues = [...(oldValues || [])]

                if (newValues[index]) {
                    newValues[index] = { ...newValues[index], [field]: value }
                    if (isOnChangeBlur) {
                        props.onChangeBlur?.(newValues)
                    }
                    return newValues
                }

                return oldValues
            })
        },
        [onChange],
    )

    const columns = useMemo(
        () => props.getColumns(active, setActive, handleDataChange, rowHeights),
        [active, setActive, props.getColumns, handleDataChange, rowHeights],
    )

    const handleAdd = useCallback(() => {
        onChange(oldValues => {
            const newItem = {
                ...(props.addItem?.() || ({} as T)),
            }
            const newValues = [...(oldValues || []), newItem]

            return newValues
        })
        setActive(true)
    }, [onChange])

    return (
        <ClickEditActiveContainer
            active={active}
            setActive={setActive}
            onBlur={handleBlur}
            className={classNames(styles.click_edit_table_h2_card, props.className, {
                [styles.active]: active,
            })}
            style={props.style}
        >
            <div className={styles.click_edit_table_h2_card_header}>
                <div className={styles.click_edit_table_h2_card_header_title}>
                    <span>{props.title}</span>
                    {props.description && (
                        <span className={styles.title_desc}>{props.description}</span>
                    )}
                </div>
                {active && !props.hideAI && (
                    <FullScreenEditBtn
                        ContentRender={ContentRender}
                        title={props.dataTitle}
                        subTitle={props.title}
                        items={innerItems}
                        transformValue={props.transformValue}
                        onOpen={() => (fullScreenStateRef.current = true)}
                        onClose={() => {
                            fullScreenStateRef.current = false
                        }}
                        aiState={props.aiState}
                    />
                )}
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

            <Table
                key={dataSourceRefreshKey}
                columns={columns}
                dataSource={dataSource}
                bordered
                pagination={false}
                className={styles.click_edit_table_h2_card_content}
                rowKey={props.rowKey}
                summary={props?.summary || undefined}
            />

            <>{props?.children}</>

            {props.canAdd && (
                <div style={{ marginTop: '12px' }}>
                    <Button onClick={handleAdd}>{props.addText}</Button>
                </div>
            )}
        </ClickEditActiveContainer>
    )
}

export default React.memo(ClickEditTableH2Card) as typeof ClickEditTableH2Card
