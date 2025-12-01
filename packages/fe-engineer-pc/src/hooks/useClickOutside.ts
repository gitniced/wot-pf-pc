import { useEffect, useRef } from 'react'

const useClickOutside = (
    ref: React.RefObject<HTMLElement>,
    callback: () => void,
    _deps: any[] = [],
) => {
    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                savedCallback.current()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [ref])
}

export default useClickOutside
