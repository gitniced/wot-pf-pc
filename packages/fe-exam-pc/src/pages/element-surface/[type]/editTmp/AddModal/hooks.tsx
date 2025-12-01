import { useState, useEffect } from 'react'
import Http from '@/servers/http'
import { message } from 'antd'
import type { optionsType, optionType } from './interface'
import { authenticateRanges } from './api'
import { toJS } from 'mobx'
export default (props: any) => {
    const { recordId, treeData, getDetail, handleCancel } = props || {}
    const [treeList, setTreeList] = useState<any[]>([])
    const [level, setLevel] = useState<string>('0')
    const [selectValue, setSelectValue] = useState<string | undefined>(undefined)
    const [type, setType] = useState(2)
    const optionsInit: optionsType[] = [
        {
            code: '1',
            name: undefined,
            rate: undefined,
        },
        {
            code: '2',
            name: undefined,
            rate: undefined,
        },
        {
            code: '3',
            name: undefined,
            rate: undefined,
        },
    ]
    const [options, setOptions] = useState<optionsType[]>(optionsInit) // options

    const deleteOption = (code: string) => {
        const temp = JSON.parse(JSON.stringify(options))
        const index = temp.findIndex((item: optionsType) => item.code === code)
        temp.splice(index, 1)
        setOptions(temp)
    }

    const onInputChange = (e: any, code: string, type: string) => {
        const temp = JSON.parse(JSON.stringify(options))
        temp.forEach((item: optionsType) => {
            if (item.code === code) {
                switch (type) {
                    case '1':
                        item.name = e.target.value
                        break
                    case '2':
                        item.rate = e
                        break
                    case '4':
                        item.name = e.target.value
                        // 兼容下面的filter
                        item.rate = 'X'
                        break
                    default:
                        item.rate = e
                        break
                }
            }
        })
        setOptions(temp)
    }
    //添加选项
    const addOption = () => {
        if (options.length >= 20) {
            message.warning('选项不能超过20')
            return
        }
        const temp = JSON.parse(JSON.stringify(options))
        const maxId = Math.max(...temp.map((item: optionsType) => item.code))
        temp.push({
            code: (maxId + 1).toString(),
            name: undefined,
            rate: undefined
        })
        setOptions(temp)
    }
    const handleOk = async () => {
        let data: optionType[] = []
        if (options && options.length > 0) {
            const arrFilter = options.filter(item => item.name && item.rate)
            if (arrFilter && arrFilter.length) {
                data = arrFilter.map(item => {
                    let ele: any = null
                    switch (Number(level)) {
                        case 1:
                            ele = { name: item.name, rate: item.rate }
                            break
                        case 2:
                            ele = { name: item.name, rate: item.rate, info: item.info }
                            break
                        case 3:
                        case 4:
                            ele = { name: item.name, important: item.rate }
                            break
                        default:
                            ele = { name: item.name, rate: item.rate }
                    }
                    return ele
                })
            }
        }
        let paramsType = 1
        if ((Number(level) === 3 && type === 2) || Number(level) === 4) {
            paramsType = 2
        } else if (Number(level) === 3 && type === 1) {
            paramsType = 3
        }
        const params = {
            type: paramsType,
            authenticateCode: recordId,
            data: data,
            pcode: Number(level) === 0 ? '' : selectValue,
        }
        if (!selectValue && Number(selectValue) !== 0) {
            message.warning('请选择上级名称！')
            return
        }
        // 改为三级考评范围加is_last
        if (Number(level) === 2) {
            if (params.data && params.data.length > 0) {
                params.data.map(item => {
                    //   @ts-ignore
                    item.is_last = '1'
                })
            }
        }
        Http(`${authenticateRanges}/create_range_point`, 'POST', params).then(() => {
            message.success('新增成功！')
            getDetail()
            handleCancel()
        })
    }
    const limitDecimals = (value: any) => {
        //只可输入0.5倍数
        const val = typeof value === 'string' ? value : String(value)
        let str = val.replace(/[^\d.]/g, '')
        const pointIndex = str.search(/\./)
        if (pointIndex !== -1) {
            str = str.substr(0, pointIndex + 1).replace(/\./, '.5')
        }
        return str
    }
    const getTreeList = (data: any[]) => {
        data.forEach((item: any) => {
            item.title = item.name
            item.key = item.code || item.pid
            item.value = item.code || item.pid
            if (item.range) {
                item.children = item.range
                delete item.range
            }
            if (Array.isArray(item.info) && item.info?.length) {
                item.children = item.info.map(({name, code}: any) => ({
                    name: name,
                    code,
                    level: '4'
                }))
            }
            if (item.children) {
                getTreeList(item.children)
            }
        })
        console.log(data)
        setTreeList(data)
    }
    useEffect(() => {
        const { code } = treeData || {}
        setSelectValue(code)
        getTreeList([treeData])
    }, [])
    return {
        options,
        level,
        selectValue,
        treeList,
        setSelectValue,
        setLevel,
        handleOk,
        addOption,
        deleteOption,
        onInputChange,
        limitDecimals,
        optionsInit,
        setOptions,
        type,
        setType
    }
}
