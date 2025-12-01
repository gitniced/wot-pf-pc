export const toTree = (arr) => {
    const tree = [];
    const map = new Map();

    arr.forEach(node => {
        map.set(node.id, { ...node, children: [] });
    });

    map.forEach((node, _, map) => {
        const pid = node.pid;
        const parent = map.get(pid);

        if (parent) {
            parent.children.push(node);
        } else {
            tree.push(node);
        }
    });

    return tree;
}

/** 获取最顶级职位类型的id数组 */
export const getPidList = ({ value, options }) => {
    const ids: number[] = []
    options.forEach(item => {
        item?.childList?.forEach(item1 => {
            item1?.childList?.forEach(item2 => {
                if (value.includes(item2.id)) {
                    ids.push(item.id)
                }
            })
        })
    })
    return [...new Set(ids)]
}