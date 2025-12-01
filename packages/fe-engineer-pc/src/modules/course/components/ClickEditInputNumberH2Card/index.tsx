import styles from './index.module.less'
import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import useComponentValue from '@/hooks/useComponentValue'
import type { ICourseDataItem } from '../../types'
import ClickEditInputNumber from '@/components/ClickEditInputNumber'
import ClickEditActiveContainer from '@/components/ClickEditActiveContainer'

interface IClickEditInputNumberH2CardProps extends IUseComponentValueProps<number> {
    className?: string
    title: string
    dataTitle: string
    items: Omit<ICourseDataItem<number>, 'value'>[]
    activeTitleRightRender?: React.ReactNode
    textTitle?: string
}

const ClickEditInputNumberH2Card: React.FC<IClickEditInputNumberH2CardProps> = props => {
    const [active, setActive] = useState(false)

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

    return (
        <ClickEditActiveContainer
            active={active}
            setActive={setActive}
            onBlur={handleBlur}
            className={classNames(styles.click_edit_input_number_h2_card, {
                [styles.active]: active,
                [props.className as string]: props.className,
            })}
        >
            <div className={styles.click_edit_input_number_h2_card_header}>
                <div className={styles.click_edit_input_number_h2_card_header_title}>
                    {props.title}
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {props?.textTitle && <div style={{ marginTop: '13px' }}>{props?.textTitle}：</div>}

                <ClickEditInputNumber
                    active={active}
                    setActive={setActive}
                    style={{ marginTop: 13 }}
                    value={value}
                    defaultValue={props.defaultValue}
                    onChange={onChange}
                />
            </div>
        </ClickEditActiveContainer>
    )
}

export default React.memo(ClickEditInputNumberH2Card)
