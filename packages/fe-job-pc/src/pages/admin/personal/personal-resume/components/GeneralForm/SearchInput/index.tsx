import type { CSSProperties} from 'react';
import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
import type { SelectProps } from 'antd'

let timeout: ReturnType<typeof setTimeout> | null
let _currentValue: string

const fetch = (value: string, callback: Function, requestFunc: Function) => {
    if (timeout) {
        clearTimeout(timeout)
        timeout = null
    }
    currentValue = value

    const fake = async () => {
        const data = await requestFunc(value)
        callback(data)
    }

    timeout = setTimeout(fake, 300)
}

const SearchInput = ({
    value,
    onChange,
    requestFunc,
    initOptions,
    ...props
}: {
    props: Record<string, any>
    value: string
    onChange: (params: string) => void
    requestFunc: Function
    initOptions: any
    placeholder?: string
    style?: CSSProperties
}) => {
    const [data, setData] = useState<SelectProps['options']>([])

    const handleSearch = (newValue: string) => {
        if (newValue) {
            fetch(newValue, setData, requestFunc)
        } else {
            setData([])
        }
    }

    const initOptionsStr = JSON.stringify(initOptions)

    useEffect(() => {
        if (!Array.isArray(initOptions)) return
        setData(initOptions)
    }, [initOptionsStr])

    const handleChange = (newValue: string) => {
        console.log(newValue)
        onChange?.(newValue)
    }

    return (
        <Select
            showSearch
            value={value}
            placeholder={props?.placeholder}
            style={props?.style}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
            options={data || []}
        />
    )
}

export { SearchInput }
