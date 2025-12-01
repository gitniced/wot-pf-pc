import { findItem } from '@wotu/wotu-components'
import { debounce } from 'lodash'

let nodes: HTMLElement[]

/**
 *  给元素添加滚动建通
 * @param param0
 */
export const addListen = ({
    threshold = 10,
    endCallback,
    domRef,
}:
    | {
          threshold?: number
          domRef?: { current: HTMLElement | null }
          endCallback?: (i: number) => void
      }
    | undefined = {}) => {
    const debounceScrollFn = debounce(endCallback || (() => {}), 500, {
        trailing: false,
        leading: true,
    })

    setTimeout(() => {
        nodes = (Array.from(domRef?.current?.childNodes || []) as HTMLElement[])?.map(
            item => item.childNodes[1],
        ) as HTMLElement[]

        nodes.forEach((result, index) => {
            const item = result as HTMLElement
            item.onscroll = e => {
                /** 剩余可滚动区域 */
                const scrollTopArea =
                    (e.target as HTMLElement)?.scrollHeight - (e.target as HTMLElement).clientHeight
                /** 不可能会有 0 这个情况的出现 但还是做下处理 */
                const buttonArea = scrollTopArea >= 0 ? scrollTopArea : 0

                if (
                    (e.target as HTMLElement)?.scrollTop + threshold >= buttonArea &&
                    scrollTopArea > 0
                ) {
                    debounceScrollFn(index)
                }
            }
        })
    }, 1)
}

/**
 * 删除元素的滚动监听
 */
export const removeListen = () => {
    if (nodes) {
        nodes.forEach(result => {
            result.onscroll = null
        })
    }
}

/**
 *  判断当前是否是叶节点
 * @param arr
 * @returns
 */
export const isLeaf = (arr: any) => {
    return !(Array.isArray(arr) && !!arr?.length)
}

/**
 * 遍历节点 并且获得节点的path
 */
export const deepLoopTreeReturnPath = (
    tree: any[],
    childrenKey: string | number | symbol = 'children',
    valueKeys: string | number | symbol = 'value',
) => {
    if (!Array.isArray(tree)) return []
    const paths: any[] = []
    const dfs = (children: any[], dfsPaths: any[] = []) => {
        if (!Array.isArray(children)) return dfsPaths
        children.forEach(i => {
            if (isLeaf(i[childrenKey])) {
                paths.push([...dfsPaths, i[valueKeys]])
                return
            } else {
                dfs(i[childrenKey], [...dfsPaths, i[valueKeys]])
            }
        })
    }
    dfs(tree)
    return paths
}

/**
 * 断言子元素是否都处于选中的状态
 */
export const getDeepChildrenIsAllChecked = ({
    children,
    selectArr,
    index,
    childrenKey,
    valueKey,
}: Record<string, any> = {}) => {
    /** 不对叶节点做处理 */
    if (isLeaf(children)) return
    return children.every((item: any) => {
        if (isLeaf(item[childrenKey])) {
            return selectArr.find((v: any[]) => v[index] === item[valueKey])
        } else {
            return getDeepChildrenIsAllChecked({
                children: item[childrenKey],
                selectArr,
                index: index + 1,
                childrenKey,
                valueKey,
            })
        }
    })
}

/**
 * 根据路径选择出来 对应的元素
 */
export const usingPathsGetSelection = (
    paths: any[] | any[][],
    { option, valueKey, childrenKey }: Record<string, any>,
): any[] | any[][] => {
    return paths.map((item, index) => {
        if (Array.isArray(item)) {
            return usingPathsGetSelection(item, { option, valueKey, childrenKey })
        } else {
            /* 找到相同的key  并且层级也要一致 */
            return findItem(option, (i, _deep) => i[valueKey] === item && _deep === index, {
                findKey: childrenKey,
            })
        }
    })
}

/**
 * 处理 value 数据
 * @param value
 */
export const handleValue = (value: any, maxMultipleSelectLength: number) => {
    if (value === null || value === void 0) return undefined
    if (Array.isArray(value)) return value.slice(0, maxMultipleSelectLength)
    return [value]
}

/**
 * 转换数组 成为二维数组
 */
export const transformArray = (arr: any) => {
    if (!Array.isArray(arr)) return []
    return arr.map(v => [v])
}
