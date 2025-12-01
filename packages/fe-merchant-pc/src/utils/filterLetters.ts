const filterLetters = (index: number) => {
    if (index >= 0 && index <= 25) {
        return String.fromCharCode(65 + index)
    } else {
        return undefined
    }
}

export default filterLetters

const generAtorItem = (s: number) => {
    const map: Record<string, string> = {
        '0': '正确',
        '1': '错误',
    }
    return map[s]
}

export { generAtorItem }
