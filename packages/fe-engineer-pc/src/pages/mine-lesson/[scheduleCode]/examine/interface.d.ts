/**
 * 响应数据
 *
 * EvaluationStatisticsDto
 */
export interface EvaluationStatisticsDto {
    /**
     * 组间互评记录数量
     */
    interGroupPeerCount?: number
    /**
     * 组内互评记录数量
     */
    intraGroupPeerCount?: number
    /**
     * 自评记录数量
     */
    selfEvaluationCount?: number
    [property: string]: any
}
