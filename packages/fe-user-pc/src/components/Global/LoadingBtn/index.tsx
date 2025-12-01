import React, { useState } from 'react'
import type { PropsType } from './interface'
import { Button } from 'antd'
import http from '@/servers/http'

export default function LoadingBtn(props: PropsType) {
    const [loading, setLoading] = useState(false)
    let { label, method, url, getParams, callback, config, form } = props || {}
    label ||= '确认'
    method || 'get'
    url ||= ''
    config ||= {}

    const onOk = () => {
        setLoading(true)
        let params = getParams?.()
        console.log(params)

        http(url, method, params, config)
            .then(res => {
                callback?.(res)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    const onClick = () => {
        if (form) {
            form.validateFields().then(() => {
                onOk()
            })
        } else {
            onOk()
        }
    }
    return (
        <Button type="primary" loading={loading} onClick={onClick} htmlType="submit">
            {label}
        </Button>
    )
}
