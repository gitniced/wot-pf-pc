export const optionAll = {
    value: 0,
    label: '全部',
}

export const typeOptions = [
    {
        value: 20,
        label: '单选题',
    },
    {
        value: 30,
        label: '多选题',
    },
    {
        value: 10,
        label: '判断题',
    },
    {
        value: 40,
        label: '填空题',
    },
    {
        value: 50,
        label: '简答题',
    },
    {
        value: 70,
        label: '计算题',
    },
    {
        value: 80,
        label: '论述题',
    },
    {
        value: 60,
        label: '组合题',
    },
    {
        value: 90,
        label: '案例分析题',
    },
]

export const levelOptions = [
    {
        value: 10,
        label: '易',
    },
    {
        value: 20,
        label: '较易',
    },
    {
        value: 30,
        label: '中等',
    },
    {
        value: 40,
        label: '较难',
    },
    {
        value: 50,
        label: '难',
    },
]

export const discriminationOptions = [
    {
        value: 10,
        label: '差',
    },
    {
        value: 20,
        label: '较差',
    },
    {
        value: 30,
        label: '中等',
    },
    {
        value: 40,
        label: '良好',
    },
    {
        value: 50,
        label: '优秀',
    },
]

export const recommendStatusOptions = [
    {
        value: 10,
        label: '未推荐',
    },
    {
        value: 20,
        label: '已推荐',
    },
]

export const referStatusOptions = [
    {
        value: 10,
        label: '未引用',
    },
    {
        value: 20,
        label: '已引用',
    },
]

export const optionsType = {
    questionType: typeOptions,
    questionLevel: levelOptions,
    discrimination: discriminationOptions,
    recommendStatus: recommendStatusOptions,
    referStatus: referStatusOptions,
}
