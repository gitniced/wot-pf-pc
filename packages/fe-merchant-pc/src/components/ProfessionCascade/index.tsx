import { Cascader } from 'antd'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Hook from './store'
import { SuperCascader } from '@wotu/kp-components'
import type { Timeout } from 'ahooks/lib/useRequest/src/types'
import type { DefaultOptionType } from 'antd/lib/select'
interface PropsType {
    value?: DefaultOptionType[]
    type: 'JOB' | 'Authenticate'
    onChange?: (values: any) => void
    onDropdownVisibleChange?: (value: any) => void
    // 是否可多选
    multiple?: boolean
    test?: string
    // 是否可选择父级
    changeOnSelect?: boolean
    style?: object
    commonJobCode?: string | number
}
const ProfessionCascade = (props: PropsType) => {
    let {
        onChange,
        multiple,
        style,
        type,
        commonJobCode,
        value,
        changeOnSelect = true,
        ...rest
    } = props || {}

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
        setCurrentValue(value?.length ? value.map(item => item.value) : [])

        if (type === 'JOB') {
            // 获取额外的数据（例：之前创建的数据在第三页，初始化只获取第一页，导致渲染不对，手动获取第三页的数据，拼在options的最上面）
            value?.length && Hook.getExtraCommonJobList(value[0].value as number)
        }
    }, [value])

    useEffect(() => {
        if (commonJobCode && commonJobCode !== -1) {
            // 根据职业工种等级Code获取鉴定点
            Hook.getAuthenticateData(commonJobCode as number)
        }
    }, [commonJobCode])

    // 搜索职业工种等级
    const handleSearchCommonJob = async ({ input, page }: { input: string; page: number }) => {
        return new Promise(resolve => {
            inputEvent.map((i: Timeout) => {
                clearTimeout(i)
                inputEvent = []
            })

            const t = setTimeout(() => {
                inputEvent.map((i: Timeout) => {
                    clearTimeout(i)
                    inputEvent = []
                })
                Hook.getCommonJobList({ workName: input, pageNo: page }).then(res => {
                    resolve(res)
                })
            }, 500)

            inputEvent.push(t)
        })
    }

    return (
        <>
            {type === 'JOB' ? (
                // @ts-ignore
                <SuperCascader
                    changeOnSelect={changeOnSelect}
                    style={style}
                    value={currentValue}
                    placeholder="请选择"
                    colSetting={[
                        {
                            // @ts-ignore
                            onEventChange: handleSearchCommonJob,
                        },
                    ]}
                    extraOptions={Hook.commonJobList}
                    onChange={(_: any, selectedOptionList: DefaultOptionType[]) =>
                        onChange?.(selectedOptionList)
                    }
                    getPopupContainer={target => target.parentNode}
                />
            ) : (
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
                    getPopupContainer={target => target.parentNode}
                    {...rest}
                />
            )}
        </>
    )
}

export default observer(ProfessionCascade)
