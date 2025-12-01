import type { salaryCountProps } from './interface'

const salaryTypes: Record<number, string> = {
    0: 'k',
    1: '元/时',
    2: '元/天',
    3: '元/周',
    4: '元/月',
}

const uintTypes: Record<number, string> = {
    0: '',
    1: 'K',
    2: 'W',
}

/** 薪资计算规则 */
export const salaryCount = ({
    salaryMin,
    salaryMax,
    salaryType,
    salaryMonth,
    uint,
    salaryDesc,
}: salaryCountProps) => {
    if (salaryMin && salaryMax) {
        const unitText: string = uintTypes[uint] ?? ''
        const salaryText: string = salaryTypes[salaryType] ?? ''
        //@ts-ignore
        const salaryMonthText: string =
            salaryType === 4 && salaryMonth != 12 && salaryMonth > 0 ? '*' + salaryMonth + '薪' : ''
        return `${salaryMin}-${salaryMax}${unitText}${salaryText}${salaryMonthText}`
    } else if (salaryDesc) {
        return salaryDesc
    }
}
