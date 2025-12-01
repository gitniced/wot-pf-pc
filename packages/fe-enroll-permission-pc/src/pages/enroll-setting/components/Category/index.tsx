import React, { useEffect, useState } from 'react'
import { Input, Empty, Select, ConfigProvider } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import http from '@/servers/http'
import styles from './index.module.less'
import { useUpdateEffect } from 'ahooks'

const { Option } = Select

type valueNameType = {
    name: string[]
    value: string[]
    types: string[]
}
interface propsType {
    // 3分类 1职业 1工种 1等级
    classificationType: 'standard' | 'standardJob' //standard： 最多3分类     standardJob：3分类+职业
    onChange: (data: valueNameType, isJobId: boolean, ispid: boolean) => void
    value?: valueNameType
    sid?: string
    title?: string
}

interface optionType {
    id: string
    name: string
    childrens?: optionType[]
    children?: optionType[]
    jobs?: optionType[]
    code?: string
    levelInfoList: any[]
    isWhichType: string
    workTypeList: any[]
    catalogIds: string
    level?: number
    levelRelationId?: number
}

const Category = (props: propsType) => {
    const { classificationType, onChange, value, sid, title } = props
    const [selectList, setSelectList] = useState<optionType[][]>([])
    const [values, setValues] = useState([])
    console.log('🍊 values:', values)
    const [valueNames, setValueNames] = useState([])
    const [types, setTypes] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [searchList, setSearchList] = useState<valueNameType[]>([])
    const [searchHide, setSearchHide] = useState(false)
    const pageSize = 50
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [isFirst, setIsFirst] = useState(true)
    const [isJobId, setIsJobId] = useState(false) //有职业时必须选择到最后一级职业
    const [ispid, setIspid] = useState(false) //选到最后一级分类
    const [isClickOption, setIsClickOption] = useState(false)
    const [open, setOpen] = useState(false)

    //获取一级分类
    const getTree = async () => {
        const res = await http(`/admin/front/site_profession_catalog/tree`, 'POST', { sid })
        setSelectList(e => {
            const newData = JSON.parse(JSON.stringify(e))
            newData[0] = res
            return newData
        })
    }

    /** 获取职业   */
    const getJob = async (id: string, pageData: number = 1, name?: string) => {
        const res: any = await http(`/admin/front/site_profession/page_list`, 'POST', {
            pageNo: pageData,
            pageSize,
            catalogId: id,
            professionName: name,
            sid,
            enableStatus: '1',
        })
        setTotal(res?.totalCount)
        return res
    }
    /**  获取职业详情  */
    const getJobDetail = async (id: string) => {
        const res: any = await http(`/admin/front/site_profession/detail?id=${id}`, 'get', {})

        /**  有工种有等级  等级在工种下面
         *   有工种无等级
         *   无工种有等级
         */
        if (res.workTypeList && res.workTypeList?.length > 0) {
            return {
                list: res.workTypeList,
                type: 'work',
            }
        } else if (res.levelInfoList && res.levelInfoList?.length > 0) {
            res.levelInfoList.forEach((i: any) => {
                i.isWhichType = 'level'
            })
            return {
                list: res.levelInfoList,
                type: 'level',
            }
        } else {
            return {
                list: [],
                type: 'none',
            }
        }
    }

    //设置selectlist
    const formatSelectValue = (
        optionData: optionType[],
        data: { index: number; name?: string[]; value?: string[] },
    ) => {
        setSelectList(e => {
            const newData = JSON.parse(JSON.stringify(e))
            newData[data.index + 1] = optionData
            if (
                optionData.some(ele => ele.code) &&
                data.name &&
                data.value &&
                !optionData.some(ele => Number(ele.id) === Number(data?.value?.[data.index + 1])) &&
                data.value[data.index + 1]
            ) {
                newData[data.index + 1].unshift({
                    id: data.value[data.index + 1],
                    code: 'hide',
                    name: data.name[data.index + 1],
                })
            }
            return newData.slice(0, data.index + 2)
        })
        setPage(1)
    }

    //设置values names
    const formatValuesNames = (option: optionType, index: number) => {
        setValues(e => {
            const newData = JSON.parse(JSON.stringify(e))
            newData[index] = option?.isWhichType === 'level' ? option?.levelRelationId : option?.id
            return newData.slice(0, index + 1)
        })
        setValueNames(e => {
            const newData = JSON.parse(JSON.stringify(e))
            newData[index] = option?.name
            return newData.slice(0, index + 1)
        })
        setTypes(e => {
            const { level, catalogIds, isWhichType } = option || {}
            const newData: any = [...e]
            const mapping = {
                [level!]: 'categoryId',
                [catalogIds]: 'careerId',
                [isWhichType]: isWhichType,
            }
            newData[index] = mapping[level || catalogIds || isWhichType] || ''
            return newData.slice(0, index + 1)
        })
        setIsJobId(option?.catalogIds || option?.isWhichType ? true : false)
        setIspid(option?.workTypeList?.length ? false : true)
        if (!option?.workTypeList?.length) {
            /**  处理无工种无等级  */
            if (option?.levelInfoList?.length) {
                setIspid(false)
            } else {
                /**  处理无工种有等级  */
                setIspid(true)
            }
        }
    }

    //获取分类/工种
    const getSelectList = async (
        option: optionType,
        data: {
            index: number
            name?: string[]
            value?: string[]
        },
        cb?: (option: optionType[]) => any,
    ) => {
        formatValuesNames(option, data.index)
        if (option?.childrens) {
            formatSelectValue(option?.childrens, data)
            cb && cb(option?.childrens)
        } else {
            /**
             *  max:  最多三级分类
             *  进入到这里 说明是分类的最后一级
             */

            /**   如果点击的option有catalogIds 说明点击的是职业  调职业详情接口  */
            if (option?.catalogIds) {
                let jobDetail = await getJobDetail(option?.id)

                if (jobDetail.type === 'work') {
                    jobDetail?.list?.forEach((item: any) => {
                        if (item?.levelInfoList?.length > 0) {
                            item?.levelInfoList.forEach((i: any) => {
                                i.isWhichType = 'level'
                                i.id = i.levelRelationId
                            })
                            item.childrens = item?.levelInfoList
                        } else {
                            item.childrens = []
                        }
                        item.isWhichType = 'work'
                    })
                }

                formatSelectValue(jobDetail.list, data)
                cb && cb(jobDetail.list)
            }
            /**
             *   level 最多三级分类
             *   如果点击的option没有catalogIds 并且level存在  说明点击是分类的最后一级, 拿id去请求职业的数据  */
            if (option?.id && option?.level) {
                const res = await getJob(option?.id)
                formatSelectValue(res?.data, data)
                cb && cb(res?.data)
                return
            }
        }
    }

    //获取点击option
    const getLiClickOption = (data: any, val: string[], index: number) => {
        const option =
            data.find((ele: optionType) => Number(ele.id) === Number(val[index])) || false
        if (option?.children) {
            option.childrens = option?.children
        }
        return option
    }

    const liClick = (val: string[], name: string[]) => {
        setSelectList(e => {
            const newData = JSON.parse(JSON.stringify(e))
            return newData.slice(0, 1)
        })
        setValues([])
        setValueNames([])
        setSearchHide(false)
        setIsJobId(false)

        let indexNum = 0
        function fun(index: number, optionData?: optionType[]) {
            setTimeout(() => {}, 0)
            let option = getLiClickOption(optionData ? optionData : selectList[index], val, index)
            if (!option) return
            indexNum = indexNum + 1
            getSelectList(option, { index, value: val, name }, data => {
                fun(indexNum, data)
            })
        }
        fun(0)
    }

    //根据关键字获取分类
    const getSearchList = async (name: string) => {
        const res = await http(`/admin/front/site_profession_catalog/tree`, 'POST', {
            name,
            sid,
            ...(classificationType === 'standardJob' ? { pageNo: 1, pageSize: 20 } : {}),
        })
        if (!name) {
            setSearchList([])
            return
        }
        function getAllPath(tree: optionType[]) {
            const paths: any[] = []
            for (let i = 0; i < tree.length; i++) {
                if (tree[i].children && tree[i]?.children?.length) {
                    const path = getAllPath(tree[i]?.children as optionType[])
                    for (let j = 0; j < path.length; j++) {
                        paths.push({
                            // eslint-disable-next-line no-unsafe-optional-chaining
                            name: [tree[i]?.name, ...path?.[j]?.name],
                            // eslint-disable-next-line no-unsafe-optional-chaining
                            value: [tree[i]?.id, ...path?.[j]?.value],
                        })
                    }
                } else {
                    paths.push({ name: [tree[i]?.name], value: [tree[i]?.id] })
                }
            }
            return paths
        }
        let newArr = JSON.parse(
            JSON.stringify(res ?? {}).replace(/jobs|professionList/g, 'children'),
        )
        setSearchList(getAllPath(newArr))
    }

    //滚动加载职业
    const onPopupScroll = async (index: number) => {
        setLoading(false)
        setTimeout(() => {
            setLoading(true)
        }, 500)
        if (total === selectList[index].length || total < selectList[index].length) return
        const res = await getJob(values[index - 1], page + 1)
        setPage(e => e + 1)
        setSelectList(e => {
            let newData = JSON.parse(JSON.stringify(e))
            if (res?.data.some((ele: optionType) => ele.id === newData[index][0].id)) {
                newData[index].shift()
            }
            newData[index] = newData[index].concat(res?.data || [])
            return newData
        })
    }

    //职业搜索
    const onSearch = async (val: string, index: number) => {
        const res = await getJob(values[index - 1], 1, val)
        setPage(e => e + 1)
        setSelectList(e => {
            let newData = JSON.parse(JSON.stringify(e))
            newData[index] = res?.data || []
            return newData
        })
    }

    useEffect(() => {
        getTree()
    }, [])

    //回显
    useEffect(() => {
        if (value && value?.value?.length > 0 && value?.name?.length > 0) {
            if (selectList.length > 0 && isFirst && !isClickOption) {
                setIsFirst(false)
                liClick(value?.value, value?.name)
            }
        }
    }, [selectList, value])

    useUpdateEffect(() => {
        onChange({ name: valueNames, value: values, types: types }, isJobId, ispid)
    }, [isJobId, values, valueNames])

    useEffect(() => {
        setTimeout(() => {
            setOpen(true)
        }, 300)
    }, [])
    return (
        <ConfigProvider prefixCls="ant">
            <div className={styles.cf_category}>
                <div className={styles.choice}>
                    {valueNames.length === 0 ? (
                        <span>{title ? title : '请先选择职业'}</span>
                    ) : (
                        <span>已选：{valueNames.join(' > ')}</span>
                    )}
                </div>
                <div className={styles.search}>
                    <Input
                        placeholder="请输入关键词搜索"
                        size="large"
                        suffix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                        value={searchValue}
                        onChange={(e: any) => {
                            setSearchValue(e.target.value)
                            getSearchList(e.target.value)
                            if (!e.target.value) {
                                setSearchHide(false)
                                setSearchList([])
                            } else {
                                setSearchHide(true)
                            }
                        }}
                    />

                    <ul
                        style={{ display: searchHide ? 'block' : 'none' }}
                        className={searchList.length === 0 && searchHide ? styles.flex : ' '}
                    >
                        {searchList.length === 0 ? (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                className={styles.empty_body}
                            />
                        ) : (
                            <>
                                {searchList.map(item => (
                                    <li
                                        key={item.value.join('/')}
                                        onClick={() => {
                                            setSearchValue('')
                                            liClick(item.value, item?.name)
                                        }}
                                    >
                                        {item.name.join('/')}
                                    </li>
                                ))}
                            </>
                        )}
                    </ul>
                </div>
                <div className={styles.select}>
                    {selectList.map((item: any, index: number) => {
                        if (item) {
                            return (
                                <div
                                    key={item?.id}
                                    style={{
                                        width: '16.6%',
                                    }}
                                >
                                    <Select
                                        open={open}
                                        showSearch
                                        // @ts-ignore
                                        value={values?.[index]?.toString()}
                                        placeholder="请输入关键词搜索"
                                        defaultActiveFirstOption={false}
                                        popupClassName="dropdown"
                                        suffixIcon={<SearchOutlined />}
                                        getPopupContainer={(triggerNode: any) =>
                                            triggerNode.parentNode as HTMLElement
                                        }
                                        filterOption={(inputValue: string, option: any) => {
                                            return option?.props?.name.includes(inputValue)
                                        }}
                                        onSelect={(_value: any, option: optionType) => {
                                            setIsClickOption(true)
                                            getSelectList(option, { index })
                                        }}
                                        onPopupScroll={(e: any) => {
                                            const { target } = e
                                            if (
                                                target.scrollTop + target.offsetHeight ===
                                                target.scrollHeight
                                            ) {
                                                if (item.some((ele: optionType) => ele?.code)) {
                                                    if (!loading) return
                                                    onPopupScroll(index)
                                                }
                                            }
                                        }}
                                        onSearch={(e: string) => {
                                            if (
                                                item.some((ele: optionType) => ele.code) ||
                                                item.length === 0
                                            ) {
                                                onSearch(e, index)
                                            }
                                        }}
                                    >
                                        {item.map((ele: optionType) => {
                                            return (
                                                <Option
                                                    key={ele.id}
                                                    /**  是否显示option  */
                                                    style={{
                                                        display:
                                                            ele?.code === 'hide' ? 'none' : 'block',
                                                    }}
                                                    /** index 到了等级为5  不显示箭头   */
                                                    className={styles.option}
                                                    childrens={ele?.children}
                                                    {...ele}
                                                    title={ele?.name}
                                                >
                                                    {ele.name || ' '}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </ConfigProvider>
    )
}
export default Category
