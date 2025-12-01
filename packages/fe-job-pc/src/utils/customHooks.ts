import { useEffect } from 'react'

/**
 *  当所有依赖项为true的时候再执行 callback
 * @param callback
 * @param args
 */
export const useObservableAndTrue = (callback: () => void, effects: any[]) => {
    useEffect(() => {
        if (effects.every(a => !!a)) {
            callback()
        }
    }, [...effects])
}

/**
 *  当所有依赖项为false的时候再执行 callback
 * @param callback
 * @param args
 */
export const useObservableAndFalse = (callback: () => void, effects: any[]) => {
    useEffect(() => {
        if (effects.every(a => !a)) {
            callback()
        }
    }, [...effects])
}

/**
 *  当有一个依赖性为true的时候就执行 callback
 * @param callback
 * @param args
 */
export const useObservableAndSomeTrue = (callback: () => void, effects: any[]) => {
    useEffect(() => {
        if (effects.some(a => !!a)) {
            callback()
        }
    }, [...effects])
}

/**
 *  当有一个依赖项为为false的时候就执行 callback
 * @param callback
 * @param args
 */
export const useObservableAndSomeFalse = (callback: () => void, effects: any[]) => {
    useEffect(() => {
        if (effects.some(a => !a)) {
            callback()
        }
    }, [...effects])
}
