import http from '@/servers/http'
import { useDebounceFn } from 'ahooks'
import type { SelectProps } from 'antd'
import { Select } from 'antd'
import { useEffect, useState } from 'react'
type RequestMethodType = 'get' | 'post' | 'delete' | 'put'
type SelectItemType = {
    label: string
    value: string | number
}

interface MoreSelectProps extends SelectProps<any> {
    all: boolean
    labelInValue?: boolean
    valueKey: string
    labelKey?: string
    requestUrl: string
    placeholder?: string
    requestMethod?: RequestMethodType
    className?: string
    selectProps?: any
    onBlur?: () => void
    onChange?: (e: string | number) => void
    value?: string | number
    requestParams?: any
    fomatterResposeBody?: (res: any) => SelectItemType[]
    isHasPage?: boolean
    mode?: 'multiple' | 'tags'
    beforeChange?: (selectValue: string | number, selectItem: unknown) => unknown
    maxLength?: number
    repeatFilter?: boolean
    paramsUpdate?: any
    currency?: boolean
    disabled?: boolean
    getOptions?: (options: any) => void
    dealOptions?: (options: any) => any
}

/**
 * @params value 值
 * @params requestUrl options数据来源接口地址
 * @params valueKey option的value字段对应的接口数据字段名
 * @params valueKey option的label字段对应的接口数据字段名 默认为name
 * @params all 是否添加“全部”选项 默认true 添加
 * @params labelInValue 是否在将value变成 {label,value,key}对象
 * @params placeholder 占位文案
 * @params onChange 选择改变触发
 * @params mode? 设置 Select 的模式为多选或标签 'multiple' | 'tags'
 * @params allowClear? 支持清除
 * @params requestMethod? 自定义接口请求方式
 * @params selectProps? 透传给antd Select的额外属性  优先级高于默认属性
 * @params requestParams? 请求携带的额外参数
 * @params fomatterResposeBody 自定义格式化返回参数
 * @params isHasPage  是否需要启用分页
 * @params beforeChange  在onChange之前执行
 * @params maxLength  可选最多数量  mode=multiple 时生效
 * @params repeatFilter  是否可以重复请求 默认为true 不可以重复请求
 * @params paramsUpdate  为true 表示 传入的params发生变化时，重新请求接口
 * @params currency  是否添加“通用站点”选项 默认true 添加
 * @params disabled
 * @params showSearch 支持搜索，默认true
 */

let searchStr: string = ''
let currentPage: number = 1
// let totalCount: number = 0

const MoreSelect = (props: MoreSelectProps) => {
    const {
        valueKey,
        labelKey = 'name',
        requestUrl,
        onBlur,
        onChange,
        placeholder = '请选择',
        all = true,
        labelInValue = false,
        allowClear = false,
        showSearch = true,
        mode,
        requestMethod = 'post',
        className,
        requestParams = {},
        fomatterResposeBody,
        isHasPage = true,
        beforeChange,
        maxLength,
        style = { width: '100%' },
        repeatFilter = true,
        paramsUpdate = true,
        currency = false,
        disabled = false,
        getOptions,
        dealOptions,
    } = props
    const [options, changeOptions] = useState(all ? [{ label: '全部', value: '全部' }] : [])
    const [value, setValue] = useState<any>()
    const [totalCount, setTotalCount] = useState<number>(0)
    useEffect(() => {
        props.value && setValue(props.value)
    }, [props.value])

    /** 单次执行请求 */
    const singleDoRequest = (params: any) => {
        searchStr = params?.[labelKey]
        // 页码，及搜索值变化时，发请求
        http(
            requestUrl,
            requestMethod,
            {
                pageSize: 10,
                pageNo: currentPage || 1,
                [labelKey]: params?.[labelKey],
                ...requestParams,
            },
            { repeatFilter: repeatFilter },
        ).then((res: any) => {
            let tempData = []
            if (isHasPage) {
                let data = []
                // @ts-ignore
                data = res?.data?.map((item: any) => {
                    item.label = item[labelKey]
                    item.value = item[valueKey]
                    return dealOptions ? dealOptions(item) : item
                })
                if (currentPage === 1) {
                    if (data.length > 0) {
                        if (all) {
                            tempData = [{ label: '全部', value: '全部' }].concat(data)
                        } else {
                            tempData = data
                        }
                        if (currency) {
                            tempData = [{ label: '通用站点', value: '-1' }].concat(tempData)
                        }
                    } else {
                        // 当currentPage为1，并且data为[],认为没有数据，则清空options
                        tempData = data
                        if (currency) {
                            tempData = [{ label: '通用站点', value: '-1' }].concat(tempData)
                        }
                    }
                } else {
                    tempData = options.concat(data)
                }
                currentPage = res?.currentPage as unknown as number
                setTotalCount(res?.totalCount as unknown as number)
            } else {
                if (typeof fomatterResposeBody === 'function') {
                    tempData = fomatterResposeBody(res)
                } else {
                    tempData = res?.map((item: any) => {
                        item.label = item[labelKey]
                        item.value = item[valueKey]
                        return item
                    })
                }
                if (all) {
                    tempData = [{ label: '全部', value: '全部' }].concat(tempData)
                }
                if (currency) {
                    tempData = [{ label: '通用站点', value: '-1' }].concat(tempData)
                }
            }

            changeOptions(tempData)
            getOptions?.(tempData)
        })
    }

    /** 多次执行请求防抖 */
    const { run: doRequestMore } = useDebounceFn(singleDoRequest, { wait: 500 })
    /** 初次进入组件请求option数据 */
    useEffect(() => {
        // 初次渲染时不执行
        if (paramsUpdate) {
            currentPage = 1
            const requestValue = {
                pageSize: 10,
                pageNo: currentPage,
                [labelKey]: '',
                ...requestParams,
            }
            singleDoRequest(requestValue)
        }
    }, [paramsUpdate])

    /** 滑动触底触发请求 */
    const scrollEnd = (e: any) => {
        const { target } = e
        // 滚动 触底 看接口是否还有剩余的值没传过来
        // !!! 部分电脑无法强相等两个值，为了兼容这种情况，设置5px阈值
        if (target.scrollHeight - (target.scrollTop + target.offsetHeight) < 5) {
            let currentLength = all ? options.length - 1 : options.length
            if (currentLength < totalCount) {
                currentPage = currentLength / 10 + 1
                const requestValue = {
                    pageSize: 10,
                    pageNo: currentPage,
                    [labelKey]: searchStr,
                    ...requestParams,
                }
                singleDoRequest(requestValue)
            }
        }
    }

    const sourceChange = (selectValue: string | number, selectItem: unknown) => {
        typeof beforeChange === 'function' && beforeChange(selectValue, selectItem)
        if (mode === 'multiple' && maxLength) {
            if ((selectValue as string).length <= maxLength) {
                setValue(selectValue)
            }
        } else {
            setValue(selectValue)
        }
    }

    useEffect(() => {
        onChange?.(value)
    }, [value])

    // 清除清空条件 searchValue为空，current为1
    const clearSearch = () => {
        currentPage = 1
        const requestValue = {
            pageSize: 10,
            pageNo: 1,
            [labelKey]: '',
            ...requestParams,
        }
        doRequestMore(requestValue)
    }

    return (
        <Select
            disabled={disabled}
            labelInValue={labelInValue}
            value={value}
            style={style}
            placeholder={placeholder}
            showSearch={showSearch}
            options={options}
            mode={mode && mode}
            allowClear={allowClear}
            // options的值 搜索需要filterOption return true 保证过滤的数据是从接口取来的
            filterOption={() => {
                return true
            }}
            onPopupScroll={scrollEnd}
            className={className}
            onSearch={e => {
                currentPage = 1
                const requestValue = {
                    pageSize: 10,
                    pageNo: currentPage,
                    [labelKey]: e.trim(),
                    ...requestParams,
                }
                doRequestMore(requestValue)
            }}
            onSelect={() => {
                // 单选模式下 选择后重置搜索条件
                if (!mode) {
                    clearSearch()
                }
            }}
            onChange={sourceChange}
            onBlur={() => {
                onBlur?.()
            }}
            {...props.selectProps}
        />
    )
}

export default MoreSelect
