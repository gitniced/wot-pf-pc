import http from '@/servers/http'
import type { SelectProps } from 'antd'
import { Select } from 'antd'
import { useDeepCompareEffect } from 'ahooks'
import { useEffect, useState } from 'react'
type RequestMethodType = 'get' | 'post' | 'delete' | 'put'
type SelectItemType = {
    label: string
    value: string | number
}

interface MoreSelectProps extends SelectProps<any> {
    all: boolean
    labelInValue?: boolean
    labelKey?: string
    valueKey: string
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
    searchKey?: 'string'
}

/**
 * @params value 值
 * @params requestUrl options数据来源接口地址
 * @params valueKey option的value字段对应的接口数据字段名
 * @params labelKey option的label字段对应的接口数据字段名
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
 */

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
        mode,
        requestMethod = 'post',
        className,
        requestParams = {},
        fomatterResposeBody,
        isHasPage = true,
        beforeChange,
        searchKey = 'name',
        maxLength,
    } = props
    const initOption = all ? [{ label: '全部', value: '全部' }] : []
    const initSearchData = {
        pagination: {
            currentPage: 1,
            totalCount: 0,
        },
        searchValue: '',
    }
    const [options, changeOptions] = useState(initOption)
    const [value, setValue] = useState()
    const [searchData, changeSearchData] = useState(initSearchData)
    const {
        pagination: { currentPage, totalCount },
        searchValue,
    } = searchData

    /**
     * 请求方法
     */
    const requestFn = () => {
        http(
            requestUrl,
            requestMethod,
            {
                pageSize: 10,
                pageNo: currentPage || 1,
                [searchKey || 'name']: searchValue,
                ...requestParams,
            },
            { repeatFilter: false },
        ).then(res => {
            let tempData = []
            if (isHasPage) {
                let data = []
                if (typeof fomatterResposeBody === 'function') {
                    data = fomatterResposeBody(res)
                } else {
                    data = res?.data.map(item => {
                        item.label = item[labelKey]
                        item.value = item[valueKey]
                        return item
                    })
                }
                console.log(data)
                if (currentPage === 1) {
                    if (data.length > 0) {
                        if (all) {
                            tempData = [{ label: '全部', value: '全部' }].concat(data)
                        } else {
                            tempData = data
                        }
                    } else {
                        tempData = options.concat(data)
                    }
                } else {
                    tempData = options.concat(data)
                }
                changeSearchData({
                    ...searchData,
                    pagination: { currentPage: res.currentPage, totalCount: res.totalCount },
                })
            } else {
                if (typeof fomatterResposeBody === 'function') {
                    tempData = fomatterResposeBody(res)
                } else {
                    tempData = res?.map(item => {
                        item.label = item.name
                        item.value = item[valueKey]
                        return item
                    })
                }
                if (all) {
                    tempData = [{ label: '全部', value: '全部' }].concat(tempData)
                }
            }
            changeOptions(tempData)
        })
    }

    useEffect(() => {
        props.value && setValue(props.value)
    }, [props.value])

    useEffect(() => {
        requestFn()
    }, [currentPage, searchValue])
    useDeepCompareEffect(() => {
        changeOptions(initOption)
        changeSearchData(initSearchData)
        requestFn()
    }, [requestParams])
    const scrollEnd = e => {
        e.persist()
        const { target } = e
        // 滚动 触底 看接口是否还有剩余的值没传过来
        // !!! 部分电脑无法强相等两个值，为了兼容这种情况，设置5px阈值
        if (target.scrollHeight - (target.scrollTop + target.offsetHeight) < 5) {
            if (currentPage * 10 < totalCount) {
                changeSearchData({
                    ...searchData,
                    pagination: {
                        ...searchData.pagination,
                        currentPage: currentPage + 1,
                    },
                })
            }
        }
    }

    // 搜索条件变化时，current变成1，
    const searchDataset = searchStr => {
        changeOptions([])
        changeSearchData({
            pagination: {
                ...searchData.pagination,
                currentPage: 1,
            },
            searchValue: searchStr,
        })
    }

    let debounceList: NodeJS.Timeout[] = []
    const debounce = (callback, searchStr) => {
        debounceList.map(i => window.clearTimeout(i))
        debounceList = []
        const t = setTimeout(() => {
            callback(searchStr)
            debounceList.map(i => window.clearTimeout(i))
            debounceList = []
        }, 1000)
        debounceList.push(t)
    }

    useEffect(() => {
        return () => {
            debounceList.map(i => window.clearTimeout(i))
            debounceList = []
        }
    }, [])

    const sourceChange = (selectValue: string | number, selectItem: unknown) => {
        typeof beforeChange === 'function' && beforeChange(selectValue, selectItem)
        if (mode === 'multiple' && maxLength) {
            if (selectValue.length <= maxLength) {
                setValue(selectValue)
            }
        } else {
            setValue(selectValue)
        }
    }
    useEffect(() => {
        value && onChange && onChange(value)
    }, [value])

    return (
        <Select
            // size={useType !== 'logined' ? 'large' : 'middle'}
            // defaultValue={[value]}
            labelInValue={labelInValue}
            value={value}
            style={{ width: '100%' }}
            placeholder={placeholder}
            showSearch={true}
            options={options}
            mode={mode && mode}
            allowClear={allowClear}
            // options的值 搜索需要filterOption return true 保证过滤的数据是从接口取来的
            filterOption={() => {
                return true
            }}
            onPopupScroll={e => {
                debounce(scrollEnd, e)
            }}
            className={className}
            onSearch={e => {
                debounce(searchDataset, e)
            }} // 防止频繁触发请求
            onChange={sourceChange}
            onBlur={onBlur}
            {...props.selectProps}
        />
    )
}

export default MoreSelect
