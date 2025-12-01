import Big from 'big.js'

/**
 * 计算金额两数之和
 * 目的：解决数字相加精度丢失问题
 * @param a string | number
 * @param b string | number
 */
export const sumTwoNumbers = (a: string | number, b: string | number) => {
    let bigNum1 = new Big(a)
    let bigNum2 = new Big(b)
    let result = bigNum1.plus(bigNum2)
    let sumStr = result.toString()
    return sumStr
}

/**  两数相减  */
export const subtractingTwoNumbers = (a: string | number, b: string | number) => {
    let bigNum1 = new Big(a)
    let bigNum2 = new Big(b)
    let result = bigNum1.minus(bigNum2)
    let sumStr = result.toString()
    return sumStr
}
