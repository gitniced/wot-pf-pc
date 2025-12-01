import type { KnowledgePointInfoItem } from "../interface";
import type { CustomDataNode, KnowledgeItem } from "./components/interface";

export const generatorTreeData = (list: KnowledgeItem[]): CustomDataNode[] => {
    return list.map((item) => {
        if (item.level === 5 || !item.childList?.length) {
            return {
                title: item.title,
                key: item.code,
                level: item.level,
                levelCode: item.levelCode,
                totalQuestion: item.totalQuestion,
                isLeaf: true,
            };
        }

        return {
            title: item.title,
            key: item.code,
            level: item.level,
            levelCode: item.levelCode,
            totalQuestion: item.totalQuestion,
            children: generatorTreeData(item.childList),
        };
    });
};

export const getExpendKeys = (list: CustomDataNode[], result: React.Key[]) => {
    for (let i = 0; i < list.length; i++) {
        result.push(list[i].key)

        if (list[i].children) {
            getExpendKeys(list[i].children!, result)
        }
    }
    
    return result
}

export const getChildrenList = (list: CustomDataNode[], result: CustomDataNode[]) => {
    for (let i = 0; i < list?.length; i++) {
        result.push(list[i])

        if (list[i].children) {
            getChildrenList(list[i].children!, result)
        }
    }
    
    return result
}

export const initTreeData = (treeData: CustomDataNode[], initSelected: KnowledgePointInfoItem[]) => {
    return treeData?.map(item => {
        const childList = getChildrenList(item.children!, [])
        const initSelectedKeys = initSelected?.map(selected => selected.knowledgePointCode)
        // 判断子节点是否已经在已经选择的节点中
        return {
            ...item,
            selectAll: childList.every(child => initSelectedKeys?.includes(child.key as string))
        }
    })
}

export const updateChildren = (children: CustomDataNode[], selectAll?: boolean): CustomDataNode[] => {
    return children?.map(item => {
        item.selectAll = selectAll
        item.children = updateChildren(item.children!, selectAll)

        return item
    })
}

export const updateTreeData = (treeData: CustomDataNode[], node: CustomDataNode, selectAll?: boolean):  CustomDataNode[] => {
    return treeData?.map(item => {
        if (item.key === node.key) {
            item.selectAll = selectAll
            // 如果父节点全选/取消全选了，子节点执行相同操作
            item.children = updateChildren(node.children!, selectAll)
        }

        updateTreeData(item.children!, node, selectAll)

        return item
    })
}

export const updateTotalCount = (treeData:  CustomDataNode[], selectedKnowledge: CustomDataNode[], result: number[]) => {
    const selectedKeys = selectedKnowledge.map(item => item.key)

    for (let i = 0; i < treeData?.length; i++) {
        const item = treeData[i]
        if (selectedKeys.includes(item.key)) {
            result.push(item.totalQuestion ?? 0)
        }

        updateTotalCount(item.children!, selectedKnowledge, result)
    }

    return result.reduce((prev, curr) => prev + curr, 0)
}