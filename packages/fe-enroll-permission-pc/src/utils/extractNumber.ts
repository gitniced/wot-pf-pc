// 提取所有数字的函数
export default function extractNumbers(str: string) {
    // 用于存储提取到的所有数字
    const numbers: number[] = []

    // 匹配所有数字（包括整数和小数）
    const matches = str.match(/\d+(\.\d+)?/g)

    // 如果有匹配结果，将其转换为数字并添加到数组中
    if (matches) {
        matches.forEach(match => {
            numbers.push(Number(match))
        })
    }

    return numbers
}

/**
 * 根据身份证号码计算年龄
 * @param {string} idCard - 身份证号码
 * @returns {number} - 计算出的年龄
 */
export function getAgeFromIdCard(idCard: string) {
    // 检查身份证号码是否为正确的长度（通常为18位）
    if (idCard.length !== 18) {
        throw new Error('身份证号码长度不正确')
    }

    // 提取出生日期信息，身份证的第7到14位表示出生日期
    const birthYear = parseInt(idCard.substring(6, 10))
    const birthMonth = parseInt(idCard.substring(10, 12)) - 1 // 月份索引从0开始
    const birthDay = parseInt(idCard.substring(12, 14))

    // 获取当前日期
    const today = new Date()

    // 计算年龄
    let age = today.getFullYear() - birthYear

    // 如果当前日期在生日之前，则年龄减一
    if (
        today.getMonth() < birthMonth ||
        (today.getMonth() === birthMonth && today.getDate() < birthDay)
    ) {
        age--
    }

    return age
}

/**
 * 年龄是否在范围内
 * @param {string} rule - 规则
 * @param {number} age - 年龄
 * @return {boolean} - 是否在范围内
 */
export function isInScope(rule: string, age: number): boolean {
    const isMidStart = rule?.startsWith('[')
    const isMidEnd = rule?.endsWith(']')
    let [start, end] = extractNumbers(rule)
    start = isMidStart ? start : start + 1
    end = isMidEnd ? end : end - 1

    if (age >= start && (age <= end || end === 0)) {
        return true
    }

    return false
}
