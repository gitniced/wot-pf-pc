import dayjs from "dayjs"

export const handlerTime = (time?: string) => {
    try {
        const [hour, minute] = time.split(':') ?? []
        return dayjs().startOf('day').add(Number(hour), 'hour').add(Number(minute), 'minute')
    } catch (error) {
        return undefined
    }
}