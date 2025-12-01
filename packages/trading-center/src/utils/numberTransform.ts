const filterNum = (price: number | string) => {
    if (!price && typeof price !== 'number') return ''
    return Number(price).toFixed(2)
}
/**
 *  计算税率 会把参数 x100
 * @param taxrate
 * @returns
 */
const filterTaxRate = (taxrate: number | string) => {
    if (!taxrate && typeof taxrate !== 'number') return ''
    return Number(taxrate) * 100
}

/**
 *  两数相乘
 *  只要任意一方传进来的是个 NaN 就直接 返回0
 *  否者会乘以大数 再相乘 最后除以
 *
 * @param l
 * @param r
 * @param point 四舍五入保留小数点的位数
 */
const multiply = (l: number, r: number, point = 2) => {
    const left = Number(l)
    const right = Number(r)
    if (Object.is(left, NaN) || Object.is(right, NaN)) return 0
    let result = (left * 100 * (right * 100)) / 10000
    return result.toFixed(point)
}

/** 给数字保留指定位数的小数点 point 必须是正整数 */
const fixedNumber = (number: number, point: number = 2) => {
    if (Object.is(Number(number), NaN)) return `0.${'0'.repeat(point)}`
    const sNumber = String(number)
    if (sNumber.includes('.')) {
        const pointArr = sNumber
            .slice(sNumber.indexOf('.') + 1)
            .split('')
            .concat(new Array(point).fill('0'))
        const afterNum = sNumber.slice(0, sNumber.indexOf('.'))
        return `${afterNum}.${pointArr.slice(0, point).join('')}`
    } else {
        return `${sNumber}.${'0'.repeat(point)}`
    }
}

export { filterNum, filterTaxRate, multiply, fixedNumber }
