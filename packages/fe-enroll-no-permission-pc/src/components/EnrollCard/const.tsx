// @ts-ignore
import { useCountDown } from '@wotu/wotu-components'
import dayjs from 'dayjs'
import React from 'react'

/**
 * 判断nowTime是否距离目标时间是否在4天之内
 * @param {number} targetTime   目标时间
 * @param {number} nowTime      当前时间
 * @param {number} day          天数
 */
export const judegTimeInDay = (targetTime: number, nowTime = new Date().getTime(), day = 4) => {
    const now = dayjs(nowTime)
    const startTime = dayjs(targetTime)
    const diff = startTime.diff(now) // 计算差值
    return diff > 0 && diff <= day * 24 * 60 * 60 * 1000
}

export const setRedColor = (unit: string | number | undefined) => {
    return <span style={{ margin: '0px 2px', color: '#FF5219' }}>{unit}</span>
}

export const TimeTips = ({
    time,
    label = '开始报名',
    interval = 0,
    forceUpdate,
    showSecond = true,
}: {
    time: number
    label?: string
    interval?: number
    forceUpdate?: () => void
    showSecond?: boolean
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
        <span className={'tips'}>
            {!isOver ? (
                <>
                    {setRedColor(day)}天{setRedColor(hour)}时{setRedColor(min)}分
                    {showSecond && (
                        <>
                            {setRedColor(seconds)}秒{label}
                        </>
                    )}
                </>
            ) : (
                ''
            )}
        </span>
    )
}

/** 活动状态 */
export const ACTIVITY_STATUS = {
    /** 未开始 */
    NOT_START: 1,
    /** 报名中 */
    REGISTERING: 2,
    /** 已结束  */
    END: 3,
}
