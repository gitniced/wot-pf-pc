import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import styles from './index.module.less'
import type { recordType } from './interface'
import { Typography } from 'antd'
import { toJS } from 'mobx'
export default (hooks: any, isDetail?: boolean) => {
    const { border, tdHeightList, sum, edit } = hooks || {}
    const getNum = (children: recordType[]) => {
        let num = 0
        let eleChidLength = 0
        children.forEach(item => {
            const { children: itemChildren = [] } = item || {}
            if (itemChildren && itemChildren.length > 0) {
                itemChildren.forEach(ele => {
                    const { children: eleChildren = [] } = ele || {}
                    if (eleChildren && eleChildren.length > 0) {
                        num += eleChildren.length
                        eleChidLength = eleChildren.length
                    }
                })
            }
        })
        return { num, eleChidLength }
    }
    // 二级考评范围
    const getTwo = (children: recordType[], rowIndex: number, num: number, type: string) => {
        return (
            <>
                {children.map((item, index) => {
                    const { children: itemChildren = [] } = item || {}
                    if (itemChildren && itemChildren.length > 0) {
                        return (
                            <div
                                key={index}
                                className={styles.flex}
                                style={{
                                    borderBottom: border(children, index),
                                    padding: '16px 0',
                                    height: `${tdHeightList[rowIndex] *
                                        (sum(
                                            itemChildren.map(ele => {
                                                const { children: eleChildren = [] } = ele || {}
                                                if (eleChildren && eleChildren.length > 0) {
                                                    return eleChildren.length
                                                }
                                            }),
                                        ) /
                                            num)
                                        }px`,
                                }}
                            >
                                {type === 'name' ? (
                                    <div className={styles.flex_column}>
                                        <span>{item.name}</span>
                                        <span>{item.codeMark}</span>
                                    </div>
                                ) : (
                                    item.rate
                                )}
                            </div>
                        )
                    }
                })}
            </>
        )
    }
    //三级考评范围
    const getThree = (children: recordType[], rowIndex: number, num: number, type: string) => {
        return (
            <>
                {children.map((item, index) => {
                    const { children: itemChildren = [] } = item || {}
                    if (itemChildren && itemChildren.length > 0) {
                        return (
                            <div
                                key={index}
                                style={{
                                    borderBottom: border(children, index),
                                }}
                            >
                                {itemChildren.map((ele, eleIndex) => {
                                    const { children: eleChildren = [] } = ele || {}
                                    if (eleChildren && eleChildren.length > 0) {
                                        return (
                                            <div
                                                key={eleIndex}
                                                className={styles.flex}
                                                style={{
                                                    borderBottom: border(itemChildren, eleIndex),
                                                    padding: '16px 0',
                                                    height: `${tdHeightList[rowIndex] *
                                                        (eleChildren.length / num)
                                                        }px`,
                                                }}
                                            >
                                                {type === 'name' ? (
                                                    <div className={styles.flex_column}>
                                                        <span>{ele.name}</span>
                                                        <span>{ele.codeMark}</span>
                                                    </div>
                                                ) : null}
                                                {type === 'rate' ? ele.rate || '-' : null}
                                                {/* {type === 'info' ? ele.info || '-' : null} */}
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        )
                    }
                })}
            </>
        )
    }
    // 获取相关知识要求
    //考评点\操作
    const getPoint = (
        children: recordType[],
        rowIndex: number,
        num: number,
        type: string,
        eleChidLength: number,
        record: recordType,
    ) => {
        return (
            <>
                {children.map((item, index) => {
                    const { children: itemChildren = [] } = item || {}
                    return (
                        <div key={index} style={{ borderBottom: border(children, index) }}>
                            {itemChildren && itemChildren.length > 0 && (
                                <>
                                    {itemChildren.map((ele, eleIndex) => {
                                        const { children: eleChildren = [] } = ele || {}
                                        return (
                                            <div
                                                key={eleIndex}
                                                style={{
                                                    borderBottom: border(item.children, eleIndex),
                                                }}
                                            >
                                                {eleChildren && eleChildren.length > 0 && (
                                                    <>
                                                        {eleChildren.map((data, dataIndex) =>
                                                            type === 'set' ? (
                                                                <div
                                                                    className={styles.flex_center}
                                                                    key={dataIndex}
                                                                    style={{
                                                                        borderBottom: border(
                                                                            eleChildren,
                                                                            dataIndex,
                                                                        ),
                                                                        padding: '16px 0',
                                                                        height: `${(tdHeightList[
                                                                            rowIndex
                                                                        ] *
                                                                            (eleChidLength /
                                                                                num)) /
                                                                            eleChidLength
                                                                            }px`,
                                                                    }}
                                                                >
                                                                    <Typography.Link
                                                                        style={{
                                                                            marginRight: '8px',
                                                                        }}
                                                                        onClick={() => {
                                                                            const pointType = data?.noPoint ? 3 :
                                                                                data.code ? 2 : 1 // 考评点传2，考评范围传1
                                                                            edit(
                                                                                data.code ||
                                                                                ele.code ||
                                                                                item.code ||
                                                                                record.code,
                                                                                'edit',
                                                                                pointType,
                                                                            )
                                                                        }}
                                                                    >
                                                                        编辑
                                                                    </Typography.Link>
                                                                    <Typography.Link
                                                                        onClick={() => {
                                                                            const pointType = data?.noPoint ? 3 :
                                                                                data.code ? 2 : 1 // 考评点传2，考评范围传1
                                                                            edit(
                                                                                data.code ||
                                                                                ele.code ||
                                                                                item.code ||
                                                                                record.code,
                                                                                'del',
                                                                                pointType,
                                                                            )
                                                                        }}
                                                                    >
                                                                        删除
                                                                    </Typography.Link>
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    key={dataIndex}
                                                                    className={styles.flex}
                                                                    style={{
                                                                        borderBottom: border(
                                                                            eleChildren,
                                                                            dataIndex,
                                                                        ),
                                                                        padding: '16px 0',
                                                                        height: `${(tdHeightList[
                                                                            rowIndex
                                                                        ] *
                                                                            (eleChidLength /
                                                                                num)) /
                                                                            eleChidLength
                                                                            }px`,
                                                                    }}
                                                                >
                                                                    {/* @ts-ignore */}
                                                                    {data[type]}
                                                                </div>
                                                            ),
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        )
                                    })}
                                </>
                            )}
                        </div>
                    )
                })}
            </>
        )
    }
    // 相关知识点
    const getInfo = (
        children: recordType[],
        rowIndex: number,
        num: number,
    ) => {
        console.log(tdHeightList)
        return (
            <>
                {children.map((item, index) => {
                    const { children: itemChildren = [] } = item || {}
                    return (
                        <div key={index} style={{ borderBottom: border(children, index) }}>
                            {itemChildren && itemChildren.length > 0 && (
                                <>
                                    {itemChildren.map((ele, eleIndex) => {
                                        const { info: eleChildren = [] } = ele || {}
                                        return (
                                            <div
                                                key={eleIndex}
                                                style={{
                                                    borderBottom: border(item.children, eleIndex),
                                                }}
                                            >
                                                {eleChildren && eleChildren.length > 0 && (
                                                    <>
                                                        {eleChildren?.map((data, dataIndex) =>
                                                        (
                                                            <div
                                                                key={dataIndex}
                                                                className={styles.flex}
                                                                style={{
                                                                    borderBottom: border(
                                                                        eleChildren,
                                                                        dataIndex,
                                                                    ),
                                                                    padding: '16px 0',
                                                                    height: `${(tdHeightList[rowIndex] / num * (data?.children?.length || 1))}px`,
                                                                }}
                                                            >
                                                                {/* @ts-ignore */}
                                                                {data.name?.startsWith('blank_') ? '-' : data.name}
                                                            </div>
                                                        ),
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        )
                                    })}
                                </>
                            )}
                        </div>
                    )
                })}
            </>
        )
    }

    const columns: ColumnsTypeItem<recordType>[] = [
        // {
        //     title: 'ID',
        //     align: 'center',
        //     render: (_: string, __: recordType, index: number) => {
        //         return <div>{index + 1}</div>
        //     },
        // },
        // {
        //     title: '一级考评范围',
        //     children: [
        //         {
        //             title: '名称代码',
        //             key: '1',
        //             align: 'center',
        //             dataIndex: 'name',
        //             render: (_: string, record: recordType) => {
        //                 const { name, codeMark } = record || {}
        //                 return (
        //                     <div className={styles.flex_column}>
        //                         <span>{name}</span>
        //                         <span>{codeMark}</span>
        //                     </div>
        //                 )
        //             },
        //         },
        //         {
        //             title: '权重',
        //             key: '2',
        //             align: 'center',
        //             dataIndex: 'rate',
        //         },
        //     ],
        // },
        // {
        //     title: '二级考评范围',
        //     dataIndex: 'two',
        //     key: 'two',
        //     align: 'center',
        //     children: [
        //         {
        //             title: '名称代码',
        //             key: '1',
        //             align: 'center',
        //             render: (_: string, record: recordType, rowIndex: number) => {
        //                 const { children = [] } = record || {}
        //                 if (children && children.length > 0) {
        //                     const { num } = getNum(children)
        //                     return getTwo(children, rowIndex, num, 'name')
        //                 }
        //             },
        //         },
        //         {
        //             title: '权重',
        //             key: '2',
        //             align: 'center',
        //             render: (_: string, record: recordType, rowIndex: number) => {
        //                 const { children = [] } = record || {}
        //                 if (children && children.length > 0) {
        //                     const { num } = getNum(children)
        //                     return getTwo(children, rowIndex, num, 'rate')
        //                 }
        //             },
        //         },
        //     ],
        // },
        // {
        //     title: '三级考评范围',
        //     dataIndex: 'three',
        //     key: 'three',
        //     align: 'center',
        //     children: [
        //         {
        //             title: '名称代码',
        //             key: '1',
        //             align: 'center',
        //             render: (_: string, record: recordType, rowIndex: number) => {
        //                 const { children = [] } = record || {}
        //                 if (children && children.length > 0) {
        //                     const { num } = getNum(children)
        //                     return getThree(children, rowIndex, num, 'name')
        //                 }
        //             },
        //         },
        //         {
        //             title: '权重',
        //             key: '2',
        //             align: 'center',
        //             render: (_: string, record: recordType, rowIndex: number) => {
        //                 const { children = [] } = record || {}
        //                 if (children && children.length > 0) {
        //                     const { num } = getNum(children)
        //                     return getThree(children, rowIndex, num, 'rate')
        //                 }
        //             },
        //         },
        //     ],
        // },

        {
            title: '考评范围',
            dataIndex: 'range',
            key: 'range',
            align: 'center',
            children: [
                {
                    title: '一级',
                    children: [
                        {
                            title: '名称代码',
                            key: '1',
                            align: 'center',
                            dataIndex: 'name',
                            render: (_: string, record: recordType) => {
                                const { name, codeMark } = record || {}
                                return (
                                    <div className={styles.flex_column}>
                                        <span>{name}</span>
                                        <span>{codeMark}</span>
                                    </div>
                                )
                            },
                        },
                        {
                            title: '权重',
                            key: '2',
                            align: 'center',
                            dataIndex: 'rate',
                        },
                    ],
                },
                {
                    title: '二级',
                    dataIndex: 'two',
                    key: 'two',
                    align: 'center',
                    children: [
                        {
                            title: '名称代码',
                            key: '1',
                            align: 'center',
                            render: (_: string, record: recordType, rowIndex: number) => {
                                const { children = [] } = record || {}
                                if (children && children.length > 0) {
                                    const { num } = getNum(children)
                                    return getTwo(children, rowIndex, num, 'name')
                                }
                            },
                        },
                        {
                            title: '权重',
                            key: '2',
                            align: 'center',
                            render: (_: string, record: recordType, rowIndex: number) => {
                                const { children = [] } = record || {}
                                if (children && children.length > 0) {
                                    const { num } = getNum(children)
                                    return getTwo(children, rowIndex, num, 'rate')
                                }
                            },
                        },
                    ],
                },
                {
                    title: '三级',
                    dataIndex: 'three',
                    key: 'three',
                    align: 'center',
                    children: [
                        {
                            title: '名称代码',
                            key: '1',
                            align: 'center',
                            render: (_: string, record: recordType, rowIndex: number) => {
                                const { children = [] } = record || {}
                                if (children && children.length > 0) {
                                    const { num } = getNum(children)
                                    return getThree(children, rowIndex, num, 'name')
                                }
                            },
                        },
                        {
                            title: '权重',
                            key: '2',
                            align: 'center',
                            render: (_: string, record: recordType, rowIndex: number) => {
                                const { children = [] } = record || {}
                                if (children && children.length > 0) {
                                    const { num } = getNum(children)
                                    return getThree(children, rowIndex, num, 'rate')
                                }
                            },
                        },
                        {
                            title: '相关知识要求',
                            key: '3',
                            align: 'center',
                            render: (_: string, record: recordType, rowIndex: number) => {
                                const { children = [] } = record || {}
                                if (children && children.length > 0) {
                                    const { num } = getNum(children)
                                    return getInfo(children, rowIndex, num)
                                }
                            },
                        },
                    ],
                },
            ],
        },
        {
            title: '考评点',
            dataIndex: 'spot',
            key: 'spot',
            align: 'center',
            children: [
                {
                    title: '代码',
                    dataIndex: 'name',
                    key: 'name',
                    align: 'center',
                    render: (_: string, record: recordType, rowIndex: number) => {
                        const { children = [] } = record || {}
                        if (children && children.length > 0) {
                            const { num, eleChidLength } = getNum(children)
                            return getPoint(
                                children,
                                rowIndex,
                                num,
                                'codeMark',
                                eleChidLength,
                                record,
                            )
                        }
                    },
                },
                {
                    title: '名称',
                    dataIndex: 'name',
                    key: 'name',
                    align: 'center',
                    render: (_: string, record: recordType, rowIndex: number) => {
                        const { children = [] } = record || {}
                        if (children && children.length > 0) {
                            const { num, eleChidLength } = getNum(children)
                            return getPoint(children, rowIndex, num, 'name', eleChidLength, record)
                        }
                    },
                },
                {
                    title: '重要程度',
                    dataIndex: 'grade',
                    key: 'grade',
                    align: 'center',
                    render: (_: string, record: recordType, rowIndex: number) => {
                        const { children = [] } = record || {}
                        if (children && children.length > 0) {
                            const { num, eleChidLength } = getNum(children)
                            return getPoint(
                                children,
                                rowIndex,
                                num,
                                'important',
                                eleChidLength,
                                record,
                            )
                        }
                    },
                },
            ],
        },
        {
            title: '操作',
            dataIndex: '操作',
            key: '操作',
            align: 'center',
            width: 80,
            render: (_: string, record: recordType, rowIndex: number) => {
                const { children = [] } = record || {}
                if (children && children.length > 0) {
                    const { num, eleChidLength } = getNum(children)
                    return getPoint(children, rowIndex, num, 'set', eleChidLength, record)
                }
            },
            hide: isDetail,
        },
    ]

    return columns
}
