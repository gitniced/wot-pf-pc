/**
 * 深度比较两个对象是否相等
 */
export const isObjectEqual = (obj1: any, obj2: any): boolean => {
    if (obj1 === obj2) return true
    if (obj1 == null || obj2 == null) return false
    if (typeof obj1 !== typeof obj2) return false

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) return false
        for (let i = 0; i < obj1.length; i++) {
            if (!isObjectEqual(obj1[i], obj2[i])) return false
        }
        return true
    }

    if (typeof obj1 === 'object') {
        const keys1 = Object.keys(obj1)
        const keys2 = Object.keys(obj2)
        if (keys1.length !== keys2.length) return false

        for (const key of keys1) {
            if (!keys2.includes(key)) return false
            if (!isObjectEqual(obj1[key], obj2[key])) return false
        }
        return true
    }

    return obj1 === obj2
}
