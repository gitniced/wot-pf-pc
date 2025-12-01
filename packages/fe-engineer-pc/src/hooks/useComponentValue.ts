import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export interface IUseComponentValueProps<T> {
    value?: T
    defaultValue?: T
    refreshKey?: string
    onChange?: (value: T, prevValue?: T) => void
    onChangeBlur?: (value: T) => Promise<boolean | undefined> | boolean | undefined | void
}

const useComponentValue = <T>(props: IUseComponentValueProps<T>) => {
    const { value, defaultValue, refreshKey, onChange } = props

    const initialValue = useMemo(() => (value === undefined ? defaultValue : value), [])

    const [innerValue, setInnerValue] = useState<IUseComponentValueProps<T>['value']>(initialValue)
    const userHasInteracted = useRef(false)
    const currentValue = useRef(innerValue)
    const prevRefreshKey = useRef<string | undefined>(refreshKey)

    useEffect(() => {
        if (value !== undefined) {
            currentValue.current = value
            setInnerValue(value)
        }
    }, [value])

    useEffect(() => {
        if (value === undefined && !userHasInteracted.current && defaultValue !== undefined) {
            if (innerValue === undefined || innerValue === '' || innerValue === null) {
                currentValue.current = defaultValue
                setInnerValue(defaultValue)
            } else if (innerValue !== defaultValue) {
                currentValue.current = defaultValue
                setInnerValue(defaultValue)
            }
        }
    }, [value, defaultValue, innerValue])

    useEffect(() => {
        if (
            refreshKey !== undefined &&
            refreshKey !== prevRefreshKey.current &&
            defaultValue !== undefined
        ) {
            currentValue.current = defaultValue
            setInnerValue(defaultValue)
            userHasInteracted.current = false
        }

        prevRefreshKey.current = refreshKey
    }, [refreshKey, defaultValue])

    const handleChange = useCallback(
        (newValue: T | ((prevValue: T) => T)) => {
            const prevValue = currentValue.current as T

            const finalValue =
                typeof newValue === 'function'
                    ? (newValue as (prevValue: T) => T)(prevValue)
                    : newValue

            currentValue.current = finalValue
            userHasInteracted.current = true
            setInnerValue(finalValue)
            onChange?.(finalValue, prevValue)
        },
        [onChange],
    )

    const handleChangeBlur = useCallback(() => {
        return props.onChangeBlur?.(currentValue.current as T)
    }, [props.onChangeBlur])

    const finalValue = value === undefined ? innerValue : value

    return {
        value: finalValue,
        onChange: handleChange,
        onChangeBlur: handleChangeBlur,
    }
}

export default useComponentValue
