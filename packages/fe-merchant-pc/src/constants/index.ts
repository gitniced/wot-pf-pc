// 真题/模拟题
export enum SUBJECT_TYPE_ENUM {
    REAL = 10, // 真题
    SIMULATION = 20, // 模拟题
}

// 题库题目分类
export enum SKILL_TYPE_ENUM {
    SKILL = 10, // 技能
    THEORY = 20, // 理论
}

// 题库归属
export enum BELONG_TYPE_ENUM {
    NATIONAL = 10, // 国家题库
    PROVINCIAL = 20, // 省级题库
    MERCHANT = 30, // 资源方题库
    ORGANIZE = 40, // 机构题库
}
// 题型
export enum QUESTION_TYPE_ENUM {
    SINGLE = 20, // 单选题
    MULTIPLE = 30, // 多选题
    JUDGEMENT = 10, // 判断题
    BLANK = 40, // 填空题
    SHORT = 50, // 简答题
    COMPOSE = 60, // 组合题
    CALCULATE = 70, // 计算题
    DISCOURSE = 80, // 论述题
    ANALYSIS = 90, // 案例分析题
}
export const QUESTION_TYPE_TEXT: Record<number, string> = {
    [QUESTION_TYPE_ENUM.SINGLE]: '单选题',
    [QUESTION_TYPE_ENUM.MULTIPLE]: '多选题',
    [QUESTION_TYPE_ENUM.JUDGEMENT]: '判断题',
    [QUESTION_TYPE_ENUM.BLANK]: '填空题',
    [QUESTION_TYPE_ENUM.SHORT]: '简答题',
    [QUESTION_TYPE_ENUM.CALCULATE]: '计算题',
    [QUESTION_TYPE_ENUM.DISCOURSE]: '论述题',
    [QUESTION_TYPE_ENUM.ANALYSIS]: '案例分析题',
    [QUESTION_TYPE_ENUM.COMPOSE]: '组合题',
}

// 题型对象
export const QUESTION_TYPE_OPTIONS = [
    { label: '单选题', value: QUESTION_TYPE_ENUM.SINGLE },
    { label: '多选题', value: QUESTION_TYPE_ENUM.MULTIPLE },
    { label: '判断题', value: QUESTION_TYPE_ENUM.JUDGEMENT },
    { label: '填空题', value: QUESTION_TYPE_ENUM.BLANK },
    { label: '简答题', value: QUESTION_TYPE_ENUM.SHORT },
    { label: '计算题', value: QUESTION_TYPE_ENUM.CALCULATE },
    { label: '论述题', value: QUESTION_TYPE_ENUM.DISCOURSE },
    { label: '组合题', value: QUESTION_TYPE_ENUM.COMPOSE },
    { label: '案例分析题', value: QUESTION_TYPE_ENUM.ANALYSIS },
]

// 难易程度
export enum QUESTION_LEVEL_ENUM {
    EASY = 10, // 容易
    EASIER = 20, // 较容易
    MEDIUM = 30, // 中等
    MORE_DIFFICULT = 40, // 较难
    DIFFICULT = 50, // 难
}

export const QUESTION_LEVEL_TEXT: Record<number, string> = {
    [QUESTION_LEVEL_ENUM.EASY]: '容易',
    [QUESTION_LEVEL_ENUM.EASIER]: '较易',
    [QUESTION_LEVEL_ENUM.MEDIUM]: '中等',
    [QUESTION_LEVEL_ENUM.MORE_DIFFICULT]: '较难',
    [QUESTION_LEVEL_ENUM.DIFFICULT]: '难',
}

export const SUBJECT_TYPE_MAP: Record<string, number> = {
    real: SUBJECT_TYPE_ENUM.REAL,
    simulation: SUBJECT_TYPE_ENUM.SIMULATION,
}

export const SKILL_TYPE_MAP: Record<string, number> = {
    theory: SKILL_TYPE_ENUM.THEORY,
    skill: SKILL_TYPE_ENUM.SKILL,
}
