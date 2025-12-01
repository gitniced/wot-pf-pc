export const numberToChinese = (num: number): string => {
    const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    const units = ['', '十', '百', '千']

    if (num === 0) return digits[0]
    if (num < 10) return digits[num]
    if (num === 10) return '十'
    if (num < 20) return '十' + digits[num % 10]
    if (num < 100) {
        const tens = Math.floor(num / 10)
        const ones = num % 10
        return digits[tens] + '十' + (ones > 0 ? digits[ones] : '')
    }

    let result = ''
    let unitIndex = 0
    let n = num

    while (n > 0) {
        const digit = n % 10
        if (digit !== 0) {
            result = digits[digit] + units[unitIndex] + result
        } else if (result && result[0] !== '零') {
            result = digits[0] + result
        }
        n = Math.floor(n / 10)
        unitIndex++
    }

    return result
}
