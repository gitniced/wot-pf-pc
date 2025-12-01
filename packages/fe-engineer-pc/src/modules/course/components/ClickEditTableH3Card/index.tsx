import styles from './index.module.less'
import { useCallback, useMemo, useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import type { TableColumnsType } from 'antd'
import { Table } from 'antd'
import React from 'react'
import FullScreenEditBtn from '../FullScreenEditBtn'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import useComponentValue from '@/hooks/useComponentValue'
import { createFullScreenContentRender } from '../FullScreenContentHOC'
import type { ICourseDataItem } from '../../types'
import ClickEditActiveContainer from '@/components/ClickEditActiveContainer'

interface IClickEditTableH3CardProps<T> extends IUseComponentValueProps<T[]> {
    title: string
    dataTitle: string
    description?: string
    dataSource?: T[]
    getColumns: (
        active: boolean,
        setActive: (active: boolean) => void,
        onDataChange?: (index: number, field: string, value: any) => void,
    ) => TableColumnsType<T>
    className?: string
    style?: React.CSSProperties
    items: Omit<ICourseDataItem<T>, 'value'>[]
    rowKey?: ((record: T, index?: number) => string) | string
    getActive?: (active: boolean) => void
    transformValue?: (value: any, setValue: (value: any) => void, prevValue: any) => any
}

const ClickEditTableH3Card = <T extends Record<string, any>>(
    props: IClickEditTableH3CardProps<T>,
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

                    const contentColumns = props.getColumns(true, () => {}, handleContentDataChange)

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
        (index: number, field: string, value: any) => {
            onChange(oldValues => {
                const newDataSource = [...(oldValues || [])]
                if (newDataSource[index]) {
                    newDataSource[index] = { ...newDataSource[index], [field]: value }
                    return newDataSource
                }

                return oldValues
            })
        },
        [onChange],
    )

    const columns = useMemo(
        () => props.getColumns(active, setActive, handleDataChange),
        [active, setActive, props.getColumns, handleDataChange],
    )

    useEffect(() => {
        props?.getActive?.(active)
    }, [active])

    return (
        <ClickEditActiveContainer
            active={active}
            setActive={setActive}
            onBlur={handleBlur}
            className={classNames(styles.click_edit_table_h3_card, {
                [styles.active]: active && !props.getActive,
                [props.className as string]: props.className,
            })}
            style={props.style}
        >
            <div className={styles.click_edit_table_h3_card_header}>
                <div className={styles.click_edit_table_h3_card_header_title}>
                    <span>{props.title}</span>
                    {props.description && (
                        <span className={styles.title_desc}>{props.description}</span>
                    )}
                </div>
                {active && !props.getActive && (
                    <FullScreenEditBtn
                        ContentRender={ContentRender}
                        title={props.dataTitle}
                        subTitle={props.title}
                        items={innerItems}
                        onOpen={() => (fullScreenStateRef.current = true)}
                        onClose={() => {
                            fullScreenStateRef.current = false
                        }}
                        transformValue={props.transformValue}
                    />
                )}
            </div>

            <Table
                key={dataSourceRefreshKey}
                columns={columns}
                dataSource={dataSource}
                bordered
                pagination={false}
                className={styles.click_edit_table_h3_card_content}
                rowKey={props.rowKey || ((record, index) => `row-${index || 0}`)}
            />
        </ClickEditActiveContainer>
    )
}

export default React.memo(ClickEditTableH3Card) as typeof ClickEditTableH3Card
