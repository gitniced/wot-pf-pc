import React, { useEffect, useState } from 'react'
import { Cascader } from 'antd'
import http from '@/servers/http'
import { findItem } from '@wotu/wotu-components'

/**
 *  转换成 antd 可以使用的数据
 * @param tree
 * @returns
 */
const transFormValue = (tree: any[]) => {
    return tree.map(item => {
        if (item.childCategory && item.childCategory.length) {
            item.children = transFormValue(item.childCategory)
        }
        return {
            ...item,
            label: item.name,
            value: item.id,
        }
    })
}

function MccCaseader({ onChange, value }) {
    const [list, setList] = useState<any[]>([])
    const [_value, setValue] = useState(value || [])

    /**
     *  通过 mcccode 反查路径的元素的id
     * @returns
     */
    const testValue = () => {
        /** 只有元素不是数组的清空下才会去处理 */
        if (!Array.isArray(_value)) {
            /* 
                允许查找的最大层级
             */
            let nowCount = 0
            const maxCount = 100
            const nowItem = findItem(list, item => item.mccCode === _value, { findKey: 'children' })
            if (!nowItem) return
            let currentId = nowItem!.id

            let pathId = []
            /* 
                查找方法的封装
             */
            const dfs = (id: string) => {
                return findItem(list, item => item.id === id, { findKey: 'children' })
            }

            /* 
                循环的 通过pid 往上层去查找
             */
            while (currentId !== null && nowCount < maxCount) {
                const currentItem = dfs(currentId)

                nowCount++
                /* 
                    将当前元素的pid  赋值给currentid 
                 */
                currentId = currentItem.pid
                pathId.unshift(currentItem.id)
                /* 
                    终止条件是 当前元素是顶层元素了 那么currenID 就直接设置为 null
                 */
                if (currentItem.pid === -1) currentId = null
            }

            setValue(pathId.filter(Boolean))
        }
    }
    useEffect(() => {
        setValue(value)
    }, [value])
    useEffect(() => {
        testValue()
    }, [_value, list])

    useEffect(() => {
        http(
            '/merchant/front/create/industry_category_tree',
            'GET',
            {},
            { repeatFilter: false },
        ).then((res: any) => {
            setList(transFormValue(res || []))
        })
    }, [])

    console.log(_value, 'value')
    return (
        <Cascader
            value={Array.isArray(_value) ? _value : [_value]}
            options={list}
            onChange={e => {
                onChange?.(e)
            }}
        />
    )
}

export default MccCaseader
