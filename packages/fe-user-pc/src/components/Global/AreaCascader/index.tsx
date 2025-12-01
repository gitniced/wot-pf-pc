import { Cascader } from 'antd'
import areaStore from './store'
import { observer, useLocalObservable } from 'mobx-react'
import { useEffect } from 'react'
import type { PropsType } from './interface'
/**
propsType：{
    type：type:精确到市级(city)或者区级别(area)
    value:回显
}
**/

const AreaCascader = (props: PropsType) => {
    let { type, onChange, onBlur, value, disabled = false, backAll = false } = props
    let store = useLocalObservable(() => new areaStore())

    useEffect(() => {
        console.log('SET TYPE', type)
        store.setType(type)
        store.getAreaList('0')
    }, [])

    useEffect(() => {
        store.isInit && value?.length && store.areaList?.length && store.initDafaultValue(value)
    }, [props.value, store.areaList?.length])

    const selfChange = (values: any, selectedOptions: any) => {
        if (backAll) {
            onChange?.(selectedOptions)
        } else {
            onChange?.(values)
        }
    }

    const valueByBackAll = () => {
        if (backAll) {
            return value?.map(item => item?.value?.toString())
        } else {
            return value?.map(String)
        }
    }

    return (
        <Cascader
            getPopupContainer={node => {
                if (node) {
                    return node.parentNode
                }
                return document.body
            }}
            changeOnSelect
            disabled={disabled}
            onChange={selfChange}
            value={valueByBackAll()}
            onBlur={onBlur}
            options={store.areaList}
            loadData={(selectedOptions: any) => store.getLoad(selectedOptions)}
            placeholder="请选择地区"
        />
    )
}

export default observer(AreaCascader)
