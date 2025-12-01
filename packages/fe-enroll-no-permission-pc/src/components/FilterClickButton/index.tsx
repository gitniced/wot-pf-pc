import { CheckOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import type { IRoute } from 'umi'
import { useEffect, useRef, useState } from 'react'

interface FilterButtonProps extends IRoute {
    title: string
    num: number
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

interface ButtonProps {
    value?: (string | number)[]
    onChange?: (e: any) => void
    getOptions: () => void
    options: any[]
}

interface SelectionProps extends Omit<ButtonProps, 'getOptions'> {
    title: string
    type: string
    getOptions?: () => void
    fieldNames?: {
        label?: string
        value?: string
    }
    wrapperClassName?: any
}

/** 筛选按钮 */
const FilterButton: React.FC<FilterButtonProps> = ({
    title,
    num,
    children,
    type,
    wrapperClassName,
    open,
    onOpenChange,
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
    const isControlled = typeof open !== 'undefined'
    const isOpen = isControlled ? (open as boolean) : uncontrolledOpen

    const setIsOpen = (value: boolean | ((prev: boolean) => boolean)) => {
        const next = typeof value === 'function' ? (value as any)(isOpen) : value
        onOpenChange?.(next)
        if (!isControlled) {
            setUncontrolledOpen(next)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div
            ref={containerRef}
            onClick={() => setIsOpen(prev => !prev)}
            className={`${styles.filter_button} ${num && type === 'radio' ? styles.active : ''} ${
                isOpen ? styles.open : ''
            } ${wrapperClassName || ''}`}
        >
            <span className={`${styles.title}`}>
                <span>{title}</span>
                {num && type === 'checkbox' ? <span>({num})</span> : ''}
            </span>
            <svg className={`icon ${styles.icon}`}>
                <use xlinkHref={'#icon_zhankai'} />
            </svg>
            <div className={styles.child} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

/** 下拉框 */
export const Selection: React.FC<SelectionProps> = ({
    value = [],
    onChange,
    options,
    getOptions,
    type,
    title,
    fieldNames = { label: 'label', value: 'value' },
    wrapperClassName,
}) => {
    const { label = 'label', value: fieldValue = 'value' } = fieldNames
    const [open, setOpen] = useState(false)
    useEffect(() => {
        getOptions?.()
    }, [])

    const onClick = (code: number | string) => {
        if (code === '全部') {
            onChange?.([])
        } else if (type === 'radio') {
            onChange?.([code])
            setOpen(false)
        } else {
            const findIndex = value?.findIndex((item: any) => item === code)
            if (findIndex !== -1) {
                value.splice(findIndex, 1)
                onChange?.([...value])
            } else {
                onChange?.([...value, code])
            }
        }
    }

    return (
        <div className={styles.selection}>
            <FilterButton
                title={title}
                num={value?.length}
                type={type}
                wrapperClassName={wrapperClassName}
                open={open}
                onOpenChange={setOpen}
            >
                <div className={styles.options_box}>
                    {options.map((item: any) => (
                        <div
                            key={item[fieldValue]}
                            onClick={() => onClick(item[fieldValue])}
                            className={[
                                styles.option,
                                value.includes(item[fieldValue]) && styles.active,
                            ].join(' ')}
                        >
                            <span title={item[label]}>{item[label]}</span>
                            <CheckOutlined className={styles.check_icon} />
                        </div>
                    ))}
                </div>
            </FilterButton>
        </div>
    )
}
