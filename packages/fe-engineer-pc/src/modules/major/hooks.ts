import { useCallback, useEffect, useMemo, useState } from 'react'
import { getMajorList } from './service'
import type { IMajor } from './types'

export const useMajorList = () => {
    const [majorList, setMajorList] = useState<IMajor[]>([])
    const [majorCode, setMajorCode] = useState<string>('')

    const majorOptions = useMemo(() => {
        return majorList.map(item => ({
            value: item.code,
            label: item.name,
        }))
    }, [majorList])

    const majorCodeItems = useMemo(() => {
        return majorList.map(item => ({
            key: item.code,
            label: item.name,
        }))
    }, [majorList])

    useEffect(() => {
        const cached = sessionStorage.getItem('engineer_majorList')
        if (cached) {
            const parsed = JSON.parse(cached) as IMajor[]
            setMajorList(parsed)
            setMajorCode(parsed[0]?.code || '')
        }
        getMajorList().then(res => {
            if (!res?.length) return
            setMajorList(res)
            setMajorCode(res[0]?.code || '')
            sessionStorage.setItem('engineer_majorList', JSON.stringify(res))
        })
    }, [])

    const refreshMajorList = useCallback(() => {
        getMajorList().then(res => {
            if (!res?.length) return
            setMajorList(res)
            setMajorCode(res[0]?.code || '')
            sessionStorage.setItem('engineer_majorList', JSON.stringify(res))
        })
    }, [])

    return {
        majorList,
        majorCode,
        setMajorCode,
        refreshMajorList,
        majorOptions,
        majorCodeItems,
    }
}
