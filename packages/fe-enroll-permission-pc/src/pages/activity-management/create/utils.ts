import dayjs from 'dayjs'

/**
 * 时间的限制范围
 * @param start
 * @param end
 * @returns {*}
 */
export const range = (start: number, end: number) => {
    const result = []
    for (let i = start; i < end; i++) {
        result.push(i)
    }
    return result
}

/**
 * 设置时间选择的范围
 * @param date
 * @returns {*}
 */
export const disabledTime = (date: any) => {
    const hour = dayjs().hour() // 获取当前的小时
    const min = dayjs().minute() // 获取当前的分钟
    const second = dayjs().second() // 获取当前秒
    if (date?.format('YYYY-MM-DD').valueOf() === dayjs().format('YYYY-MM-DD').valueOf()) {
        if (date?.format('HH').valueOf() === dayjs().format('HH').valueOf()) {
            if (date?.format('mm').valueOf() === dayjs().format('mm').valueOf()) {
                return {
                    disabledHours: () => range(0, 24).splice(0, hour),
                    disabledMinutes: () => range(0, 60).splice(0, min),
                    disabledSeconds: () => range(0, 60).splice(0, second),
                }
            } else {
                return {
                    disabledHours: () => range(0, 24).splice(0, hour),
                    disabledMinutes: () => range(0, 60).splice(0, min),
                }
            }
        } else {
            return {
                disabledHours: () => range(0, 24).splice(0, hour),
            }
        }
    }
}

/**  添加url  */
export const addFormParams = (key: string, e: number) => {
    let currentUrl = new URL(window.location.href)

    if (currentUrl.searchParams.has(key)) {
        currentUrl.searchParams.delete(key)
    }

    e && currentUrl.searchParams.append(key, e.toString())
    window.history.replaceState({}, '', currentUrl)
}
