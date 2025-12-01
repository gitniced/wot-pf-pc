// 判断是否超过15天
export const isPast = (createdAt: string) => {
    let fiveTeenDay = 24 * 3600 * 1000 * 15
    let steps = new Date().getTime() - Number(createdAt)
    let result = !(steps >= fiveTeenDay)
    return result
}
