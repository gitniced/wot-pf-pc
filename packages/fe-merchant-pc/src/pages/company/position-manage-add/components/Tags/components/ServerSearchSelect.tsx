import type {
    SelectProps} from 'antd';
import {
    Button,
    Modal,
    Tag,
    Select,
    Divider,
    Space,
    Form,
    Input,
    message,
    Spin,
    AutoComplete
} from 'antd'
import { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import debounce from 'lodash/debounce'
import { toJS } from 'mobx'
import { type } from 'os'
import { useDebounceFn } from 'ahooks'

interface Itag {
    code: string
    professionTypeId: number
    tagName: string
    tagType: number
}

interface ServerSearchSelectProps extends SelectProps {
    value?: any[]
    /** 是否展示已选项 */
    showSelect?: boolean
    onChange?: (params?: object, value?: any) => void
    /** 可选数量 */
    maxLength?: number
    /** 获取选项数据方法 */
    getOptionsHandler: (params?: any) => Promise<[]>
    /** 选项自定义渲染函数，高度自定义需要注意antd官方文档说明 */
    optionRender?: (params: object) => JSX.Element
    /** 选项底部自定义组件 */
    optionListBottomRender?: (params?: any) => JSX.Element | null
}

const Index = (indexProps: ServerSearchSelectProps) => {
    const {
        value = [],
        showSelect,
        onChange,
        maxLength,
        optionRender,
        getOptionsHandler,
        optionListBottomRender = () => null,
    } = indexProps

    /** option数据列表 */
    const [localValue, setLocalValue] = useState<any[]>([])

    /** option数据列表 */
    const [list, setList] = useState([])

    /** 搜索的文字 */
    const [searchStr, setSearchStr] = useState('')

    /** 响应外部value*/
    useEffect(() => {
        setLocalValue(value)
    }, [])

    /** 回调上级的onChange事件*/
    const selfOnChange = (selItem: any) => {
        onChange && onChange(selItem, value)
    }

    /** 初始化获取选项数据*/
    useEffect(() => {
        getOptionsHandler().then(res => {
            setList(res)
        })
    }, [])

    /** 处理option 并渲染*/
    const getOptionRender = () => {
        // 不展示已选中的option
        let tempList = list?.filter(
            (listItem: any) =>
                !value.some(valueItem => {
                    return valueItem === listItem.code
                }),
        ) as any[]

        // 判断是否有option自定义渲染方法
        if (optionRender) {
            const optionTempList = tempList.map((item: any) => {
                item.label = optionRender({ searchStr, label: item.label })
                return item
            }) as any[]
            tempList = optionTempList
        }

        return tempList || []
    }

    /** 执行搜索请求选项数据*/
    const doSearch = async (str: string) => {
        setSearchStr(str)
        const optionList = (await getOptionsHandler({ searchStr: str })) || []
        setList(optionList)
    }

    /** 多次执行请求防抖 */
    const { run: onSearch } = useDebounceFn(doSearch, { wait: 800 })

    /** 选中选项处理*/
    const onSelect = (selItem: any) => {
        if (maxLength && !(localValue.length < maxLength)) return
        setLocalValue([...localValue, selItem])
    }

    /** 根据maxLength获取disabled状态 */
    const getDisabled = () => {
        if (maxLength) {
            if (localValue.length < maxLength) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    }

    const memoForList = useMemo(
        () => (
            <Select
                {...indexProps}
                style={{ width: 300 }}
                value={showSelect ? localValue : []}
                disabled={getDisabled()}
                mode={'multiple'}
                filterOption={() => {
                    return true
                }}
                dropdownRender={optionList => (
                    <>
                        {optionList}
                        {optionListBottomRender({ searchStr })}
                    </>
                )}
                getPopupContainer={triggerNode => triggerNode.parentNode}
                options={getOptionRender()}
                onSearch={onSearch}
                onSelect={onSelect}
                onChange={selfOnChange}
                // onKeyDown={handleKeyDown}
             />
        ),
        [list],
    )

    return memoForList
}

export default Index
