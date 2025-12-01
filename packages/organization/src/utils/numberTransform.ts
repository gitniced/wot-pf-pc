const filterNum = (price: number | string) => {
    if (!price && typeof price !== 'number') return ''
    return Number(price).toFixed(2)
}
const filterTaxRate = (taxrate: number | string) => {
    if (!taxrate && typeof taxrate !== 'number') return ''
    return Number(taxrate) * 100
}

export { filterNum, filterTaxRate }
