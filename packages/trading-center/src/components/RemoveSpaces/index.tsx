export const getValueFromEvent = (e: any) => {
    if (typeof e === 'number') {
        //下拉选择框走这  不然搜索不了
        return e
    } else {
        return e?.target?.value?.replace(/(^\s*)|(\s*$)/g, '')
    }
}
