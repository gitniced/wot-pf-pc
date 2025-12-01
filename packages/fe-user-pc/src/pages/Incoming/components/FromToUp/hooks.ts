import { useState } from 'react'

/**
 * loading状态共享
 * @returns
 */
const useGroupLoading = (): [boolean, (P: () => Promise<unknown>) => void] => {
    const [isLoading, setIsLoading] = useState(false)
    const fn = (paramsPromise: () => Promise<unknown>) => {
        setIsLoading(true)
        paramsPromise()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false))
    }
    return [isLoading, fn]
}

export { useGroupLoading }
