import { Cascader } from 'antd'
import LoadingStore from './store'
import { observer, useLocalObservable } from 'mobx-react'
import { useEffect, useState } from 'react'
import type { PropsType } from './interface'

/**
propsType：{
    api：请求接口
    placeholder：placeholder
    value:回显
}
**/

const LoadingCascader = (props: PropsType) => {
    let { api, onChange, onBlur, placeholder = '请选择机构行业', value, disabled = false } = props
    let store = useLocalObservable(() => new LoadingStore())
    const [handleValue, setHandleValue] = useState([])
    useEffect(() => {
        store.setApi(api)
        store.getLoadingList('0')
    }, [])

    const mapValue = (keys: []) => {
        let keysId = []
        if (keys?.length) {
            keys?.map(item => {
                if (!isNaN(item)) {
                    keysId?.push(item)
                } else {
                    keysId?.push(item?.id)
                }
            })
        }

        setHandleValue([...keysId])
    }
    useEffect(() => {
        value && mapValue(value)
        store.isInit && value?.length && store.loadingList?.length && store.initDafaultValue(value)
    }, [props.value, store.loadingList?.length])

    return (
        <Cascader
            allowClear={false}
            disabled={disabled}
            onChange={onChange}
            value={handleValue}
            onBlur={onBlur}
            options={store.loadingList}
            loadData={(selectedOptions: any) => store.getLoad(selectedOptions)}
            placeholder={placeholder}
        />
    )
}

export default observer(LoadingCascader)
