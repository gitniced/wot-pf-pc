import styles from './index.module.less'
import React, { useCallback, useMemo, useState, useEffect } from 'react'
import classNames from 'classnames'
import ClickEditInputCard from '@/components/ClickEditInputCard'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import useComponentValue from '@/hooks/useComponentValue'
import { createFullScreenContentRender } from '../FullScreenContentHOC'
import FullScreenEditBtn from '../FullScreenEditBtn'
import type { ICourseDataItem } from '../../types'
import ClickEditActiveContainer from '@/components/ClickEditActiveContainer'

interface IClickEditMultiInputH3CardProps
    extends IUseComponentValueProps<Record<string, string | undefined>> {
    title: string
    dataTitle: string
    description?: string
    className?: string
    style?: React.CSSProperties
    items: Omit<ICourseDataItem<string>, 'value'>[]
    getActive?: (active: boolean) => void
}

const ClickEditMultiInputH3Card: React.FC<IClickEditMultiInputH3CardProps> = props => {
    const [active, setActive] = useState(false)
    const [innerItems, setInnerItems] = useState<ICourseDataItem<string>[]>(
        props.items.map(item => ({
            ...item,
            value: props.value?.[item.key],
        })),
    )

    const {
        value: values,
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
                // eslint-disable-next-line @typescript-eslint/no-shadow
                _p => (
                    <div
                        className={styles.click_edit_multi_input_h3_card_list}
                        style={{ gap: 32, display: 'flex', flexDirection: 'column' }}
                    >
                        {props.items.map(item => (
                            <ClickEditInputCard
                                key={item.key}
                                title={item.name}
                                description={item.description}
                                active={true}
                                setActive={() => {}}
                                activeHighlight={false}
                                className={styles.click_edit_multi_input_h3_card_list_item}
                                titleClassName={
                                    styles.click_edit_multi_input_h3_card_list_item_title
                                }
                                style={{ border: 'none', padding: 0, margin: 0, boxShadow: 'none' }}
                                inputStyle={{ marginTop: 12 }}
                                titleStyle={{
                                    fontWeight: 'normal',
                                    fontSize: 18,
                                    lineHeight: '26px',
                                    color: 'rgba(0,0,0,65%)',
                                }}
                                placeholder="请输入"
                                value={_p.value?.[item.key]}
                                onChange={value => {
                                    const newValues = { ..._p.value, [item.key]: value }
                                    _p.onChange?.(newValues)
                                }}
                                onChangeBlur={value => {
                                    const newValues = { ..._p.value, [item.key]: value }
                                    _p.onChange?.(newValues)
                                }}
                            />
                        ))}
                    </div>
                ),
                {
                    save: async (value: Record<string, string | undefined>) => {
                        const res = await props.onChangeBlur?.(value)
                        onChange(value)
                        return res || false
                    },
                    items: props.items,
                    isMulti: true,
                    onUpdateItems: items => {
                        setInnerItems(items)
                    },
                },
                values || {},
            ),
        [props.items, props.onChangeBlur, onChange, values],
    )

    const handleBlur = useCallback(() => {
        if (!active) return
        setActive(false)
        onChangeBlur()
    }, [active, onChangeBlur])

    const handleFieldChange = useCallback(
        (key: string, fieldValue: string) => {
            onChange(oldValues => ({ ...oldValues, [key]: fieldValue }))
        },
        [onChange],
    )

    const handleFieldBlur = useCallback(
        (key: string, fieldValue: string) => {
            onChange(oldValues => ({ ...oldValues, [key]: fieldValue }))
        },
        [onChange],
    )

    useEffect(() => {
        props?.getActive?.(active)
    }, [active])

    return (
        <ClickEditActiveContainer
            active={active}
            setActive={setActive}
            onBlur={handleBlur}
            className={classNames(styles.click_edit_multi_input_h3_card, {
                [styles.active]: active && !props.getActive,
                [props.className as string]: props.className,
            })}
            style={props.style}
        >
            <div className={styles.click_edit_multi_input_h3_card_header}>
                <div className={styles.click_edit_multi_input_h3_card_header_title}>
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
                    />
                )}
            </div>

            <div className={styles.click_edit_multi_input_h3_card_list}>
                {props.items.map(item => (
                    <ClickEditInputCard
                        key={item.key}
                        title={item.name}
                        description={item.description}
                        active={active}
                        setActive={setActive}
                        activeHighlight={false}
                        className={styles.click_edit_multi_input_h3_card_list_item}
                        titleClassName={styles.click_edit_multi_input_h3_card_list_item_title}
                        placeholder="请输入"
                        value={values?.[item.key]}
                        onChange={value => handleFieldChange(item.key, value)}
                        onChangeBlur={value => handleFieldBlur(item.key, value)}
                    />
                ))}
            </div>
        </ClickEditActiveContainer>
    )
}

export default React.memo(ClickEditMultiInputH3Card)
