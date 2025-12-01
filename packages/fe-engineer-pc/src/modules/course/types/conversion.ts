/**
 * 课程校本转化关键信息
 */
export interface ICourseConversionKeyInformation {
    /**
     * 课程编号
     */
    courseCode: string
    /**
     * 当地产业概况
     */
    localIndustryOverview?: string
    /**
     * 校本转换要点
     */
    schoolBasedConversion?: string
    /**
     * 教学条件概况
     */
    teachingConditionsOverview?: string
}
