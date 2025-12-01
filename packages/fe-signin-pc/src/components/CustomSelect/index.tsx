import http from '@/servers/http'
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'

type PropsType = {
    api: string
    method?: 'get' | 'post'
    params?: Record<string, any>
    otherParams?: Record<string, any>
    value?: string[]
    placeholder?: string
    onChange?: (value: string[]) => void
    mode?: 'multiple' | 'tags'
    fieldNames?: {
        label: string
        value: string
    },
    options?: any[]
}

export default function CustomSelect(props: PropsType) {
    let {
        api = '',
        method = 'get',
        params = {},
        otherParams = {},
        value,
        onChange,
        fieldNames = { label: 'name', value: 'id' },
        placeholder = '请选择',
        mode,
        options
    } = props || {}

    const [list, setList] = useState(options || [])

    const getList = async () => {
        const res: any = await http(api, method, params, otherParams)

        setList(res)
    }

    useEffect(() => {
        if (api) {
            getList()
        }
    }, [])

    return (
        <Select
            style={{ width: '100%' }}
            value={value}
            onChange={onChange}
            fieldNames={fieldNames}
            options={list}
            placeholder={placeholder}
            mode={mode}
            showSearch={false}
            allowClear
        />
    )
}
