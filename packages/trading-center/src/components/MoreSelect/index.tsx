import http from '@/servers/http'
import type { SelectProps } from 'antd'
import { Select } from 'antd'
import { useEffect, useState } from 'react'
import api from './api'

const MoreSelect = (props: SelectProps<any>) => {
    const { value, onChange, placeholder = '请选择', useType = 'logined', className } = props
    const [options, changeOptions] = useState([{ label: '全部', value: '' }])
    const [searchData, changeSearchData] = useState({
        pagination: {
            currentPage: 1,
            totalCount: 0,
        },
        searchValue: '',
    })
    const {
        pagination: { currentPage, totalCount },
        searchValue,
    } = searchData

    useEffect(() => {
        // 页码，及搜索值变化时，发请求

        let url = useType === 'logined' ? api.getList : api.registerList

        http(url, 'post', {
            pageSize: 10,
            pageNo: currentPage,
            name: searchValue,
        })
            .then(res => {
                const { data } = res
                data.map(item => {
                    item.label = item.name
                    item.value = item.id
                })
                let tempData = []
                if (currentPage === 1) {
                    if (data.length > 0) {
                        tempData = [{ label: '全部', value: '' }].concat(data)
                    } else {
                        tempData = options.concat(data)
                    }
                } else {
                    tempData = options.concat(data)
                }
                changeOptions(tempData)
                changeSearchData({
                    ...searchData,
                    pagination: { currentPage: res.currentPage, totalCount: res.totalCount },
                })
            })
            .catch(() => {})
    }, [currentPage, searchValue])

    const scrollEnd = e => {
        e.persist()
        const { target } = e
        // 滚动 触底 看接口是否还有剩余的值没传过来
        if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
            if (currentPage * 10 < totalCount) {
                changeSearchData({
                    ...searchData,
                    pagination: {
                        ...searchData.pagination,
                        currentPage: currentPage + 1,
                    },
                })
            }
        }
    }

    // 搜索条件变化时，current变成1，
    const searchDataset = searchStr => {
        changeOptions([])
        changeSearchData({
            pagination: {
                ...searchData.pagination,
                currentPage: 1,
            },
            searchValue: searchStr,
        })
    }

    let debounceList = []
    const debounce = (callback, searchStr) => {
        debounceList.map(i => window.clearTimeout(i))
        debounceList = []
        const t = setTimeout(() => {
            callback(searchStr)
            debounceList.map(i => window.clearTimeout(i))
            debounceList = []
        }, 500)
        debounceList.push(t)
    }

    useEffect(() => {
        return () => {
            debounceList.map(i => window.clearTimeout(i))
            debounceList = []
        }
    }, [])

    return (
        <Select
            className={className}
            defaultValue={value}
            // style={{ width: '100%' }}
            placeholder={placeholder}
            showSearch={true}
            options={options}
            // options的值 搜索需要filterOption return true 保证过滤的数据是从接口取过来的
            filterOption={() => {
                return true
            }}
            onPopupScroll={scrollEnd}
            onSearch={e => {
                debounce(searchDataset, e)
            }} // 防止频繁触发请求
            onChange={onChange}
        />
    )
}

export default MoreSelect
