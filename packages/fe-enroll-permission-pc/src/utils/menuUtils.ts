// import type { MenuDataItem, myArray } from '@/stores/interface'

export const topPid = 0 // 菜单的顶部id

/**
 *  树的中序遍历
 * @param tree
 * @param fn
 * @returns
 */
export function midForEach<T extends { children?: T[]; [key: string]: any }>(
    tree: T[],
    fn: (item: T, deep: number, index: number) => void,
) {
    if (!Array.isArray(tree)) return
    let task = [...tree]
    let deep = 0
    function loopClearTask(d: number) {
        const nowLength: number = task.length
        task.forEach((item, index) => {
            fn(item, d, index)
            if (item.children && Array.isArray(item.children)) {
                task.push(...item.children)
            }
        })
        task = task.slice(nowLength)
        if (task.length) {
            loopClearTask(++deep)
        }
    }
    loopClearTask(deep)
}

/**
 *  使用中序遍历查找元素
 * @param tree
 * @param fn
 * @returns
 */
export function findItem<T extends { children?: T[]; [key: string]: any }>(
    tree: T[] | undefined,
    fn: (item: T, deep: number, index: number) => boolean,
): T | undefined {
    if (!Array.isArray(tree)) return
    let task = [...tree]
    let deep = 0

    function loopClearTask(d: number): T | undefined {
        const nowLength: number = task.length
        for (let i = 0; i < nowLength; ++i) {
            const item = task[i]
            if (fn(item, d, i)) {
                return item
            }
            if (item.children && Array.isArray(item.children)) {
                task.push(...item.children)
            }
        }

        task = task.slice(nowLength)
        if (task.length) {
            return loopClearTask(++deep)
        }
    }

    return loopClearTask(deep)
}

/**
 *  中间件执行
 * @param middlewareArr
 * @param menuItem
 * @returns
 */
export const use = <T>(middlewareArr: ((m: T, v: T) => T)[], menuItem: T) => {
    return middlewareArr.reduce((a, b) => b(a, menuItem), menuItem)
}
