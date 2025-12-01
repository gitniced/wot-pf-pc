import { Cascader } from 'antd'
import areaStore from './store'
import { observer, useLocalObservable } from 'mobx-react'
import { useEffect } from 'react'
import type { PropsType } from './interface'

const AreaCascader = (props: PropsType) => {
    let {
        type,
        onChange,
        onBlur,
        value,
        defaultValue,
        nationwideState,
        disabled = false,
        backAll = false,
        displayRender,
    } = props
    let store = useLocalObservable(() => new areaStore())

    useEffect(() => {
        store.setType(type)
        store.getAreaList('0', nationwideState)
    }, [])

    useEffect(() => {
        if (props.value?.length === 3) {
            value?.length && store.areaList?.length && store.initDefaultValue(value)
        }
    }, [props.value, store.areaList?.length])

    useEffect(() => {
        defaultValue?.length && store.initDefaultValue(defaultValue)
    }, [props.defaultValue])

    const selfChange = (values: any, selectedOptions: any) => {
        if (backAll) {
            onChange?.(selectedOptions)
        } else {
            onChange?.(values)
        }
    }

    const selfBlur = (e: any) => {
        let lengthNum = 1
        type === 'city' && (lengthNum = 2)
        type === 'area' && (lengthNum = 3)
        // @ts-ignore
        if (props.value?.length < lengthNum) {
            onChange?.(undefined)
            onBlur?.(e)
        } else {
            onBlur?.(e)
        }
    }

    const valueByBackAll = () => {
        if (value?.length) {
            if (backAll) {
                // @ts-ignore
                return value?.map(item => item?.value?.toString())
            } else {
                return value?.map(String)
            }
        }
    }

    return (
        // @ts-ignore
        <Cascader
            changeOnSelect
            disabled={disabled}
            onChange={selfChange}
            value={valueByBackAll()}
            defaultValue={defaultValue}
            onBlur={selfBlur}
            options={store.areaList}
            loadData={(selectedOptions: any) => store.getLoad(selectedOptions)}
            placeholder="请选择地区"
            displayRender={displayRender}
        />
    )
}

export default observer(AreaCascader)
