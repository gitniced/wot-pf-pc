import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { cloneDeep } from 'lodash'
import type { DataSourceProps, PreviewModalProps } from './interface'
import { observer } from 'mobx-react'
import FullModal from '@/components/FullModal'
import wrapper from '../../wrapper'

const PreviewModal = observer((props: PreviewModalProps) => {
    const [data, setData] = useState<DataSourceProps[]>([])
    const transformData = () => {
        const pos = 1
        const map: {
            1: 'one'
            2: 'two'
            3: 'three'
        } = {
            1: 'one',
            2: 'two',
            3: 'three',
        }
        let dataItem = {} as unknown as DataSourceProps
        let arr = [] as unknown as DataSourceProps[]
        function next(list: any = [], idx: 1 | 2 | 3) {
            for (let i = 0; i < list.length; i++) {
                let item = list[i]
                dataItem[`${map[idx]}AppraisalRangeName`] = item.name
                dataItem[`${map[idx]}AppraisalRangeCodeMark`] = item.codeMark
                dataItem[`${map[idx]}AppraisalRangeRate`] = item.rate
                if (Array.isArray(item.children) && item.children.length > 0) {
                    // @ts-ignore
                    next(item.children, idx + 1)
                } else if (Array.isArray(item.point) && item.point.length > 0) {
                    // 说明已经走到了最末尾
                    item.point.forEach((_point: any) => {
                        let _pointObj = {
                            appraisalPointName: _point.name,
                            codeMark: _point.codeMark,
                            level: _point.important,
                        }
                        Object.assign(dataItem, _pointObj)
                        const newDataItem = cloneDeep(dataItem)
                        arr.push(newDataItem)
                    })
                }
            }
        }

        next(props.selectElementTable?.range, pos)
        setData(() => arr)
    }
    useEffect(() => {
        transformData()
    }, [])
    const getRowSpan = (
        key: 'oneAppraisalRangeName' | 'twoAppraisalRangeName' | 'threeAppraisalRangeName',
    ) => {
        let rowspan: number[] = []
        let map = new Map()
        data.forEach((item: DataSourceProps) => {
            const name = item[key]
            if (!map.has(name)) {
                map.set(name, 1)
            } else {
                map.set(name, map.get(name) + 1)
            }
        })
        map.forEach((item: number) => {
            let temp = [item]
            // eslint-disable-next-line no-param-reassign
            while (item-- >= 2) {
                temp.push(0)
            }
            rowspan = rowspan.concat(temp)
        })
        return rowspan
    }
    const rows = {
        oneAppraisalRangeSpan: getRowSpan('oneAppraisalRangeName'),
        twoAppraisalRangeSpan: getRowSpan('twoAppraisalRangeName'),
        threeAppraisalRangeSpan: getRowSpan('threeAppraisalRangeName'),
    }
    const columns: ColumnsType<DataSourceProps> = [
        {
            title: '鉴定范围',
            dataIndex: 'appraisalRange',
            children: [
                {
                    title: '一级鉴定范围',
                    dataIndex: 'oneAppraisalRange',
                    children: [
                        {
                            title: '名称',
                            align: 'center',
                            dataIndex: 'oneAppraisalRangeName',
                            key: 'oneAppraisalRangeName',
                            render: (value, record, index) => {
                                const obj = {
                                    children: (
                                        <>
                                            <div>{value}</div>
                                            <div>{record.oneAppraisalRangeCodeMark}</div>
                                        </>
                                    ),
                                    props: {
                                        rowSpan: 1,
                                    },
                                }
                                obj.props.rowSpan = rows.oneAppraisalRangeSpan[index]
                                return obj
                            },
                        },
                        {
                            title: '鉴定比重',
                            align: 'center',
                            dataIndex: 'oneAppraisalRangeRate',
                            key: 'oneAppraisalRangeRate',
                            render: (value, record, index) => {
                                const obj = {
                                    children: value,
                                    props: {
                                        rowSpan: 1,
                                    },
                                }
                                obj.props.rowSpan = rows.oneAppraisalRangeSpan[index]
                                return obj
                            },
                        },
                    ],
                },
                {
                    title: '二级鉴定范围',
                    dataIndex: 'twoAppraisalRange',
                    children: [
                        {
                            title: '名称',
                            dataIndex: 'twoAppraisalRangeName',
                            align: 'center',
                            key: 'twoAppraisalRangeName',
                            render: (value, record, index) => {
                                // RenderedCell
                                const obj = {
                                    children: (
                                        <div>
                                            <div>{value}</div>
                                            <div>{record.twoAppraisalRangeCodeMark}</div>
                                        </div>
                                    ),
                                    props: {
                                        rowSpan: 1,
                                    },
                                }
                                obj.props.rowSpan = rows.twoAppraisalRangeSpan[index]
                                return obj
                            },
                        },
                        {
                            title: '鉴定比重',
                            dataIndex: 'twoAppraisalRangeRate',
                            align: 'center',
                            key: 'twoAppraisalRangeRate',
                            render: (value, record, index) => {
                                const obj = {
                                    children: value,
                                    props: {
                                        rowSpan: 1,
                                    },
                                }
                                obj.props.rowSpan = rows.twoAppraisalRangeSpan[index]
                                return obj
                            },
                        },
                    ],
                },
                {
                    title: '三级鉴定范围',
                    dataIndex: 'threeAppraisalRange',
                    children: [
                        {
                            title: '名称',
                            dataIndex: 'threeAppraisalRangeName',
                            align: 'center',
                            key: 'threeAppraisalRangeName',
                            render: (value, record, index) => {
                                const obj = {
                                    children: (
                                        <>
                                            <div>{value}</div>
                                            <div>{record.threeAppraisalRangeCodeMark}</div>
                                        </>
                                    ),
                                    props: {
                                        rowSpan: 1,
                                    },
                                }
                                obj.props.rowSpan = rows.threeAppraisalRangeSpan[index]
                                return obj
                            },
                        },
                        {
                            title: '鉴定比重',
                            dataIndex: 'threeAppraisalRangeRate',
                            align: 'center',
                            key: 'threeAppraisalRangeRate',
                            render: (value, record, index) => {
                                const obj = {
                                    children: value,
                                    props: {
                                        rowSpan: 1,
                                    },
                                }
                                obj.props.rowSpan = rows.threeAppraisalRangeSpan[index]
                                return obj
                            },
                        },
                    ],
                },
            ],
        },
        {
            title: '鉴定点',
            dataIndex: 'appraisalPoint',
            children: [
                {
                    title: '代码',
                    dataIndex: 'codeMark',
                    align: 'center',
                    key: 'codeMark',
                },
                {
                    title: '名称',
                    dataIndex: 'appraisalPointName',
                    align: 'center',
                    key: 'appraisalPointName',
                },
                {
                    title: '重要程度',
                    align: 'center',
                    dataIndex: 'level',
                    key: 'level',
                },
            ],
        },
    ]
    return (
        <FullModal visible={props.visible} onCancel={props.closeDialog}>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                // scroll={{y: 400}}
                bordered
            />
        </FullModal>
    )
})

export default wrapper(PreviewModal)
