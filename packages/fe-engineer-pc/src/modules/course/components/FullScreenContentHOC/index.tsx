import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import { forwardRef, useState, useImperativeHandle, useMemo, useEffect } from 'react'
import type { ICourseDataItem } from '../../types'

export interface IFullScreenContentRenderRef {
    save: () => Promise<boolean | undefined> | undefined | boolean | void
    getValue: () => ICourseDataItem<any>[]
    setValue: (val: ICourseDataItem<any>[]) => void
}

export const createFullScreenContentRender = <T,>(
    ContentRender: React.FC<IUseComponentValueProps<T>>,
    refOptions: {
        save: (value: T) => Promise<boolean | undefined> | undefined | boolean | void
        items: Omit<ICourseDataItem<any>, 'value'>[]
        isMulti: boolean
        onUpdateItems: (items: ICourseDataItem<any>[]) => void
    },
    initialValue: T | (() => T),
) => {
    return forwardRef<IFullScreenContentRenderRef, any>((_, ref) => {
        const defaultInitialValue =
            typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue
        const [value, setValue] = useState<T>(defaultInitialValue)

        const items = useMemo(() => {
            if (refOptions.isMulti) {
                const recordValue = value as Record<string, string | undefined>
                return refOptions.items.map(item => ({
                    ...item,
                    value: Array.isArray(recordValue?.[item.key])
                        ? JSON.stringify(recordValue?.[item.key])
                        : recordValue?.[item.key],
                }))
            } else {
                return refOptions.items.map(item => ({
                    ...item,
                    value: Array.isArray(value) ? JSON.stringify(value) : (value as string),
                }))
            }
        }, [refOptions.items, value])

        useEffect(() => {
            refOptions.onUpdateItems?.(items)
        }, [items])

        useImperativeHandle(ref, () => ({
            save: () => {
                return refOptions.save(value)
            },
            getValue: () => {
                if (refOptions.isMulti) {
                    // 多个字段的情况，T 应该是 Record<string, string | undefined>
                    const recordValue = value as Record<string, string | undefined>
                    return refOptions.items.map(item => ({
                        ...item,
                        value: recordValue?.[item.key],
                    }))
                } else {
                    // 单个字段的情况，T 应该是 string
                    return refOptions.items.map(item => ({
                        ...item,
                        value: value as string,
                    }))
                }
            },
            setValue: (val: ICourseDataItem[]) => {
                if (refOptions.isMulti) {
                    // 多个字段的情况
                    const recordValue = val.reduce((acc, item) => {
                        acc[item.key] = item.value
                        return acc
                    }, {} as Record<string, string | undefined>)
                    setValue(recordValue as T)
                } else {
                    // 单个字段的情况
                    setValue((val[0]?.value || '') as T)
                }
            },
        }))

        return <ContentRender onChange={setValue} value={value} />
    })
}
