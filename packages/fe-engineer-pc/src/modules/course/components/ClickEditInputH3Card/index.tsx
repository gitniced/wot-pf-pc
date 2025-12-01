import styles from './index.module.less'
import React, { useEffect, useCallback, useMemo, useState } from 'react'
import classNames from 'classnames'
import ClickEditInput from '@/components/ClickEditInput'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import useComponentValue from '@/hooks/useComponentValue'
import { createFullScreenContentRender } from '../FullScreenContentHOC'
import FullScreenEditBtn from '../FullScreenEditBtn'
import type { ICourseDataItem } from '../../types'
import ClickEditActiveContainer from '@/components/ClickEditActiveContainer'
import ContentInput from '@/components/ContentInput'

interface IClickEditInputH3CardProps extends IUseComponentValueProps<string> {
    title: string
    dataTitle: string
    items: Omit<ICourseDataItem<string>, 'value'>[]
    description?: string
    getActive?: (active: boolean) => void
}

const ClickEditInputH3Card: React.FC<IClickEditInputH3CardProps> = props => {
    const [active, setActive] = useState(false)
    const [innerItems, setInnerItems] = useState<ICourseDataItem<string>[]>(
        props.items.map(item => ({
            ...item,
            value: props.value,
        })),
    )

    const { value, onChange, onChangeBlur } = useComponentValue({
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

    useEffect(() => {
        props?.getActive?.(active)
    }, [active])

    const ContentRender = useMemo(
        () =>
            createFullScreenContentRender(
                _p => <ContentInput heightMode="full" defaultValue={_p.value} {..._p} />,
                {
                    save: async (val: string) => {
                        const res = await props.onChangeBlur?.(val)
                        onChange(val)
                        return res || false
                    },
                    items: props.items,
                    isMulti: false,
                    onUpdateItems: items => {
                        setInnerItems(items)
                    },
                },
                value || '',
            ),
        [value, props.onChangeBlur, onChange, props.items],
    )

    return (
        <ClickEditActiveContainer
            active={active}
            setActive={setActive}
            onBlur={handleBlur}
            className={classNames(styles.click_edit_input_h3_card, {
                [styles.active]: active && !props.getActive,
            })}
        >
            <div className={styles.click_edit_input_h3_card_header}>
                <div className={styles.click_edit_input_h3_card_header_title}>
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

            <ClickEditInput
                active={active}
                setActive={setActive}
                style={{ marginTop: 16 }}
                value={value}
                defaultValue={props.defaultValue}
                onChange={onChange}
                placeholder="请输入"
            />
        </ClickEditActiveContainer>
    )
}

export default React.memo(ClickEditInputH3Card)
