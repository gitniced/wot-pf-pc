export const ComposeType: Record<string, any> = {
    authenticate: {
        label: '按鉴定点组卷',
        extra: '按鉴定点组卷：按照要素细目表设置的鉴定比重进行抽题组卷，所抽试题均为绑定了鉴定点的试题',
    },
    questiontype: {
        label: '按题型组卷',
        extra: '按题型组卷：按照各题型所需题量进行抽题组卷',
    },
    fromfile: {
        label: '套题组卷',
        extra: '套题组卷：Excel批量导入试题进行组卷',
    },
}
export const TypeOptions = [
    {
        value: 10,
        label: '判断题',
    },
    {
        value: 20,
        label: '单选题',
    },
    {
        value: 30,
        label: '多选题',
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
        value: 60,
        label: '组合题',
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
        value: 90,
        label: '案例分析题',
    },
]
export const QuestionType: Record<number, string> = {
    10: '判断题',
    20: '单选题',
    30: '多选题',
    40: '填空题',
    50: '简答题',
    60: '组合题',
    70: '计算题',
    80: '论述题',
    90: '案例分析题',
}
// 输入框保留一位小数
export const decimalCheck = (value: number | string | undefined): string | number => {
    const reg = /^(-)*(\d+)\.(\d).*$/ // 小数和整数的正则
    if (typeof value === 'string') {
        // 判断传入的value是不是字符串
        return !isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : ''
    }
    if (typeof value === 'number') {
        // 判断传入的value是不是数字
        return !isNaN(value) ? String(value).replace(reg, '$1$2.$3') : ''
    }
    return '' // 如果都不是return空，做一个兜底处理
}
