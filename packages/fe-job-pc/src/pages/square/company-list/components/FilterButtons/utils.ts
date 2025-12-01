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