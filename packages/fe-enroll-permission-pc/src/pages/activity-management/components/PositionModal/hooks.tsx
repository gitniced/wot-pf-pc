import { Cascader, Select } from 'antd'
import { SuperTable } from '@wotu/wotu-components'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { getPositionData } from './api'
import type { IAllDataSuperTableProps } from './interface'
import { useEffect, useState } from 'react'
import Http from '@/servers/http'
import MoreSelect from '@/components/MoreSelect'
import { history } from 'umi'
import { renderLocation } from '../../const'
import { cloneDeep } from 'lodash'
interface RegionSelectorProps {
    holder?: string
    value?: any
    onChange?: (e: any) => void
}
/**  所在地  */
const RegionSelector: React.FC<RegionSelectorProps> = ({ holder, value = [], onChange }) => {
    const [options, setOptions] = useState<any[]>([])

    const getAreaData = async (parentCode: string | number) => {
        const data = (await Http(
            '/auth/common_data/city',
            'get',
            { parentCode: parentCode },
            { repeatFilter: false },
        )) as unknown as []
        let list: any[] = []
        data.forEach((item: any) => {
            list.push({
                label: item.name,
                value: item.code,
                isLeaf: ![0, 1, 2].includes(item.level), //  1 省份层级 2 市区层级 3 地区层级
            })
        })
        return list
    }

    const handleAreaList = async (inValue: string[]) => {
        const list = await getAreaData('0')
        const [country, province, city] = inValue.slice()
        let targetProvince, targetCity
        let provinces, cities
        if (inValue?.length >= 2) {
            provinces = await getAreaData(country)
        }

        if (inValue?.length >= 3) {
            cities = await getAreaData(province)
            // 将城市放到对应的省级children里面
            targetProvince =
                provinces?.find(_province => Number(_province.value) === Number(province)) ?? {}
            targetProvince.children = cities
        }
        // 将区级放到市级下面
        if (inValue?.length >= 4) {
            const areas = await getAreaData(city)
            targetCity = cities?.find(_city => Number(_city.value) === Number(city)) ?? {}
            targetCity.children = areas
        }
        setOptions(list)
    }
    const getAreaOptions = async (selectedOptions: any[]) => {
        const targetOption = selectedOptions[selectedOptions?.length - 1]
        targetOption.loading = true
        const currentList = await getAreaData(targetOption.value)
        targetOption.loading = false
        targetOption.children = currentList
        setOptions([...options])
    }

    useEffect(() => {
        if (!value?.length) {
            handleAreaList(value)
        }
    }, [])

    return (
        <Cascader
            value={value}
            options={options}
            loadData={getAreaOptions}
            placeholder={holder}
            changeOnSelect
            onChange={onChange}
            style={{
                width: '100%',
            }}
        />
    )
}

/**  职位类型  */
const JobType: React.FC<RegionSelectorProps> = ({ holder, value = [], onChange }) => {
    const [options, setOptions] = useState<any[]>([])

    const getAreaData = async () => {
        const res: any = (await Http(
            '/common_data/capacity/list_by_top',
            'post',
            { pageNo: 1, pageSize: 999 },
            { repeatFilter: false },
        )) as unknown as []
        const { data = [] } = res || {}

        let list: any[] = []
        data.map((item: any) => {
            list.push({
                value: item.id,
                label: item.name,
                children:
                    item.childList?.map((i: any) => {
                        return {
                            value: i.id,
                            label: i.name,
                            children:
                                i.childList?.map((j: any) => {
                                    return {
                                        value: j.id,
                                        label: j.name,
                                    }
                                }) || [],
                        }
                    }) || [],
            })
        })
        setOptions(list)
    }

    useEffect(() => {
        getAreaData()
    }, [])

    return (
        <Cascader
            value={value}
            options={options}
            placeholder={holder}
            changeOnSelect
            onChange={onChange}
            style={{
                width: '100%',
            }}
        />
    )
}

/**  表格列  */
export const detailsColumns: ColumnsTypeItem<any>[] = [
    {
        search: false,
        title: '岗位名称',
        dataIndex: 'professionName',
        render: (_, { professionName }) => professionName || '-',
    },
    {
        search: false,
        title: '薪水',
        dataIndex: 'salaryDesc',
        width: '12%',
        render: (_, { salaryDesc }) => salaryDesc || '-',
    },
    {
        search: true,
        title: '招聘类型',
        dataIndex: 'recruitType',
        width: '15%',
        render: (_, { recruitTypeName }) => recruitTypeName || '-',
        renderFormItem: () => {
            return (
                <Select
                    placeholder="请选择"
                    style={{
                        width: '100%',
                    }}
                    options={[
                        {
                            label: '社招',
                            value: 1,
                        },
                        {
                            label: '校招',
                            value: 2,
                        },
                        {
                            label: '实习',
                            value: 3,
                        },
                        {
                            label: '兼职',
                            value: 4,
                        },
                    ]}
                />
            )
        },
    },
    {
        search: true,
        title: '所在地',
        dataIndex: 'location',
        width: '10%',
        render: (_, { province, city, region }) => (
            <>{renderLocation({ province, city, region })}</>
        ),
        renderFormItem: () => {
            return <RegionSelector holder="请选择" />
        },
    },
    {
        search: true,
        title: '职位类型',
        dataIndex: 'professionTypeIds',
        width: '15%',
        render: (_, { professionTypeName }) => <>{professionTypeName || '-'}</>,
        renderFormItem: () => {
            return <JobType holder="请选择" />
        },
    },
    {
        search: true,
        title: '企业名称',
        dataIndex: 'organizationCode',
        width: '12%',
        render: (_, { organizationName }) => (
            <>{organizationName ? <>{organizationName}</> : '-'}</>
        ),
        renderFormItem: () => {
            return (
                <MoreSelect
                    all={false}
                    placeholder="请选择企业名称"
                    valueKey="organizationCode"
                    labelKey="organizationName"
                    requestUrl="/activity/front/activity/page/organization"
                    requestMethod="post"
                    repeatFilter={false}
                />
            )
        },
    },
]

/**  全部的数据  */
export const AllDataSuperTable: React.FC<IAllDataSuperTableProps> = props => {
    const { sid } = history?.location?.query || {}
    const { selectedPosition, setSelectedPosition } = props

    const getPositionModalList = async (params: any) => {
        const res = await getPositionData({
            ...params,
            sid: (sid as any)?.split(',').length > 1 ? 1 : sid,
        })
        return res
    }

    const addSelectRow = (rows: any) => {
        const newList = cloneDeep(selectedPosition)
        setSelectedPosition(newList.concat(rows))
    }
    const delSelectRow = (rowkey: string[]) => {
        const newList = cloneDeep(selectedPosition)
        setSelectedPosition(newList.filter((item: any) => !rowkey.includes(item.professionCode)))
    }

    return (
        <SuperTable
            scroll={{ y: 300 }}
            rowKey="professionCode"
            request={getPositionModalList as any}
            formProps={{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
            columns={detailsColumns}
            rowSelection={{
                type: 'checkbox',
                preserveSelectedRowKeys: true,
                selectedRowKeys: selectedPosition.map((item: any) => item?.professionCode),
                // onChange: (_: any, allSelectedRows: any) => {
                //     setSelectedPosition([...allSelectedRows])
                // },
                // checkStrictly: false,
                onSelect: (record: any, selected: boolean) => {
                    if (selected) {
                        addSelectRow(record)
                    } else {
                        delSelectRow([record.professionCode!])
                    }
                },
                onSelectAll: (selected: boolean, selectedRows: any[], changeRows: any[]) => {
                    if (selected) {
                        addSelectRow(changeRows)
                    } else {
                        delSelectRow(changeRows.map((item: any) => item.professionCode))
                    }
                },
            }}
            beforeSearchSubmit={(params: any) => {
                const { location = [] } = params || {}
                const [province, city, region] = location

                delete params.location
                return { ...params, province, city, region }
            }}
        />
    )
}

/**  已选择的数据  */
export const SelectSuperTable: React.FC<IAllDataSuperTableProps> = props => {
    const { selectedPosition, setSelectedPosition } = props
    const addSelectRow = (rows: any) => {
        const newList = cloneDeep(selectedPosition)
        setSelectedPosition(newList.concat(rows))
    }
    const delSelectRow = (rowkey: string[]) => {
        const newList = cloneDeep(selectedPosition)
        setSelectedPosition(newList.filter((item: any) => !rowkey.includes(item.professionCode)))
    }

    return (
        <SuperTable
            scroll={{ y: 300 }}
            rowKey="professionCode"
            formProps={{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
            columns={detailsColumns}
            dataSource={selectedPosition}
            rowSelection={{
                type: 'checkbox',
                preserveSelectedRowKeys: true,
                selectedRowKeys: selectedPosition.map((item: any) => item?.professionCode),
                // onChange: (_: any, allSelectedRows: any) => {
                //     setSelectedPosition([...allSelectedRows])
                // },
                onSelect: (record: any, selected: boolean) => {
                    if (selected) {
                        addSelectRow(record)
                    } else {
                        delSelectRow([record.professionCode!])
                    }
                },
                onSelectAll: (selected: boolean, selectedRows: any[], changeRows: any[]) => {
                    if (selected) {
                        addSelectRow(changeRows)
                    } else {
                        delSelectRow(changeRows.map((item: any) => item.professionCode))
                    }
                },
            }}
        />
    )
}
