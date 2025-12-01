//  签到倒计时

import { useCallback, useEffect, useRef, useState } from 'react'
import type { ICountDownProps } from './interface'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import classNames from 'classnames'

dayjs.extend(duration)

// 剩余答题时长小于10分钟的时候，高亮提示
const MinRemainingTime = 600000

const CountDown = (props: ICountDownProps) => {
    const { diffTime, callback } = props
    const [time, setTime] = useState<number>(diffTime)
    const timeRef = useRef(0)
    const diffTimeRef = useRef<number>(diffTime)

    useEffect(() => {
        setTime(diffTime)
        timeRef.current = window.setInterval(() => {
            if (diffTimeRef.current <= 1) {
                window.clearInterval(timeRef.current)
                callback?.(diffTimeRef.current)
                return
            }
            setTime(_time => _time - 1000)
            diffTimeRef.current = diffTimeRef.current - 1000
        }, 1000)

        return () => {
            window.clearInterval(timeRef.current)
        }
    }, [diffTime])

    const formatTime = (value: number) => {
        return value < 10 ? `0${value}` : value
    }

    const renderCountDownTime = useCallback((timestamp: number) => {
        const _timestamp = timestamp <= 0 ? 0 : timestamp

        const dateDuration = dayjs.duration(_timestamp)
        const days = dateDuration.days()
        let hours = dateDuration.hours()
        const minutes = dateDuration.minutes()
        const seconds = dateDuration.seconds()
        hours = days > 0 ? (hours += days * 24) : hours

        return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
    }, [])

    return (
        <div
            className={classNames('components_count_down', {
                warning: diffTime < MinRemainingTime,
            })}
        >
            {renderCountDownTime(time)}
        </div>
    )
}

export default CountDown
