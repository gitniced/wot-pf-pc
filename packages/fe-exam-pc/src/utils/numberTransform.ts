const filterNum = (price: number | string) => {
    if (!price && typeof price !== 'number') return ''
    return Number(price).toFixed(2)
}
const filterTaxRate = (taxrate: number | string) => {
    if (!taxrate && typeof taxrate !== 'number') return ''
    return Number(taxrate) * 100
}

// 转成保留1位小数
const oneDecimal = (num: string | number) => {
    const reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
    // @ts-ignore
    if (!reg.test(Number(num))) {
        return ''
    }
    let d = num.toString()
    let index = d.indexOf('.')
    if (index !== -1) {
        d = d.substring(0, 2 + index)
    } else {
        return parseFloat(d)
    }
    return parseFloat(d).toFixed(1)
}

export { filterNum, filterTaxRate, oneDecimal }
