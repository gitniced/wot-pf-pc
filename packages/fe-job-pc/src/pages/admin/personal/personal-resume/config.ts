const generateOptions = ({
    count,
    fill,
    offset = 1,
    unit = '',
}: {
    count: number
    fill: number
    offset: number
    unit: string
}) =>
    new Array(count).fill(fill).map((item, index) => ({
        label: `${item + index * offset}${unit}`,
        value: item + index * offset,
    }))

// 月薪部分
const allMaxMonthlyPay = [
    ...generateOptions({ count: 29, fill: 1, offset: 1, unit: 'k' }),
    ...generateOptions({ count: 14, fill: 30, offset: 5, unit: 'k' }),
    ...generateOptions({ count: 17, fill: 100, offset: 10, unit: 'k' }),
]

const minMonthlyPay = allMaxMonthlyPay.slice(0, -1)

const calcMaxMonthlyPay = (min: number) => {
    if (min < 100) {
        const index = allMaxMonthlyPay.findIndex(item => item.value >= min)
        let extraIndex = allMaxMonthlyPay[index].value === min ? 1 : 0
        return allMaxMonthlyPay.slice(index + extraIndex, index + 5 + extraIndex)
    } else if (min >= 100) {
        const index = allMaxMonthlyPay.findIndex(item => item.value >= min)
        let extraIndex = allMaxMonthlyPay[index].value === min ? 1 : 0
        return allMaxMonthlyPay.slice(index + extraIndex, index + 10 + extraIndex)
    }
}

// 实习日薪部分
const allInterShipPay = generateOptions({ count: 200, fill: 10, offset: 10, unit: '' })

const minInterShipPay = allInterShipPay.slice(0, 100)

const calcInterShipPay = (min: number) => {
    if (min < 60) {
        const start = allInterShipPay.findIndex(item => item.value === min)
        return allInterShipPay.slice(start + 1, 10)
    } else {
        const start = allInterShipPay.findIndex(item => item.value === min)
        const end = allInterShipPay.findIndex(item => item.value === min * 2)
        return allInterShipPay.slice(start + 1, end + 1)
    }
}

// 兼职时薪
const allHourWage = [
    ...generateOptions({ count: 20, fill: 5, offset: 5, unit: '' }),
    ...generateOptions({ count: 2, fill: 120, offset: 30, unit: '' }),
]

const minHourWage = allHourWage.slice(0, -1)

const calcHourWage = (min: number) => {
    const index = allHourWage.findIndex(item => item.value === min)
    return allHourWage.slice(index + 1)
}

// 兼职日薪
const allDayWage = [
    ...generateOptions({ count: 26, fill: 50, offset: 10, unit: '' }),
    ...generateOptions({ count: 2, fill: 320, offset: 30, unit: '' }),
    ...generateOptions({ count: 1, fill: 400, offset: 0, unit: '' }),
]

const minDayWage = allDayWage.slice(0, -1)

const calcDayWage = (min: number) => {
    const index = allDayWage.findIndex(item => item.value === min)
    return allDayWage.slice(index + 1)
}

// 兼职周薪
const allWeekWage = [
    ...generateOptions({ count: 10, fill: 100, offset: 100, unit: '' }),
    ...generateOptions({ count: 4, fill: 1200, offset: 300, unit: '' }),
    ...generateOptions({ count: 1, fill: 2500, offset: 0, unit: '' }),
    ...generateOptions({ count: 3, fill: 3000, offset: 500, unit: '' }),
]

const minWeekWage = allWeekWage.slice(0, -1)

const calcWeekWage = (min: number) => {
    const index = allWeekWage.findIndex(item => item.value === min)
    return allWeekWage.slice(index + 1)
}

// 兼职月薪
const allMonthWage = [
    ...generateOptions({ count: 20, fill: 500, offset: 500, unit: '' }),
    ...generateOptions({ count: 5, fill: 11000, offset: 1000, unit: '' }),
]

const minMonthWage = allMonthWage.slice(0, -1)

const calaMonthWage = (min: number) => {
    const index = allMonthWage.findIndex(item => item.value === min)
    return allMonthWage.slice(index + 1)
}

const partTimeCollect = [
    null,
    { min: minHourWage, max: calcHourWage },
    { min: minDayWage, max: calcDayWage },
    { min: minWeekWage, max: calcWeekWage },
    { min: minMonthWage, max: calaMonthWage },
]

export {
    minMonthlyPay,
    calcMaxMonthlyPay,
    allMaxMonthlyPay,
    minInterShipPay,
    calcInterShipPay,
    allHourWage,
    minHourWage,
    calcHourWage,
    minDayWage,
    calcDayWage,
    minWeekWage,
    calcWeekWage,
    minMonthWage,
    calaMonthWage,
    partTimeCollect,
}
