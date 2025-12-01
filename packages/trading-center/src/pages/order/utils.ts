import type React from 'react'
import { STATUSENUM } from './interface.d'

/**
 *  判断状态到底是否可以去进行支付
 * @param status
 * @returns
 */
export const isToPlay = (status: React.Key) => {
    const PlayStatus = [STATUSENUM.UNPAID_STATUS, STATUSENUM.PART_STATUS] as string[]
    return !!PlayStatus.includes(String(status))
}

/**
 *  断言值为真
 */
export const assertValueTrue = (flag: unknown) => {
    return !!flag
}

// export assertOrder
