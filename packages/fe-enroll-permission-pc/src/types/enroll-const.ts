/* eslint-disable @typescript-eslint/no-shadow */
import dayjs from 'dayjs'

/**机构 */
export const ORGANIZATION = 'ORGANIZATION'
/**评价计划 */
export const REVIEWS_PLAN = 'REVIEWS_PLAN'
/**培训计划 */
export const TRAINING_PLAN = 'TRAINING_PLAN'
/**培训班级 */
export const TRAINING_CLASS = 'TRAINING_CLASS'
/**职业 */
export const CAREER = 'CAREER'
// 技能竞赛
export const COMPETITION = 'SKILLS_COMPETITION'
// 站点活动
export const EVENTS = 'EVENTS'
/**  通用  */
export const COMMON = 'COMMON'

/** 报名项目 */
export const ENROLL_PROJECT: Record<string, any> = {
    [ORGANIZATION]: {
        NAME: '机构',
        KEY: '1',
    },
    [REVIEWS_PLAN]: {
        NAME: '评价计划',
        KEY: '2',
    },
    [TRAINING_PLAN]: {
        NAME: '培训计划',
        KEY: '3',
    },
    [TRAINING_CLASS]: {
        NAME: '培训班级',
        KEY: '4',
    },
    [CAREER]: {
        NAME: '职业',
        KEY: '5',
    },
    [COMPETITION]: {
        NAME: '技能竞赛',
        KEY: '6',
    },
    [EVENTS]: {
        NAME: '活动',
        KEY: '7',
    },
    [COMMON]: {
        NAME: '通用',
        KEY: '8',
    },
}

export const PLAY_TYPE: Record<string, any> = {
    [ORGANIZATION]: {
        PLAN: '机构',
        TIME: '报名时间',
        KEY: '1',
    },
    [REVIEWS_PLAN]: {
        PLAN: '评价计划',
        TIME: '认定考试时间',
        KEY: '2',
    },
    [TRAINING_PLAN]: {
        PLAN: '培训计划',
        TIME: '培训时间',
        KEY: '3',
    },
    [TRAINING_CLASS]: {
        PLAN: '培训班级',
        TIME: '培训时间',
        KEY: '4',
    },
    [CAREER]: {
        PLAN: '职业',
        TIME: '报名时间',
        KEY: '5',
    },
    [COMPETITION]: {
        PLAN: '技能竞赛',
        TIME: '技能竞赛时间',
        KEY: '6',
    },
    [EVENTS]: {
        PLAN: '活动',
        TIME: '活动时间',
        KEY: '7',
    },
    [COMMON]: {
        PLAN: '通用',
        TIME: '活动时间',
        KEY: '8',
    },
}

const ENROLL_TYPE_ENUM = {
    /** 计划 1 */
    PLAN: 1,
    /** 机构 2 */
    ORG: 2,
}
export const ENROLL_TYPE: Record<string, string> = {
    /** 报名项目类型 1 */
    [ENROLL_TYPE_ENUM.PLAN]: 'plan',
    /** 报名项目类型 2 */
    [ENROLL_TYPE_ENUM.ORG]: 'org',
}

/** 报名状态 */
export const REGISTERED_STATUS = {
    /** 未报名 */
    NOT_REGISTERED: 0,
    /** 待审核 */
    PENDING_REVIEW: 1,
    /** 未缴费 */
    UNPAID: 2,
    /** 过期未缴费 */
    OVERDUE_UNPAID: 3,
    /** 报名成功 */
    SUCCESS: 4,
    /** 报名失败 */
    FAIL: 5,
    /** 已退费 */
    REFUNDED: 6,
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

export const getEnrollTypeByName = (name: 'plan' | 'org') => {
    let type = ''
    const keys = Object.keys(ENROLL_TYPE)
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        if (ENROLL_TYPE[key] === name) {
            type = key
            break
        }
    }
    return type
}

export const getNumberByType = (type: 'fail' | 'success') => {
    return type === 'fail' ? 0 : 1
}
export const getDate = (time: number, format = 'YYYY-MM-DD HH:mm:ss') => {
    if (time === 0) return ''
    return dayjs(time).format(format)
}

export const getEnrollTime = (activityDetails: any) => {
    let time = ''
    const { applyStartTime = 0, applyEndTime = 0, activityStart = 0 } = activityDetails
    if (applyStartTime > 0 && applyEndTime > 0) {
        time = `${getDate(applyStartTime, 'YYYY-MM-DD HH:mm')} 至 ${getDate(
            applyEndTime,
            'YYYY-MM-DD HH:mm',
        )}`
    } else if (applyStartTime === 0 && applyEndTime > 0) {
        // 报名开始时间不存在且报名结束时间在，取活动创建时间
        time = `${getDate(activityStart as number, 'YYYY-MM-DD HH:mm')} 至 ${getDate(
            applyEndTime,
            'YYYY-MM-DD HH:mm',
        )}`
    } else if (applyStartTime > 0 && applyEndTime === 0) {
        // 填写了报名开始时间，没有填报名结束时间
        time = `${getDate(applyStartTime, 'YYYY-MM-DD HH:mm')} 至 待定`
    } else {
        // 都不存在不展示
        return
    }
    return time
}
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

//报名渠道
export enum ENROLL_CHANNEL {
    /** 站点门户 */
    SITE = 1,
    /** 2机构门户 */
    ORGANIZATION = 2,
    /** 报名链接 */
    LINK = 3,
    /** 推广二维码 */
    QRCODE = 4,
    /** 推广海报 */
    POSTER = 5,
}

//报名渠道
export type ApplyChannelType = 'site' | 'organization' | 'link' | 'qrcode' | 'poster'

//报名渠道
export const ENROLL_CHANNEL_ENUM: Record<string, string> = {
    [ENROLL_CHANNEL.SITE]: 'site',
    [ENROLL_CHANNEL.ORGANIZATION]: 'organization',
    [ENROLL_CHANNEL.LINK]: 'link',
    [ENROLL_CHANNEL.QRCODE]: 'qrcode',
    [ENROLL_CHANNEL.POSTER]: 'poster',
}

//报名渠道
export const ENROLL_CHANNEL_NUM: Record<string, number> = {
    [ENROLL_CHANNEL_ENUM[ENROLL_CHANNEL.SITE]]: ENROLL_CHANNEL.SITE,
    [ENROLL_CHANNEL_ENUM[ENROLL_CHANNEL.ORGANIZATION]]: ENROLL_CHANNEL.ORGANIZATION,
    [ENROLL_CHANNEL_ENUM[ENROLL_CHANNEL.LINK]]: ENROLL_CHANNEL.LINK,
    [ENROLL_CHANNEL_ENUM[ENROLL_CHANNEL.QRCODE]]: ENROLL_CHANNEL.QRCODE,
    [ENROLL_CHANNEL_ENUM[ENROLL_CHANNEL.POSTER]]: ENROLL_CHANNEL.POSTER,
}

//获取报名渠道
export const getChannelByName = (name: ApplyChannelType) => {
    let applyChannel = ''
    const keys = Object.keys(ENROLL_CHANNEL_ENUM)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (ENROLL_CHANNEL_ENUM[key] === name) {
            applyChannel = key
            break
        }
    }
    return Number(applyChannel)
}
