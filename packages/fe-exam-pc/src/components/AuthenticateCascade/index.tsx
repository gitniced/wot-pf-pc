import { Cascader } from 'antd'
import type { CascaderProps } from 'antd'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Hook from './store'
import type { Timeout } from 'ahooks/lib/useRequest/src/types'
import type { DefaultOptionType } from 'antd/lib/select'
import useCommonParams from '@/hooks/useCommonParams'

type PropsType = CascaderProps<any> & {
    value?: DefaultOptionType[]
    style?: object
    commonJobCode?: string | number
    onChange?: (values: any) => void
    params?: object
    beforeSearch?: () => boolean
}

const ProfessionCascade = (props: PropsType) => {
    const { onChange, multiple, changeOnSelect, style, commonJobCode, value, params, beforeSearch, ...rest } = props || {}
    const commonParams = useCommonParams()

    const [currentValue, setCurrentValue] = useState<any>([])

    let inputEvent: Timeout[] = []

    useEffect(() => {
        return () => {
            inputEvent.map((i: Timeout) => {
                clearTimeout(i)
                inputEvent = []
            })
        }
    }, [])

    useEffect(() => {
        const filterValue = value?.filter(item => Boolean(item)).map(item => item.value || item)
        setCurrentValue(value?.length ? filterValue : [])
    }, [value])

    useEffect(() => {
        if (commonJobCode && commonJobCode !== -1) {
            if ((beforeSearch && beforeSearch?.()) || !beforeSearch) {
                // 根据职业工种等级Code获取考评点
                Hook.getAuthenticateData({ ...commonParams, levelCode: commonJobCode, ...params })
            }
        }
    }, [commonJobCode, params, beforeSearch])
    return (
        <Cascader
            style={style}
            showSearch={true}
            displayRender={label => label.join('/')}
            value={currentValue}
            multiple={multiple}
            options={Hook.authenticateData?.data}
            onChange={(_: any, selectedOptionList: any[]) => onChange?.(selectedOptionList)}
            changeOnSelect={changeOnSelect}
            maxTagCount="responsive"
            placeholder="请选择"
            allowClear={false}
            {...rest}
        />
    )
}

export default observer(ProfessionCascade)
