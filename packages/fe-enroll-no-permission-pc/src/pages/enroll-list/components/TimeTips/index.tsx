import { useCountDown } from '@wotu/wotu-components'

export const setRedColor = (unit: string | number | undefined) => {
    return <span style={{ margin: '0px 2px', color: '#FF5219' }}>{unit}</span>
}

export const TimeTips = ({
    time,
    label = '开始报名',
    interval = 0,
    forceUpdate,
}: {
    time: number
    label?: string
    interval?: number
    forceUpdate?: () => void
}) => {
    const [timeInfo] = useCountDown({
        time,
        interval,
    })
    const { day, min, hour, seconds, isOver } = timeInfo
    if (isOver) {
        forceUpdate?.()
    }
    return (
        <span>
            {!isOver ? (
                <>
                    {setRedColor(day)}天{setRedColor(hour)}时{setRedColor(min)}分
                    {setRedColor(seconds)}秒{label}
                </>
            ) : (
                ''
            )}
        </span>
    )
}
