export const toTree = (arr: any) => {
    const tree: any = []
    const map = new Map()

    arr.forEach((node: any) => {
        map.set(node.id, { ...node, children: [] })
    })

    map.forEach((node, _, map) => {
        const pid = node.pid
        const parent = map.get(pid)

        if (parent) {
            parent.children.push(node)
        } else {
            tree.push(node)
        }
    })

    return tree
}

/** 获取最顶级职位类型的id数组 */
export const getPidList = ({ value, options }: any) => {
    const ids: number[] = []
    options.forEach((item: any) => {
        item?.childList?.forEach((item1: any) => {
            item1?.childList?.forEach((item2: any) => {
                if (value.includes(item2.id)) {
                    ids.push(item.id)
                }
            })
        })
    })
    return [...new Set(ids)]
}
