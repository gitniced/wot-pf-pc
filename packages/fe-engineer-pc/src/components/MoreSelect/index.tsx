import http from '@/servers/http'
import type { SelectProps } from 'antd'
import { Select, Spin } from 'antd'
import { useDeepCompareEffect } from 'ahooks'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * HTTP 请求方法类型
 */
type RequestMethodType = 'get' | 'post' | 'delete' | 'put'

/**
 * 下拉选项数据类型
 */
type SelectItemType = {
    label: string
    value: string | number
    [key: string]: any
}

/**
 * 分页信息类型
 */
interface PaginationType {
    currentPage: number
    totalCount: number
    pageSize: number
}

/**
 * 搜索数据状态类型
 */
interface SearchDataType {
    pagination: PaginationType
    searchValue: string
}

/**
 * API 响应数据类型
 */
interface ApiResponseType {
    data: any[]
    currentPage: number
    totalCount: number
    pageSize?: number
}

/**
 * MoreSelect 组件属性接口
 */
interface MoreSelectProps extends Omit<SelectProps<any>, 'onChange'> {
    /** 是否可选  */
    disabled?: boolean
    /** 是否添加"全部"选项，默认 true */
    all?: boolean
    /** 是否将 value 变成 {label, value, key} 对象，默认 false */
    labelInValue?: boolean
    /** option 的 label 字段对应的接口数据字段名 */
    labelKey: string
    /** option 的 value 字段对应的接口数据字段名 */
    valueKey: string
    /** body 的 搜索 字段对应的接口数据字段名 */
    searchKey?: string
    /** 搜索字段在请求体中的位置 */
    searchKeyBy?: 'query' | 'body'
    /** options 数据来源接口地址 */
    requestUrl: string
    /** 占位文案，默认"请选择" */
    placeholder?: string
    /** HTTP 请求方法，默认 'post' */
    requestMethod?: RequestMethodType
    /** 自定义样式类名 */
    className?: string
    /** 透传给 antd Select 的额外属性，优先级高于默认属性 */
    selectProps?: any
    /** 失焦回调 */
    onBlur?: () => void
    /** 选择改变回调 */
    onChange?: (value: string | number | any, option?: any) => void
    /** 受控值 */
    value?: string | number | any
    /** 请求携带的额外参数 */
    requestParams?: Record<string, any>
    /** 请求携带的额外查询参数 */
    requestQuery?: Record<string, any>
    /** 自定义格式化返回参数的函数 */
    formattingResponseBody?: (res: any) => SelectItemType[]
    /** 是否启用分页，默认 true */
    isHasPage?: boolean
    /** 选择模式：多选或标签 */
    mode?: 'multiple' | 'tags'
    /** 在 onChange 之前执行的回调 */
    beforeChange?: (selectValue: string | number, selectItem: unknown) => unknown
    /** 多选模式下最多可选数量 */
    maxLength?: number
    /** 每页数据条数，默认 10 */
    pageSize?: number
    /** 防抖延迟时间（毫秒），默认 500 */
    debounceDelay?: number
    /** 滚动加载阈值（像素），默认 5 */
    scrollThreshold?: number
}

/**
 * MoreSelect 组件 - 支持分页、搜索、滚动加载的下拉选择框
 *
 * @example
 * ```tsx
 * <MoreSelect
 *   valueKey="id"
 *   requestUrl="/api/users"
 *   labelKey="name"
 *   placeholder="请选择用户"
 *   all={false}
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 */
const MoreSelect = (props: MoreSelectProps) => {
    const {
        labelKey,
        valueKey,
        searchKey = 'name',
        searchKeyBy = 'body',
        requestUrl,
        onBlur,
        onChange,
        placeholder = '请选择',
        all = false,
        labelInValue = false,
        allowClear = false,
        mode,
        requestMethod = 'post',
        className,
        requestParams = {},
        requestQuery = {},
        formattingResponseBody,
        isHasPage = true,
        beforeChange,
        maxLength,
        pageSize = 10,
        debounceDelay = 500,
        scrollThreshold = 5,
        disabled = false,

        ...restProps
    } = props

    // ===================== 状态管理 =====================

    /** 初始化选项（包含"全部"选项） */
    const initOptions: SelectItemType[] = all ? [{ label: '全部', value: '全部' }] : []

    /** 初始化搜索数据 */
    const initSearchData: SearchDataType = {
        pagination: {
            currentPage: 1,
            totalCount: 0,
            pageSize,
        },
        searchValue: '',
    }

    /** 下拉选项列表 */
    const [options, setOptions] = useState<SelectItemType[]>(initOptions)

    /** 当前选中值 */
    const [value, setValue] = useState<any>(props.value)

    /** 搜索和分页数据 */
    const [searchData, setSearchData] = useState<SearchDataType>(initSearchData)

    /** 加载状态 */
    const [loading, setLoading] = useState(false)

    /** 是否还有更多数据 */
    const [hasMore, setHasMore] = useState(true)

    // ===================== 引用和计算值 =====================

    /** 防抖定时器引用 */
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

    /** 组件卸载标识 */
    const unmountedRef = useRef(false)

    const {
        pagination: { currentPage, pageSize: currentPageSize },
        searchValue,
    } = searchData

    // ===================== 核心功能函数 =====================

    /**
     * 清除防抖定时器
     */
    const clearDebounceTimer = useCallback(() => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
            debounceTimerRef.current = null
        }
    }, [])

    /**
     * 防抖函数
     * @param callback 要执行的回调函数
     * @param delay 延迟时间
     */
    const debounce = useCallback(
        (callback: () => void, delay: number = debounceDelay) => {
            clearDebounceTimer()
            debounceTimerRef.current = setTimeout(() => {
                if (!unmountedRef.current) {
                    callback()
                }
            }, delay)
        },
        [debounceDelay, clearDebounceTimer],
    )

    /**
     * 格式化接口响应数据
     * @param responseData 接口返回的原始数据
     */
    const formatResponseData = useCallback(
        (responseData: any[]): SelectItemType[] => {
            if (typeof formattingResponseBody === 'function') {
                return formattingResponseBody(responseData)
            }

            return (
                responseData?.map(item => ({
                    ...item,
                    label: item[labelKey] || item.name || item.label,
                    value: item[valueKey],
                })) || []
            )
        },
        [formattingResponseBody, labelKey, valueKey],
    )

    /**
     * 数据请求函数
     * @param isLoadMore 是否为加载更多操作
     */
    const requestData = useCallback(
        async (isLoadMore: boolean = false) => {
            if (disabled) return
            if (loading) return

            try {
                setLoading(true)

                const requestParams_final = {
                    pageSize: currentPageSize,
                    pageNo: currentPage,
                    ...requestParams,
                } as Record<string, any>

                if (!isHasPage) {
                    delete requestParams_final.pageSize
                    delete requestParams_final.pageNo
                }

                const urlParams = new URLSearchParams()

                if (searchValue !== undefined && searchValue !== '') {
                    if (searchKeyBy === 'body') {
                        requestParams_final[searchKey] = searchValue
                    } else {
                        urlParams.append(searchKey, searchValue)
                    }
                }

                if (Object.keys(requestQuery).length > 0) {
                    Object.entries(requestQuery).forEach(([key, value_]) => {
                        urlParams.append(key, value_)
                    })
                }

                let _requestUrl = requestUrl
                if (urlParams.size > 0) {
                    _requestUrl = `${_requestUrl}?${urlParams.toString()}`
                }

                const response: ApiResponseType = await http(
                    _requestUrl,
                    requestMethod,
                    requestParams_final,
                    { repeatFilter: false },
                )

                // 防止组件已卸载时的状态更新
                if (unmountedRef.current) return

                let newData: SelectItemType[] = []

                console.log('isHasPage', isHasPage)

                if (isHasPage) {
                    // 分页模式
                    const formattedData = formatResponseData(response?.data || [])

                    if (currentPage === 1 && !isLoadMore) {
                        // 第一页或重新搜索
                        newData = all
                            ? [{ label: '全部', value: '全部' }, ...formattedData]
                            : formattedData
                    } else {
                        // 加载更多
                        newData = [...options, ...formattedData]
                    }

                    // 更新分页信息
                    setSearchData(prev => ({
                        ...prev,
                        pagination: {
                            ...prev.pagination,
                            currentPage: response.currentPage || currentPage,
                            totalCount: response.totalCount || 0,
                        },
                    }))

                    // 检查是否还有更多数据
                    const totalLoaded = (response.currentPage || currentPage) * currentPageSize
                    setHasMore(totalLoaded < (response.totalCount || 0))
                } else {
                    // 非分页模式
                    const rawData = Array.isArray(response) ? response : response.data || []
                    const formattedData = formatResponseData(rawData)
                    newData = all
                        ? [{ label: '全部', value: '全部' }, ...formattedData]
                        : formattedData
                    setHasMore(false)
                }

                setOptions(newData)
            } catch (error) {
                console.error('MoreSelect 数据请求失败:', error)
                // 错误时保持原有数据，不清空选项
            } finally {
                if (!unmountedRef.current) {
                    setLoading(false)
                }
            }
        },
        [
            loading,
            currentPageSize,
            currentPage,
            searchValue,
            searchKeyBy,
            searchKey,
            requestParams,
            requestQuery,
            requestUrl,
            requestMethod,
            isHasPage,
            formatResponseData,
            all,
            options,
            disabled,
        ],
    )

    /**
     * 滚动到底部处理函数
     * @param event 滚动事件
     */
    const handleScrollToBottom = useCallback(
        (event: React.UIEvent<HTMLDivElement>) => {
            if (!isHasPage || !hasMore || loading) return

            const { target } = event
            const scrollContainer = target as HTMLDivElement

            // 计算滚动距离，考虑浮点数精度问题，使用阈值判断
            const scrollBottom =
                scrollContainer.scrollHeight -
                (scrollContainer.scrollTop + scrollContainer.offsetHeight)

            if (scrollBottom <= scrollThreshold) {
                // 滚动到底部，加载下一页
                setSearchData(prev => ({
                    ...prev,
                    pagination: {
                        ...prev.pagination,
                        currentPage: prev.pagination.currentPage + 1,
                    },
                }))
            }
        },
        [isHasPage, hasMore, loading, scrollThreshold],
    )

    /**
     * 搜索处理函数
     * @param keyword 搜索关键字
     */
    const handleSearch = useCallback(
        (keyword: string) => {
            // 重置为第一页并更新搜索关键字
            setOptions(initOptions) // 清空现有选项
            setSearchData(prev => ({
                ...prev,
                pagination: {
                    ...prev.pagination,
                    currentPage: 1,
                },
                searchValue: keyword,
            }))
            setHasMore(true) // 重置加载更多状态
        },
        [initOptions],
    )

    /**
     * 选择变更处理函数
     * @param selectValue 选中的值
     * @param selectItem 选中的选项
     */
    const handleChange = useCallback(
        (selectValue: any, selectItem: any) => {
            // 执行前置回调
            if (typeof beforeChange === 'function') {
                beforeChange(selectValue, selectItem)
            }

            // 多选模式下的数量限制
            if (mode === 'multiple' && maxLength && Array.isArray(selectValue)) {
                if (selectValue.length <= maxLength) {
                    setValue(selectValue)
                } else {
                    // 超出限制时不更新值，可以在这里添加提示
                    console.warn(`最多只能选择 ${maxLength} 项`)
                    return
                }
            } else {
                setValue(selectValue)
            }
        },
        [beforeChange, mode, maxLength],
    )

    // ===================== 副作用处理 =====================

    /**
     * 同步外部传入的 value
     */
    useEffect(() => {
        if (props.value !== undefined) {
            setValue(props.value)
        }
    }, [props.value])

    /**
     * 监听分页和搜索变化，触发数据请求
     */
    useEffect(() => {
        // 避免无限循环：debounce和requestData是useCallback，currentPage和searchValue是state
        // 只在currentPage或searchValue变化时请求数据
        debounce(() => {
            requestData(currentPage > 1)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, searchValue])

    /**
     * 监听请求参数变化，重新初始化数据
     */
    useDeepCompareEffect(() => {
        setOptions(initOptions)
        setSearchData(initSearchData)
        setHasMore(true)
        debounce(() => {
            requestData(false)
        })
    }, [requestParams, requestQuery])

    /**
     * 值变化时通知外部
     */
    useEffect(() => {
        if (value !== undefined && onChange) {
            onChange(value)
        }
    }, [value, onChange])

    /**
     * 组件卸载时的清理工作
     */
    useEffect(() => {
        return () => {
            unmountedRef.current = true
            clearDebounceTimer()
        }
    }, [clearDebounceTimer])

    // ===================== 渲染组件 =====================

    return (
        <Select
            disabled={disabled}
            // 基础配置
            labelInValue={labelInValue}
            value={value}
            placeholder={placeholder}
            className={className}
            allowClear={allowClear}
            mode={mode}
            // 样式配置
            style={{ width: '100%', ...restProps.style }}
            // 数据配置
            options={options}
            loading={loading}
            // 搜索配置
            showSearch={true}
            filterOption={() => true} // 保证过滤的数据是从接口获取的，不是本地过滤
            // 事件处理
            onChange={handleChange}
            onSearch={keyword => {
                debounce(() => handleSearch(keyword))
            }}
            onPopupScroll={event => {
                debounce(() => handleScrollToBottom(event))
            }}
            onBlur={onBlur}
            // 下拉框底部加载提示
            dropdownRender={menu => (
                <div>
                    {menu}
                    {loading && isHasPage && (
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '8px',
                                borderTop: '1px solid #f0f0f0',
                                color: '#999',
                            }}
                        >
                            <Spin size="small" /> 加载中...
                        </div>
                    )}
                    {!hasMore && isHasPage && options.length > (all ? 1 : 0) && (
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '8px',
                                borderTop: '1px solid #f0f0f0',
                                color: '#999',
                                fontSize: '12px',
                            }}
                        >
                            已加载全部数据
                        </div>
                    )}
                </div>
            )}
            // 其他透传属性
            {...restProps}
            {...props.selectProps} // selectProps 优先级最高
        />
    )
}

/**
 * MoreSelect 组件导出
 *
 * 功能特性：
 * - ✅ 支持分页加载
 * - ✅ 支持搜索防抖
 * - ✅ 支持滚动加载更多
 * - ✅ 支持多选模式和数量限制
 * - ✅ 支持自定义数据格式化
 * - ✅ 支持加载状态显示
 * - ✅ 完善的错误处理
 * - ✅ 内存泄漏防护
 * - ✅ TypeScript 类型安全
 */
export default MoreSelect

export type { MoreSelectProps, SelectItemType, PaginationType, SearchDataType, ApiResponseType }
