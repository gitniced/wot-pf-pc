export interface MenuScoreItem {
    key: string
    title: string
    score: number
    suggestion: string[]
    code: string
    name: string
}

export interface ResumeResult {
    candidateCode: string // 求职者code
    score: number
    ranking: string
    menuScores: MenuScoreItem[]
    menuScoreMap: Record<string, MenuScoreItem[]>
    suggestion: string[]
    analysisScores: AnalysisScoreItem[]
    generateState: number
}
export interface AnalysisScoreItem {
    suggestion: string
    title: string
    score: number
    totalScore: number
}

export interface MenuScoreItem {
    key: string
    title: string
    score: number
    suggestion: string[]
}
