import { enumToItem } from '@/utils/enumHandle'
import Stylistic1 from './views/Stylistic1'
import Stylistic2 from './views/Stylistic2'
import Stylistic3 from './views/Stylistic3'
import Stylistic4 from './views/Stylistic4'
import Stylistic5 from './views/Stylistic5'
import Stylistic6 from './views/Stylistic6'
import Stylistic7 from './views/Stylistic7'
import Stylistic8 from './views/Stylistic8'
import Stylistic9 from './views/Stylistic9'
import Stylistic10 from './views/Stylistic10'
import Stylistic11 from './views/Stylistic11'
import Stylistic12 from './views/Stylistic12'

/**
 * 课程设计环节
 */
export enum COURSE_DESIGN_STEP {
    /**
     * 课程校本转化
     */
    conversion = 'conversion',
    /**
     * 学习任务设计
     */
    learning = 'learning',
    /**
     * 教学方案设计
     */
    teaching = 'teaching',
    /**
     * 考核方案设计
     */
    check = 'check',
}

export const COURSE_DESIGN_STEP_LABEL = {
    [COURSE_DESIGN_STEP.conversion]: '课程校本转化',
    [COURSE_DESIGN_STEP.learning]: '学习任务设计',
    [COURSE_DESIGN_STEP.teaching]: '教学方案设计',
    [COURSE_DESIGN_STEP.check]: '考核方案设计',
}

export const courseDesignStepItems = enumToItem(COURSE_DESIGN_STEP_LABEL)

/**
 * 课程设计体例
 */
export enum COURSE_DESIGN_STYLISTIC {
    stylistic1 = 1,
    stylistic2 = 2,
    stylistic3 = 3,
    stylistic4 = 4,
    stylistic5 = 5,
    stylistic6 = 6,
    stylistic7 = 7,
    stylistic8 = 8,
    stylistic9 = 9,
    stylistic10 = 10,
    stylistic11 = 11,
    stylistic12 = 12,
}

export const courseDesignStylisticList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

/**
 * 课程设计体例
 */
export const COURSE_DESIGN_STYLISTIC_MAP = {
    [COURSE_DESIGN_STYLISTIC.stylistic1]: {
        key: COURSE_DESIGN_STYLISTIC.stylistic1 as const,
        name: '体例1. 工学一体化课程标准校本转化建议',
        component: Stylistic1,
    },
    [COURSE_DESIGN_STYLISTIC.stylistic2]: {
        key: COURSE_DESIGN_STYLISTIC.stylistic2 as const,
        name: '体例2. 工学一体化校本课程标准',
        component: Stylistic2,
    },
    [COURSE_DESIGN_STYLISTIC.stylistic3]: {
        key: COURSE_DESIGN_STYLISTIC.stylistic3 as const,
        name: '体例3. 工学一体化课程学习任务设计',
        component: Stylistic3,
    },
    [COURSE_DESIGN_STYLISTIC.stylistic4]: {
        key: COURSE_DESIGN_STYLISTIC.stylistic4 as const,
        name: '体例4. 工学一体化课程考核方案',
        component: Stylistic4,
    },
    [COURSE_DESIGN_STYLISTIC.stylistic5]: {
        key: COURSE_DESIGN_STYLISTIC.stylistic5 as const,
        name: '体例5. 工学一体化课程终结性考核试题',
        component: Stylistic5,
    },
    [COURSE_DESIGN_STYLISTIC.stylistic6]: {
        key: COURSE_DESIGN_STYLISTIC.stylistic6 as const,
        name: '体例6. 学习任务分析表',
        component: Stylistic6,
    },
    [COURSE_DESIGN_STYLISTIC.stylistic7]: {
        key: COURSE_DESIGN_STYLISTIC.stylistic7 as const,
        name: '体例7. 学习任务教学活动策划表',
        component: Stylistic7,
    },
    [COURSE_DESIGN_STYLISTIC.stylistic8]: {
        key: COURSE_DESIGN_STYLISTIC.stylistic8 as const,
        name: '体例8. 学习任务考核方案',
        component: Stylistic8,
    },
    [COURSE_DESIGN_STYLISTIC.stylistic9]: {
        key: COURSE_DESIGN_STYLISTIC.stylistic9 as const,
        name: '体例9. 学习任务工作页',
        component: Stylistic9,
    },
    [COURSE_DESIGN_STYLISTIC.stylistic10]: {
        key: COURSE_DESIGN_STYLISTIC.stylistic10 as const,
        name: '体例10. 学习任务信息页',
        component: Stylistic10,
    },
    [COURSE_DESIGN_STYLISTIC.stylistic11]: {
        key: COURSE_DESIGN_STYLISTIC.stylistic11 as const,
        name: '体例11. 工学一体化课程教学进度计划表',
        component: Stylistic11,
    },
    [COURSE_DESIGN_STYLISTIC.stylistic12]: {
        key: COURSE_DESIGN_STYLISTIC.stylistic12 as const,
        name: '体例12. 工学一体化课程教案',
        component: Stylistic12,
    },
}

/**
 * 课程设计环节对应体例
 */
export const COURSE_DESIGN_STEP_MAP_STYLISTIC = {
    [COURSE_DESIGN_STEP.conversion]: [
        COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic1],
        COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic2],
    ],
    [COURSE_DESIGN_STEP.learning]: [
        COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic3],
        COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic6],
        COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic9],
        COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic10],
    ],
    [COURSE_DESIGN_STEP.teaching]: [
        COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic7],
        COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic11],
        COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic12],
    ],
    [COURSE_DESIGN_STEP.check]: [
        COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic4],
        COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic5],
        COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic8],
    ],
}

/**
 * 课程设计学习任务类型
 */
export enum COURSE_DESIGN_LEARNING_TASK_TYPE {
    /**
     * 任务
     */
    task = 'task',
    /**
     * 环节
     */
    stage = 'stage',
    /**
     * 活动
     */
    activity = 'activity',
}
