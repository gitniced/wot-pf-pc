/**机构 */
export const ORGANIZATION = 'ORGANIZATION'
/**评价计划 */
export const REVIEWS_PLAN = 'REVIEWS_PLAN'
/**培训计划 */
export const TRAINING_PLAN = 'TRAINING_PLAN'
/**班级 */
export const TRAINING_CLASS = 'TRAINING_CLASS'
/**职业 */
export const CAREER = 'CAREER'

export const PLAY_TYPE: Record<string, any> = {
    [REVIEWS_PLAN]: {
        PLAN: '评价计划',
        TIME: '认定考试时间',
        KEY: '2',
    },
    [TRAINING_PLAN]: {
        PLAN: '班级报名',
        TIME: '培训时间',
        KEY: '3',
    },
    [TRAINING_CLASS]: {
        PLAN: '培训班级',
        TIME: '培训时间',
        KEY: '4',
    },
    [CAREER]: {
        PLAN: '职业培训',
        TIME: '培训时间',
        KEY: '5',
    },
}
