function calculateRemainingTime(startTime: number, endTime: number) {
    if (!startTime || !endTime) return '永久'

    const diff = Number(endTime) - Number(startTime)
    const totalSeconds = diff / 1000 // 转换为秒数

    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor(((totalSeconds % 86400) % 3600) / 60)

    let remainingTime = ''
    if (days > 0) {
        remainingTime += `${days}天`
    }
    if (hours > 0) {
        remainingTime += `${hours}小时`
    }
    if (minutes > 0) {
        remainingTime += `${minutes}分钟`
    }

    return remainingTime
}

export default calculateRemainingTime
