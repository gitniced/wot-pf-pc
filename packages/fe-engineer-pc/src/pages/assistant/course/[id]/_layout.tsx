import aiStore from '@/modules/ai/store'
import React, { useEffect } from 'react'

export default function Layout(props: { children: React.ReactNode }) {
    useEffect(() => {
        return () => {
            aiStore.clearExchangeData()
        }
    }, [])

    return <div>{props.children}</div>
}
