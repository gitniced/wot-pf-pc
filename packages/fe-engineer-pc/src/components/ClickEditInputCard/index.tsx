import styles from './index.module.less'
import { useRef } from 'react'
import classNames from 'classnames'
import ClickEditInput from '@/components/ClickEditInput'
import React from 'react'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import useComponentValue from '@/hooks/useComponentValue'

interface IClickEditInputCardProps extends IUseComponentValueProps<string> {
    title: string
    description?: string
    active: boolean
    setActive: (active: boolean) => void
    style?: React.CSSProperties
    className?: string
    titleClassName?: string
    /**
     * @default true
     */
    activeHighlight?: boolean
    placeholder?: string
    inputStyle?: React.CSSProperties
    titleStyle?: React.CSSProperties
    plainTextMode?: boolean
    disabled?: boolean
}

const ClickEditInputCard: React.FC<IClickEditInputCardProps> = props => {
    const { value, onChange, onChangeBlur } = useComponentValue<string>(props)
    const containerRef = useRef<HTMLDivElement>(null)
    const activeHighlight = props.activeHighlight ?? true

    return (
        <div
            ref={containerRef}
            className={classNames(styles.click_edit_input_card, {
                [styles.active]: props.active && activeHighlight,
                [props.className as string]: props.className,
            })}
            style={props.style}
        >
            <div className={styles.click_edit_input_card_header}>
                <div
                    className={classNames(
                        styles.click_edit_input_card_header_title,
                        props.titleClassName,
                    )}
                    style={props.titleStyle}
                >
                    <span>{props.title}</span>
                    {props.description && (
                        <span className={styles.title_desc}>{props.description}</span>
                    )}
                </div>
            </div>

            <ClickEditInput
                active={props.active}
                setActive={props.setActive}
                value={value}
                onChange={onChange}
                onChangeBlur={onChangeBlur}
                placeholder={props.placeholder}
                style={{ marginTop: 16, ...(props.inputStyle ?? {}) }}
                plainTextMode={props.plainTextMode}
                disabled={props.disabled}
            />
        </div>
    )
}

export default React.memo(ClickEditInputCard)
