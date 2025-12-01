export type statusType = 'success' | 'default' | 'processing'

//	活动状态，1未开始、2报名中、3已结束
export enum StatusTypeNum {
    /**1未开始 */
    draft = 1,
    /**2报名中 */
    release = 2,
    /**3已结束 */
    end = 3,
}
export const statusActive: Record<string, statusType> = {
    [StatusTypeNum.draft]: 'default',
    [StatusTypeNum.release]: 'processing',
    [StatusTypeNum.end]: 'default',
}
export const STATUS_ACTIVE: Record<string, string> = {
    [StatusTypeNum.draft]: '未开始',
    [StatusTypeNum.release]: '报名中',
    [StatusTypeNum.end]: '已结束',
}

export const TYPE_TAG_TRANSFORMED: Record<string, string> = {
    ORGANIZATION: '机构',
    REVIEWS_PLAN: '评价计划',
    TRAINING_PLAN: '班级报名',
    TRAINING_CLASS: '培训班级',
    CAREER: '职业',
    SKILLS_COMPETITION: '技能竞赛',
    COURSE_APPLY: '课程报名',
}

export const ENROLL_TYPE_MAP_STR: Record<string, string> = {
    /**  评价计划  */
    REVIEWS_PLAN: 'reviews-plan',
    /**  培训计划  */
    TRAINING_PLAN: 'training-plan',
    /**  培训班级  */
    TRAINING_CLASS: 'training-class',
    // 技能竞赛
    SKILLS_COMPETITION: 'skills-competition',
    // 课程报名
    COURSE_APPLY: 'course-apply',
}

export const TYPE_TAG_TRANSFORMED_NUMBER: Record<string, number> = {
    /**  机构  */
    ORGANIZATION: 1,
    /**  评价计划  */
    REVIEWS_PLAN: 2,
    /**  培训计划  */
    TRAINING_PLAN: 3,
    /**   培训班级 */
    TRAINING_CLASS: 4,
    /**  职业  */
    CAREER: 5,
    SKILLS_COMPETITION: 6,
}
