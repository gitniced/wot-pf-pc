export enum ConfirmInfoState {
    NO, // 没有确认
    YES, // 已经确认
}

export enum ConfirmPrecautionsState {
    NO, // 没有确认
    YES, // 已经确认
}

export enum GenerateState {
    NO, // 没有确认
    YES, // 已经确认
}

// 是否需要签到
export enum NeedSign {
    NO, // 不需要
    YES, // 需要
}

// 签到状态
export enum SignState {
    NO, // 没有签到
    YES, // 已经签到
}

// 题目分值可见状态
export enum ScoreShowState {
    DISABLE, // 不可见
    ENABLE, // 可见
}

// 水印状态
export enum WatermarkState {
    DISABLE, // 不可见
    ENABLE, // 可见
}

// 客观题分数可见状态
export enum ObjectiveScoreState {
    DISABLE, // 不可见
    ENABLE, // 可见
}

// 是否提供计算器
export enum CalculatorState {
    DISABLE, // 不可见
    ENABLE, // 可见
}

// 是否可以使用数学公式
export enum FormulaState {
    DISABLE, // 不可见
    ENABLE, // 可见
}
