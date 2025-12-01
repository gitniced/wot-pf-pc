export const getValueFromEvent = (e: any) => {
    if (typeof e === 'object') {
        return e?.target?.value?.replace(/(^\s*)|(\s*$)/g, '')
    } else {
        return e
    }
}
