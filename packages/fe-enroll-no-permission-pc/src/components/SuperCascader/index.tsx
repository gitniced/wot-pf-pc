import React, { useReducer, useState, useRef, useEffect, useCallback } from 'react'
import type { CascaderProps } from 'antd'
import { Cascader, Input, Empty, Checkbox } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import type { SuperCascaderPropsType } from './types.d'
import './index.less'
import {
    addListen,
    deepLoopTreeReturnPath,
    getDeepChildrenIsAllChecked,
    handleValue,
    isLeaf,
    removeListen,
    transformArray,
    usingPathsGetSelection,
} from './utils'
import { ErrCatch } from '@wotu/wotu-components'
import _ from 'lodash'

const _option: any[] = []

const _defaultFieldNames = {
    label: 'label',
    value: 'value',
    children: 'children',
}

function SuperCascader(props: Partial<SuperCascaderPropsType> & CascaderProps<any>) {
    let {
        onChange,
        onDropdownVisibleChange,
        changeOnSelect,
        isOpenFocus = true,
        isUsingScrollEnd = true,
        scrollThreshold,
        isFirstRequest = true,
        multiple,
        extraOptions,
        options: option = _option,
        value,
        mode = 'casecader',
        colSetting = [],
        className,
        maxMultipleSelectLength = Infinity,
        fieldNames = _defaultFieldNames,
        showCheckedStrategy = Cascader.SHOW_PARENT,
        ...rest
    } = props

    // value = handleValue(value)
    /** 显式的定义 label value children 使用的字段 */
    const valueKey = fieldNames?.value || _defaultFieldNames.value
    const labelKey = fieldNames?.label || _defaultFieldNames.label
    const childrenKey = fieldNames?.children || _defaultFieldNames.children

    /** 移除 废弃字段 */
    delete rest.showSearch
    /** 显式的声明是否是 受控组件 和非受控组件 */
    const isControlled = !!value

    /** 第一个输入框的ref */
    const firstInput = useRef<any>(null)
    /** 原生级联组件的ref */
    const component = useRef<any>(null)
    /** 视图数据的copy */
    const viewDataCopy = useRef<any>(null)
    /** 内容区域的外dom元素 */
    const downDom = useRef(null)
    /** 列设置内容 */
    const colData = useRef<any[]>([{ page: 1 }])
    /** 选中的option */
    const [selectOption, setSelectOption] = useState<any[]>([])
    /* 是否已经设置过 array 的数据 */
    const isFirstSetHubArray = useRef(false)
    /* 静态id */
    const raceId = useRef(Symbol('raceId'))

    const getEndCallBack = async (index: number) => {
        const { isUsingScrollEnd: scrollEnd, onEventChange } = colSetting?.[index] || {}
        const colItemData = colData.current[index] || {}

        if (scrollEnd === false || colItemData.isNext === false || !onEventChange) return
        /* 用 symbol 做竞态处理 */
        raceId.current = Symbol('raceId')
        let nowRaceId = raceId.current
        const { data, nextPage, isNext } =
            (await onEventChange?.(
                { input: colItemData.input, page: colItemData.page },
                'scroll',
            )) || {}
        if (nowRaceId !== raceId.current) return
        colData.current[index] = {
            ...colData.current[index],
            page: nextPage,
            isNext,
        }
        if (data) {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            dispatchHubArray({
                type: 'concat',
                num: index,
                data,
            })
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            setByHubArray(value || [])
        }
    }

    useEffect(() => {
        if (isFirstRequest) getEndCallBack(0)
    }, [])

    /**
     *  滚动类型的试卷
     */
    const toAddListen = () => {
        /** 是否使用 滚动加载 */
        if (isUsingScrollEnd) {
            addListen({
                domRef: downDom,
                threshold: scrollThreshold,
                endCallback: index => {
                    getEndCallBack(index)
                },
            })
        } else {
            removeListen()
        }
    }
    /**
     * 视图渲染的list
     */
    const [hubArray, dispatchHubArray] = useReducer(
        (state: any[], action: any) => {
            const newState = state.slice(0, action.num + 1)
            const resetNewState = [state[0]]
            switch (action.type) {
                /** 选中后视图更新 */
                case 'change':
                    if (!isLeaf(action.data)) {
                        newState[action.num + 1] = action.data || []
                        colData.current[action.num + 1] = {}
                    }
                    toAddListen()
                    viewDataCopy.current = [...newState].map((i, index: number) =>
                        index === 0
                            ? _.uniqBy(
                                  [...(i || []), ...(viewDataCopy.current[index] || [])],
                                  valueKey,
                              )
                            : i,
                    )
                    return [...newState]
                /** 搜索后视图更新 */
                case 'replace':
                    state[action.num] = action.data
                    return [...state]
                /** 输入框情况后视图更新 */
                case 'reduction':
                    state[action.num] = viewDataCopy.current[action.num]
                    return [...state]
                /** 更新数据 */
                case 'update':
                    return [action.data]
                /** 尾部添加 用户滚动加载 */
                case 'concat':
                    state[action.num] = state[action.num]?.concat(action.data) || []
                    state[action.num] = _.uniqBy(state[action.num], valueKey)
                    viewDataCopy.current = [...state]
                    return [...state]
                /** 在头部添加 数据 用于回显 */
                case 'header-concat':
                    state[action.num] = [...(action.data || []), ...state[action.num]]
                    state[action.num] = _.uniqBy(state[action.num], valueKey)

                    viewDataCopy.current = [...state]
                    return [...state]
                case 'reset':
                    viewDataCopy.current = resetNewState
                    return resetNewState
                default:
                    return [option]
            }
        },
        [option],
    )

    /** 获取全部的选中数据 */
    const getAllOptionData = () =>
        [...hubArray, ...(viewDataCopy.current || []), ...(selectOption || [])].flat(1)

    /** 已经选择的值 用在 多选的情况下 */
    const [alreadySelect, setAlreadySelect] = useState<any[][]>([])

    /** 选中的值 */
    const [activeValue, disPatchActiveValue] = useReducer((state: any[], action: any) => {
        const newState = state.slice(0, action.num + 1)
        switch (action.type) {
            case 'insert':
                newState[action.num] = action.data
                if (mode === 'casecader') {
                    dispatchHubArray({
                        type: 'change',
                        data: action.children,
                        num: action.num,
                    })
                }

                if (!multiple) {
                    const selectRowOption = usingPathsGetSelection(newState, {
                        option: getAllOptionData(),
                        childrenKey,
                        valueKey,
                    })
                    if (mode === 'select') {
                        //@ts-ignore
                        onChange?.(newState[0], selectRowOption)
                    } else if (changeOnSelect || isLeaf(action.children)) {
                        //@ts-ignore
                        onChange?.(newState, selectRowOption)
                    }
                    setSelectOption(selectRowOption)
                }

                return newState
            case 'update':
                return [...(action.data || [])]
            default:
                return []
        }
    }, handleValue(value, maxMultipleSelectLength) || [])

    /** 更新value后 hub 的副作用 */
    const hubArrayEffect = (_value: any) => {
        /**
         *  如果传进来的value 数据接口和叶节点保持一致 那么就表示 已经制空了
         *  那么久重置 视图数据
         */
        if (isLeaf(_value)) {
            dispatchHubArray({
                type: 'reset',
            })
        }
    }

    const setByHubArray = (_value: any[]) => {
        if (!Array.isArray(_value)) return
        if (!_value.length) return
        if (mode !== 'casecader') return
        if (isFirstSetHubArray.current) return
        if (multiple) return
        const selectRowOption = usingPathsGetSelection(_value, {
            option: getAllOptionData(),
            childrenKey,
            valueKey,
        })
        if (!selectRowOption.filter(Boolean).length) return
        selectRowOption.forEach((i, index) => {
            if (!i) return
            dispatchHubArray({
                type: 'change',
                data: i[childrenKey],
                num: index,
            })
        })

        isFirstSetHubArray.current = true
    }

    useEffect(() => {
        viewDataCopy.current = [...hubArray]
    }, [])

    useEffect(() => {
        dispatchHubArray({
            type: 'header-concat',
            num: 0,
            data: extraOptions || [],
        })
        /* 设置回显的视图数据 */
        setByHubArray(value || [])
    }, [extraOptions])

    useEffect(() => {
        toAddListen()
    }, [hubArray])

    useEffect(() => {
        dispatchHubArray({
            type: 'update',
            data: option || [],
        })
        /* 设置回显的视图数据 */
        setByHubArray(value || [])
    }, [option])

    useEffect(() => {
        /** 根据不通的 状态下 对value 进行处理 */
        if (multiple) {
            /*
                如果 是 select的模式下  那么 要对传入的value 做一层处理
             */
            let toArray = mode === 'select' ? transformArray(value) : value
            setAlreadySelect(handleValue(toArray, maxMultipleSelectLength) || [])
        } else {
            disPatchActiveValue({
                type: 'update',
                data: handleValue(value, maxMultipleSelectLength) || [],
            })

            /** 单选情况下 对清除数据做一下 副作用操作 */
            hubArrayEffect(value)
        }
    }, [value])

    /**
     *  获取当前item的类名
     * @param num
     * @param key
     * @returns
     */
    const getIsSelectClass = (num: number, key: string) => {
        return activeValue[num] === key
            ? 'wt-super-cascader-render-item-active'
            : 'wt-super-cascader-render-item'
    }

    /**
     *  输入框内容改变后
     * @param value
     * @param num
     */
    const inputChange = async (pValue: string, num: number) => {
        const eventStep = async () => {
            const { onEventChange, isUsingInputChange = true } = colSetting?.[num] || {}
            colData.current[num].input = pValue
            colData.current[num].isNext = true
            if (onEventChange && isUsingInputChange) {
                const { data } = (await onEventChange({ input: pValue, page: 1 }, 'input')) || {}
                /** 防止静态 */
                if (colData.current[num].input !== pValue) return
                dispatchHubArray({
                    type: 'replace',
                    data: data || [],
                    num: num,
                })
                return
            }

            if (pValue) {
                const currentCol = viewDataCopy.current[num]?.filter((item: any) =>
                    item[labelKey].includes?.(pValue),
                )
                dispatchHubArray({
                    type: 'replace',
                    data: currentCol,
                    num: num,
                })
            } else {
                dispatchHubArray({
                    type: 'reduction',
                    num: num,
                })
            }
        }

        /**
         * 此时搜索后 会导致高度变化 可能会触发滚动条触底事件
         * 所以需要先移除滚动监听
         * 等到搜索结束之后再加回来
         */

        removeListen()
        await eventStep()
        /*
         * 滚动监听
         */
        addListen()
    }

    /**
     * 判断当前得元素 是否有选中
     * @param value
     * @param index
     */
    const getIsSelectPath = (pValue: any, index: number) => {
        return alreadySelect.some(
            item => item.length - 1 === index && item[item.length - 1] === pValue,
        )
    }
    /**
     * 获取父级是否有被选中
     * @param value
     * @param index
     */
    const getParentIsSelect = (index: number) => {
        return activeValue
            .slice(0, index)
            .some((activeValueItem, i) => getIsSelectPath(activeValueItem, i))
    }

    /**
     * 获取当前正在选中的元素
     */
    const getNowValue = () => {
        if (multiple) {
            return alreadySelect
        }
        if (changeOnSelect) {
            return activeValue
        }
        return []
    }

    /** 复选框点击后 最终数据的输出节点函数 */
    const manySelectDone = (checkedNowItemArr: any[]) => {
        const selectRowOption = usingPathsGetSelection(checkedNowItemArr, {
            option: getAllOptionData(),
            childrenKey,
            valueKey,
        })
        const changeSelectOption = mode === 'select' ? selectRowOption.flat(1) : selectRowOption
        const changeCheckedNowItemArr =
            mode === 'select' ? checkedNowItemArr.flat(1) : checkedNowItemArr

        /** 受控组件 和非受控组件 分开操作 */
        //@ts-ignore
        onChange?.(changeCheckedNowItemArr, changeSelectOption)
        if (!isControlled) {
            setAlreadySelect(checkedNowItemArr)
        }
        setSelectOption(selectRowOption)
    }

    /** parent策略情况下的选中 */
    const dispatchShowParentChecked = ({ colindex, item }: Record<string, any> = {}) => {
        /** 到当前选择得元素前一位的路径 */
        const selectArr = activeValue.slice(0, colindex)
        /** 包含当前选择的路径 */
        const toAddItem = [...selectArr, item[valueKey]]
        /** 包含刚刚选中的元素的 所有已选的key */
        let checkedNowItemArr = [...alreadySelect, toAddItem]
        /** 做一个临时的activeValue的浅拷贝 并且把选中的元素给填充进去 */
        const feckActiveKey = [...activeValue]
        feckActiveKey[colindex] = item[valueKey]

        /*
               按位比较 从尾到头 一层一层往上播报，如果 当前选择的元素已经 选慢了本列 、
               那么就一层一层的往上进位  比如 a下面 有 b c  b和c都选中后 会自动进位
               到a  b 和c进行删除  一旦进位不足 就直接中断
            */
        for (let i = toAddItem.length - 1; i >= 1; i--) {
            /** 如果同级选完了 那么就去进位 */
            if (
                checkedNowItemArr.filter(
                    alreadySelectItem => alreadySelectItem[i - 1] === feckActiveKey[i - 1],
                ).length === hubArray[i]?.length
            ) {
                /** 当前选择的元素进行进位 */
                toAddItem.pop()
                checkedNowItemArr = checkedNowItemArr.filter(arr => {
                    /*  length 短的肯定不需要移除 */
                    if (arr.length < i + 1) {
                        return true
                        /** length 长的 并且前一位相等 那么就要筛选掉 */
                    } else if (arr.length >= i + 1 && arr[i - 1] === toAddItem[i - 1]) {
                        return false
                    } else {
                        /** 额外条件兜底 */
                        return true
                    }
                })
            } else {
                break
            }
        }

        manySelectDone(checkedNowItemArr)
    }

    /** parent 策略情况下的取消选中 */
    const dispatchShowParentUnChecked = ({ colindex, item, colItem }: Record<string, any> = {}) => {
        /** 到当前选择得元素前一位的路径 */
        const selectArr = activeValue.slice(0, colindex)
        /** 包含当前选择的路径 */
        const toAddItem = [...selectArr, item[valueKey]]

        /** 做一个临时的activeValue的浅拷贝 并且把选中的元素给填充进去 */
        const feckActiveKey = [...activeValue]
        feckActiveKey[colindex] = item[valueKey]
        /** 否则就是去取消 */
        let lastCancelValue
        /** 如果有元素 表示是本层级的选中  */
        if (getIsSelectPath(item[valueKey], colindex)) {
            const newAlreadySelect = alreadySelect.filter(
                alreadySelectItem => alreadySelectItem[colindex] !== item[valueKey],
            )
            lastCancelValue = newAlreadySelect
        } else {
            /** 否则就是 父级选中  */
            let newAlreadySelect = alreadySelect
            /** 移除最终数据的父级 起始位直接从前一位开始就可以 上面已经查了一次 本位的 肯定不对 */
            for (let i = toAddItem.length - 2; i >= 0; i--) {
                if (getIsSelectPath(toAddItem[i], i)) {
                    newAlreadySelect = newAlreadySelect.filter(
                        newAlreadySelectItem => newAlreadySelectItem[i] !== toAddItem[i],
                    )
                    break
                }
            }

            /** 将本层级元素 全都铺出来  */
            const toAddItemArr = colItem
                ?.map((c: any) => c?.[valueKey])
                .filter((s: any) => s !== item?.[valueKey])
                .map((v: any) => [...selectArr, v])
            /** 合并元素 */
            lastCancelValue = [...newAlreadySelect, ...toAddItemArr]
        }

        manySelectDone(lastCancelValue)
    }

    /** child 策略情况下的选中 */
    const dispatchShowChildChecked = ({ colindex, item }: Record<string, any> = {}) => {
        /** 到当前选择得元素前一位的路径 */
        const selectArr = activeValue.slice(0, colindex)
        /** 包含当前选择的路径 */
        const toAddItem = [...selectArr, item[valueKey]]
        /** 包含刚刚选中的元素的 所有已选的key */
        let checkedNowItemArr = [...alreadySelect, toAddItem]
        /** 做一个临时的activeValue的浅拷贝 并且把选中的元素给填充进去 */
        const feckActiveKey = [...activeValue]
        feckActiveKey[colindex] = item[valueKey]
        let checkedArr
        if (isLeaf(item[childrenKey])) {
            checkedArr = checkedNowItemArr
        } else {
            // 非叶节点的情况下

            /** 先取出本路径下的所有元素 */
            const stepPathArr = deepLoopTreeReturnPath(
                item[childrenKey],
                childrenKey,
                valueKey,
            ).map(i => [...toAddItem, ...i])
            /** 移除本路径下 已经选择过的元素 */
            checkedArr = alreadySelect.filter(i => i[colindex] !== item[valueKey])
            /** 进行添加 */
            checkedArr = [...checkedArr, ...stepPathArr]
        }
        manySelectDone(checkedArr)
    }

    /** child 策略情况下的取消选中 */
    const dispatchShowChildUnChecked = ({ colindex, item }: Record<string, any> = {}) => {
        let checkedArr
        checkedArr = alreadySelect.filter(i => i[colindex] !== item[valueKey])
        manySelectDone(checkedArr)
    }

    /** 选择策略的派发 */
    const checkedMap = {
        [Cascader.SHOW_CHILD]: dispatchShowChildChecked,
        [Cascader.SHOW_PARENT]: dispatchShowParentChecked,
    }

    /** 取消选择策略的派发 */
    const unCheckedMap = {
        [Cascader.SHOW_CHILD]: dispatchShowChildUnChecked,
        [Cascader.SHOW_PARENT]: dispatchShowParentUnChecked,
    }

    /** 是否展示 下拉的箭头 */
    const isShowArrow = (item: any) => {
        return !isLeaf(item?.[childrenKey]) && mode !== 'select'
    }
    /**
     * 生成 页面需要的value
     */
    const generateValue = () => {
        if (mode === 'select' && multiple) {
            return transformArray(value)
        }
        return value
    }
    const useDebounce = (callback: any, delay: number) => {
        const timeoutRef = useRef(null)

        const debouncedCallback = useCallback(
            (...args: any) => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                }
                //@ts-ignore
                timeoutRef.current = setTimeout(() => {
                    callback(...args)
                }, delay)
            },
            [callback, delay],
        )

        return debouncedCallback
    }
    const handleSearch = useDebounce((searchTerm: string, colindex: number) => {
        console.log({ searchTerm, colindex })
        inputChange(searchTerm, colindex)
    }, 500)

    return (
        <div className="wt-super-cascader">
            <ErrCatch
                onError={e => {
                    console.log(e, 'casecader err')
                }}
            >
                <Cascader
                    onKeyDown={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        return false
                    }}
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    placeholder="请选择"
                    {...rest}
                    className={`${className} wt-super-cascader-component`}
                    ref={component}
                    allowClear
                    options={[
                        ...hubArray,
                        ...(viewDataCopy.current || []),
                        ...(selectOption || []),
                    ].flat(1)}
                    multiple={multiple}
                    value={handleValue(generateValue(), maxMultipleSelectLength) || getNowValue()}
                    fieldNames={fieldNames}
                    showCheckedStrategy={showCheckedStrategy}
                    onChange={(e: any[], rowSection: any) => {
                        if (isControlled) {
                            /** 如果是 select 并且是多选的状态下 需要拉平一下数据 */
                            onChange?.(mode === 'select' && multiple ? e.flat(1) : e, rowSection)
                            return
                        }
                        if (multiple) {
                            setAlreadySelect(e)
                        } else {
                            disPatchActiveValue({
                                type: 'update',
                                data: e || [],
                            })
                        }
                    }}
                    dropdownRender={() => {
                        return (
                            <div className="wt-super-cascader-render" ref={downDom}>
                                {hubArray?.map((colItem, colindex) => {
                                    return (
                                        <div
                                            className="wt-super-cascader-render-col"
                                            key={colindex}
                                        >
                                            <div className="wt-super-cascader-render-col-input">
                                                <Input
                                                    className="wt-super-cascader-render-col-input-component"
                                                    ref={colindex === 0 ? firstInput : undefined}
                                                    placeholder={'请输入'}
                                                    {...(colSetting[colindex]?.inputProps || {})}
                                                    onKeyDown={e => {
                                                        e.stopPropagation()
                                                    }}
                                                    onChange={e => {
                                                        handleSearch(e?.target?.value, colindex)
                                                    }}
                                                />
                                            </div>
                                            <div className="wt-super-cascader-render-col-body">
                                                {colItem?.length ? (
                                                    colItem?.map((item: any) => {
                                                        /** 自身是否选中 */
                                                        const isChecked = getIsSelectPath(
                                                            item[valueKey],
                                                            colindex,
                                                        )
                                                        /** 子元素 是否有被选择完毕 */
                                                        const isCheckedChildren =
                                                            getDeepChildrenIsAllChecked({
                                                                children: item[childrenKey],
                                                                selectArr: alreadySelect,
                                                                index: colindex + 1,
                                                                childrenKey,
                                                                valueKey,
                                                            })
                                                        /** 是否处于未完全选中得状态 */
                                                        const isIndeterminate =
                                                            alreadySelect.some(
                                                                alreadySelectItem =>
                                                                    alreadySelectItem[colindex] ===
                                                                    item[valueKey],
                                                            ) &&
                                                            !isChecked &&
                                                            !isCheckedChildren
                                                        /** 父级元素是否有被选中 */
                                                        const isParentChecked =
                                                            getParentIsSelect(colindex)
                                                        return (
                                                            <div
                                                                key={item[valueKey]}
                                                                className={`${getIsSelectClass(
                                                                    colindex,
                                                                    item[valueKey],
                                                                )}`}
                                                                onClick={() => {
                                                                    disPatchActiveValue({
                                                                        type: 'insert',
                                                                        num: colindex,
                                                                        data: item[valueKey],
                                                                        children: item[childrenKey],
                                                                    })
                                                                    if (
                                                                        isLeaf(item[childrenKey]) &&
                                                                        !multiple
                                                                    ) {
                                                                        component.current?.blur()
                                                                    }
                                                                }}
                                                            >
                                                                {multiple && (
                                                                    <Checkbox
                                                                        indeterminate={
                                                                            isIndeterminate
                                                                        }
                                                                        checked={
                                                                            isParentChecked ||
                                                                            isCheckedChildren ||
                                                                            isChecked
                                                                        }
                                                                        value={item[valueKey]}
                                                                        className="wt-super-cascader-render-item-checkbox"
                                                                        onClick={e => {
                                                                            /** 阻止冒泡 把 选择框 和选中展开元素分开 */
                                                                            e.stopPropagation()
                                                                        }}
                                                                        onChange={e => {
                                                                            const checked =
                                                                                e.target.checked
                                                                            /** 去选中 */
                                                                            if (checked) {
                                                                                if (
                                                                                    alreadySelect.length >=
                                                                                    maxMultipleSelectLength
                                                                                )
                                                                                    return
                                                                                checkedMap[
                                                                                    showCheckedStrategy
                                                                                ]?.({
                                                                                    item,
                                                                                    colindex,
                                                                                })
                                                                            } else {
                                                                                unCheckedMap[
                                                                                    showCheckedStrategy
                                                                                ]?.({
                                                                                    item,
                                                                                    colindex,
                                                                                    colItem,
                                                                                })
                                                                            }
                                                                        }}
                                                                    />
                                                                )}

                                                                <div className="wt-super-cascader-render-item-inner-line">
                                                                    {item?.[labelKey]}
                                                                    {isShowArrow(item) && (
                                                                        <RightOutlined className="wt-super-cascader-render-item-icon" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                ) : (
                                                    <Empty
                                                        image="https://static.zpimg.cn/dev/examination_pc/static/no_content.09591642.png"
                                                        description="暂无数据"
                                                        className="wt-super-cascader-render-empty"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }}
                    onDropdownVisibleChange={isOpen => {
                        onDropdownVisibleChange?.(isOpen)
                        if (isOpen) {
                            if (isOpenFocus) {
                                setTimeout(() => {
                                    firstInput.current?.focus()
                                }, 200)
                            }
                            toAddListen()
                        } else {
                            removeListen()
                        }
                    }}
                    expandTrigger="hover"
                />
            </ErrCatch>
        </div>
    )
}

SuperCascader.SHOW_CHILD = Cascader.SHOW_CHILD
SuperCascader.SHOW_PARENT = Cascader.SHOW_PARENT

export default SuperCascader
