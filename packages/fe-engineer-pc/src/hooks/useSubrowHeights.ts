import { useState, useEffect, useLayoutEffect, useCallback } from 'react'

const useSubrowHeights = (dataSource: any) => {
    const [rowHeights, setRowHeights] = useState<Record<string, number>>({})

    const measure = useCallback(() => {
        const map: Record<string, number> = {}
        const nodes = document.querySelectorAll<HTMLElement>('[data-subrow]')
        nodes.forEach(el => {
            const key = el.dataset.subrow!
            const h = el.getBoundingClientRect().height // 比 offsetHeight 更稳定
            map[key] = Math.max(map[key] || 0, h)
        })
        setRowHeights(map)
    }, [])

    // 使用 useLayoutEffect 确保在浏览器绘制前测量
    useLayoutEffect(() => {
        setRowHeights({})
        const id = requestAnimationFrame(() => {
            const id2 = requestAnimationFrame(measure)
            return () => cancelAnimationFrame(id2)
        })
        return () => cancelAnimationFrame(id)
    }, [dataSource, measure])

    // 使用 ResizeObserver 监听元素尺寸变化
    useEffect(() => {
        setRowHeights({})
        const ro = new ResizeObserver(() => measure())
        document.querySelectorAll<HTMLElement>('[data-subrow]').forEach(el => ro.observe(el))
        return () => ro.disconnect()
    }, [measure, dataSource])

    return rowHeights
}

export default useSubrowHeights
