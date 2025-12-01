export const getSecretMobile = (mobile: string | number | undefined) => {
    if (!mobile) return ''
    let number = mobile.toString()
    number = number.slice(0, 3) + '****' + number.slice(7, 12)
    return number
}

export const getSecretName = (name: string | undefined) => {
    if (!name) return ''

    let result = '*' + name.slice(1)
    return result
}
