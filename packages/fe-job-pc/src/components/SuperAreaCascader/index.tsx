import { Cascader } from 'antd'
import areaStore from './store'
import { observer, useLocalObservable } from 'mobx-react'
import { useEffect } from 'react'
import type { PropsType } from './interface'
import { isEmpty } from 'lodash'

const AreaCascader = (props: PropsType) => {
    let {
        key,
        type,
        onChange,
        onBlur,
        value,
        defaultValue,
        userRegion,
        disabled = false,
        backAll = false,
        allowValue = [],
        changeOnSelect = false,
    } = props

    let store = useLocalObservable(() => new areaStore())

    useEffect(() => {
        store.setType(type)
        store.setUserRegionMap(userRegion)
        // 请求参数默认为0 代表请求全国下面的省份
        store.getAreaList('0', false, allowValue?.[0])
    }, [])

    useEffect(() => {
        if (!isEmpty(value) || !isEmpty(defaultValue?.filter(item => Boolean(item)))) {
            const currentValue = value || defaultValue?.filter(item => Boolean(item))
            console.log(currentValue)
            store.isInit &&
                store.areaList?.length &&
                store.initDefaultValue(currentValue, allowValue)
        }
    }, [props.value, store.areaList?.length, defaultValue])

    const selfChange = (values: any, selectedOptions: any) => {
        if (backAll) {
            onChange?.(selectedOptions)
        } else {
            onChange?.(values)
        }
    }

    const valueByBackAll = () => {
        if (backAll) {
            return value?.map((item: any) => item?.value?.toString())
        } else {
            return (value || defaultValue?.filter(item => Boolean(item)))?.map(String)
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
            key={key}
            changeOnSelect={changeOnSelect}
            disabled={disabled}
            onChange={selfChange}
            value={valueByBackAll()}
            onBlur={onBlur}
            options={store.areaList}
            style={{ width: '100%' }}
            loadData={(selectedOptions: any) => store.getLoad(selectedOptions)}
            placeholder="请选择地区"
        />
    )
}

export default observer(AreaCascader)
