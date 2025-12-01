import styles from './index.module.less'
import { useCallback, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import ClickEditInput from '@/components/ClickEditInput'
import React from 'react'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import useComponentValue from '@/hooks/useComponentValue'
import { createFullScreenContentRender } from '../FullScreenContentHOC'
import FullScreenEditBtn from '../FullScreenEditBtn'
import type { ICourseDataItem } from '../../types'
import ClickEditActiveContainer from '@/components/ClickEditActiveContainer'
import ContentInput from '@/components/ContentInput'

interface IClickEditInputH2CardProps extends IUseComponentValueProps<string> {
    className?: string
    title: string
    dataTitle: string
    items: Omit<ICourseDataItem<string>, 'value'>[]
}

const ClickEditInputH2Card: React.FC<IClickEditInputH2CardProps> = props => {
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

    const valueRef = useRef<string>(value)
    valueRef.current = value

    const handleBlur = useCallback(() => {
        if (!active) return
        setActive(false)
        onChangeBlur()
    }, [active, onChangeBlur])

    const ContentRender = useMemo(() => {
        return createFullScreenContentRender(
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
            () => valueRef.current,
        )
    }, [props.onChangeBlur, onChange, props.items])

    return (
        <ClickEditActiveContainer
            active={active}
            setActive={setActive}
            onBlur={handleBlur}
            className={classNames(styles.click_edit_input_h2_card, {
                [styles.active]: active,
                [props.className as string]: props.className,
            })}
        >
            <div className={styles.click_edit_input_h2_card_header}>
                <div className={styles.click_edit_input_h2_card_header_title}>{props.title}</div>
                {active && (
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
                style={{ marginTop: 13 }}
                value={value}
                defaultValue={props.defaultValue}
                onChange={onChange}
                placeholder="请输入"
            />
        </ClickEditActiveContainer>
    )
}

export default React.memo(ClickEditInputH2Card)
